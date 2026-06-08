CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE registrations (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    role                VARCHAR(20) NOT NULL CHECK (role IN ('hacker','attendee','sponsor','lecturer')),
    status              VARCHAR(20) NOT NULL DEFAULT 'pending',
    submitted_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    follow_up_sent      BOOLEAN NOT NULL DEFAULT FALSE,
    follow_up_at        TIMESTAMPTZ,

    email               VARCHAR(255) NOT NULL,
    phone               VARCHAR(50),

    project_name        TEXT,
    track               TEXT,
    problem_statement   TEXT,
    solution            TEXT,
    impact              TEXT,
    leader_name         TEXT,
    university          TEXT,
    referral            TEXT,

    first_name          TEXT,
    last_name           TEXT,
    org                 TEXT,
    course              TEXT,
    year_of_study       TEXT,
    reason              TEXT,

    org_name            TEXT,
    website             TEXT,
    sector              TEXT,
    contact_name        TEXT,
    job_title           TEXT,
    tier                TEXT,
    message             TEXT,

    institution         TEXT,
    department          TEXT,
    participant_role    TEXT,
    expertise           TEXT,
    bio                 TEXT
);

CREATE TABLE team_members (
    id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    registration_id     UUID NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
    name                TEXT NOT NULL,
    email               TEXT NOT NULL,
    year_of_study       TEXT,
    course              TEXT,
    member_index        INT NOT NULL DEFAULT 0
);

CREATE INDEX idx_reg_role   ON registrations(role);
CREATE INDEX idx_reg_status ON registrations(status);
CREATE INDEX idx_reg_followup ON registrations(follow_up_sent, submitted_at);
CREATE INDEX idx_tm_reg_id  ON team_members(registration_id);
