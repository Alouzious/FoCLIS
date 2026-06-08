/// Immediate confirmation email after registration
pub fn confirmation_email(name: &str, role: &str, extra: Option<&str>) -> String {
    let role_line = match role {
        "hacker"   => "You've registered as a <strong>Hacker</strong>. Get ready to build something that matters.",
        "attendee" => "You've registered as an <strong>Attendee</strong>. We're excited to have you in the room.",
        "sponsor"  => "You've registered as a <strong>Hack Partner / Sponsor</strong>. Our team will reach out shortly.",
        "lecturer" => "You've registered as a <strong>Lecturer / Mentor</strong>. Thank you for volunteering your expertise.",
        _          => "Your registration has been received.",
    };

    let extra_block = extra.map(|e| format!(
        r#"<tr><td style="padding:0 0 16px"><p style="margin:0;font-size:14px;color:#94a3b8;">{}</p></td></tr>"#,
        e
    )).unwrap_or_default();

    base_template(&format!(r#"
        <tr><td style="padding:0 0 8px">
            <p style="margin:0;font-size:22px;font-weight:700;color:#e2e8f0;">Hey {name} 👋</p>
        </td></tr>
        <tr><td style="padding:0 0 20px">
            <p style="margin:0;font-size:15px;color:#94a3b8;line-height:1.7;">
                Your application for <strong style="color:#3b82f6;">FoCLIS Hackathon 2026</strong> has been received.
                {role_line}
            </p>
        </td></tr>
        {extra_block}
        <tr><td style="padding:0 0 28px">
            <p style="margin:0;font-size:14px;color:#64748b;line-height:1.7;">
                Keep refining your idea — the strongest submissions are the ones with a clear problem,
                a practical solution, and a real community impact. We'll be in touch.
            </p>
        </td></tr>
        <tr><td style="padding:0 0 0">
            <a href="https://foclis.org" style="display:inline-block;padding:12px 28px;background:#3b82f6;color:#fff;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">
                Visit FoCLIS Website
            </a>
        </td></tr>
    "#, name=name, role_line=role_line, extra_block=extra_block))
}

/// 24-hour follow-up email
pub fn follow_up_email(name: &str, role: &str) -> String {
    let body = match role {
        "hacker" => r#"
            <p style="margin:0 0 16px;font-size:15px;color:#94a3b8;line-height:1.7;">
                It's been 24 hours since you registered. Here's how to make your submission stronger before the hackathon:
            </p>
            <ul style="margin:0 0 20px;padding-left:20px;color:#94a3b8;font-size:14px;line-height:2;">
                <li>Sharpen your <strong style="color:#e2e8f0;">problem statement</strong> — be specific about who is affected and how</li>
                <li>Validate your solution idea with at least one potential user</li>
                <li>Sketch a basic prototype or wireframe before the event</li>
                <li>Make sure every team member knows their role</li>
                <li>Review the challenge track criteria on our website</li>
            </ul>
        "#,
        "attendee" => r#"
            <p style="margin:0 0 16px;font-size:15px;color:#94a3b8;line-height:1.7;">
                We're looking forward to seeing you at FoCLIS Hackathon 2026! Here's how to prepare:
            </p>
            <ul style="margin:0 0 20px;padding-left:20px;color:#94a3b8;font-size:14px;line-height:2;">
                <li>Review the <strong style="color:#e2e8f0;">four challenge tracks</strong> — Climate, Health, Education, Economic Empowerment</li>
                <li>Note the schedule on our website so you don't miss key sessions</li>
                <li>Bring business cards or contact info to network</li>
            </ul>
        "#,
        "sponsor" => r#"
            <p style="margin:0 0 16px;font-size:15px;color:#94a3b8;line-height:1.7;">
                Thank you for your interest in partnering with FoCLIS Hackathon 2026.
                Our team will contact you within 2 business days to discuss your sponsorship package.
                In the meantime:
            </p>
            <ul style="margin:0 0 20px;padding-left:20px;color:#94a3b8;font-size:14px;line-height:2;">
                <li>Review our sponsorship tiers on the website</li>
                <li>Prepare any branding assets you'd like featured</li>
                <li>Consider what engagement opportunities matter most to your organisation</li>
            </ul>
        "#,
        "lecturer" => r#"
            <p style="margin:0 0 16px;font-size:15px;color:#94a3b8;line-height:1.7;">
                Thank you for offering your time and expertise to FoCLIS Hackathon 2026.
                Here are some ways to prepare for your mentorship or judging role:
            </p>
            <ul style="margin:0 0 20px;padding-left:20px;color:#94a3b8;font-size:14px;line-height:2;">
                <li>Review the four challenge tracks and evaluation criteria</li>
                <li>Prepare 2–3 key questions to challenge teams on feasibility and impact</li>
                <li>Think about real-world examples from your field you can share with participants</li>
            </ul>
        "#,
        _ => r#"<p style="color:#94a3b8;">We hope you're getting ready for FoCLIS Hackathon 2026!</p>"#,
    };

    base_template(&format!(r#"
        <tr><td style="padding:0 0 8px">
            <p style="margin:0;font-size:22px;font-weight:700;color:#e2e8f0;">Still thinking about it, {name}? 🚀</p>
        </td></tr>
        <tr><td style="padding:0 0 20px">
            {body}
        </td></tr>
        <tr><td style="padding:0 0 0">
            <a href="https://foclis.org" style="display:inline-block;padding:12px 28px;background:#3b82f6;color:#fff;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;">
                Visit FoCLIS Website →
            </a>
        </td></tr>
    "#, name=name, body=body))
}

/// Admin broadcast / custom message
pub fn broadcast_email(subject: &str, body: &str) -> String {
    base_template(&format!(r#"
        <tr><td style="padding:0 0 20px">
            <p style="margin:0;font-size:22px;font-weight:700;color:#e2e8f0;">{subject}</p>
        </td></tr>
        <tr><td style="padding:0 0 0">
            <div style="font-size:15px;color:#94a3b8;line-height:1.8;white-space:pre-wrap;">{body}</div>
        </td></tr>
    "#, subject=subject, body=body))
}

/// Shared base layout for all emails
fn base_template(inner: &str) -> String {
    format!(r#"<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0a0f1e;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0a0f1e;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0f172a;border-radius:12px;border:1px solid rgba(255,255,255,0.06);overflow:hidden;">

        <!-- Header -->
        <tr><td style="padding:28px 36px;background:linear-gradient(135deg,#1e3a5f,#1e1b4b);border-bottom:1px solid rgba(255,255,255,0.06);">
          <p style="margin:0;font-size:18px;font-weight:800;color:#e2e8f0;letter-spacing:-0.02em;">
            FoCLIS <span style="color:#3b82f6;">Hackathon</span> 2026
          </p>
          <p style="margin:4px 0 0;font-size:11px;color:#64748b;letter-spacing:0.1em;text-transform:uppercase;">
            Faculty of Computing & Library &amp; Information Science · Kabale University
          </p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:36px 36px 28px;">
          <table width="100%" cellpadding="0" cellspacing="0">
            {inner}
          </table>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 36px;border-top:1px solid rgba(255,255,255,0.05);background:rgba(0,0,0,0.2);">
          <p style="margin:0;font-size:11px;color:#334155;text-align:center;line-height:1.8;">
            FoCLIS Hackathon 2026 · Kabale University, Uganda<br>
            You're receiving this because you registered at foclis.org<br>
            <a href="https://foclis.org" style="color:#3b82f6;text-decoration:none;">foclis.org</a>
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>"#, inner=inner)
}