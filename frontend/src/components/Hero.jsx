import { useState, useEffect, useCallback } from 'react'
import { ChevronDown, ArrowRight, Sprout, HeartPulse, BookOpen, TrendingUp } from 'lucide-react'

const CARD_IMAGES = [
  {
    src: 'https://plus.unsplash.com/premium_photo-1682141013747-5aed8665c154?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3R1ZGVudCUyMGRldmVsb3BlcnN8ZW58MHx8MHx8fDA%3D',
    alt: 'Student developer coding',
    label: 'Build',
  },
  {
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop&auto=format&q=75',
    alt: 'Team collaborating on tech',
    label: 'Collaborate',
  },
  {
    src: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=300&fit=crop&auto=format&q=75',
    alt: 'Students presenting solution',
    label: 'Innovate',
  },
  {
    src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&auto=format&q=75',
    alt: 'AI and blockchain tech',
    label: 'Tech',
  },
]

const BG_SLIDES = [
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1400&h=900&fit=crop&auto=format&q=60',
  'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1400&h=900&fit=crop&auto=format&q=60',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1400&h=900&fit=crop&auto=format&q=60',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1400&h=900&fit=crop&auto=format&q=60',
]

const THEMES = [
  { Icon: Sprout,     label: 'Climate-Smart Agriculture' },
  { Icon: HeartPulse, label: 'Inclusive Health'          },
  { Icon: BookOpen,   label: 'Inclusive Education'       },
  { Icon: TrendingUp, label: 'Economic Empowerment'      },
]

function BgSlider() {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % BG_SLIDES.length), 5000)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="hero-bg-slider" aria-hidden="true">
      {BG_SLIDES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`hero-bg-slide ${i === idx ? 'hero-bg-slide--active' : ''}`}
          loading={i === 0 ? 'eager' : 'lazy'}
          fetchpriority={i === 0 ? 'high' : 'low'}
          decoding="async"
        />
      ))}
      <div className="hero-bg-overlay" />
    </div>
  )
}

function ImageCards() {
  return (
    <div className="hero-cards-grid" aria-label="Hackathon highlights">
      {CARD_IMAGES.map((img, i) => (
        <div
          key={img.src}
          className="hero-card hero-anim"
          style={{ animationDelay: `${0.45 + i * 0.1}s` }}
        >
          <img
            src={img.src}
            alt={img.alt}
            loading={i < 2 ? 'eager' : 'lazy'}
            decoding="async"
            className="hero-card-img"
          />
          <span className="hero-card-badge">{img.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function Hero() {
  // Registration is open — June 6 2026 has passed
  return (
    <section className="hero-root" aria-label="FoCLIS Hackathon 2026 hero section">

      <BgSlider />
      <div className="hero-dotgrid" aria-hidden="true" />

      <div className="hero-inner">

        {/* ══════ LEFT COLUMN ══════ */}
        <div className="hero-left">

          <div
            className="hero-wordmark hero-anim"
            style={{ animationDelay: '0.08s' }}
            aria-label="FoCLIS HACKATHON 2026"
          >
            <span className="hero-word-fo">Fo</span><span className="hero-word-clis">CLIS</span>
            <br />
            <span className="hero-word-hack">HACKATHON</span>
            <br />
            <span className="hero-word-year">2026</span>
          </div>

          <div className="hero-theme hero-anim" style={{ animationDelay: '0.22s' }}>
            <div className="hero-theme-bar" aria-hidden="true" />
            <div>
              <span className="hero-theme-eyebrow">Theme</span>
              <p className="hero-theme-text">
                Innovating for a{' '}
                <strong className="hero-theme-strong">Resilient Uganda:</strong>{' '}
                Advancing Climate-Smart Agriculture, Inclusive Health &amp; Education,
                and Economic Empowerment
              </p>
            </div>
          </div>

          {/* Registration open indicator */}
          {/* <div className="hero-reg-block hero-anim" style={{ animationDelay: '0.36s' }}>
            <div className="hero-reg-open">
              <span className="hero-reg-open-dot" aria-hidden="true" />
              <span>Applications are open!</span>
            </div>
          </div> */}

          {/* CTA buttons — fully unlocked */}
          <div className="hero-ctas hero-anim" style={{ animationDelay: '0.46s' }}>
            <a href="/register" className="hero-btn-primary">
              <ArrowRight size={16} aria-hidden="true" /> Register Now
            </a>
            <a href="/themes" className="hero-btn-secondary">
              View Themes <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>

          <div className="hero-stats hero-anim" style={{ animationDelay: '0.56s' }}>
            {[
              { value: '100+', label: 'Expected Participants' },
              { value: '48h',  label: 'Of Hacking'            },
              { value: '4',    label: 'Challenge Themes'      },
              { value: 'UGX',  label: 'Prizes Await'          },
            ].map(s => (
              <div key={s.label} className="hero-stat">
                <span className="hero-stat-value">{s.value}</span>
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════ RIGHT COLUMN ══════ */}
        <div className="hero-right hero-anim" style={{ animationDelay: '0.18s' }}>
          <ImageCards />

          <div className="hero-themes-card">
            <p className="hero-themes-card-title">Challenge Tracks</p>
            <ul className="hero-themes-list">
              {THEMES.map(({ Icon, label }) => (
                <li key={label} className="hero-themes-item">
                  <span className="hero-themes-icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={2.2} />
                  </span>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <a href="#about" className="hero-scroll-nudge" aria-label="Scroll to about section">
        <span className="hero-scroll-text">Scroll</span>
        <ChevronDown size={16} className="hero-scroll-arrow" aria-hidden="true" />
      </a>
    </section>
  )
}