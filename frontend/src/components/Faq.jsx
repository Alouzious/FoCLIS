import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    id: 1,
    category: 'General',
    question: 'What is FoCLIS Hackathon?',
    answer:
      'FoCLIS Hackathon is an annual innovation competition organized by the Faculty of Computing & Information Systems at Kabale University. It brings together students, developers, and innovators to build tech solutions addressing Uganda\'s most pressing challenges — from climate-smart agriculture to inclusive health and education.',
  },
  {
    id: 2,
    category: 'General',
    question: 'Who can participate?',
    answer:
      'The hackathon is primarily open to FoCLIS (Faculty of Computing & Information Systems) students. However, FoCLIS students are encouraged to collaborate with students from other faculties and departments — such as engineering, data science, medicine, business, and more. Teams can be mixed with members from different departments and universities. You can participate as an individual or as a team of up to 4 members. We welcome developers, designers, entrepreneurs, and domain experts.',
  },
  {
    id: 3,
    category: 'Registration',
    question: 'When does registration open?',
    answer:
      'Registration opens on June 6, 2026. You will be able to sign up through the registration form on this website. Make sure to join our mailing list or follow our social media to be notified the moment registration goes live.',
  },
  {
    id: 4,
    category: 'Registration',
    question: 'Is participation free?',
    answer:
      'Yes, participation is completely free. There are no registration fees. All participants will be provided with workspace, meals, and internet access during the event at Kabale University.',
  },
  {
    id: 5,
    category: 'Themes',
    question: 'What are the challenge tracks?',
    answer:
      'FoCLIS Hackathon 2026 has four challenge tracks: Climate-Smart Agriculture (tech solutions for sustainable farming and food security), Inclusive Health (digital tools improving healthcare access and delivery), Inclusive Education (platforms that expand quality education for all), and Economic Empowerment (innovations driving financial inclusion and job creation).',
  },
  {
    id: 6,
    category: 'Themes',
    question: 'Can my team work on multiple tracks?',
    answer:
      'No — each team must focus on a single challenge track. This ensures your solution is deep, impactful, and well-evaluated within its domain. However, cross-cutting solutions that connect two tracks (e.g. agri-finance) are welcome under the most relevant track.',
  },
  {
    id: 7,
    category: 'Judging',
    question: 'How will projects be judged?',
    answer:
      'Projects will be evaluated by a panel of judges including industry experts, academics, and investors. Criteria include innovation & creativity, technical implementation, real-world impact potential, presentation quality, and feasibility of the solution.',
  },
  {
    id: 8,
    category: 'Prizes',
    question: 'What prizes are available?',
    answer:
      'Prizes will be announced closer to the event. Past editions have featured cash awards, incubation opportunities, mentorship packages, and recognition from partner organizations. Follow our channels for prize announcements.',
  },
]

const categories = ['All', ...new Set(faqs.map(f => f.category))]

const categoryColors = {
  General:      { bg: 'rgba(26,107,255,0.08)',  color: '#1A6BFF',  border: 'rgba(26,107,255,0.2)' },
  Registration: { bg: 'rgba(34,197,94,0.08)',   color: '#22C55E',  border: 'rgba(34,197,94,0.2)' },
  Themes:       { bg: 'rgba(168,85,247,0.08)',  color: '#A855F7',  border: 'rgba(168,85,247,0.2)' },
  Judging:      { bg: 'rgba(245,158,11,0.08)',  color: '#F59E0B',  border: 'rgba(245,158,11,0.2)' },
  Prizes:       { bg: 'rgba(245,158,11,0.08)',  color: '#F59E0B',  border: 'rgba(245,158,11,0.2)' },
}

export default function FAQ() {
  const [open, setOpen] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const visible = faqs.filter(f => activeCategory === 'All' || f.category === activeCategory)

  return (
    <section id="faq" style={{ padding: '88px 0', background: '#020B1E' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '48px' }}>
          <p style={{
            fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: '#1A6BFF', marginBottom: '10px',
          }}>
            Got questions?
          </p>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(26px, 4vw, 40px)',
            fontWeight: 700, color: '#F0F4FF', margin: '0 0 10px', lineHeight: 1.15,
          }}>
            Frequently Asked <span style={{ color: '#1A6BFF' }}>Questions</span>
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(240,244,255,0.4)', margin: 0, maxWidth: '440px' }}>
            Everything you need to know before applying. Can't find your answer? Reach us directly.
          </p>
        </div>

        {/* Category filters */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpen(null) }}
              style={{
                padding: '6px 16px', fontSize: '12px', fontWeight: 600,
                borderRadius: '20px', border: 'none', cursor: 'pointer',
                transition: 'all 0.2s ease',
                background: activeCategory === cat ? '#1A6BFF' : 'rgba(26,107,255,0.08)',
                color: activeCategory === cat ? '#fff' : 'rgba(240,244,255,0.5)',
                border: activeCategory === cat ? 'none' : '1px solid rgba(26,107,255,0.15)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {visible.map((faq, idx) => {
            const isOpen = open === faq.id
            const cc = categoryColors[faq.category] || categoryColors.General
            return (
              <div
                key={faq.id}
                style={{
                  background: isOpen ? 'rgba(26,107,255,0.06)' : 'rgba(10,31,68,0.45)',
                  border: `1px solid ${isOpen ? 'rgba(26,107,255,0.3)' : 'rgba(26,107,255,0.1)'}`,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  transition: 'border-color 0.2s, background 0.2s',
                }}
              >
                {/* Question row */}
                <button
                  onClick={() => setOpen(isOpen ? null : faq.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', gap: '16px',
                    padding: '18px 20px', background: 'transparent', border: 'none',
                    cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                    {/* Number */}
                    <span style={{
                      fontSize: '11px', fontWeight: 700, color: 'rgba(240,244,255,0.2)',
                      fontFamily: 'monospace', flexShrink: 0,
                    }}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontSize: '15px', fontWeight: 600, color: '#F0F4FF',
                      lineHeight: 1.4,
                    }}>
                      {faq.question}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                    {/* Category tag */}
                    <span style={{
                      fontSize: '10px', fontWeight: 600, letterSpacing: '0.08em',
                      textTransform: 'uppercase', padding: '2px 8px', borderRadius: '20px',
                      background: cc.bg, color: cc.color, border: `1px solid ${cc.border}`,
                      display: 'none',
                    }} className="faq-cat-tag">
                      {faq.category}
                    </span>
                    {/* Toggle icon */}
                    <div style={{
                      width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isOpen ? '#1A6BFF' : 'rgba(26,107,255,0.1)',
                      border: `1px solid ${isOpen ? '#1A6BFF' : 'rgba(26,107,255,0.2)'}`,
                      transition: 'background 0.2s, border-color 0.2s',
                    }}>
                      {isOpen
                        ? <Minus size={13} color="#fff" />
                        : <Plus size={13} color="#1A6BFF" />
                      }
                    </div>
                  </div>
                </button>

                {/* Answer */}
                {isOpen && (
                  <div style={{
                    padding: '0 20px 20px 48px',
                    fontSize: '14px',
                    color: 'rgba(240,244,255,0.6)',
                    lineHeight: 1.75,
                    borderTop: '1px solid rgba(26,107,255,0.1)',
                    paddingTop: '16px',
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom contact nudge */}
        <div style={{
          marginTop: '40px', textAlign: 'center',
          padding: '28px', background: 'rgba(10,31,68,0.4)',
          border: '1px solid rgba(26,107,255,0.1)', borderRadius: '14px',
        }}>
          <p style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: 600, color: '#F0F4FF' }}>
            Still have questions?
          </p>
          <p style={{ margin: '0 0 16px', fontSize: '13px', color: 'rgba(240,244,255,0.4)' }}>
            Reach out to the organizing team — we're happy to help.
          </p>
          <a
            href="mailto:hackathon@kab.ac.ug"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '10px 24px', borderRadius: '8px', fontSize: '13px',
              fontWeight: 600, background: '#1A6BFF', color: '#fff', textDecoration: 'none',
            }}
          >
            Contact us
          </a>
        </div>

      </div>
    </section>
  )
}