use axum::{
    extract::{Path, Query, State},
    http::StatusCode,
    Json,
};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{
    db,
    email::{self, templates},
    models::{BroadcastRequest, ListQuery, UpdateStatusRequest},
    AppState,
};

// GET /api/admin/stats
pub async fn get_stats(
    State(state): State<AppState>,
) -> Result<Json<Value>, (StatusCode, Json<Value>)> {
    let stats = db::get_stats(&state.pool).await.map_err(|e| {
        tracing::error!("get_stats: {e}");
        (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({ "error": "DB error" })))
    })?;
    Ok(Json(json!(stats)))
}

// GET /api/admin/registrations?role=hacker&status=pending&page=1&limit=20
pub async fn list_registrations(
    State(state): State<AppState>,
    Query(q): Query<ListQuery>,
) -> Result<Json<Value>, (StatusCode, Json<Value>)> {
    let limit  = q.limit.unwrap_or(20).min(100);
    let offset = (q.page.unwrap_or(1) - 1) * limit;

    let rows = db::list_registrations(
        &state.pool,
        q.role.as_deref(),
        q.status.as_deref(),
        limit,
        offset,
    ).await.map_err(|e| {
        tracing::error!("list_registrations: {e}");
        (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({ "error": "DB error" })))
    })?;

    Ok(Json(json!({ "registrations": rows, "count": rows.len() })))
}

// GET /api/admin/registrations/:id
pub async fn get_registration(
    State(state): State<AppState>,
    Path(id): Path<Uuid>,
) -> Result<Json<Value>, (StatusCode, Json<Value>)> {
    let reg = db::get_registration(&state.pool, id).await
        .map_err(|e| {
            tracing::error!("get_registration: {e}");
            (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({ "error": "DB error" })))
        })?
        .ok_or_else(|| (StatusCode::NOT_FOUND, Json(json!({ "error": "Not found" }))))?;

    let members = db::get_team_members(&state.pool, id).await
        .unwrap_or_default();

    Ok(Json(json!({ "registration": reg, "team_members": members })))
}

// PATCH /api/admin/registrations/:id/status
pub async fn update_status(
    State(state): State<AppState>,
    Path(id): Path<Uuid>,
    Json(body): Json<UpdateStatusRequest>,
) -> Result<Json<Value>, (StatusCode, Json<Value>)> {
    let allowed = ["pending", "approved", "rejected", "waitlisted"];
    if !allowed.contains(&body.status.as_str()) {
        return Err((StatusCode::BAD_REQUEST, Json(json!({ "error": "Invalid status" }))));
    }

    db::update_status(&state.pool, id, &body.status).await.map_err(|e| {
        tracing::error!("update_status: {e}");
        (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({ "error": "DB error" })))
    })?;

    Ok(Json(json!({ "ok": true })))
}

// POST /api/admin/broadcast
// body: { subject, body, target_role?, target_id? }
pub async fn broadcast(
    State(state): State<AppState>,
    Json(body): Json<BroadcastRequest>,
) -> Result<Json<Value>, (StatusCode, Json<Value>)> {

    let db_err = |e: anyhow::Error| {
        tracing::error!("broadcast db: {e}");
        (StatusCode::INTERNAL_SERVER_ERROR, Json(json!({ "error": "DB error" })))
    };

    // Single registration message
    if let Some(target_id) = body.target_id {
        let reg = db::get_registration(&state.pool, target_id).await
            .map_err(db_err)?
            .ok_or_else(|| (StatusCode::NOT_FOUND, Json(json!({ "error": "Not found" }))))?;

        let members = db::get_team_members(&state.pool, target_id).await.unwrap_or_default();

        let html = templates::broadcast_email(&body.subject, &body.body);

        // Primary email
        let name = reg.leader_name.or(reg.first_name).or(reg.contact_name)
            .unwrap_or_else(|| "Participant".into());
        let _ = email::send_email(&state.mailer, &name, &reg.email, &body.subject, &html).await;

        // Team members if hacker
        for m in &members {
            let _ = email::send_email(&state.mailer, &m.name, &m.email, &body.subject, &html).await;
        }

        return Ok(Json(json!({ "ok": true, "sent": 1 })));
    }

    // Broadcast to a role (or all)
    let emails = db::get_emails_by_role(&state.pool, body.target_role.as_deref())
        .await.map_err(db_err)?;

    let html = templates::broadcast_email(&body.subject, &body.body);
    let recipients: Vec<(String, String)> = emails.into_iter()
        .map(|e| ("Participant".into(), e))
        .collect();

    let (ok, failed) = email::send_bulk(&state.mailer, &recipients, &body.subject, &html).await;

    Ok(Json(json!({ "ok": true, "sent": ok, "failed": failed })))
}