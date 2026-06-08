use sqlx::PgPool;
use uuid::Uuid;
use chrono::Utc;
use anyhow::Result;

use crate::models::*;

// ─── INSERT ───────────────────────────────────────────────────────────

pub async fn insert_hacker(
    pool: &PgPool,
    project_name: &str,
    track: &str,
    problem_statement: &str,
    solution: &str,
    impact: &str,
    leader_name: &str,
    email: &str,
    phone: &str,
    university: &str,
    referral: Option<&str>,
) -> Result<Uuid> {
    let row = sqlx::query!(
        r#"
        INSERT INTO registrations
            (role, email, phone, project_name, track, problem_statement,
             solution, impact, leader_name, university, referral)
        VALUES
            ('hacker', $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id
        "#,
        email, phone, project_name, track, problem_statement,
        solution, impact, leader_name, university, referral,
    )
    .fetch_one(pool)
    .await?;
    Ok(row.id)
}

pub async fn insert_team_members(
    pool: &PgPool,
    registration_id: Uuid,
    members: &[TeamMemberInput],
) -> Result<()> {
    for (i, m) in members.iter().enumerate() {
        sqlx::query!(
            r#"
            INSERT INTO team_members
                (registration_id, name, email, year_of_study, course, member_index)
            VALUES ($1, $2, $3, $4, $5, $6)
            "#,
            registration_id,
            m.name,
            m.email,
            m.year.as_deref(),
            m.course.as_deref(),
            i as i32,
        )
        .execute(pool)
        .await?;
    }
    Ok(())
}

pub async fn insert_attendee(
    pool: &PgPool,
    first_name: &str,
    last_name: &str,
    email: &str,
    phone: Option<&str>,
    org: &str,
    course: Option<&str>,
    year: Option<&str>,
    reason: Option<&str>,
) -> Result<Uuid> {
    let row = sqlx::query!(
        r#"
        INSERT INTO registrations
            (role, email, phone, first_name, last_name, org, course, year_of_study, reason)
        VALUES
            ('attendee', $1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING id
        "#,
        email, phone, first_name, last_name, org, course, year, reason,
    )
    .fetch_one(pool)
    .await?;
    Ok(row.id)
}

pub async fn insert_sponsor(
    pool: &PgPool,
    org_name: &str,
    website: Option<&str>,
    sector: &str,
    contact_name: &str,
    job_title: Option<&str>,
    email: &str,
    phone: Option<&str>,
    tier: &str,
    message: Option<&str>,
) -> Result<Uuid> {
    let row = sqlx::query!(
        r#"
        INSERT INTO registrations
            (role, email, phone, org_name, website, sector,
             contact_name, job_title, tier, message)
        VALUES
            ('sponsor', $1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id
        "#,
        email, phone, org_name, website, sector,
        contact_name, job_title, tier, message,
    )
    .fetch_one(pool)
    .await?;
    Ok(row.id)
}

pub async fn insert_lecturer(
    pool: &PgPool,
    first_name: &str,
    last_name: &str,
    email: &str,
    phone: Option<&str>,
    institution: &str,
    department: Option<&str>,
    role: &str,
    expertise: &str,
    bio: Option<&str>,
) -> Result<Uuid> {
    let row = sqlx::query!(
        r#"
        INSERT INTO registrations
            (role, email, phone, first_name, last_name, institution,
             department, participant_role, expertise, bio)
        VALUES
            ('lecturer', $1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id
        "#,
        email, phone, first_name, last_name, institution,
        department, role, expertise, bio,
    )
    .fetch_one(pool)
    .await?;
    Ok(row.id)
}

// ─── READ ─────────────────────────────────────────────────────────────

pub async fn get_registration(pool: &PgPool, id: Uuid) -> Result<Option<RegistrationRow>> {
    let row = sqlx::query_as!(
        RegistrationRow,
        "SELECT * FROM registrations WHERE id = $1",
        id
    )
    .fetch_optional(pool)
    .await?;
    Ok(row)
}

pub async fn get_team_members(pool: &PgPool, registration_id: Uuid) -> Result<Vec<TeamMemberRow>> {
    let rows = sqlx::query_as!(
        TeamMemberRow,
        "SELECT * FROM team_members WHERE registration_id = $1 ORDER BY member_index",
        registration_id
    )
    .fetch_all(pool)
    .await?;
    Ok(rows)
}

pub async fn list_registrations(
    pool: &PgPool,
    role: Option<&str>,
    status: Option<&str>,
    limit: i64,
    offset: i64,
) -> Result<Vec<RegistrationRow>> {
    // Dynamic filtering with optional role/status
    let rows = sqlx::query_as!(
        RegistrationRow,
        r#"
        SELECT * FROM registrations
        WHERE ($1::text IS NULL OR role = $1)
          AND ($2::text IS NULL OR status = $2)
        ORDER BY submitted_at DESC
        LIMIT $3 OFFSET $4
        "#,
        role, status, limit, offset
    )
    .fetch_all(pool)
    .await?;
    Ok(rows)
}

pub async fn get_stats(pool: &PgPool) -> Result<AdminStats> {
    let row = sqlx::query!(
        r#"
        SELECT
            COUNT(*)                                        AS total,
            COUNT(*) FILTER (WHERE role = 'hacker')        AS hackers,
            COUNT(*) FILTER (WHERE role = 'attendee')      AS attendees,
            COUNT(*) FILTER (WHERE role = 'sponsor')       AS sponsors,
            COUNT(*) FILTER (WHERE role = 'lecturer')      AS lecturers,
            COUNT(*) FILTER (WHERE status = 'pending')     AS pending,
            COUNT(*) FILTER (WHERE status = 'approved')    AS approved,
            COUNT(*) FILTER (WHERE status = 'rejected')    AS rejected
        FROM registrations
        "#
    )
    .fetch_one(pool)
    .await?;

    Ok(AdminStats {
        total:     row.total.unwrap_or(0),
        hackers:   row.hackers.unwrap_or(0),
        attendees: row.attendees.unwrap_or(0),
        sponsors:  row.sponsors.unwrap_or(0),
        lecturers: row.lecturers.unwrap_or(0),
        pending:   row.pending.unwrap_or(0),
        approved:  row.approved.unwrap_or(0),
        rejected:  row.rejected.unwrap_or(0),
    })
}

// ─── UPDATE ───────────────────────────────────────────────────────────

pub async fn update_status(pool: &PgPool, id: Uuid, status: &str) -> Result<()> {
    sqlx::query!(
        "UPDATE registrations SET status = $1 WHERE id = $2",
        status, id
    )
    .execute(pool)
    .await?;
    Ok(())
}

pub async fn mark_follow_up_sent(pool: &PgPool, id: Uuid) -> Result<()> {
    sqlx::query!(
        "UPDATE registrations SET follow_up_sent = TRUE, follow_up_at = $1 WHERE id = $2",
        Utc::now(), id
    )
    .execute(pool)
    .await?;
    Ok(())
}

// ─── JOBS — fetch pending follow-ups ──────────────────────────────────

pub async fn get_pending_follow_ups(pool: &PgPool) -> Result<Vec<RegistrationRow>> {
    // Anyone submitted more than 24h ago who hasn't had a follow-up yet
    let rows = sqlx::query_as!(
        RegistrationRow,
        r#"
        SELECT * FROM registrations
        WHERE follow_up_sent = FALSE
          AND submitted_at <= NOW() - INTERVAL '24 hours'
        ORDER BY submitted_at ASC
        LIMIT 100
        "#
    )
    .fetch_all(pool)
    .await?;
    Ok(rows)
}

// ─── EMAILS FOR BROADCAST ─────────────────────────────────────────────

pub async fn get_emails_by_role(pool: &PgPool, role: Option<&str>) -> Result<Vec<String>> {
    let rows: Vec<_> = sqlx::query!(
        r#"
        SELECT DISTINCT email FROM registrations
        WHERE ($1::text IS NULL OR role = $1)
          AND status != 'rejected'
        "#,
        role
    )
    .fetch_all(pool)
    .await?;

    // Also grab team member emails for hacker registrations
    let mut emails: Vec<String> = rows.into_iter().map(|r| r.email).collect();

    if role.is_none() || role == Some("hacker") {
        let member_emails = sqlx::query!(
            r#"
            SELECT DISTINCT tm.email
            FROM team_members tm
            JOIN registrations r ON r.id = tm.registration_id
            WHERE r.status != 'rejected'
            "#
        )
        .fetch_all(pool)
        .await?;

        for r in member_emails {
            if !emails.contains(&r.email) {
                emails.push(r.email);
            }
        }
    }

    Ok(emails)
}