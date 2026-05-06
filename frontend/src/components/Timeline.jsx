import { useEffect, useRef } from 'react'
import { Megaphone, FileText, Search, Code, PresentationIcon, Trophy } from 'lucide-react'

const phases = [
  {
    phase: 'Phase 1',
    icon: Megaphone,
    label: 'Awareness',
    title: 'Promotions & Engagement',
    desc: 'Creating awareness through campaigns, outreach, and student engagement activities.',
    date: '6 May – 5 June',
    color: '#1A6BFF',
    status: 'active',
  },
  {
    phase: 'Phase 2',
    icon: FileText,
    label: 'Applications',
    title: 'Call for Abstracts',
    desc: 'Participants submit project ideas and abstracts aligned with the hackathon theme.',
    date: '6 June – 31 July',
    color: '#22C55E',
    status: 'upcoming',
  },
  {
    phase: 'Phase 3',
    icon: Search,
    label: 'Review 1',
    title: 'Abstract Review & Feedback',
    desc: 'Evaluation of submitted abstracts with feedback to guide selected teams forward.',
    date: '1 Aug – 6 Aug',
    color: '#38BDF8',
    status: 'upcoming',
  },
  {
    phase: 'Phase 4',
    icon: Code,
    label: 'Development',
    title: 'Demo Projects & Pitch Decks',
    desc: 'Selected teams develop working prototypes and prepare pitch presentations.',
    date: '7 Aug – 2 Sept',
    color: '#A78BFA',
    status: 'upcoming',
  },
  {
    phase: 'Phase 5',
    icon: PresentationIcon,
    label: 'Review 2',
    title: 'Demo & Pitch Review',
    desc: 'Assessment of demo projects and pitch decks with expert feedback for final polish.',
    date: '3 Sept – 9 Sept',
    color: '#FB923C',
    status: 'upcoming',
  },
  {
    phase: 'Phase 6',
    icon: Trophy,
    label: 'Final Event',
    title: 'Pitching Day 🏆',
    desc: 'Teams present final solutions to judges. Winners selected and awards presented.',
    date: '16 September',
    color: '#F59E0B',
    status: 'final',
  },
]

export default function Timeline() {
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
    <section id="timeline" ref={ref} className="relative py-28 lg:py-36 overflow-hidden" style={{ background: '#020B1E' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />
      {/* background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-accent/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="section-fade flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-brand-gold" />
          <span className="font-mono text-xs tracking-[0.2em] text-brand-gold uppercase">Hackathon Journey</span>
        </div>
        <div className="section-fade mb-16" style={{ transitionDelay: '0.1s' }}>
          <h2 className="font-heading font-800 text-5xl lg:text-6xl text-white leading-none">
            Timeline of <span className="text-brand-gold">Activities</span>
          </h2>
          <p className="font-body text-blue-300 text-base mt-3 max-w-xl">
            From awareness to awards — follow the full journey of the FOCLIS Hackathon 2026.
          </p>
        </div>

        {/* Desktop timeline */}
        <div className="hidden lg:block relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-accent/60 via-brand-gold/40 to-brand-gold/20" />

          <div className="space-y-0">
            {phases.map((p, i) => {
              const Icon = p.icon
              const isLeft = i % 2 === 0
              return (
                <div key={p.phase} className={`section-fade relative grid grid-cols-2 gap-0 items-center`}
                  style={{ transitionDelay: `${0.1 * i}s` }}>
                  {/* Left content */}
                  <div className={`pr-16 py-8 ${isLeft ? '' : 'opacity-0 pointer-events-none'}`}>
                    {isLeft && (
                      <div className="glass rounded-2xl p-6 hover:shadow-lg transition-all duration-300 text-right group"
                        style={{ '--accent': p.color }}>
                        <div className="font-mono text-[10px] tracking-widest mb-1" style={{ color: p.color }}>{p.phase} · {p.label}</div>
                        <h3 className="font-heading font-700 text-lg text-white mb-2">{p.title}</h3>
                        <p className="font-body text-sm text-blue-300 leading-relaxed mb-4">{p.desc}</p>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-600"
                          style={{ background: `${p.color}20`, color: p.color, border: `1px solid ${p.color}40` }}>
                          📅 {p.date}
                        </div>
                        {p.status === 'active' && (
                          <div className="mt-3 flex justify-end">
                            <span className="flex items-center gap-1.5 text-xs font-mono text-brand-green">
                              <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse inline-block" />
                              Ongoing Now
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 z-10">
                    <div className="w-12 h-12 rounded-full glass flex items-center justify-center shadow-lg"
                      style={{ border: `2px solid ${p.color}`, boxShadow: `0 0 20px ${p.color}40` }}>
                      <Icon size={20} style={{ color: p.color }} />
                    </div>
                  </div>

                  {/* Right content */}
                  <div className={`pl-16 py-8 ${!isLeft ? '' : 'opacity-0 pointer-events-none'}`}>
                    {!isLeft && (
                      <div className="glass rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group">
                        <div className="font-mono text-[10px] tracking-widest mb-1" style={{ color: p.color }}>{p.phase} · {p.label}</div>
                        <h3 className="font-heading font-700 text-lg text-white mb-2">{p.title}</h3>
                        <p className="font-body text-sm text-blue-300 leading-relaxed mb-4">{p.desc}</p>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-600"
                          style={{ background: `${p.color}20`, color: p.color, border: `1px solid ${p.color}40` }}>
                          📅 {p.date}
                        </div>
                        {p.status === 'final' && (
                          <div className="mt-3">
                            <span className="flex items-center gap-1.5 text-xs font-mono text-brand-gold">
                              🏆 Grand Final · Mark Your Calendar
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile timeline */}
        <div className="lg:hidden relative pl-8">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-brand-accent/60 to-brand-gold/20" />
          <div className="space-y-6">
            {phases.map((p, i) => {
              const Icon = p.icon
              return (
                <div key={p.phase} className="section-fade relative" style={{ transitionDelay: `${0.1 * i}s` }}>
                  <div className="absolute -left-8 top-5 w-6 h-6 rounded-full glass flex items-center justify-center"
                    style={{ border: `1.5px solid ${p.color}` }}>
                    <Icon size={12} style={{ color: p.color }} />
                  </div>
                  <div className="glass rounded-xl p-5">
                    <div className="font-mono text-[10px] tracking-widest mb-1" style={{ color: p.color }}>{p.phase} · {p.date}</div>
                    <h3 className="font-heading font-700 text-base text-white mb-1">{p.title}</h3>
                    <p className="font-body text-xs text-blue-300 leading-relaxed">{p.desc}</p>
                    {p.status === 'active' && (
                      <span className="mt-2 flex items-center gap-1.5 text-xs font-mono text-brand-green">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse inline-block" />
                        Ongoing Now
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}