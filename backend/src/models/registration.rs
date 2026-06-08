use chrono::{DateTime, Utc};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Debug, Deserialize)]
#[serde(rename_all = "snake_case")]
pub struct TeamMemberInput {
    pub name:   String,
    pub email:  String,
    pub year:   Option<String>,
    pub course: Option<String>,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "snake_case", tag = "role")]
pub enum RegisterRequest {
    #[serde(rename = "hacker")]
    Hacker {
        project_name:       String,
        track:              String,
        problem_statement:  String,
        solution:           String,
        impact:             String,
        team_members:       Vec<TeamMemberInput>,
        leader_name:        String,
        phone:              String,
        university:         String,
        referral:           Option<String>,
        submitted_at:       Option<String>,
    },
    #[serde(rename = "attendee")]
    Attendee {
        first_name:   String,
        last_name:    String,
        email:        String,
        phone:        Option<String>,
        org:          String,
        course:       Option<String>,
        year:         Option<String>,
        reason:       Option<String>,
        submitted_at: Option<String>,
    },
    #[serde(rename = "sponsor")]
    Sponsor {
        org_name:       String,
        website:        Option<String>,
        sector:         String,
        contact_name:   String,
        job_title:      Option<String>,
        email:          String,
        phone:          Option<String>,
        tier:           String,
        message:        Option<String>,
        submitted_at:   Option<String>,
    },
    #[serde(rename = "lecturer")]
    Lecturer {
        first_name:       String,
        last_name:        String,
        email:            String,
        phone:            Option<String>,
        institution:      String,
        department:       Option<String>,
        participant_role: String,
        expertise:        String,
        bio:              Option<String>,
        submitted_at:     Option<String>,
    },
}

#[derive(Debug, Serialize, sqlx::FromRow)]
pub struct RegistrationRow {
    pub id:             Uuid,
    pub role:           String,
    pub status:         String,
    pub submitted_at:   DateTime<Utc>,
    pub follow_up_sent: bool,
    pub follow_up_at:   Option<DateTime<Utc>>,

    pub email:          String,
    pub phone:          Option<String>,

    pub project_name:       Option<String>,
    pub track:              Option<String>,
    pub problem_statement:  Option<String>,
    pub solution:           Option<String>,
    pub impact:             Option<String>,
    pub leader_name:        Option<String>,
    pub university:         Option<String>,
    pub referral:           Option<String>,

    pub first_name:     Option<String>,
    pub last_name:      Option<String>,
    pub org:            Option<String>,
    pub course:         Option<String>,
    pub year_of_study:  Option<String>,
    pub reason:         Option<String>,

    pub org_name:       Option<String>,
    pub website:        Option<String>,
    pub sector:         Option<String>,
    pub contact_name:   Option<String>,
    pub job_title:      Option<String>,
    pub tier:           Option<String>,
    pub message:        Option<String>,

    pub institution:        Option<String>,
    pub department:         Option<String>,
    pub participant_role:   Option<String>,
    pub expertise:          Option<String>,
    pub bio:                Option<String>,
}

#[derive(Debug, Serialize, sqlx::FromRow)]
pub struct TeamMemberRow {
    pub id:              Uuid,
    pub registration_id: Uuid,
    pub name:            String,
    pub email:           String,
    pub year_of_study:   Option<String>,
    pub course:          Option<String>,
    pub member_index:    i32,
}

#[derive(Debug, Serialize)]
pub struct RegisterResponse {
    pub id:      Uuid,
    pub message: String,
}

#[derive(Debug, Serialize)]
pub struct RegistrationWithMembers {
    #[serde(flatten)]
    pub registration: RegistrationRow,
    pub team_members: Vec<TeamMemberRow>,
}

#[derive(Debug, Deserialize)]
pub struct ListQuery {
    pub role:   Option<String>,
    pub status: Option<String>,
    pub page:   Option<i64>,
    pub limit:  Option<i64>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateStatusRequest {
    pub status: String,
}

#[derive(Debug, Deserialize)]
pub struct BroadcastRequest {
    pub subject:     String,
    pub body:        String,
    pub target_role: Option<String>,
    pub target_id:   Option<Uuid>,
}

#[derive(Debug, Serialize)]
pub struct AdminStats {
    pub total:      i64,
    pub hackers:    i64,
    pub attendees:  i64,
    pub sponsors:   i64,
    pub lecturers:  i64,
    pub pending:    i64,
    pub approved:   i64,
    pub rejected:   i64,
}