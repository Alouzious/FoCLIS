import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  Users, Briefcase, GraduationCap, Building2,
  ChevronRight, CheckCircle2, AlertCircle, Plus, Minus, Lock
} from 'lucide-react'

// ─── Role definitions ───────────────────────────────────────────────
const ROLES = [
  {
    id: 'hacker',
    icon: Users,
    label: 'Hacker',
    sub: 'Compete & build a solution',
    color: '#1A6BFF',
    colorBg: 'rgba(26,107,255,0.08)',
    colorBorder: 'rgba(26,107,255,0.25)',
  },
  {
    id: 'attendee',
    icon: GraduationCap,
    label: 'Attendee',
    sub: 'Watch, learn & network',
    color: '#22C55E',
    colorBg: 'rgba(34,197,94,0.08)',
    colorBorder: 'rgba(34,197,94,0.25)',
  },
  {
    id: 'sponsor',
    icon: Building2,
    label: 'Hack Partner',
    sub: 'Sponsor & support innovation',
    color: '#F59E0B',
    colorBg: 'rgba(245,158,11,0.08)',
    colorBorder: 'rgba(245,158,11,0.25)',
  },
  {
    id: 'lecturer',
    icon: Briefcase,
    label: 'Lecturer / Mentor',
    sub: 'Guide & judge teams',
    color: '#A855F7',
    colorBg: 'rgba(168,85,247,0.08)',
    colorBorder: 'rgba(168,85,247,0.25)',
  },
]

// ─── Shared field component ──────────────────────────────────────────
function Field({ label, required, hint, error, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(240,244,255,0.7)', letterSpacing: '0.04em' }}>
        {label} {required && <span style={{ color: '#1A6BFF' }}>*</span>}
      </label>
      {children}
      {hint && !error && <p style={{ fontSize: '11px', color: 'rgba(240,244,255,0.3)', margin: 0 }}>{hint}</p>}
      {error && (
        <p style={{ fontSize: '11px', color: '#F87171', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  )
}

const inputStyle = {
  background: 'rgba(10,25,60,0.6)',
  border: '1px solid rgba(26,107,255,0.18)',
  borderRadius: '8px',
  padding: '10px 14px',
  fontSize: '14px',
  color: '#F0F4FF',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
  fontFamily: "'DM Sans', sans-serif",
}

function Input({ value, onChange, placeholder, type = 'text', maxLength, ...rest }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      maxLength={maxLength}
      style={inputStyle}
      onFocus={e => e.target.style.borderColor = 'rgba(26,107,255,0.5)'}
      onBlur={e => e.target.style.borderColor = 'rgba(26,107,255,0.18)'}
      {...rest}
    />
  )
}

function Textarea({ value, onChange, placeholder, rows = 3 }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
      onFocus={e => e.target.style.borderColor = 'rgba(26,107,255,0.5)'}
      onBlur={e => e.target.style.borderColor = 'rgba(26,107,255,0.18)'}
    />
  )
}

function Select({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={onChange}
      style={{ ...inputStyle, cursor: 'pointer' }}
      onFocus={e => e.target.style.borderColor = 'rgba(26,107,255,0.5)'}
      onBlur={e => e.target.style.borderColor = 'rgba(26,107,255,0.18)'}
    >
      {children}
    </select>
  )
}

// ─── Team member row ─────────────────────────────────────────────────
function TeamMemberRow({ index, member, onChange, onRemove, canRemove }) {
  return (
    <div style={{
      background: 'rgba(26,107,255,0.04)',
      border: '1px solid rgba(26,107,255,0.12)',
      borderRadius: '10px',
      padding: '14px',
      display: 'flex',
      gap: '10px',
      alignItems: 'flex-start',
    }}>
      <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(240,244,255,0.3)', paddingTop: '10px', minWidth: '20px', textAlign: 'center', fontFamily: 'monospace' }}>
        {String(index + 1).padStart(2, '0')}
      </span>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        <Input
          value={member.name}
          onChange={e => onChange(index, 'name', e.target.value)}
          placeholder="Full name"
        />
        <Input
          type="email"
          value={member.email}
          onChange={e => onChange(index, 'email', e.target.value)}
          placeholder="Email address"
        />
      </div>
      {canRemove && (
        <button
          type="button"
          onClick={() => onRemove(index)}
          style={{ background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: '7px', padding: '8px', cursor: 'pointer', color: '#F87171', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
        >
          <Minus size={13} />
        </button>
      )}
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
      setData({ ...data, teamMembers: [...data.teamMembers, { name: '', email: '' }] })
  }
  const removeMember = i => {
    setData({ ...data, teamMembers: data.teamMembers.filter((_, idx) => idx !== i) })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <SectionLabel>Project Details</SectionLabel>

      <Field label="Project Name" required error={errors.projectName}>
        <Input value={data.projectName} onChange={e => setData({ ...data, projectName: e.target.value })} placeholder="e.g. AgroSense AI" />
      </Field>

      <Field label="Challenge Track" required error={errors.track}>
        <Select value={data.track} onChange={e => setData({ ...data, track: e.target.value })}>
          <option value="">— Select a track —</option>
          <option value="climate">🌿 Climate-Smart Agriculture</option>
          <option value="health">🏥 Inclusive Health</option>
          <option value="education">📚 Inclusive Education</option>
          <option value="economic">💼 Economic Empowerment</option>
        </Select>
      </Field>

      <Field label="Problem Statement" required hint="Describe the specific problem your project solves (50–300 words)" error={errors.problemStatement}>
        <Textarea
          value={data.problemStatement}
          onChange={e => setData({ ...data, problemStatement: e.target.value })}
          placeholder="What problem are you solving? Who is affected? Why does it matter?"
          rows={4}
        />
      </Field>

      <Field label="Community Impact" required hint="How will your solution benefit communities in Uganda?" error={errors.impact}>
        <Textarea
          value={data.impact}
          onChange={e => setData({ ...data, impact: e.target.value })}
          placeholder="Describe the expected impact and who will benefit most from your solution."
          rows={3}
        />
      </Field>

      <div style={{ height: '1px', background: 'rgba(26,107,255,0.1)' }} />
      <SectionLabel>Team Members <span style={{ fontSize: '11px', fontWeight: 400, color: 'rgba(240,244,255,0.35)' }}>({data.teamMembers.length}/4 members)</span></SectionLabel>

      {errors.teamMembers && (
        <p style={{ fontSize: '12px', color: '#F87171', margin: 0, display: 'flex', alignItems: 'center', gap: '5px' }}>
          <AlertCircle size={12} /> {errors.teamMembers}
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {data.teamMembers.map((m, i) => (
          <TeamMemberRow key={i} index={i} member={m} onChange={updateMember} onRemove={removeMember} canRemove={i > 0} />
        ))}
      </div>

      {data.teamMembers.length < 4 && (
        <button
          type="button"
          onClick={addMember}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(26,107,255,0.08)', border: '1px dashed rgba(26,107,255,0.25)', borderRadius: '10px', padding: '10px 16px', color: '#1A6BFF', fontSize: '13px', fontWeight: 600, cursor: 'pointer', width: 'fit-content' }}
        >
          <Plus size={14} /> Add team member
        </button>
      )}

      <div style={{ height: '1px', background: 'rgba(26,107,255,0.1)' }} />
      <SectionLabel>Team Leader Contact</SectionLabel>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Field label="Full Name" required error={errors.leaderName}>
          <Input value={data.leaderName} onChange={e => setData({ ...data, leaderName: e.target.value })} placeholder="Your full name" />
        </Field>
        <Field label="Phone Number" required error={errors.phone}>
          <Input value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} placeholder="+256 700 000000" />
        </Field>
      </div>

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
    </div>
  )
}

// ─── ATTENDEE FORM ───────────────────────────────────────────────────
function AttendeeForm({ data, setData, errors }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <SectionLabel>Personal Information</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Field label="First Name" required error={errors.firstName}>
          <Input value={data.firstName} onChange={e => setData({ ...data, firstName: e.target.value })} placeholder="First name" />
        </Field>
        <Field label="Last Name" required error={errors.lastName}>
          <Input value={data.lastName} onChange={e => setData({ ...data, lastName: e.target.value })} placeholder="Last name" />
        </Field>
      </div>
      <Field label="Email Address" required error={errors.email}>
        <Input type="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} placeholder="you@example.com" />
      </Field>
      <Field label="Phone Number" error={errors.phone}>
        <Input value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} placeholder="+256 700 000000" />
      </Field>
      <Field label="University / Organisation" required error={errors.org}>
        <Input value={data.org} onChange={e => setData({ ...data, org: e.target.value })} placeholder="Your university or workplace" />
      </Field>
      <Field label="Year of Study / Role" error={errors.year}>
        <Select value={data.year} onChange={e => setData({ ...data, year: e.target.value })}>
          <option value="">— Select —</option>
          <option value="y1">Year 1</option>
          <option value="y2">Year 2</option>
          <option value="y3">Year 3</option>
          <option value="y4">Year 4</option>
          <option value="graduate">Graduate / Postgrad</option>
          <option value="professional">Working Professional</option>
          <option value="other">Other</option>
        </Select>
      </Field>
      <Field label="Why do you want to attend?" hint="Optional — helps us plan sessions">
        <Textarea value={data.reason} onChange={e => setData({ ...data, reason: e.target.value })} placeholder="What do you hope to learn or gain from FoCLIS Hackathon?" />
      </Field>
    </div>
  )
}

// ─── SPONSOR FORM ────────────────────────────────────────────────────
function SponsorForm({ data, setData, errors }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <SectionLabel>Organisation Details</SectionLabel>
      <Field label="Organisation Name" required error={errors.orgName}>
        <Input value={data.orgName} onChange={e => setData({ ...data, orgName: e.target.value })} placeholder="e.g. Acme Technologies Ltd" />
      </Field>
      <Field label="Organisation Website" error={errors.website}>
        <Input value={data.website} onChange={e => setData({ ...data, website: e.target.value })} placeholder="https://yourorg.com" />
      </Field>
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
      <div style={{ height: '1px', background: 'rgba(26,107,255,0.1)' }} />
      <SectionLabel>Contact Person</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Field label="Full Name" required error={errors.contactName}>
          <Input value={data.contactName} onChange={e => setData({ ...data, contactName: e.target.value })} placeholder="Contact person name" />
        </Field>
        <Field label="Job Title" error={errors.jobTitle}>
          <Input value={data.jobTitle} onChange={e => setData({ ...data, jobTitle: e.target.value })} placeholder="e.g. Partnerships Manager" />
        </Field>
      </div>
      <Field label="Email Address" required error={errors.email}>
        <Input type="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} placeholder="contact@yourorg.com" />
      </Field>
      <Field label="Phone Number" error={errors.phone}>
        <Input value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} placeholder="+256 700 000000" />
      </Field>
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
        <Textarea value={data.message} onChange={e => setData({ ...data, message: e.target.value })} placeholder="Any questions, custom requests, or ideas for collaboration?" />
      </Field>
    </div>
  )
}

// ─── LECTURER FORM ───────────────────────────────────────────────────
function LecturerForm({ data, setData, errors }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      <SectionLabel>Personal Information</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Field label="First Name" required error={errors.firstName}>
          <Input value={data.firstName} onChange={e => setData({ ...data, firstName: e.target.value })} placeholder="First name" />
        </Field>
        <Field label="Last Name" required error={errors.lastName}>
          <Input value={data.lastName} onChange={e => setData({ ...data, lastName: e.target.value })} placeholder="Last name" />
        </Field>
      </div>
      <Field label="Email Address" required error={errors.email}>
        <Input type="email" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} placeholder="you@institution.ac.ug" />
      </Field>
      <Field label="Phone Number" error={errors.phone}>
        <Input value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} placeholder="+256 700 000000" />
      </Field>
      <Field label="Institution / Organisation" required error={errors.institution}>
        <Input value={data.institution} onChange={e => setData({ ...data, institution: e.target.value })} placeholder="e.g. Kabale University" />
      </Field>
      <Field label="Department / Faculty" error={errors.department}>
        <Input value={data.department} onChange={e => setData({ ...data, department: e.target.value })} placeholder="e.g. Faculty of Computing & IS" />
      </Field>
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
      <Field label="Brief Bio" hint="Will appear on the website if selected as a speaker/judge">
        <Textarea value={data.bio} onChange={e => setData({ ...data, bio: e.target.value })} placeholder="Short professional bio (2–3 sentences)" rows={3} />
      </Field>
    </div>
  )
}

function SectionLabel({ children }) {
  return (
    <p style={{ margin: 0, fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(240,244,255,0.3)' }}>
      {children}
    </p>
  )
}

// ─── DEFAULT DATA ────────────────────────────────────────────────────
const defaultData = {
  hacker: {
    projectName: '', track: '', problemStatement: '', impact: '',
    teamMembers: [{ name: '', email: '' }],
    leaderName: '', phone: '', university: '', referral: '',
  },
  attendee: { firstName: '', lastName: '', email: '', phone: '', org: '', year: '', reason: '' },
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
    if (data.problemStatement.trim().split(' ').length < 10) e.problemStatement = 'Please write at least 10 words'
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
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const role = ROLES.find(r => r.id === activeRole)
  const data = formData[activeRole]
  const setData = d => setFormData({ ...formData, [activeRole]: d })

  const handleSubmit = async () => {
    const errs = validate(activeRole, data)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setStatus('submitting')

    // Registration is currently closed — no backend submission yet
    // When backend is ready, replace with:
    // const endpoint = import.meta.env.VITE_API_URL + '/api/register'
    // await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ role: activeRole, ...data }) })

    setTimeout(() => {
      setStatus('closed') // Change to 'success' when backend is connected
    }, 1000)
  }

  if (status === 'success') return <SuccessScreen role={role} />
  if (status === 'closed') return <ClosedScreen />

  return (
    <>
      <Navbar />
      <main style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #020B1E 0%, #030D26 40%, #020B1E 100%)',
        paddingTop: '100px',
        paddingBottom: '80px',
      }}>
        {/* Subtle grid texture */}
        <div style={{
          position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
          backgroundImage: 'linear-gradient(rgba(26,107,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(26,107,255,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }} />

        <div style={{ maxWidth: '680px', margin: '0 auto', padding: '0 24px', position: 'relative', zIndex: 1 }}>

          {/* Page header */}
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#1A6BFF', marginBottom: '10px' }}>
              FoCLIS Hackathon 2026
            </p>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 700, color: '#F0F4FF', margin: '0 0 12px', lineHeight: 1.1 }}>
              Register for the <span style={{ color: '#1A6BFF' }}>Hackathon</span>
            </h1>
            <p style={{ fontSize: '15px', color: 'rgba(240,244,255,0.45)', margin: 0 }}>
              Choose your role below and fill in your details.
            </p>
          </div>

          {/* Role selector */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '36px' }}>
            {ROLES.map(r => {
              const Icon = r.icon
              const isActive = activeRole === r.id
              return (
                <button
                  key={r.id}
                  onClick={() => { setActiveRole(r.id); setErrors({}); setStatus('idle') }}
                  style={{
                    padding: '14px 10px',
                    borderRadius: '12px',
                    border: isActive ? `1.5px solid ${r.color}` : '1px solid rgba(26,107,255,0.12)',
                    background: isActive ? r.colorBg : 'rgba(10,25,60,0.4)',
                    cursor: 'pointer',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '7px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Icon size={18} color={isActive ? r.color : 'rgba(240,244,255,0.35)'} />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: isActive ? r.color : 'rgba(240,244,255,0.5)', lineHeight: 1.2, textAlign: 'center' }}>
                    {r.label}
                  </span>
                  <span style={{ fontSize: '10px', color: 'rgba(240,244,255,0.3)', textAlign: 'center', lineHeight: 1.3 }}>
                    {r.sub}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Form card */}
          <div style={{
            background: 'rgba(8,20,52,0.7)',
            border: `1px solid ${role.colorBorder}`,
            borderRadius: '18px',
            padding: '36px',
            backdropFilter: 'blur(20px)',
          }}>
            {/* Form header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', paddingBottom: '20px', borderBottom: '1px solid rgba(26,107,255,0.1)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: role.colorBg, border: `1px solid ${role.colorBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <role.icon size={18} color={role.color} />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: '#F0F4FF', fontFamily: "'Syne', sans-serif" }}>
                  {role.label} Registration
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: 'rgba(240,244,255,0.4)' }}>
                  {role.sub}
                </p>
              </div>
            </div>

            {/* Dynamic form */}
            {activeRole === 'hacker'   && <HackerForm   data={data} setData={setData} errors={errors} />}
            {activeRole === 'attendee' && <AttendeeForm  data={data} setData={setData} errors={errors} />}
            {activeRole === 'sponsor'  && <SponsorForm   data={data} setData={setData} errors={errors} />}
            {activeRole === 'lecturer' && <LecturerForm  data={data} setData={setData} errors={errors} />}

            {/* Submit */}
            <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(26,107,255,0.1)' }}>
              <button
                onClick={handleSubmit}
                disabled={status === 'submitting'}
                style={{
                  width: '100%', padding: '14px 24px',
                  background: role.color, color: '#fff',
                  border: 'none', borderRadius: '10px',
                  fontSize: '15px', fontWeight: 700,
                  cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
                  opacity: status === 'submitting' ? 0.7 : 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  transition: 'opacity 0.2s',
                  fontFamily: "'Syne', sans-serif",
                  letterSpacing: '0.02em',
                }}
              >
                {status === 'submitting' ? 'Submitting...' : (
                  <>Submit Application <ChevronRight size={16} /></>
                )}
              </button>
              <p style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(240,244,255,0.25)', marginTop: '12px', margin: '12px 0 0' }}>
                Your data is secure and will only be used for FoCLIS Hackathon 2026
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

// ─── REGISTRATION CLOSED SCREEN ──────────────────────────────────────
function ClosedScreen() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#020B1E', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
        <div style={{ textAlign: 'center', padding: '0 24px', maxWidth: '480px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(26,107,255,0.1)', border: '1px solid rgba(26,107,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Lock size={28} color="#1A6BFF" />
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '28px', fontWeight: 700, color: '#F0F4FF', margin: '0 0 12px' }}>
            Registration Not Open Yet
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(240,244,255,0.45)', margin: '0 0 8px' }}>
            Applications open on <strong style={{ color: '#F59E0B' }}>June 6, 2026</strong>.
          </p>
          <p style={{ fontSize: '13px', color: 'rgba(240,244,255,0.3)', margin: '0 0 28px' }}>
            Follow us on social media or check back closer to the date.
          </p>
          <a href="/" style={{ padding: '10px 24px', background: '#1A6BFF', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
            Back to Home
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}

// ─── SUCCESS SCREEN ───────────────────────────────────────────────────
function SuccessScreen({ role }) {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#020B1E', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '80px' }}>
        <div style={{ textAlign: 'center', padding: '0 24px', maxWidth: '480px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <CheckCircle2 size={28} color="#22C55E" />
          </div>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '28px', fontWeight: 700, color: '#F0F4FF', margin: '0 0 12px' }}>
            Application Submitted!
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(240,244,255,0.45)', margin: '0 0 28px' }}>
            Thanks for registering as a <strong style={{ color: role.color }}>{role.label}</strong>. We'll be in touch via email soon.
          </p>
          <a href="/" style={{ padding: '10px 24px', background: '#1A6BFF', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>
            Back to Home
          </a>
        </div>
      </main>
      <Footer />
    </>
  )
}