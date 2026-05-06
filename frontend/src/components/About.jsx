import { useEffect, useRef } from 'react'
import { Target, Lightbulb, Users, TrendingUp } from 'lucide-react'

const objectives = [
  { icon: Target, title: 'Apply Knowledge', desc: 'Give students a platform to apply technical skills and creativity to real-world national challenges.' },
  { icon: Lightbulb, title: 'Drive Innovation', desc: 'Promote development of digital solutions in agriculture, health, education, and economic empowerment.' },
  { icon: Users, title: 'Build Teams', desc: 'Strengthen teamwork, critical thinking, and practical innovation among participants.' },
  { icon: TrendingUp, title: 'National Impact', desc: 'Align student-led innovation with Uganda\'s NDP IV priorities for digital transformation.' },
]

export default function About() {
  const ref = useRef()
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') })
    }, { threshold: 0.1 })
    ref.current?.querySelectorAll('.section-fade').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="about" ref={ref} className="relative py-28 lg:py-36 bg-brand-navy grid-bg overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Label */}
        <div className="section-fade flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-brand-accent" />
          <span className="font-mono text-xs tracking-[0.2em] text-brand-accent uppercase">About the Hackathon</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <div className="section-fade" style={{ transitionDelay: '0.1s' }}>
            <h2 className="font-heading font-800 text-5xl lg:text-6xl text-white leading-none mb-6">
              Where <span className="text-brand-green">Ideas</span><br />Meet <span className="text-brand-accent">Impact</span>
            </h2>
            <p className="font-body text-blue-200 text-base leading-relaxed mb-5">
              The FoCLIS Hackathon 2026 is an innovation-driven initiative that brings together students to develop practical, technology-based solutions to real challenges facing communities across Uganda.
            </p>
            <p className="font-body text-blue-200 text-base leading-relaxed mb-5">
              Organized under the Faculty of Computing, Library and Information Science (FOCLIS) at Kabale University, this is the <strong className="text-white">2nd Edition</strong> of Uganda's most impactful student hackathon.
            </p>
            <p className="font-body text-blue-200 text-base leading-relaxed">
              The hackathon is grounded in Uganda's Fourth National Development Plan (NDP IV), which emphasizes science, technology, innovation, and digital transformation as key drivers of socio-economic growth.
            </p>

            {/* COSAKU / KAB badge */}
            <div className="mt-10 glass rounded-xl p-5 flex items-center gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-accent/20 flex items-center justify-center">
                <span className="font-display text-2xl text-brand-accent">K</span>
              </div>
              <div>
                <div className="font-heading font-700 text-white text-sm">Kabale University · COSAKU</div>
                <div className="font-body text-blue-300 text-xs mt-0.5">Faculty of Computing, Library & Information Science (FOCLIS)</div>
              </div>
            </div>
          </div>

          {/* Right: Objectives */}
          <div className="grid sm:grid-cols-2 gap-4">
            {objectives.map(({ icon: Icon, title, desc }, i) => (
              <div key={title} className="section-fade glass rounded-xl p-5 hover:border-brand-accent/40 hover:shadow-[0_0_30px_rgba(26,107,255,0.1)] transition-all duration-300 group"
                style={{ transitionDelay: `${0.2 + i * 0.1}s` }}>
                <div className="w-10 h-10 rounded-lg bg-brand-accent/15 flex items-center justify-center text-brand-accent mb-4 group-hover:bg-brand-accent/25 transition-colors">
                  <Icon size={20} />
                </div>
                <h3 className="font-heading font-700 text-base text-white mb-2">{title}</h3>
                <p className="font-body text-xs text-blue-300 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="section-fade mt-20 text-center" style={{ transitionDelay: '0.6s' }}>
          <div className="max-w-3xl mx-auto glass rounded-2xl p-10">
            <div className="font-display text-6xl text-brand-accent/30 leading-none mb-4">"</div>
            <p className="font-heading font-600 text-xl lg:text-2xl text-white leading-snug">
              Innovate. Collaborate. Impact.<br />
              <span className="text-brand-green">Build solutions. Create change. Inspire Uganda.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}