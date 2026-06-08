mod db;
mod email;
mod jobs;
mod models;
mod routes;

use std::sync::Arc;

use axum::{
    routing::{get, patch, post},
    Router,
};
use lettre::{AsyncSmtpTransport, Tokio1Executor};
use sqlx::PgPool;
use tower_http::cors::{Any, CorsLayer};
use tower_http::trace::TraceLayer;

// ─── APP STATE ───────────────────────────────────────────────────────

#[derive(Clone)]
pub struct AppState {
    pub pool:   PgPool,
    pub mailer: AsyncSmtpTransport<Tokio1Executor>,
}

// ─── MAIN ────────────────────────────────────────────────────────────

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Load .env
    dotenv::dotenv().ok();

    // Tracing
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::from_default_env()
                .add_directive("backend=debug".parse()?)
        )
        .init();

    // DB
    let database_url = std::env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");

    let pool = sqlx::postgres::PgPoolOptions::new()
        .max_connections(10)
        .connect(&database_url)
        .await?;

    // Run migrations
    sqlx::migrate!("./migrations").run(&pool).await?;
    tracing::info!("Database migrations applied");

    // Mailer
    let mailer = email::build_mailer().await?;

    let state = AppState { pool, mailer };

    // Start background follow-up job
    jobs::start(Arc::new(state.clone()));

    // CORS — allow the frontend origin
    let frontend_origin = std::env::var("FRONTEND_ORIGIN")
        .unwrap_or_else(|_| "http://localhost:5173".into());

    let cors = CorsLayer::new()
        .allow_origin(
            frontend_origin.parse::<axum::http::HeaderValue>()
                .unwrap_or(axum::http::HeaderValue::from_static("*"))
        )
        .allow_methods(Any)
        .allow_headers(Any);

    // Router
    let app = Router::new()
        // Public
        .route("/api/register", post(routes::register::register))
        // Admin
        .route("/api/admin/stats",                            get(routes::admin::get_stats))
        .route("/api/admin/registrations",                    get(routes::admin::list_registrations))
        .route("/api/admin/registrations/:id",                get(routes::admin::get_registration))
        .route("/api/admin/registrations/:id/status",         patch(routes::admin::update_status))
        .route("/api/admin/broadcast",                        post(routes::admin::broadcast))
        // Health check
        .route("/health", get(|| async { "ok" }))
        .with_state(state.clone())
        .layer(cors)
        .layer(TraceLayer::new_for_http());

    let port = std::env::var("PORT").unwrap_or_else(|_| "8080".into());
    let addr = format!("0.0.0.0:{port}");
    tracing::info!("Listening on {addr}");

    let listener = tokio::net::TcpListener::bind(&addr).await?;
    axum::serve(listener, app).await?;

    Ok(())
}