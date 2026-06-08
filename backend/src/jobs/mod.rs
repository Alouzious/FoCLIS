use std::sync::Arc;
use tokio::time::{interval, Duration};

use crate::{
    db,
    email::{self, templates},
    AppState,
};

/// Spawns a background task that runs every 10 minutes.
/// Picks up registrations older than 24h that haven't had a follow-up,
/// sends the follow-up email, then marks them done.
pub fn start(state: Arc<AppState>) {
    tokio::spawn(async move {
        let mut tick = interval(Duration::from_secs(10 * 60)); // every 10 min
        loop {
            tick.tick().await;
            if let Err(e) = run_follow_ups(&state).await {
                tracing::error!("follow_up job error: {e}");
            }
        }
    });
}

async fn run_follow_ups(state: &AppState) -> anyhow::Result<()> {
    let pending = db::get_pending_follow_ups(&state.pool).await?;

    if pending.is_empty() {
        return Ok(());
    }

    tracing::info!("follow_up job: {} pending", pending.len());

    for reg in pending {
        // Build name
        let name = reg.leader_name.clone()
            .or_else(|| {
                match (reg.first_name.clone(), reg.last_name.clone()) {
                    (Some(f), Some(l)) => Some(format!("{} {}", f, l)),
                    (Some(f), None)    => Some(f),
                    _                  => None,
                }
            })
            .or_else(|| reg.contact_name.clone())
            .unwrap_or_else(|| "there".into());

        let html = templates::follow_up_email(&name, &reg.role);
        let subject = match reg.role.as_str() {
            "hacker"   => "Keep building tips for FoCLIS Hackathon 2026",
            "attendee" => "Getting ready for FoCLIS Hackathon 2026?",
            "sponsor"  => "Next steps for your FoCLIS partnership",
            "lecturer" => "Preparing for your mentor/judge role at FoCLIS",
            _          => "FoCLIS Hackathon 2026 — A quick follow-up",
        };

        let sent = email::send_email(&state.mailer, &name, &reg.email, subject, &html).await;

        match sent {
            Ok(_) => {
                db::mark_follow_up_sent(&state.pool, reg.id).await?;
                tracing::info!("follow_up sent to {} ({})", reg.email, reg.id);
            }
            Err(e) => {
                tracing::warn!("follow_up failed for {}: {}", reg.email, e);
                // Don't mark as sent — will retry next tick
            }
        }
    }

    Ok(())
}