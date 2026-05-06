import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Themes', href: '#themes' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Partners', href: '#partners' },
  { label: 'Team', href: '#team' },
  { label: 'Register', href: '#register' },
]

export default function Footer() {
  return (
    <footer id="contact" className="relative pt-20 pb-10 overflow-hidden" style={{ background: '#010915' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Top grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/5">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center font-display text-xl text-white">F</div>
              <div>
                <div className="font-heading font-800 text-white tracking-widest uppercase text-sm">FoCLIS Hackathon</div>
                <div className="font-mono text-[10px] text-brand-accent tracking-widest">2nd Edition · 2026</div>
              </div>
            </div>
            <p className="font-body text-sm text-blue-300 leading-relaxed max-w-sm mb-6">
              Innovating for a Resilient Uganda — bringing together the brightest student minds to build digital solutions for national development.
            </p>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-blue-300">
                <MapPin size={15} className="text-brand-accent flex-shrink-0" />
                <span className="font-body text-sm">Kabale University, Kabale, Uganda</span>
              </div>
              <div className="flex items-center gap-3 text-blue-300">
                <Mail size={15} className="text-brand-accent flex-shrink-0" />
                <a href="mailto:hackathon@foclis.ac.ug" className="font-body text-sm hover:text-white transition-colors">
                  hackathon@foclis.ac.ug
                </a>
              </div>
              <div className="flex items-center gap-3 text-blue-300">
                <Phone size={15} className="text-brand-green flex-shrink-0" />
                <span className="font-body text-sm">+256 700 000 000</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs tracking-widest text-blue-400 uppercase mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.label}>
                  <a href={link.href}
                    className="font-heading font-600 text-sm text-blue-300 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/40 group-hover:bg-brand-accent transition-colors" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Dates */}
          <div>
            <h4 className="font-mono text-xs tracking-widest text-blue-400 uppercase mb-5">Key Dates</h4>
            <ul className="space-y-3">
              {[
                { label: 'Awareness Begins', date: 'May 6, 2026', color: '#1A6BFF' },
                { label: 'Applications Open', date: 'June 6, 2026', color: '#22C55E' },
                { label: 'Abstract Deadline', date: 'July 31, 2026', color: '#38BDF8' },
                { label: 'Development Phase', date: 'Aug 7 – Sept 2', color: '#A78BFA' },
                { label: 'Pitching Day 🏆', date: 'Sept 16, 2026', color: '#F59E0B' },
              ].map(item => (
                <li key={item.label} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
                  <div>
                    <div className="font-heading font-600 text-xs text-white leading-tight">{item.label}</div>
                    <div className="font-mono text-[10px] mt-0.5" style={{ color: item.color }}>{item.date}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-blue-500 text-center sm:text-left">
            © 2026 FoCLIS Hackathon · Kabale University · All rights reserved
          </p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-blue-500">Organized by</span>
            <span className="font-heading font-700 text-xs text-brand-accent">FOCLIS & COSAKU</span>
            <span className="font-mono text-[11px] text-blue-500">·</span>
            <span className="font-heading font-700 text-xs text-white">Kabale University</span>
          </div>
        </div>
      </div>
    </footer>
  )
}