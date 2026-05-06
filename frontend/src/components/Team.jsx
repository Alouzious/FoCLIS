import { useEffect, useRef } from 'react'
import { Linkedin, Mail } from 'lucide-react'

const team = [
  {
    name: 'Dr. [Name]',
    role: 'Patron / Dean, FOCLIS',
    dept: 'Faculty of Computing, Library & Information Science',
    initials: 'D',
    color: '#F59E0B',
  },
  {
    name: '[Name]',
    role: 'Hackathon Director',
    dept: 'Lead Organizer & Programme Coordinator',
    initials: 'H',
    color: '#1A6BFF',
  },
  {
    name: '[Name]',
    role: 'Technical Lead',
    dept: 'Infrastructure & Judging Systems',
    initials: 'T',
    color: '#22C55E',
  },
  {
    name: '[Name]',
    role: 'Communications & Outreach',
    dept: 'Marketing, Social Media & Student Engagement',
    initials: 'C',
    color: '#A78BFA',
  },
  {
    name: '[Name]',
    role: 'Partnerships Coordinator',
    dept: 'Sponsorships, Partners & Industry Relations',
    initials: 'P',
    color: '#38BDF8',
  },
  {
    name: '[Name]',
    role: 'COSAKU Representative',
    dept: 'Student Body Liaison & Logistics',
    initials: 'S',
    color: '#FB923C',
  },
]

export default function Team() {
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
    <section id="team" ref={ref} className="relative py-28 lg:py-36 overflow-hidden" style={{ background: '#020B1E' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-green/30 to-transparent" />
      <div className="absolute right-0 top-1/2 w-[500px] h-[500px] rounded-full bg-brand-green/4 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        <div className="section-fade flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-brand-green" />
          <span className="font-mono text-xs tracking-[0.2em] text-brand-green uppercase">The People Behind It</span>
        </div>
        <div className="section-fade mb-16" style={{ transitionDelay: '0.1s' }}>
          <h2 className="font-heading font-800 text-5xl lg:text-6xl text-white leading-none">
            Meet the <span className="text-brand-green">Team</span>
          </h2>
          <p className="font-body text-blue-300 text-base mt-3 max-w-xl">
            A passionate team of faculty, staff, and student leaders driving Uganda's most impactful academic hackathon.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {team.map((member, i) => (
            <div key={i} className="section-fade glass rounded-2xl p-6 hover:scale-[1.02] hover:shadow-xl transition-all duration-300 group"
              style={{ transitionDelay: `${0.1 * i}s`, ['--c']: member.color }}>
              <div className="flex items-start gap-4 mb-5">
                {/* Avatar */}
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center font-display text-2xl text-white"
                  style={{ background: `${member.color}25`, border: `1.5px solid ${member.color}50` }}>
                  <span style={{ color: member.color }}>{member.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-heading font-700 text-white text-base truncate">{member.name}</div>
                  <div className="font-mono text-[10px] tracking-widest mt-0.5" style={{ color: member.color }}>{member.role}</div>
                </div>
              </div>
              <p className="font-body text-xs text-blue-300 leading-relaxed mb-5">{member.dept}</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <button className="w-8 h-8 rounded-lg glass flex items-center justify-center text-blue-400 hover:text-white transition-colors">
                  <Mail size={14} />
                </button>
                <button className="w-8 h-8 rounded-lg glass flex items-center justify-center text-blue-400 hover:text-white transition-colors">
                  <Linkedin size={14} />
                </button>
                <div className="ml-auto">
                  <div className="w-6 h-1 rounded-full" style={{ background: member.color }} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-fade mt-12 text-center" style={{ transitionDelay: '0.7s' }}>
          <p className="font-body text-sm text-blue-400">
            Names and profiles will be updated as the organizing committee is finalized.
          </p>
        </div>
      </div>
    </section>
  )
}