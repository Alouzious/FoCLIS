pub mod templates;

use anyhow::Result;
use lettre::{
    message::{header::ContentType, MultiPart, SinglePart},
    AsyncSmtpTransport, AsyncTransport, Message, Tokio1Executor,
    transport::smtp::authentication::Credentials,
};
use std::env;

pub async fn build_mailer() -> Result<AsyncSmtpTransport<Tokio1Executor>> {
    let host = env::var("SMTP_HOST").unwrap_or_else(|_| "smtp.gmail.com".into());
    let port: u16 = env::var("SMTP_PORT").unwrap_or_else(|_| "465".into()).parse()?;
    let user = env::var("SMTP_USER").unwrap_or_else(|_| "noreply@example.com".into());
    let pass = env::var("SMTP_PASS").unwrap_or_else(|_| "".into());

    let creds = Credentials::new(user, pass);

    let mailer = AsyncSmtpTransport::<Tokio1Executor>::relay(&host)?
        .port(port)
        .credentials(creds)
        .build();

    Ok(mailer)
}

pub async fn send_email(
    mailer: &AsyncSmtpTransport<Tokio1Executor>,
    to_name: &str,
    to_email: &str,
    subject: &str,
    html: &str,
) -> Result<()> {
    let from = format!(
        "{} <{}>",
        env::var("EMAIL_FROM_NAME").unwrap_or_else(|_| "FoCLIS Hackathon".into()),
        env::var("EMAIL_FROM_ADDR").unwrap_or_else(|_| "noreply@foclis.org".into()),
    );

    let to = format!("{} <{}>", to_name, to_email);

    let email = Message::builder()
        .from(from.parse()?)
        .to(to.parse()?)
        .subject(subject)
        .multipart(
            MultiPart::alternative().singlepart(
                SinglePart::builder()
                    .header(ContentType::TEXT_HTML)
                    .body(html.to_string()),
            ),
        )?;

    mailer.send(email).await?;
    Ok(())
}

pub async fn send_bulk(
    mailer: &AsyncSmtpTransport<Tokio1Executor>,
    recipients: &[(String, String)],
    subject: &str,
    html: &str,
) -> (usize, usize) {
    let mut ok = 0usize;
    let mut failed = 0usize;

    for (name, email) in recipients {
        match send_email(mailer, name, email, subject, html).await {
            Ok(_)  => ok += 1,
            Err(e) => {
                tracing::warn!("Failed to send to {}: {}", email, e);
                failed += 1;
            }
        }
    }

    (ok, failed)
}
