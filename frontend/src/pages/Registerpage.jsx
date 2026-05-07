import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  Users, Briefcase, GraduationCap, Building2,
  ChevronRight, CheckCircle2, Lock, Plus, Minus,
  AlertCircle, Leaf, HeartPulse, BookOpen, TrendingUp,
  Lightbulb,
} from 'lucide-react'

// ─── CONFIG ──────────────────────────────────────────────────────────
const API_ENDPOINT = '/api/register' // swap in your real endpoint

// ─── ROLES ───────────────────────────────────────────────────────────
const ROLES = [
  { id: 'hacker',   icon: Users,         label: 'Hacker',          sub: 'Compete & build', color: '#3B82F6' },
  { id: 'attendee', icon: GraduationCap, label: 'Attendee',        sub: 'Watch & learn',   color: '#10B981' },
  { id: 'sponsor',  icon: Building2,     label: 'Hack Partner',    sub: 'Sponsor & support', color: '#F59E0B' },
  { id: 'lecturer', icon: Briefcase,     label: 'Lecturer/Mentor', sub: 'Guide & judge',   color: '#8B5CF6' },
]

// ─── TRACKS ──────────────────────────────────────────────────────────
const TRACKS = [
  { value: 'climate',   label: 'Climate-Smart Agriculture', Icon: Leaf,        color: '#10B981' },
  { value: 'health',    label: 'Inclusive Health',          Icon: HeartPulse,  color: '#F43F5E' },
  { value: 'education', label: 'Inclusive Education',       Icon: BookOpen,    color: '#3B82F6' },
  { value: 'economic',  label: 'Economic Empowerment',      Icon: TrendingUp,  color: '#F59E0B' },
]

// ─── COURSES ─────────────────────────────────────────────────────────
const COURSES = [
  { value: 'BIT', label: 'BIT – Bachelor of Information Technology' },
  { value: 'BCS', label: 'BCS – Bachelor of Computer Science' },
  { value: 'DIT', label: 'DIT – Diploma in Information Technology' },
  { value: 'DCS', label: 'DCS – Diploma in Computer Science' },
  { value: 'BRM', label: 'BRM – Bachelor of Records Management' },
  { value: 'BLS', label: 'BLS – Bachelor of Library Science' },
  { value: 'DLS', label: 'DLS – Diploma in Library Science' },
  { value: 'DRM', label: 'DRM – Diploma in Records Management' },
  { value: 'other', label: 'Other' },
]

const YEARS = ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Graduate / Postgrad']

// ─── STYLES ──────────────────────────────────────────────────────────
const css = {
  input: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '8px',
    padding: '11px 14px',
    fontSize: '14px',
    color: '#E8EDF8',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: "'DM Sans', sans-serif",
    transition: 'border-color 0.2s, background 0.2s',
  },
}

// ─── PRIMITIVES ───────────────────────────────────────────────────────
function Field({ label, required, hint, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      {label && (
        <label style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(232,237,248,0.55)', letterSpacing: '0.04em' }}>
          {label}{required && <span style={{ color: '#3B82F6', marginLeft: 2 }}>*</span>}
        </label>
      )}
      {children}
      {hint && !error && <p style={{ fontSize: '11px', color: 'rgba(232,237,248,0.28)', margin: 0 }}>{hint}</p>}
      {error && (
        <p style={{ fontSize: '11px', color: '#F87171', margin: 0, display: 'flex', alignItems: 'center', gap: 4 }}>
          <AlertCircle size={10} /> {error}
        </p>
      )}
    </div>
  )
}

function Input({ type = 'text', value, onChange, placeholder, ...rest }) {
  return (
    <input
      type={type} value={value} onChange={onChange} placeholder={placeholder}
      style={css.input}
      onFocus={e => { e.target.style.borderColor = 'rgba(59,130,246,0.55)'; e.target.style.background = 'rgba(59,130,246,0.06)' }}
      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.04)' }}
      {...rest}
    />
  )
}

function Textarea({ value, onChange, placeholder, rows = 4 }) {
  return (
    <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows}
      style={{ ...css.input, resize: 'vertical', lineHeight: 1.65 }}
      onFocus={e => { e.target.style.borderColor = 'rgba(59,130,246,0.55)'; e.target.style.background = 'rgba(59,130,246,0.06)' }}
      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.04)' }}
    />
  )
}

function Select({ value, onChange, children }) {
  return (
    <>
      <style>{`
        select option {
          background-color: #1a1a2e;
          color: #E8EDF8;
          padding: 8px;
        }
        select option:checked {
          background: linear-gradient(#3B82F6, #3B82F6);
          background-color: #3B82F6;
          color: white;
        }
      `}</style>
      <select value={value} onChange={onChange}
        style={{ ...css.input, cursor: 'pointer' }}
        onFocus={e => { e.target.style.borderColor = 'rgba(59,130,246,0.55)'; e.target.style.background = 'rgba(59,130,246,0.06)' }}
        onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.1)'; e.target.style.background = 'rgba(255,255,255,0.04)' }}
      >
        {children}
      </select>
    </>
  )
}

function SectionHeading({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '32px 0 20px' }}>
      <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
      <p style={{ margin: 0, fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(232,237,248,0.3)', whiteSpace: 'nowrap' }}>
        {children}
      </p>
      <span style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
    </div>
  )
}

function Grid2({ children }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
      {children}
    </div>
  )
}

// ─── TRACK SELECTOR ───────────────────────────────────────────────────
function TrackSelector({ value, onChange, error }) {
  return (
    <Field label="Challenge Track" required error={error}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10, marginTop: 2 }}>
        {TRACKS.map(t => {
          const active = value === t.value
          return (
            <button key={t.value} type="button"
              onClick={() => onChange(t.value)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '11px 14px', borderRadius: 9, cursor: 'pointer', textAlign: 'left',
                border: active ? `1.5px solid ${t.color}` : '1px solid rgba(255,255,255,0.08)',
                background: active ? `${t.color}18` : 'rgba(255,255,255,0.03)',
                transition: 'all 0.18s',
              }}
            >
              <t.Icon size={16} color={active ? t.color : 'rgba(232,237,248,0.3)'} />
              <span style={{ fontSize: 13, fontWeight: active ? 600 : 400, color: active ? t.color : 'rgba(232,237,248,0.5)', lineHeight: 1.3 }}>
                {t.label}
              </span>
            </button>
          )
        })}
      </div>
    </Field>
  )
}

// ─── TEAM MEMBER ROW ─────────────────────────────────────────────────
function TeamMemberRow({ index, member, onChange, onRemove, canRemove }) {
  return (
    <div style={{
      padding: '16px', borderRadius: 10,
      border: '1px solid rgba(255,255,255,0.07)',
      background: 'rgba(255,255,255,0.025)',
      display: 'flex', flexDirection: 'column', gap: 12,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 700, color: 'rgba(232,237,248,0.3)', fontFamily: 'monospace', letterSpacing: '0.1em' }}>
          MEMBER {String(index + 1).padStart(2, '0')}
        </span>
        {canRemove && (
          <button type="button" onClick={() => onRemove(index)}
            style={{ background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 6, padding: '5px 8px', cursor: 'pointer', color: '#F87171', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11 }}>
            <Minus size={11} /> Remove
          </button>
        )}
      </div>
      <Grid2>
        <Field label="Full Name" required>
          <Input value={member.name} onChange={e => onChange(index, 'name', e.target.value)} placeholder="Full name" />
        </Field>
        <Field label="Email Address" required>
          <Input type="email" value={member.email} onChange={e => onChange(index, 'email', e.target.value)} placeholder="Email address" />
        </Field>
        <Field label="Year of Study" required>
          <Select value={member.year || ''} onChange={e => onChange(index, 'year', e.target.value)}>
            <option value="">— Year —</option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
          </Select>
        </Field>
        <Field label="Course" required>
          <Select value={member.course || ''} onChange={e => onChange(index, 'course', e.target.value)}>
            <option value="">— Course —</option>
            {COURSES.map(c => <option key={c.value} value={c.value}>{c.value}</option>)}
          </Select>
        </Field>
      </Grid2>
    </div>
  )
}

// ─── HACKER FORM ─────────────────────────────────────────────────────
function HackerForm({ data, setData, errors }) {
  const updateMember = (i, field, val) => {
    const members = [...data.teamMembers]
    members[i] = { ...members[i], [field]: val }
    setData({ ...data, teamMembers: members })
  }
  const addMember = () => {
    if (data.teamMembers.length < 4)
      setData({ ...data, teamMembers: [...data.teamMembers, { name: '', email: '', year: '', course: '' }] })
  }
  const removeMember = i => setData({ ...data, teamMembers: data.teamMembers.filter((_, idx) => idx !== i) })

  return (
    <div>
      <SectionHeading>Project Details</SectionHeading>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Field label="Project Name" required error={errors.projectName}>
          <Input value={data.projectName} onChange={e => setData({ ...data, projectName: e.target.value })} placeholder="e.g. AgroSense AI" />
        </Field>

        <TrackSelector value={data.track} onChange={v => setData({ ...data, track: v })} error={errors.track} />

        <Field label="Problem Statement" required hint="Describe the specific problem your project addresses (50–300 words)" error={errors.problemStatement}>
          <Textarea value={data.problemStatement} onChange={e => setData({ ...data, problemStatement: e.target.value })}
            placeholder="What problem are you solving? Who is affected? Why does it matter?" rows={4} />
        </Field>

        <Field label="Proposed Solution" required hint="How does your project solve this problem?" error={errors.solution}>
          <Textarea value={data.solution} onChange={e => setData({ ...data, solution: e.target.value })}
            placeholder="Describe your solution, the technology you'll use, and how it addresses the problem." rows={4} />
        </Field>

        <Field label="Community Impact" required hint="How will your solution benefit communities in Uganda?" error={errors.impact}>
          <Textarea value={data.impact} onChange={e => setData({ ...data, impact: e.target.value })}
            placeholder="Describe the expected impact and who will benefit most." rows={3} />
        </Field>
      </div>

      <SectionHeading>Team Members — {data.teamMembers.length}/4</SectionHeading>
      {errors.teamMembers && (
        <p style={{ fontSize: 12, color: '#F87171', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 5 }}>
          <AlertCircle size={12} /> {errors.teamMembers}
        </p>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {data.teamMembers.map((m, i) => (
          <TeamMemberRow key={i} index={i} member={m} onChange={updateMember} onRemove={removeMember} canRemove={i > 0} />
        ))}
        {data.teamMembers.length < 4 && (
          <button type="button" onClick={addMember}
            style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(59,130,246,0.07)', border: '1px dashed rgba(59,130,246,0.3)', borderRadius: 9, padding: '11px 16px', color: '#3B82F6', fontSize: 13, fontWeight: 600, cursor: 'pointer', width: 'fit-content' }}>
            <Plus size={14} /> Add Team Member
          </button>
        )}
      </div>

      <SectionHeading>Team Leader Contact</SectionHeading>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Grid2>
          <Field label="Full Name" required error={errors.leaderName}>
            <Input value={data.leaderName} onChange={e => setData({ ...data, leaderName: e.target.value })} placeholder="Your full name" />
          </Field>
          <Field label="Phone Number" required error={errors.phone}>
            <Input value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} placeholder="+256 700 000000" />
          </Field>
        </Grid2>
        <Grid2>
          <Field label="University / Institution" required error={errors.university}>
            <Input value={data.university} onChange={e => setData({ ...data, university: e.target.value })} placeholder="e.g. Kabale University" />
          </Field>
          <Field label="How did you hear about us?" hint="Optional">
            <Select value={data.referral} onChange={e => setData({ ...data, referral: e.target.value })}>
              <option value="">— Select —</option>
              <option value="social">Social media</option>
              <option value="friend">Friend / colleague</option>
              <option value="university">University notice board</option>
              <option value="lecturer">Lecturer / staff</option>
              <option value="other">Other</option>
            </Select>
          </Field>
        </Grid2>
      </div>
    </div>
  )
}

// ─── ATTENDEE FORM ───────────────────────────────────────────────────
function AttendeeForm({ data, setData, errors }) {
  return (
    <div>
      <SectionHeading>Personal Information</SectionHeading>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Grid2>
          <Field label="First Name" required error={errors.firstName}>
            <Input value={data.firstName} onChange={e => setData({ ...data, firstName: e.target.value })} placeholder="First name" />
          </Field>
          <Field label="Last Name" required error={errors.lastName}>
            <Input value={data.lastName} onChange={e => setData({ ...data, lastName: e.target.value })} placeholder="Last name" />
          </Field>
        </Grid2>
        <Grid2>
          <Field label="Email Address" required error={errors.email}>
            <Input type="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} placeholder="you@example.com" />
          </Field>
          <Field label="Phone Number" error={errors.phone}>
            <Input value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} placeholder="+256 700 000000" />
          </Field>
        </Grid2>
        <Grid2>
          <Field label="University / Organisation" required error={errors.org}>
            <Input value={data.org} onChange={e => setData({ ...data, org: e.target.value })} placeholder="Your university or workplace" />
          </Field>
          <Field label="Course" error={errors.course}>
            <Select value={data.course} onChange={e => setData({ ...data, course: e.target.value })}>
              <option value="">— Select course —</option>
              {COURSES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </Select>
          </Field>
        </Grid2>
        <Field label="Year of Study / Role" error={errors.year}>
          <Select value={data.year} onChange={e => setData({ ...data, year: e.target.value })}>
            <option value="">— Select —</option>
            {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            <option value="professional">Working Professional</option>
            <option value="other">Other</option>
          </Select>
        </Field>
        <Field label="Why do you want to attend?" hint="Optional — helps us plan sessions">
          <Textarea value={data.reason} onChange={e => setData({ ...data, reason: e.target.value })}
            placeholder="What do you hope to learn or gain from FoCLIS Hackathon?" rows={3} />
        </Field>
      </div>
    </div>
  )
}

// ─── SPONSOR FORM ────────────────────────────────────────────────────
function SponsorForm({ data, setData, errors }) {
  return (
    <div>
      <SectionHeading>Organisation Details</SectionHeading>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Grid2>
          <Field label="Organisation Name" required error={errors.orgName}>
            <Input value={data.orgName} onChange={e => setData({ ...data, orgName: e.target.value })} placeholder="e.g. Acme Technologies Ltd" />
          </Field>
          <Field label="Organisation Website" error={errors.website}>
            <Input value={data.website} onChange={e => setData({ ...data, website: e.target.value })} placeholder="https://yourorg.com" />
          </Field>
        </Grid2>
        <Field label="Sector / Industry" required error={errors.sector}>
          <Select value={data.sector} onChange={e => setData({ ...data, sector: e.target.value })}>
            <option value="">— Select —</option>
            <option value="tech">Technology</option>
            <option value="finance">Finance / Banking</option>
            <option value="health">Healthcare</option>
            <option value="agri">Agriculture</option>
            <option value="education">Education</option>
            <option value="ngo">NGO / Nonprofit</option>
            <option value="govt">Government</option>
            <option value="other">Other</option>
          </Select>
        </Field>
      </div>

      <SectionHeading>Contact Person</SectionHeading>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Grid2>
          <Field label="Full Name" required error={errors.contactName}>
            <Input value={data.contactName} onChange={e => setData({ ...data, contactName: e.target.value })} placeholder="Contact person name" />
          </Field>
          <Field label="Job Title" error={errors.jobTitle}>
            <Input value={data.jobTitle} onChange={e => setData({ ...data, jobTitle: e.target.value })} placeholder="e.g. Partnerships Manager" />
          </Field>
        </Grid2>
        <Grid2>
          <Field label="Email Address" required error={errors.email}>
            <Input type="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} placeholder="contact@yourorg.com" />
          </Field>
          <Field label="Phone Number" error={errors.phone}>
            <Input value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} placeholder="+256 700 000000" />
          </Field>
        </Grid2>
        <Field label="Sponsorship Interest" required error={errors.tier}>
          <Select value={data.tier} onChange={e => setData({ ...data, tier: e.target.value })}>
            <option value="">— Select sponsorship tier —</option>
            <option value="gold">Gold Partner</option>
            <option value="silver">Silver Partner</option>
            <option value="bronze">Bronze Partner</option>
            <option value="custom">Custom / In-kind support</option>
          </Select>
        </Field>
        <Field label="Message / Special Requests" hint="Optional">
          <Textarea value={data.message} onChange={e => setData({ ...data, message: e.target.value })}
            placeholder="Any questions, custom requests, or ideas for collaboration?" rows={3} />
        </Field>
      </div>
    </div>
  )
}

// ─── LECTURER FORM ───────────────────────────────────────────────────
function LecturerForm({ data, setData, errors }) {
  return (
    <div>
      <SectionHeading>Personal Information</SectionHeading>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Grid2>
          <Field label="First Name" required error={errors.firstName}>
            <Input value={data.firstName} onChange={e => setData({ ...data, firstName: e.target.value })} placeholder="First name" />
          </Field>
          <Field label="Last Name" required error={errors.lastName}>
            <Input value={data.lastName} onChange={e => setData({ ...data, lastName: e.target.value })} placeholder="Last name" />
          </Field>
        </Grid2>
        <Grid2>
          <Field label="Email Address" required error={errors.email}>
            <Input type="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} placeholder="you@institution.ac.ug" />
          </Field>
          <Field label="Phone Number" error={errors.phone}>
            <Input value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} placeholder="+256 700 000000" />
          </Field>
        </Grid2>
        <Grid2>
          <Field label="Institution / Organisation" required error={errors.institution}>
            <Input value={data.institution} onChange={e => setData({ ...data, institution: e.target.value })} placeholder="e.g. Kabale University" />
          </Field>
          <Field label="Department / Faculty" error={errors.department}>
            <Input value={data.department} onChange={e => setData({ ...data, department: e.target.value })} placeholder="e.g. Faculty of Computing & IS" />
          </Field>
        </Grid2>
        <Grid2>
          <Field label="Role" required error={errors.role}>
            <Select value={data.role} onChange={e => setData({ ...data, role: e.target.value })}>
              <option value="">— Select your role —</option>
              <option value="judge">Judge</option>
              <option value="mentor">Mentor / Coach</option>
              <option value="speaker">Speaker</option>
              <option value="volunteer">Volunteer Organizer</option>
              <option value="both">Mentor + Judge</option>
            </Select>
          </Field>
          <Field label="Area of Expertise" required error={errors.expertise}>
            <Select value={data.expertise} onChange={e => setData({ ...data, expertise: e.target.value })}>
              <option value="">— Select —</option>
              <option value="ai_ml">AI & Machine Learning</option>
              <option value="web">Web / Mobile Development</option>
              <option value="agri">AgriTech</option>
              <option value="health">HealthTech</option>
              <option value="fintech">Fintech</option>
              <option value="edtech">EdTech</option>
              <option value="business">Business & Entrepreneurship</option>
              <option value="other">Other</option>
            </Select>
          </Field>
        </Grid2>
        <Field label="Brief Bio" hint="Will appear on the website if selected as a speaker or judge">
          <Textarea value={data.bio} onChange={e => setData({ ...data, bio: e.target.value })}
            placeholder="Short professional bio (2–3 sentences)" rows={3} />
        </Field>
      </div>
    </div>
  )
}

// ─── DEFAULT DATA ────────────────────────────────────────────────────
const defaultData = {
  hacker: {
    projectName: '', track: '', problemStatement: '', solution: '', impact: '',
    teamMembers: [{ name: '', email: '', year: '', course: '' }],
    leaderName: '', phone: '', university: '', referral: '',
  },
  attendee: { firstName: '', lastName: '', email: '', phone: '', org: '', course: '', year: '', reason: '' },
  sponsor: { orgName: '', website: '', sector: '', contactName: '', jobTitle: '', email: '', phone: '', tier: '', message: '' },
  lecturer: { firstName: '', lastName: '', email: '', phone: '', institution: '', department: '', role: '', expertise: '', bio: '' },
}

// ─── VALIDATION ──────────────────────────────────────────────────────
function validate(role, data) {
  const e = {}
  if (role === 'hacker') {
    if (!data.projectName.trim()) e.projectName = 'Project name is required'
    if (!data.track) e.track = 'Please select a challenge track'
    if (!data.problemStatement.trim()) e.problemStatement = 'Problem statement is required'
    else if (data.problemStatement.trim().split(/\s+/).length < 10) e.problemStatement = 'Please write at least 10 words'
    if (!data.solution.trim()) e.solution = 'Proposed solution is required'
    if (!data.impact.trim()) e.impact = 'Community impact is required'
    if (!data.leaderName.trim()) e.leaderName = 'Team leader name is required'
    if (!data.phone.trim()) e.phone = 'Phone number is required'
    if (!data.university.trim()) e.university = 'Institution is required'
    if (data.teamMembers.length > 4) e.teamMembers = 'Maximum 4 team members allowed'
  }
  if (role === 'attendee') {
    if (!data.firstName.trim()) e.firstName = 'Required'
    if (!data.lastName.trim()) e.lastName = 'Required'
    if (!data.email.trim()) e.email = 'Email is required'
    if (!data.org.trim()) e.org = 'Institution is required'
  }
  if (role === 'sponsor') {
    if (!data.orgName.trim()) e.orgName = 'Organisation name is required'
    if (!data.sector) e.sector = 'Please select a sector'
    if (!data.contactName.trim()) e.contactName = 'Contact name is required'
    if (!data.email.trim()) e.email = 'Email is required'
    if (!data.tier) e.tier = 'Please select a sponsorship tier'
  }
  if (role === 'lecturer') {
    if (!data.firstName.trim()) e.firstName = 'Required'
    if (!data.lastName.trim()) e.lastName = 'Required'
    if (!data.email.trim()) e.email = 'Email is required'
    if (!data.institution.trim()) e.institution = 'Institution is required'
    if (!data.role) e.role = 'Please select your role'
    if (!data.expertise) e.expertise = 'Please select your expertise'
  }
  return e
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────
export default function RegisterPage() {
  const [activeRole, setActiveRole] = useState('hacker')
  const [formData, setFormData] = useState(defaultData)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | closed | error

  const role = ROLES.find(r => r.id === activeRole)
  const data = formData[activeRole]
  const setData = d => setFormData({ ...formData, [activeRole]: d })

  const handleSubmit = async () => {
    const errs = validate(activeRole, data)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setStatus('submitting')

    try {
      const res = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: activeRole, ...data, submittedAt: new Date().toISOString() }),
      })

      if (!res.ok) throw new Error('Server error')
      setStatus('success')
    } catch {
      // Backend not yet connected — show closed screen
      // Change setStatus('closed') → setStatus('success') once backend is live
      setTimeout(() => setStatus('closed'), 500)
    }
  }

  if (status === 'success') return <SuccessScreen role={role} />
  if (status === 'closed') return <ClosedScreen />

  return (
    <>
      <Navbar />
      <main style={{
        minHeight: '100vh',
        background: 'linear-gradient(175deg, #050A18 0%, #080E20 50%, #060C1A 100%)',
        paddingTop: '88px',
        paddingBottom: '80px',
      }}>
        {/* Dot grid background */}
        <div style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }} />
        {/* Glow blobs */}
        <div style={{ position: 'fixed', top: '10%', left: '5%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />
        <div style={{ position: 'fixed', bottom: '10%', right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 1 }}>

          {/* ─ Page Header ─ */}
          <div style={{ marginBottom: '44px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3B82F6', margin: '0 0 10px' }}>
              FoCLIS Hackathon 2026
            </p>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 800, color: '#E8EDF8', margin: '0 0 10px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
              Register for the Hackathon
            </h1>
            <p style={{ fontSize: '15px', color: 'rgba(232,237,248,0.4)', margin: 0 }}>
              Choose your participation role and complete the form below.
            </p>
          </div>

          {/* ─ Role Tabs ─ */}
          <div style={{
            display: 'flex', gap: 6,
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            marginBottom: '40px', flexWrap: 'wrap',
          }}>
            {ROLES.map(r => {
              const Icon = r.icon
              const isActive = activeRole === r.id
              return (
                <button key={r.id}
                  onClick={() => { setActiveRole(r.id); setErrors({}) }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px',
                    borderRadius: '8px 8px 0 0',
                    border: 'none',
                    borderBottom: isActive ? `2px solid ${r.color}` : '2px solid transparent',
                    background: isActive ? `${r.color}12` : 'transparent',
                    cursor: 'pointer', marginBottom: -1,
                    transition: 'all 0.18s',
                  }}
                >
                  <Icon size={15} color={isActive ? r.color : 'rgba(232,237,248,0.3)'} />
                  <span style={{ fontSize: 13, fontWeight: isActive ? 700 : 500, color: isActive ? r.color : 'rgba(232,237,248,0.4)', whiteSpace: 'nowrap' }}>
                    {r.label}
                  </span>
                </button>
              )
            })}
          </div>

          {/* ─ Form Body ─ */}
          {activeRole === 'hacker'   && <HackerForm   data={data} setData={setData} errors={errors} />}
          {activeRole === 'attendee' && <AttendeeForm  data={data} setData={setData} errors={errors} />}
          {activeRole === 'sponsor'  && <SponsorForm   data={data} setData={setData} errors={errors} />}
          {activeRole === 'lecturer' && <LecturerForm  data={data} setData={setData} errors={errors} />}

          {/* ─ Submit ─ */}
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 14 }}>
            <button
              onClick={handleSubmit}
              disabled={status === 'submitting'}
              style={{
                padding: '13px 32px',
                background: role.color,
                color: '#fff', border: 'none',
                borderRadius: '9px',
                fontSize: '15px', fontWeight: 700,
                cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                opacity: status === 'submitting' ? 0.7 : 1,
                display: 'flex', alignItems: 'center', gap: 8,
                transition: 'opacity 0.2s, transform 0.15s',
                fontFamily: "'Syne', sans-serif",
                letterSpacing: '0.01em',
              }}
              onMouseEnter={e => { if (status !== 'submitting') e.target.style.transform = 'translateY(-1px)' }}
              onMouseLeave={e => { e.target.style.transform = 'none' }}
            >
              {status === 'submitting' ? 'Submitting…' : <> Submit Application <ChevronRight size={16} /> </>}
            </button>
            <p style={{ fontSize: '11px', color: 'rgba(232,237,248,0.2)', margin: 0 }}>
              Fields marked <span style={{ color: '#3B82F6' }}>*</span> are required · Your data is secure and used only for FoCLIS Hackathon 2026
            </p>
          </div>

        </div>
      </main>
      <Footer />
    </>
  )
}

// ─── REGISTRATION CLOSED ─────────────────────────────────────────────
function ClosedScreen() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#050A18', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
        <div style={{ textAlign: 'center', padding: '0 24px', maxWidth: '440px' }}>
          <div style={{ width: 60, height: 60, borderRadius: 14, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Lock size={26} color="#3B82F6" />
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: '#E8EDF8', margin: '0 0 10px' }}>
            Registration Not Open Yet
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(232,237,248,0.45)', margin: '0 0 6px' }}>
            Applications open on <strong style={{ color: '#F59E0B' }}>June 6, 2026</strong>.
          </p>
          <p style={{ fontSize: 13, color: 'rgba(232,237,248,0.28)', margin: '0 0 28px' }}>
            Follow us on social media or check back closer to the date.
          </p>
          <a href="/" style={{ padding: '11px 26px', background: '#3B82F6', color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
            Back to Home
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}

// ─── SUCCESS ─────────────────────────────────────────────────────────
function SuccessScreen({ role }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#050A18', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
        <div style={{ textAlign: 'center', padding: '0 24px', maxWidth: '440px' }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <CheckCircle2 size={28} color="#10B981" />
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 28, fontWeight: 800, color: '#E8EDF8', margin: '0 0 10px' }}>
            Application Submitted!
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(232,237,248,0.45)', margin: '0 0 28px' }}>
            Thanks for registering as a <strong style={{ color: role.color }}>{role.label}</strong>. We'll be in touch via email soon.
          </p>
          <a href="/" style={{ padding: '11px 26px', background: '#3B82F6', color: '#fff', borderRadius: 8, textDecoration: 'none', fontSize: 13, fontWeight: 700 }}>
            Back to Home
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}