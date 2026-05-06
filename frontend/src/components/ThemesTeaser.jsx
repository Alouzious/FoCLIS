import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'

const tracks = [
  { id: '01', emoji: '🌿', accent: '#22C55E', accentDim: 'rgba(34,197,94,0.10)', accentBorder: 'rgba(34,197,94,0.22)', title: 'Climate-Smart AgriTech', subtitle: 'Building Resilient Food Systems for Uganda', tag: 'Agriculture & Environment' },
  { id: '02', emoji: '❤️', accent: '#F43F5E', accentDim: 'rgba(244,63,94,0.10)', accentBorder: 'rgba(244,63,94,0.22)', title: 'Inclusive Digital Health', subtitle: 'HIV/AIDS, Mental Health & Maternal Care', tag: 'Health & Well-being' },
  { id: '03', emoji: '📚', accent: '#38BDF8', accentDim: 'rgba(56,189,248,0.10)', accentBorder: 'rgba(56,189,248,0.22)', title: 'Future Learning: EdTech', subtitle: 'Quality & Inclusive Education for Uganda', tag: 'Education & Human Capital' },
  { id: '04', emoji: '📈', accent: '#F59E0B', accentDim: 'rgba(245,158,11,0.10)', accentBorder: 'rgba(245,158,11,0.22)', title: 'Digital Economic Empowerment', subtitle: 'Entrepreneurship, Finance & Digital Livelihoods', tag: 'Economy & Youth' },
]

export default function ThemesTeaser() {
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
    <section id="themes" ref={ref} className="relative py-28 lg:py-36 overflow-hidden"
      style={{ background: '#040E22' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-green/40 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[130px] pointer-events-none"
        style={{ background: 'rgba(34,197,94,0.05)' }} />

      <div className="relative max-w-7xl mx-auto px-5 lg:px-10">

        {/* Header */}
        <div className="section-fade flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-brand-green" />
          <span className="font-mono text-xs tracking-[0.2em] text-brand-green uppercase">Innovation Tracks</span>
        </div>

        <div className="section-fade flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"
          style={{ transitionDelay: '0.1s' }}>
          <div>
            <h2 className="font-heading font-800 text-5xl lg:text-6xl text-white leading-none">
              Four <span className="text-brand-green">Sub-Themes</span>
            </h2>
            <p className="font-body text-blue-300 text-base mt-3 max-w-xl">
              Choose a track, identify a real problem, and build a digital solution that creates impact. Each sub-theme is aligned with Uganda's NDP IV priorities.
            </p>
          </div>
          <a href="/themes"
            className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl glass text-white font-heading font-700 text-sm tracking-wider uppercase hover:bg-white/10 transition-all duration-300 group">
            Explore All Themes
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Track cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tracks.map((t, i) => (
            <a key={t.id} href="/themes"
              className="section-fade group rounded-2xl p-6 flex flex-col transition-all duration-300 hover:scale-[1.03] hover:shadow-xl cursor-pointer"
              style={{
                transitionDelay: `${0.1 + i * 0.08}s`,
                background: 'rgba(8,22,54,0.5)',
                border: `1px solid ${t.accentBorder}`,
                backdropFilter: 'blur(12px)',
              }}>
              {/* Emoji */}
              <div className="text-4xl mb-5">{t.emoji}</div>

              {/* Track number */}
              <div className="font-mono text-[10px] tracking-widest uppercase mb-2" style={{ color: t.accent }}>
                Track {t.id} · {t.tag}
              </div>

              {/* Title */}
              <h3 className="font-heading font-700 text-lg text-white leading-tight mb-2">
                {t.title}
              </h3>

              {/* Subtitle */}
              <p className="font-body text-sm text-blue-400 leading-relaxed flex-1">
                {t.subtitle}
              </p>

              {/* Arrow link */}
              <div className="mt-6 flex items-center gap-2 font-mono text-xs tracking-widest uppercase transition-all duration-200"
                style={{ color: t.accent }}>
                View Full Details
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Bottom accent bar */}
              <div className="mt-4 h-0.5 rounded-full transition-all duration-300 w-6 group-hover:w-full"
                style={{ background: t.accent }} />
            </a>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="section-fade mt-14 text-center" style={{ transitionDelay: '0.5s' }}>
          <a href="/themes"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-brand-green text-white font-heading font-700 text-base tracking-wider uppercase hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] hover:scale-105 transition-all duration-300">
            Read Full Sub-Theme Descriptions
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  )
}