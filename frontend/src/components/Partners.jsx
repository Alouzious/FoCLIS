import { useEffect, useRef } from 'react'
import { HandshakeIcon, Building2, GraduationCap, Globe } from 'lucide-react'

const partnerTiers = [
  {
    tier: 'Title Partner',
    color: '#F59E0B',
    partners: [
      { name: 'Kabale University', abbr: 'KAB', desc: 'Host Institution', icon: GraduationCap },
      { name: 'FOCLIS – Faculty of Computing, Library & Information Science', abbr: 'FOCLIS', desc: 'Organizing Faculty', icon: Building2 },
    ],
  },
  {
    tier: 'Supporting Partners',
    color: '#1A6BFF',
    partners: [
      { name: 'COSAKU', abbr: 'COSAKU', desc: 'Computing Students Association', icon: GraduationCap },
      { name: 'Uganda NDP IV Initiative', abbr: 'NDP IV', desc: 'National Development Plan', icon: Globe },
    ],
  },
]

const becomeOptions = [
  { icon: '🤝', title: 'Hack Partner', desc: 'Co-brand the event, sponsor prizes, and gain direct access to Uganda\'s brightest student innovators.' },
  { icon: '🎓', title: 'Academic Partner', desc: 'Collaborate on research tracks, provide expert judges, and strengthen university-industry ties.' },
  { icon: '💼', title: 'Industry Mentor', desc: 'Guide teams, provide technical workshops, and identify solutions relevant to your sector.' },
  { icon: '🏆', title: 'Prize Sponsor', desc: 'Fund awards and recognition for outstanding innovations across the four hackathon tracks.' },
]

export default function Partners() {
  const ref = useRef()

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    ref.current?.querySelectorAll('.section-fade').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <section id="partners" ref={ref} className="relative py-28 lg:py-36 overflow-hidden" style={{ background: '#040E22' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="section-fade flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-brand-accent" />
          <span className="font-mono text-xs tracking-[0.2em] text-brand-accent uppercase">Our Partners</span>
        </div>
        <div className="section-fade mb-16" style={{ transitionDelay: '0.1s' }}>
          <h2 className="font-heading font-800 text-5xl lg:text-6xl text-white leading-none">
            Backed by <span className="text-brand-accent">Excellence</span>
          </h2>
          <p className="font-body text-blue-300 text-base mt-3 max-w-xl">
            The FOCLIS Hackathon is powered by institutions and organizations committed to innovation, digital transformation, and student empowerment.
          </p>
        </div>

        {/* Existing partners */}
        {partnerTiers.map((tier, ti) => (
          <div key={tier.tier} className="section-fade mb-12" style={{ transitionDelay: `${0.2 + ti * 0.1}s` }}>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-xs tracking-widest uppercase" style={{ color: tier.color }}>{tier.tier}</span>
              <div className="h-px flex-1" style={{ background: `${tier.color}30` }} />
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tier.partners.map(p => {
                const Icon = p.icon
                return (
                  <div key={p.name} className="glass rounded-xl p-6 flex flex-col items-center text-center hover:scale-105 transition-all duration-300 group"
                    style={{ borderColor: `${tier.color}30` }}>
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                      style={{ background: `${tier.color}15`, border: `1px solid ${tier.color}30` }}>
                      <Icon size={28} style={{ color: tier.color }} />
                    </div>
                    <div className="font-display text-2xl mb-1" style={{ color: tier.color }}>{p.abbr}</div>
                    <div className="font-heading font-600 text-xs text-white text-center leading-snug mb-1">{p.name}</div>
                    <div className="font-mono text-[10px] text-blue-400 tracking-widest uppercase">{p.desc}</div>
                  </div>
                )
              })}
              {/* Placeholder slots */}
              {[...Array(Math.max(0, 4 - tier.partners.length))].map((_, i) => (
                <div key={`ph-${i}`} className="glass rounded-xl p-6 flex flex-col items-center text-center border-dashed opacity-40"
                  style={{ border: `1.5px dashed ${tier.color}40` }}>
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: `${tier.color}08` }}>
                    <span className="text-2xl opacity-40">+</span>
                  </div>
                  <div className="font-mono text-[10px] text-blue-500 tracking-widest uppercase">Your Logo Here</div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Become a partner */}
        <div className="section-fade mt-20" style={{ transitionDelay: '0.5s' }}>
          <div className="glass rounded-2xl p-10 lg:p-14" style={{ background: 'rgba(26,107,255,0.06)', borderColor: 'rgba(26,107,255,0.2)' }}>
            <div className="flex items-center gap-3 mb-3">
              <HandshakeIcon size={20} className="text-brand-accent" />
              <span className="font-mono text-xs tracking-widest text-brand-accent uppercase">Partner With Us</span>
            </div>
            <h3 className="font-heading font-800 text-3xl lg:text-4xl text-white mb-4">
              Become a <span className="text-brand-accent">Hack Partner</span>
            </h3>
            <p className="font-body text-blue-300 text-base mb-10 max-w-2xl">
              Join us in shaping Uganda's next generation of digital innovators. Partnering with FOCLIS Hackathon 2026 means connecting your brand to impact, excellence, and national development.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {becomeOptions.map(opt => (
                <div key={opt.title} className="glass rounded-xl p-5 hover:bg-white/5 transition-all duration-300">
                  <div className="text-3xl mb-3">{opt.icon}</div>
                  <h4 className="font-heading font-700 text-sm text-white mb-2">{opt.title}</h4>
                  <p className="font-body text-xs text-blue-300 leading-relaxed">{opt.desc}</p>
                </div>
              ))}
            </div>
            <a href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-accent text-white font-heading font-700 text-sm tracking-wider uppercase hover:shadow-[0_0_40px_rgba(26,107,255,0.6)] hover:scale-105 transition-all duration-300">
              Enquire About Partnership →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}