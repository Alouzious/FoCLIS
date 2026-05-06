import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { label: 'About',    href: '/#about',    type: 'hash' },
  { label: 'Themes',   href: '/themes',    type: 'page' },
  { label: 'Timeline', href: '/#timeline', type: 'hash' },
  { label: 'Partners', href: '/#partners', type: 'hash' },
  { label: 'Team',     href: '/#team',     type: 'hash' },
  { label: 'Contact',  href: '/#contact',  type: 'hash' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const location                = useLocation()
  const onThemesPage            = location.pathname === '/themes'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass-strong shadow-lg shadow-black/30' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-10 flex items-center justify-between h-16 lg:h-20">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-brand-accent flex items-center justify-center text-white font-display text-lg leading-none group-hover:shadow-[0_0_20px_rgba(26,107,255,0.7)] transition-shadow">
            F
          </div>
          <div className="hidden sm:block">
            <div className="font-heading font-800 text-sm tracking-widest text-white uppercase">FoCLIS</div>
            <div className="font-mono text-[10px] text-brand-accent tracking-widest">HACKATHON 2026</div>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => {
            const isActive =
              link.type === 'page'
                ? location.pathname === link.href
                : false

            return link.type === 'page' ? (
              <Link
                key={link.label}
                to={link.href}
                className={`font-heading font-600 text-sm tracking-wider uppercase transition-all duration-200 ${
                  isActive
                    ? 'text-white text-glow border-b border-brand-accent pb-0.5'
                    : 'text-blue-200 hover:text-white hover:text-glow'
                }`}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={onThemesPage ? link.href : link.href.replace('/#', '#')}
                className="font-heading font-600 text-sm tracking-wider text-blue-200 hover:text-white hover:text-glow transition-all duration-200 uppercase"
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* ── Desktop CTA ── */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={onThemesPage ? '/#register' : '#register'}
            className="px-5 py-2.5 rounded-lg bg-brand-accent text-white font-heading font-700 text-sm tracking-wider uppercase hover:bg-blue-500 hover:shadow-[0_0_25px_rgba(26,107,255,0.6)] transition-all duration-300"
          >
            Register Now
          </a>
        </div>

        {/* ── Mobile Toggle ── */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      {open && (
        <div className="lg:hidden glass-strong border-t border-blue-900/40">
          <nav className="flex flex-col px-5 py-6 gap-1">
            {navLinks.map(link =>
              link.type === 'page' ? (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={`font-heading font-600 text-base tracking-wider uppercase py-2.5 px-3 rounded-lg transition-all duration-200 ${
                    location.pathname === link.href
                      ? 'text-white bg-brand-accent/20'
                      : 'text-blue-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={onThemesPage ? link.href : link.href.replace('/#', '#')}
                  onClick={() => setOpen(false)}
                  className="font-heading font-600 text-base tracking-wider text-blue-200 hover:text-white uppercase py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all duration-200"
                >
                  {link.label}
                </a>
              )
            )}

            <a
              href={onThemesPage ? '/#register' : '#register'}
              onClick={() => setOpen(false)}
              className="mt-3 px-5 py-3 rounded-lg bg-brand-accent text-white font-heading font-700 text-sm tracking-wider uppercase text-center hover:bg-blue-500 transition-colors"
            >
              Register Now
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}