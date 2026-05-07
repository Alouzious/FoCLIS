import { useState, useEffect } from 'react'
import { Menu, X, Lock } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// ─── Nav Links ─────────────────────────────────────────────────────────────
const navLinks = [
  { label: 'About',     href: '/#about',     type: 'hash' },
  { label: 'Themes',    href: '/themes',      type: 'page' },
  { label: 'Prizes',    href: '/#prizes',     type: 'hash' },
  { label: 'Schedule',  href: '#timeline',   type: 'hash' },
  { label: 'Speakers',  href: '/#speakers',   type: 'hash' },
  { label: 'Partners',  href: '/#partners',   type: 'hash' },
  { label: 'FAQ',       href: '/#faq',        type: 'hash' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const location                = useLocation()
  const navigate                = useNavigate()
  const isHomePage              = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  // Handle hash link navigation
  const handleHashLink = (href) => {
    const sectionId = href.split('#')[1]
    if (isHomePage) {
      // If on homepage, scroll to section
      setTimeout(() => {
        const element = document.getElementById(sectionId)
        if (element) element.scrollIntoView({ behavior: 'smooth' })
      }, 0)
    } else {
      // If on other page, navigate to homepage with hash
      navigate(`/#${sectionId}`)
    }
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

            if (link.type === 'hash') {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleHashLink(link.href)
                  }}
                  className={`navbar-link ${isActive ? 'navbar-link--active' : ''}`}
                >
                  {link.label}
                </a>
              )
            }

            return (
              <Link
                key={link.label}
                to={link.href}
                className={`navbar-link ${isActive ? 'navbar-link--active' : ''}`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* ── Register CTA ─────────────────────────────────────────── */}
        <div className="navbar-cta">
          <button
            disabled
            className="btn-register"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              opacity: 0.5,
              cursor: 'not-allowed',
              pointerEvents: 'none',
            }}
          >
            <Lock size={16} />
            Register Locked
          </button>
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

            if (link.type === 'hash') {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleHashLink(link.href)
                    setOpen(false)
                  }}
                  className={`navbar-drawer-link ${isActive ? 'navbar-drawer-link--active' : ''}`}
                >
                  {link.label}
                </a>
              )
            }

            return (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setOpen(false)}
                className={`navbar-drawer-link ${isActive ? 'navbar-drawer-link--active' : ''}`}
              >
                {link.label}
              </Link>
            )
          })}

          {/* should go on register page not home page which is at pages RegisterPage.jsx */}

          <button
            disabled
            className="btn-register btn-register--mobile"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              opacity: 0.5,
              cursor: 'not-allowed',
              pointerEvents: 'none',
            }}
          >
            <Lock size={16} />
            Register Locked
          </button>
        </nav>
      </div>
    </header>
  )
}