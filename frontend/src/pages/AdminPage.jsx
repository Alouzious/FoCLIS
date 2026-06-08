import { useState, useEffect, useCallback } from 'react'
import {
  Users, Briefcase, GraduationCap, Building2,
  CheckCircle2, Clock, XCircle, BarChart3,
  Search, RefreshCw, Send, ChevronRight,
  Mail, Phone, Calendar, Tag, TrendingUp,
  Loader2, X, Megaphone,
  UserCheck, UserX, Hourglass, ArrowLeft,
} from 'lucide-react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const ROLE_META = {
  hacker:   { label: 'Hacker',       icon: Users,         color: '#3B82F6', bg: 'rgba(59,130,246,0.1)'  },
  attendee: { label: 'Attendee',     icon: GraduationCap, color: '#10B981', bg: 'rgba(16,185,129,0.1)'  },
  sponsor:  { label: 'Hack Partner', icon: Building2,     color: '#F59E0B', bg: 'rgba(245,158,11,0.1)'  },
  lecturer: { label: 'Lecturer',     icon: Briefcase,     color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)'  },
}

const STATUS_META = {
  pending:    { label: 'Pending',    icon: Hourglass,    color: '#F59E0B', bg: 'rgba(245,158,11,0.1)'   },
  approved:   { label: 'Approved',   icon: CheckCircle2, color: '#10B981', bg: 'rgba(16,185,129,0.1)'   },
  rejected:   { label: 'Rejected',   icon: XCircle,      color: '#EF4444', bg: 'rgba(239,68,68,0.1)'    },
  waitlisted: { label: 'Waitlisted', icon: Clock,        color: '#6B7280', bg: 'rgba(107,114,128,0.1)'  },
}

function fmt(dt) {
  if (!dt) return '—'
  return new Date(dt).toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

function getName(r) {
  if (r.leader_name)  return r.leader_name
  if (r.first_name)   return `${r.first_name} ${r.last_name || ''}`.trim()
  if (r.contact_name) return r.contact_name
  return '—'
}

function getOrg(r) {
  return r.university || r.org || r.org_name || r.institution || '—'
}

async function apiFetch(path, opts = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  })
  if (!res.ok) throw new Error(`${res.status}`)
  return res.json()
}

function StatCard({ label, value, icon: Icon, color, sub }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: 12, padding: '20px 22px',
      display: 'flex', flexDirection: 'column', gap: 10,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80,
        background: `radial-gradient(circle at top right, ${color}18, transparent 70%)` }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(232,237,248,0.35)' }}>
          {label}
        </span>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: `${color}18`, border: `1px solid ${color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={15} color={color} />
        </div>
      </div>
      <span style={{ fontSize: 32, fontWeight: 800, color: '#E8EDF8', lineHeight: 1, fontFamily: "'Syne', sans-serif" }}>
        {value ?? '—'}
      </span>
      {sub && <span style={{ fontSize: 11, color: 'rgba(232,237,248,0.3)' }}>{sub}</span>}
    </div>
  )
}

function Badge({ type, meta }) {
  const m = meta[type] || { label: type, color: '#888', bg: 'rgba(136,136,136,0.1)' }
  const Icon = m.icon
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      padding: '3px 9px', borderRadius: 20,
      background: m.bg, border: `1px solid ${m.color}30`,
      fontSize: 11, fontWeight: 600, color: m.color,
    }}>
      {Icon && <Icon size={10} />} {m.label}
    </span>
  )
}

function SectionLabel({ children }) {
  return (
    <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(232,237,248,0.25)' }}>
      {children}
    </p>
  )
}

function InfoRow({ icon: Icon, value, label }) {
  if (!value) return null
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <Icon size={13} color="rgba(232,237,248,0.25)" />
      {label && <span style={{ fontSize: 12, color: 'rgba(232,237,248,0.35)', minWidth: 70 }}>{label}</span>}
      <span style={{ fontSize: 13, color: '#E8EDF8' }}>{value}</span>
    </div>
  )
}

function DetailBlock({ label, value }) {
  return (
    <div style={{ padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}>
      <p style={{ margin: '0 0 4px', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(232,237,248,0.25)' }}>{label}</p>
      <p style={{ margin: 0, fontSize: 13, color: 'rgba(232,237,248,0.7)', lineHeight: 1.6 }}>{value}</p>
    </div>
  )
}

function DetailPanel({ reg, members, onClose, onStatusChange }) {
  const [subject, setSubject] = useState('')
  const [msg, setMsg]         = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent]       = useState(false)

  const handleSend = async () => {
    if (!subject.trim() || !msg.trim()) return
    setSending(true)
    try {
      await apiFetch('/api/admin/broadcast', {
        method: 'POST',
        body: JSON.stringify({ subject, body: msg, target_id: reg.id }),
      })
      setSent(true); setMsg(''); setSubject('')
      setTimeout(() => setSent(false), 3000)
    } catch {}
    setSending(false)
  }

  const rm = ROLE_META[reg.role] || ROLE_META.attendee
  const RoleIcon = rm.icon

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}
      onClick={onClose}>
      <div style={{ width: '100%', maxWidth: 520, height: '100vh', background: '#0B1120', borderLeft: '1px solid rgba(255,255,255,0.08)', overflowY: 'auto', padding: '28px 28px 48px', display: 'flex', flexDirection: 'column', gap: 24 }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '7px 12px', color: 'rgba(232,237,248,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
            <ArrowLeft size={13} /> Back
          </button>
          <div style={{ display: 'flex', gap: 6 }}>
            <Badge type={reg.role}   meta={ROLE_META} />
            <Badge type={reg.status} meta={STATUS_META} />
          </div>
        </div>

        {/* Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: rm.bg, border: `1px solid ${rm.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <RoleIcon size={22} color={rm.color} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#E8EDF8', fontFamily: "'Syne', sans-serif" }}>{getName(reg)}</p>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: 'rgba(232,237,248,0.4)' }}>{getOrg(reg)}</p>
          </div>
        </div>

        {/* Contact */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SectionLabel>Contact</SectionLabel>
          <InfoRow icon={Mail}     value={reg.email}        />
          <InfoRow icon={Phone}    value={reg.phone}        />
          <InfoRow icon={Calendar} value={fmt(reg.submitted_at)} label="Submitted" />
        </div>

        {/* Hacker details */}
        {reg.role === 'hacker' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionLabel>Project</SectionLabel>
            <InfoRow icon={Tag}        value={reg.project_name} label="Name"  />
            <InfoRow icon={TrendingUp} value={reg.track}        label="Track" />
            <InfoRow icon={Users}      value={reg.university}   label="Uni"   />
            {reg.problem_statement && <DetailBlock label="Problem Statement" value={reg.problem_statement} />}
            {reg.solution          && <DetailBlock label="Proposed Solution" value={reg.solution} />}
            {reg.impact            && <DetailBlock label="Community Impact"  value={reg.impact} />}
          </div>
        )}

        {/* Attendee details */}
        {reg.role === 'attendee' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionLabel>Details</SectionLabel>
            <InfoRow icon={GraduationCap} value={reg.course}       label="Course" />
            <InfoRow icon={Calendar}      value={reg.year_of_study} label="Year"  />
            <InfoRow icon={Building2}     value={reg.org}           label="Org"   />
            {reg.reason && <DetailBlock label="Reason for Attending" value={reg.reason} />}
          </div>
        )}

        {/* Sponsor details */}
        {reg.role === 'sponsor' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionLabel>Sponsorship</SectionLabel>
            <InfoRow icon={Tag}       value={reg.tier}      label="Tier"     />
            <InfoRow icon={Building2} value={reg.sector}    label="Sector"   />
            <InfoRow icon={Briefcase} value={reg.job_title} label="Job Title"/>
            <InfoRow icon={Tag}       value={reg.website}   label="Website"  />
            {reg.message && <DetailBlock label="Message" value={reg.message} />}
          </div>
        )}

        {/* Lecturer details */}
        {reg.role === 'lecturer' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionLabel>Role & Expertise</SectionLabel>
            <InfoRow icon={Briefcase} value={reg.participant_role} label="Role"      />
            <InfoRow icon={Tag}       value={reg.expertise}        label="Expertise" />
            <InfoRow icon={Building2} value={reg.department}       label="Dept"      />
            {reg.bio && <DetailBlock label="Bio" value={reg.bio} />}
          </div>
        )}

        {/* Team members */}
        {members && members.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SectionLabel>Team Members ({members.length})</SectionLabel>
            {members.map((m, i) => (
              <div key={i} style={{ padding: '10px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: '#E8EDF8' }}>{m.name}</p>
                <p style={{ margin: '2px 0 0', fontSize: 11, color: 'rgba(232,237,248,0.4)' }}>
                  {m.email}{m.course ? ` · ${m.course}` : ''}{m.year_of_study ? ` · ${m.year_of_study}` : ''}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Status actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SectionLabel>Update Status</SectionLabel>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['approved', 'rejected', 'waitlisted', 'pending'].map(s => {
              const sm = STATUS_META[s]
              const active = reg.status === s
              return (
                <button key={s} onClick={() => onStatusChange(reg.id, s)}
                  style={{ padding: '7px 14px', borderRadius: 8, cursor: 'pointer', fontSize: 12, fontWeight: 600,
                    border: active ? `1.5px solid ${sm.color}` : '1px solid rgba(255,255,255,0.08)',
                    background: active ? sm.bg : 'rgba(255,255,255,0.03)',
                    color: active ? sm.color : 'rgba(232,237,248,0.5)',
                    transition: 'all 0.15s',
                  }}>
                  {sm.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Send message */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SectionLabel>Send Message</SectionLabel>
          <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#E8EDF8', outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
          <textarea value={msg} onChange={e => setMsg(e.target.value)} placeholder="Type your message..." rows={4}
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#E8EDF8', outline: 'none', resize: 'vertical', fontFamily: "'DM Sans', sans-serif" }} />
          <button onClick={handleSend} disabled={sending || !msg.trim() || !subject.trim()}
            style={{ padding: '10px 18px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: sent ? '#10B981' : '#3B82F6', color: '#fff', fontSize: 13, fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: 8, width: 'fit-content',
              opacity: (sending || !msg.trim() || !subject.trim()) ? 0.5 : 1,
              transition: 'background 0.2s',
            }}>
            {sending ? <Loader2 size={14} className="spin" /> : <Send size={14} />}
            {sent ? 'Sent!' : sending ? 'Sending…' : 'Send Email'}
          </button>
        </div>

      </div>
    </div>
  )
}

function BroadcastModal({ onClose }) {
  const [subject, setSubject] = useState('')
  const [body, setBody]       = useState('')
  const [role, setRole]       = useState('')
  const [sending, setSending] = useState(false)
  const [result, setResult]   = useState(null)

  const handleSend = async () => {
    if (!subject.trim() || !body.trim()) return
    setSending(true)
    try {
      const res = await apiFetch('/api/admin/broadcast', {
        method: 'POST',
        body: JSON.stringify({ subject, body, target_role: role || null }),
      })
      setResult(`Sent to ${res.sent} recipients${res.failed ? `, ${res.failed} failed` : ''}`)
    } catch {
      setResult('Failed to send')
    }
    setSending(false)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 50, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
      onClick={onClose}>
      <div style={{ background: '#0B1120', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 28, width: '100%', maxWidth: 480, display: 'flex', flexDirection: 'column', gap: 16 }}
        onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 800, color: '#E8EDF8', fontFamily: "'Syne', sans-serif", display: 'flex', alignItems: 'center', gap: 8 }}>
            <Megaphone size={18} color="#3B82F6" /> Broadcast Email
          </p>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(232,237,248,0.4)' }}><X size={18} /></button>
        </div>
        <select value={role} onChange={e => setRole(e.target.value)}
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#E8EDF8', outline: 'none' }}>
          <option value="">All Participants</option>
          <option value="hacker">Hackers only</option>
          <option value="attendee">Attendees only</option>
          <option value="sponsor">Sponsors only</option>
          <option value="lecturer">Lecturers only</option>
        </select>
        <input value={subject} onChange={e => setSubject(e.target.value)} placeholder="Subject"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#E8EDF8', outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
        <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Message body..." rows={5}
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '9px 12px', fontSize: 13, color: '#E8EDF8', outline: 'none', resize: 'vertical', fontFamily: "'DM Sans', sans-serif" }} />
        {result && (
          <p style={{ margin: 0, fontSize: 13, color: result.includes('Failed') ? '#EF4444' : '#10B981' }}>{result}</p>
        )}
        <button onClick={handleSend} disabled={sending || !subject.trim() || !body.trim()}
          style={{ padding: '11px 20px', borderRadius: 9, border: 'none', background: '#3B82F6', color: '#fff', fontSize: 14, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, opacity: (sending || !subject.trim() || !body.trim()) ? 0.5 : 1 }}>
          {sending ? <Loader2 size={15} className="spin" /> : <Send size={15} />}
          {sending ? 'Sending…' : 'Send Broadcast'}
        </button>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [stats, setStats]               = useState(null)
  const [rows, setRows]                 = useState([])
  const [loading, setLoading]           = useState(true)
  const [search, setSearch]             = useState('')
  const [filterRole, setFilterRole]     = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [selected, setSelected]         = useState(null)
  const [members, setMembers]           = useState([])
  const [showBroadcast, setShowBroadcast] = useState(false)
  const [page, setPage]                 = useState(1)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page, limit: 50 })
      if (filterRole)   params.set('role',   filterRole)
      if (filterStatus) params.set('status', filterStatus)

      const [s, r] = await Promise.all([
        apiFetch('/api/admin/stats'),
        apiFetch(`/api/admin/registrations?${params}`),
      ])
      setStats(s)
      setRows(r.registrations || [])
    } catch (e) {
      console.error(e)
    }
    setLoading(false)
  }, [filterRole, filterStatus, page])

  useEffect(() => { load() }, [load])

  const openDetail = async (reg) => {
    setSelected(reg)
    if (reg.role === 'hacker') {
      try {
        const d = await apiFetch(`/api/admin/registrations/${reg.id}`)
        setMembers(d.team_members || [])
      } catch { setMembers([]) }
    } else {
      setMembers([])
    }
  }

  const handleStatusChange = async (id, status) => {
    try {
      await apiFetch(`/api/admin/registrations/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })
      setSelected(prev => prev ? { ...prev, status } : prev)
      setRows(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    } catch {}
  }

  const filtered = rows.filter(r => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      getName(r).toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      (r.project_name || '').toLowerCase().includes(q) ||
      getOrg(r).toLowerCase().includes(q)
    )
  })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #060B18; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
        .reg-row:hover td { background: rgba(59,130,246,0.04) !important; }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#060B18', fontFamily: "'DM Sans', sans-serif", color: '#E8EDF8' }}>

        {/* Top bar */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #3B82F6, #8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChart3 size={16} color="#fff" />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 800, color: '#E8EDF8', fontFamily: "'Syne', sans-serif", letterSpacing: '-0.01em' }}>FoCLIS Admin</p>
              <p style={{ margin: 0, fontSize: 10, color: 'rgba(232,237,248,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Hackathon 2026</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setShowBroadcast(true)}
              style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.08)', color: '#3B82F6', fontSize: 12, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <Megaphone size={13} /> Broadcast
            </button>
            <button onClick={load}
              style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: 'rgba(232,237,248,0.5)', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <RefreshCw size={13} className={loading ? 'spin' : ''} /> Refresh
            </button>
          </div>
        </div>

        <div style={{ padding: '28px 32px', maxWidth: 1400, margin: '0 auto' }}>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14, marginBottom: 28 }}>
            <StatCard label="Total"     value={stats?.total}     icon={BarChart3}     color="#3B82F6" />
            <StatCard label="Hackers"   value={stats?.hackers}   icon={Users}         color="#3B82F6" />
            <StatCard label="Attendees" value={stats?.attendees} icon={GraduationCap} color="#10B981" />
            <StatCard label="Partners"  value={stats?.sponsors}  icon={Building2}     color="#F59E0B" />
            <StatCard label="Lecturers" value={stats?.lecturers} icon={Briefcase}     color="#8B5CF6" />
            <StatCard label="Pending"   value={stats?.pending}   icon={Hourglass}     color="#F59E0B" sub="awaiting review" />
            <StatCard label="Approved"  value={stats?.approved}  icon={UserCheck}     color="#10B981" />
            <StatCard label="Rejected"  value={stats?.rejected}  icon={UserX}         color="#EF4444" />
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200, position: 'relative' }}>
              <Search size={14} color="rgba(232,237,248,0.3)" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search name, email, project, org…"
                style={{ width: '100%', padding: '9px 12px 9px 34px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 13, color: '#E8EDF8', outline: 'none', fontFamily: "'DM Sans', sans-serif" }} />
            </div>
            <select value={filterRole} onChange={e => { setFilterRole(e.target.value); setPage(1) }}
              style={{ padding: '9px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 13, color: '#E8EDF8', outline: 'none', cursor: 'pointer' }}>
              <option value="">All Roles</option>
              <option value="hacker">Hackers</option>
              <option value="attendee">Attendees</option>
              <option value="sponsor">Sponsors</option>
              <option value="lecturer">Lecturers</option>
            </select>
            <select value={filterStatus} onChange={e => { setFilterStatus(e.target.value); setPage(1) }}
              style={{ padding: '9px 12px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 13, color: '#E8EDF8', outline: 'none', cursor: 'pointer' }}>
              <option value="">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="waitlisted">Waitlisted</option>
            </select>
          </div>

          {/* Table */}
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    {['Name', 'Email', 'Role', 'Organisation', 'Status', 'Submitted', ''].map(h => (
                      <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(232,237,248,0.25)', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={7} style={{ padding: 48, textAlign: 'center' }}>
                      <Loader2 size={22} className="spin" color="rgba(232,237,248,0.3)" style={{ margin: '0 auto', display: 'block' }} />
                    </td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={7} style={{ padding: 48, textAlign: 'center', color: 'rgba(232,237,248,0.3)', fontSize: 13 }}>
                      No registrations found
                    </td></tr>
                  ) : filtered.map(r => (
                    <tr key={r.id} className="reg-row"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer' }}
                      onClick={() => openDetail(r)}>
                      <td style={{ padding: '12px 16px', fontWeight: 600, color: '#E8EDF8', whiteSpace: 'nowrap' }}>{getName(r)}</td>
                      <td style={{ padding: '12px 16px', color: 'rgba(232,237,248,0.5)', fontSize: 12 }}>{r.email}</td>
                      <td style={{ padding: '12px 16px' }}><Badge type={r.role}   meta={ROLE_META}   /></td>
                      <td style={{ padding: '12px 16px', color: 'rgba(232,237,248,0.5)', fontSize: 12, maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{getOrg(r)}</td>
                      <td style={{ padding: '12px 16px' }}><Badge type={r.status} meta={STATUS_META} /></td>
                      <td style={{ padding: '12px 16px', color: 'rgba(232,237,248,0.35)', fontSize: 11, whiteSpace: 'nowrap' }}>{fmt(r.submitted_at)}</td>
                      <td style={{ padding: '12px 16px' }}><ChevronRight size={14} color="rgba(232,237,248,0.2)" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filtered.length > 0 && (
              <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 12, color: 'rgba(232,237,248,0.3)' }}>{filtered.length} registration{filtered.length !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>

        </div>
      </div>

      {selected && (
        <DetailPanel
          reg={selected}
          members={members}
          onClose={() => setSelected(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      {showBroadcast && <BroadcastModal onClose={() => setShowBroadcast(false)} />}
    </>
  )
}