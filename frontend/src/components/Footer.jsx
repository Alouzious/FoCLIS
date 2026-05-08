import { Mail, Phone, MapPin, ExternalLink, Lock } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

const navLinks = [
  { label: 'About', href: '/#about' },
  { label: 'Themes', href: '/themes' },
  { label: 'Prizes', href: '/#prizes' },
  { label: 'Schedule', href: '/#timeline' },
  { label: 'Speakers', href: '/#speakers' },
  { label: 'Partners', href: '/#partners' },
  { label: 'FAQ', href: '/#faq' },
  { label: 'Register', href: '/register' },
]

export default function Footer() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = location.pathname === '/'

  const handleHashLink = (href) => {
    const sectionId = href.split('#')[1]
    if (isHomePage) {
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) element.scrollIntoView({ behavior: 'smooth' })
      }, 0)
    } else {
      navigate(`/#${sectionId}`)
    }
  }

  const handleLinkClick = (e, href) => {
    if (href.includes('#')) {
      e.preventDefault()
      handleHashLink(href)
    }
  }
  return (
    <footer id="contact" className="relative pt-20 pb-10 overflow-hidden" style={{ background: '#010915' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-accent/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 lg:px-10">
        {/* Top grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/5">

          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-xl bg-yellow-400 flex items-center justify-center font-display text-2xl text-gray-900 font-bold">F</div>
              <div>
                <div className="font-heading font-900 text-yellow-400 tracking-widest uppercase text-base">FoCLIS Hackathon</div>
                <div className="font-mono text-[11px] text-yellow-300 tracking-widest font-bold">2nd Edition · 2026</div>
              </div>
            </div>
            <p className="font-body text-sm text-blue-300 leading-relaxed max-w-sm mb-6">
              Innovating for a Resilient Uganda bringing together the brightest student minds to build digital solutions for national development.
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
          <div className="lg:col-span-2">
            <h4 className="font-mono text-xs tracking-widest text-blue-400 uppercase mb-5">Quick Links</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {navLinks.map(link => {
                const isRegister = link.label === 'Register'
                return (
                  <a key={link.label} href={link.href}
                    onClick={(e) => {
                      if (isRegister) e.preventDefault()
                      else handleLinkClick(e, link.href)
                    }}
                    className={`font-heading font-600 text-sm flex items-center gap-2 group ${
                      isRegister 
                        ? 'text-blue-300/40 cursor-not-allowed opacity-50' 
                        : 'text-blue-300 hover:text-white transition-colors'
                    }`}
                    style={isRegister ? { pointerEvents: 'none' } : {}}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/40 group-hover:bg-brand-accent transition-colors flex-shrink-0" />
                    <span className="flex items-center gap-1">
                      {isRegister && <Lock size={13} />}
                      {link.label}
                    </span>
                  </a>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-blue-500 text-center sm:text-left">
            © 2026 FoCLIS Hackathon · Kabale University · All rights reserved
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3">
            <span className="font-mono text-[11px] text-yellow-300 font-semibold">Organized by</span>
            <span className="font-heading font-900 text-sm text-yellow-400">FOCLIS & COSAKU</span>
            <span className="text-yellow-300 font-bold">·</span>
            <span className="font-heading font-900 text-sm text-white">Kabale University</span>
          </div>
        </div>
      </div>
    </footer>
  )
}