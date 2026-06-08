use axum::{extract::State, http::StatusCode, Json};
use serde_json::{json, Value};

use crate::{
    db,
    email::{self, templates},
    models::RegisterRequest,
    AppState,
};

pub async fn register(
    State(state): State<AppState>,
    Json(payload): Json<RegisterRequest>,
) -> Result<Json<Value>, (StatusCode, Json<Value>)> {

    let err = |msg: &str| (
        StatusCode::INTERNAL_SERVER_ERROR,
        Json(json!({ "error": msg })),
    );

    match payload {
        RegisterRequest::Hacker {
            project_name, track, problem_statement, solution, impact,
            team_members, leader_name, phone, university, referral, ..
        } => {
            let leader_email = team_members.first()
                .map(|m| m.email.clone())
                .unwrap_or_default();

            let reg_id = db::insert_hacker(
                &state.pool,
                &project_name, &track, &problem_statement,
                &solution, &impact, &leader_name,
                &leader_email, &phone, &university,
                referral.as_deref(),
            ).await.map_err(|e| {
                tracing::error!("insert_hacker: {e}");
                err("Failed to save registration")
            })?;

            db::insert_team_members(&state.pool, reg_id, &team_members)
                .await
                .map_err(|e| { tracing::error!("insert_team_members: {e}"); err("Failed to save team") })?;

            for member in &team_members {
                let html = templates::confirmation_email(
                    &member.name,
                    "hacker",
                    Some(&format!("Your project: <strong style='color:#3b82f6'>{}</strong>", project_name)),
                );
                let _ = email::send_email(&state.mailer, &member.name, &member.email, "Your FoCLIS Hackathon Application is Confirmed!", &html).await;
            }

            Ok(Json(json!({ "id": reg_id, "message": "Registration successful" })))
        }

        RegisterRequest::Attendee {
            first_name, last_name, email, phone, org, course, year, reason, ..
        } => {
            let reg_id = db::insert_attendee(
                &state.pool,
                &first_name, &last_name, &email,
                phone.as_deref(), &org,
                course.as_deref(), year.as_deref(), reason.as_deref(),
            ).await.map_err(|e| {
                tracing::error!("insert_attendee: {e}");
                err("Failed to save registration")
            })?;

            let name = format!("{} {}", first_name, last_name);
            let html = templates::confirmation_email(&name, "attendee", None);
            let _ = email::send_email(&state.mailer, &name, &email, "You're registered for FoCLIS Hackathon 2026!", &html).await;

            Ok(Json(json!({ "id": reg_id, "message": "Registration successful" })))
        }

        RegisterRequest::Sponsor {
            org_name, website, sector, contact_name,
            job_title, email, phone, tier, message, ..
        } => {
            let reg_id = db::insert_sponsor(
                &state.pool,
                &org_name, website.as_deref(), &sector,
                &contact_name, job_title.as_deref(),
                &email, phone.as_deref(), &tier, message.as_deref(),
            ).await.map_err(|e| {
                tracing::error!("insert_sponsor: {e}");
                err("Failed to save registration")
            })?;

            let html = templates::confirmation_email(
                &contact_name,
                "sponsor",
                Some(&format!("Tier: <strong style='color:#f59e0b'>{}</strong>", tier)),
            );
            let _ = email::send_email(&state.mailer, &contact_name, &email, "FoCLIS Hackathon — Partnership Interest Received", &html).await;

            Ok(Json(json!({ "id": reg_id, "message": "Registration successful" })))
        }

        RegisterRequest::Lecturer {
            first_name, last_name, email, phone,
            institution, department, participant_role, expertise, bio, ..
        } => {
            let reg_id = db::insert_lecturer(
                &state.pool,
                &first_name, &last_name, &email,
                phone.as_deref(), &institution,
                department.as_deref(), &participant_role, &expertise, bio.as_deref(),
            ).await.map_err(|e| {
                tracing::error!("insert_lecturer: {e}");
                err("Failed to save registration")
            })?;

            let name = format!("{} {}", first_name, last_name);
            let html = templates::confirmation_email(&name, "lecturer", None);
            let _ = email::send_email(&state.mailer, &name, &email, "FoCLIS Hackathon — Mentor/Judge Registration Confirmed", &html).await;

            Ok(Json(json!({ "id": reg_id, "message": "Registration successful" })))
        }
    }
}