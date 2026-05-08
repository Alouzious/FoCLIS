const KAB_LOGO = 'https://www.kab.ac.ug/wp-content/uploads/2022/08/Kabale-University-Website-Logo-2.jpg'

const partners = [
  {
    id: 1,
    name: 'Kabale University',
    logo: KAB_LOGO,
    tier: 'Gold',
    description: 'A leading university in Western Uganda, driving innovation in science, technology and community development.',
    website: 'https://www.kab.ac.ug',
  },
  {
    id: 2,
    name: 'Kabale University',
    logo: KAB_LOGO,
    tier: 'Gold',
    description: 'Home of the Faculty of Computing & Information Systems — the organizing faculty behind FoCLIS Hackathon.',
    website: 'https://www.kab.ac.ug',
  },
]

const sponsorTiers = [
  { tier: 'Gold', placeholder: true },
  { tier: 'Silver', placeholder: true },
]

const tierColors = {
  Gold:   { bg: 'rgba(245,158,11,0.1)',  color: '#F59E0B', border: 'rgba(245,158,11,0.25)' },
  Silver: { bg: 'rgba(148,163,184,0.1)', color: '#94A3B8', border: 'rgba(148,163,184,0.25)' },
  Bronze: { bg: 'rgba(180,100,50,0.1)',  color: '#B46432', border: 'rgba(180,100,50,0.25)' },
}

export default function Partners() {
  return (
    <section id="partners" style={{ padding: '80px 0', background: '#020B1E', borderTop: '1px solid rgba(26,107,255,0.08)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

        <div style={{ marginBottom: '48px' }}>
          <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#1A6BFF', marginBottom: '10px' }}>
            FoCLIS Hackathon 2026
          </p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, color: '#F0F4FF', margin: 0, lineHeight: 1.15 }}>
            Partners &amp; <span style={{ color: '#1A6BFF' }}>Sponsors</span>
          </h2>
          <p style={{ marginTop: '10px', fontSize: '14px', color: 'rgba(240,244,255,0.4)', maxWidth: '460px' }}>
            Organizations backing FoCLIS Hackathon 2026. More sponsors will be announced soon.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
          {partners.map(p => <PartnerCard key={p.id} partner={p} />)}
          {sponsorTiers.map(tier => <SponsorPlaceholder key={tier.tier} tier={tier.tier} />)}
        </div>

        <div style={{ marginTop: '40px', padding: '20px 24px', background: 'rgba(26,107,255,0.05)', border: '1px dashed rgba(26,107,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#F0F4FF' }}>Want to sponsor FoCLIS Hackathon?</p>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'rgba(240,244,255,0.4)' }}>Reach hundreds of top student innovators across Uganda.</p>
          </div>
          <a href="mailto:hackathon@kab.ac.ug" style={{ padding: '9px 20px', fontSize: '13px', fontWeight: 600, borderRadius: '8px', background: '#1A6BFF', color: '#fff', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
            Get in touch
          </a>
        </div>

      </div>
    </section>
  )
}

function PartnerCard({ partner }) {
  const t = tierColors[partner.tier]
  return (
    <div
      style={{ background: 'rgba(10,31,68,0.45)', border: '1px solid rgba(26,107,255,0.12)', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', transition: 'border-color 0.2s, transform 0.2s' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(26,107,255,0.3)'; e.currentTarget.style.transform = 'translateY(-3px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,107,255,0.12)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ height: '48px', padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(26,107,255,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center' }}>
          <img src={partner.logo} alt={partner.name} loading="lazy" decoding="async" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
        </div>
        <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 10px', borderRadius: '20px', background: t.bg, color: t.color, border: `1px solid ${t.border}` }}>
          {partner.tier}
        </span>
      </div>

      <p style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#F0F4FF', fontFamily: "'Syne', sans-serif" }}>
        {partner.name}
      </p>

      <p style={{ margin: 0, fontSize: '12.5px', color: 'rgba(240,244,255,0.45)', lineHeight: 1.6, flexGrow: 1 }}>
        {partner.description}
      </p>

      <a
        href={partner.website}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 600, color: '#1A6BFF', textDecoration: 'none' }}
        onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
        onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
      >
        Visit website
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="#1A6BFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  )
}

function SponsorPlaceholder({ tier }) {
  const t = tierColors[tier]
  return (
    <div
      style={{
        background: 'rgba(10,31,68,0.3)',
        border: '2px dashed rgba(26,107,255,0.2)',
        borderRadius: '14px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px',
        minHeight: '200px',
        textAlign: 'center',
      }}
    >
      <span style={{
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        padding: '3px 10px',
        borderRadius: '20px',
        background: t.bg,
        color: t.color,
        border: `1px solid ${t.border}`,
      }}>
        {tier}
      </span>
      <p style={{
        margin: 0,
        fontSize: '15px',
        fontWeight: 700,
        color: 'rgba(240,244,255,0.3)',
        fontFamily: "'Syne', sans-serif",
      }}>
        Available Slot
      </p>
      <p style={{
        margin: '4px 0 0',
        fontSize: '12px',
        color: 'rgba(240,244,255,0.2)',
      }}>
        Your brand here
      </p>
    </div>
  )
}