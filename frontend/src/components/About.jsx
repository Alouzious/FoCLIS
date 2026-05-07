import { useEffect, useRef } from 'react'
import { Target, Lightbulb, Users, TrendingUp, Rocket, Globe } from 'lucide-react'

const objectives = [
  {
    icon: Target,
    title: 'Apply Knowledge',
    desc: 'Give students a real platform to apply technical skills and creativity to national challenges that matter.',
  },
  {
    icon: Lightbulb,
    title: 'Drive Innovation',
    desc: 'Promote digital solutions across agriculture, health, education, and economic empowerment.',
  },
  {
    icon: Users,
    title: 'Build Teams',
    desc: 'Strengthen collaboration, critical thinking, and practical innovation among participants.',
  },
  {
    icon: TrendingUp,
    title: 'National Impact',
    desc: "Align student-led innovation with Uganda's NDP IV priorities for digital transformation.",
  },
  {
    icon: Rocket,
    title: 'Seed Prototypes',
    desc: 'Generate ideas with real potential for incubation, partnership, and community impact.',
  },
  {
    icon: Globe,
    title: 'Raise FOCLIS',
    desc: 'Establish FOCLIS as a recognised centre for innovation and technology-driven change.',
  },
]

export default function About() {
  const ref = useRef()

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('ab-visible') }),
      { threshold: 0.08 }
    )
    ref.current?.querySelectorAll('.ab-fade').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} className="about-root">

      <div className="about-container">

        {/* ── TOP: Eyebrow + Headline + Body ── */}
        <div className="about-intro ab-fade">
          <span className="about-eyebrow">About the Hackathon</span>
          <h2 className="about-heading">
            Student innovation,<br />
            <span className="about-heading-accent">applied to Uganda.</span>
          </h2>
        </div>

        <div className="about-body-grid ab-fade" style={{ transitionDelay: '0.1s' }}>
          <p className="about-body-text">
            The <strong>FoCLIS Hackathon 2026</strong> is an innovation-driven initiative organised under the Faculty of Computing, Library and Information Science at Kabale University. Now in its <strong>2nd Edition</strong>, it brings together students to build practical, technology-based solutions to real challenges facing communities across Uganda.
          </p>
          <p className="about-body-text">
            The hackathon is rooted in Uganda's Fourth National Development Plan (NDP IV), which places science, technology, innovation, and digital transformation at the centre of socio-economic growth. Students are challenged to go beyond the classroom, identifying pressing problems and developing working prototypes that respond to what communities actually need.
          </p>
        </div>

        {/* ── DIVIDER ── */}
        <div className="about-rule ab-fade" style={{ transitionDelay: '0.15s' }} />

        {/* ── MIDDLE: Theme Block ── */}
        <div className="about-theme-block ab-fade" style={{ transitionDelay: '0.18s' }}>
          <span className="about-theme-label">2026 Theme</span>
          <p className="about-theme-text">
            "Innovating for a Resilient Uganda: Advancing Climate-Smart Agriculture, Inclusive Health and Education, and Economic Empowerment"
          </p>
        </div>

        {/* ── DIVIDER ── */}
        <div className="about-rule ab-fade" style={{ transitionDelay: '0.2s' }} />

        {/* ── BOTTOM: Objectives ── */}
        <div className="about-obj-header ab-fade" style={{ transitionDelay: '0.22s' }}>
          <span className="about-eyebrow">Objectives</span>
          <h3 className="about-subheading">What we aim to achieve</h3>
        </div>

        <div className="about-obj-grid">
          {objectives.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="about-obj-card ab-fade"
              style={{ transitionDelay: `${0.25 + i * 0.06}s` }}
            >
              <div className="about-obj-icon">
                <Icon size={20} />
              </div>
              <div>
                <h4 className="about-obj-title">{title}</h4>
                <p className="about-obj-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}