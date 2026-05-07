import { useEffect, useRef } from 'react'
import { Trophy, Medal, Award, Star, Gift, Users } from 'lucide-react'

const prizes = [
  {
    rank: '1st',
    label: 'First Place',
    Icon: Trophy,
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.07)',
    border: 'rgba(245,158,11,0.2)',
    amount: 'TBA',
    perks: ['Cash Prize', 'Certificate of Excellence', 'Trophy & Recognition', 'Incubation Support'],
    featured: true,
  },
  {
    rank: '2nd',
    label: 'Second Place',
    Icon: Medal,
    color: '#94A3B8',
    bg: 'rgba(148,163,184,0.06)',
    border: 'rgba(148,163,184,0.18)',
    amount: 'TBA',
    perks: ['Cash Prize', 'Certificate of Merit', 'Medal & Recognition'],
    featured: false,
  },
  {
    rank: '3rd',
    label: 'Third Place',
    Icon: Award,
    color: '#C2814B',
    bg: 'rgba(194,129,75,0.06)',
    border: 'rgba(194,129,75,0.18)',
    amount: 'TBA',
    perks: ['Cash Prize', 'Certificate of Merit', 'Medal & Recognition'],
    featured: false,
  },
]

const special = [
  { Icon: Star,  label: 'Best Innovation Award',     desc: 'Awarded to the most creative and technically sound solution across all tracks.' },
  { Icon: Users, label: 'Best Team Award',            desc: 'Recognising exceptional collaboration, presentation, and teamwork throughout the event.' },
  { Icon: Gift,  label: 'Audience Choice Award',     desc: 'Voted by attendees for the solution with the greatest perceived real-world impact.' },
]

export default function Prizes() {
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('pz-visible') }),
      { threshold: 0.07 }
    )
    ref.current?.querySelectorAll('.pz-fade').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="prizes" ref={ref} className="prizes-root">

      <div className="prizes-container">

        {/* ── Header ── */}
        <div className="pz-fade prizes-header">
          <span className="prizes-eyebrow">Prizes & Recognition</span>
          <h2 className="prizes-heading">
            What the best teams<br />
            <span className="prizes-heading-accent">will take home.</span>
          </h2>
          <p className="prizes-subtext">
            Prizes will be announced before the event opens. All winning teams receive
            formal recognition, certificates, and opportunities for further support.
          </p>
        </div>

        {/* ── Main prizes ── */}
        <div className="prizes-main-grid">
          {prizes.map(({ rank, label, Icon, color, bg, border, amount, perks, featured }, i) => (
            <div
              key={rank}
              className={`pz-fade prizes-card ${featured ? 'prizes-card--featured' : ''}`}
              style={{
                transitionDelay: `${0.08 + i * 0.08}s`,
                background: bg,
                border: `1px solid ${border}`,
              }}
            >
              {featured && (
                <div className="prizes-card-badge" style={{ color, borderColor: border }}>
                  Top Prize
                </div>
              )}

              <div className="prizes-card-icon" style={{ color, background: bg, border: `1px solid ${border}` }}>
                <Icon size={22} />
              </div>

              <div className="prizes-card-rank" style={{ color }}>{rank}</div>
              <div className="prizes-card-label">{label}</div>

              <div className="prizes-card-amount" style={{ color }}>
                {amount}
              </div>

              <div className="prizes-card-divider" style={{ background: border }} />

              <ul className="prizes-card-perks">
                {perks.map((perk, j) => (
                  <li key={j} className="prizes-card-perk">
                    <span className="prizes-perk-dot" style={{ background: color }} />
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div className="pz-fade prizes-rule" style={{ transitionDelay: '0.3s' }} />

        {/* ── Special awards ── */}
        <div className="pz-fade prizes-special-header" style={{ transitionDelay: '0.32s' }}>
          <span className="prizes-eyebrow">Special Awards</span>
          <p className="prizes-special-sub">
            In addition to placement prizes, three special awards will be given on the day.
          </p>
        </div>

        <div className="prizes-special-grid">
          {special.map(({ Icon, label, desc }, i) => (
            <div
              key={label}
              className="pz-fade prizes-special-item"
              style={{ transitionDelay: `${0.36 + i * 0.08}s` }}
            >
              <div className="prizes-special-icon">
                <Icon size={18} />
              </div>
              <div>
                <h4 className="prizes-special-title">{label}</h4>
                <p className="prizes-special-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Footer note ── */}
        <div className="pz-fade prizes-note" style={{ transitionDelay: '0.5s' }}>
          Prize details including exact amounts and categories will be confirmed and published
          before registration opens on <strong>June 6, 2026</strong>. All participants receive
          a certificate of participation.
        </div>

      </div>
    </section>
  )
}