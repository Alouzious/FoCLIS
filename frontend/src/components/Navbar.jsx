import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

// ─── Nav Links ─────────────────────────────────────────────────────────────
// Removed: Timeline (was redundant with Schedule)
// Added:   Schedule, Prizes, Speakers, FAQ
const navLinks = [
  { label: 'About',     href: '/#about',     type: 'hash' },
  { label: 'Themes',    href: '/themes',      type: 'page' },
  { label: 'Schedule',  href: '/#schedule',   type: 'hash' },
  { label: 'Prizes',    href: '/#prizes',     type: 'hash' },
  { label: 'Speakers',  href: '/#speakers',   type: 'hash' },
  { label: 'Partners',  href: '/#partners',   type: 'hash' },
  { label: 'Team',      href: '/#team',       type: 'hash' },
  { label: 'FAQ',       href: '/#faq',        type: 'hash' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const location                = useLocation()
  const onThemesPage            = location.pathname === '/themes'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  // Resolve href depending on current page
  const resolveHref = (link) => {
    if (link.type === 'page') return link.href
    return onThemesPage ? link.href : link.href.replace('/#', '#')
  }

  return (
    <header className={`navbar-root ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">

        {/* ── Logo ──────────────────────────────────────────────────── */}
        <Link to="/" className="navbar-logo">
          {/*
            LOGO IMAGE — replace the src below with your actual logo path.
            Example: src="/assets/foclis-logo.png"
            or:       src="https://your-cdn.com/logo.png"

            The placeholder below uses Unsplash for demo purposes only.
          */}
          <img
            src="https://images.unsplash.com/photo-1614332287897-cdc485fa562d?w=40&h=40&fit=crop&crop=center"
            alt="FoCLIS Logo"
            className="navbar-logo-img"
          />
          <div className="navbar-logo-text">
            <span className="navbar-logo-name">FoCLIS</span>
            <span className="navbar-logo-sub">HACKATHON 2026</span>
          </div>
        </Link>

        {/* ── Desktop Nav ───────────────────────────────────────────── */}
        <nav className="navbar-links">
          {navLinks.map(link => {
            const isActive = link.type === 'page' && location.pathname === link.href
            const El       = link.type === 'page' ? Link : 'a'
            const prop     = link.type === 'page' ? { to: link.href } : { href: resolveHref(link) }

            return (
              <El
                key={link.label}
                {...prop}
                className={`navbar-link ${isActive ? 'navbar-link--active' : ''}`}
              >
                {link.label}
              </El>
            )
          })}
        </nav>

        {/* ── Register CTA ─────────────────────────────────────────── */}
        <div className="navbar-cta">
          <Link
            to="/register"
            className="btn-register"
          >
            Register Now
          </Link>
        </div>

        {/* ── Mobile Toggle ────────────────────────────────────────── */}
        <button
          className="navbar-mobile-toggle"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile Drawer ────────────────────────────────────────────── */}
      <div className={`navbar-drawer ${open ? 'navbar-drawer--open' : ''}`}>
        <nav className="navbar-drawer-links">
          {navLinks.map(link => {
            const isActive = link.type === 'page' && location.pathname === link.href
            const El       = link.type === 'page' ? Link : 'a'
            const prop     = link.type === 'page'
              ? { to: link.href, onClick: () => setOpen(false) }
              : { href: resolveHref(link), onClick: () => setOpen(false) }

            return (
              <El
                key={link.label}
                {...prop}
                className={`navbar-drawer-link ${isActive ? 'navbar-drawer-link--active' : ''}`}
              >
                {link.label}
              </El>
            )
          })}

          {/* should go on register page not home page which is at pages RegisterPage.jsx */}

          <Link
            to="/register"
            onClick={() => setOpen(false)}
            className="btn-register btn-register--mobile"
          >
            Register Now
          </Link>
        </nav>
      </div>
    </header>
  )
}