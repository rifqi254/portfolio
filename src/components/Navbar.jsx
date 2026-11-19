import { useState, useEffect } from 'react'
import { playBubblePop, playChime } from '../hooks/useAudioFX'
import './Navbar.css'

const navLinks = [
  { label: 'About', href: '#about', code: '01', name: 'Profile & Philosophy' },
  { label: 'Archive', href: '#archive', code: '02', name: 'Works, Certs & Awards' },
  { label: 'Moments', href: '#moments', code: '03', name: 'Life & Community' },
  { label: 'Skills', href: '#skills', code: '04', name: 'Tech Stack & Arsenal' },
  { label: 'Timeline', href: '#timeline', code: '05', name: 'Career & Growth' },
  { label: 'Contact', href: '#contact', code: '06', name: 'Let’s Collaborate' },
]

export default function Navbar({ onOpenResume }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [isMuted, setIsMuted] = useState(() => {
    return localStorage.getItem('porto_sound_muted') === 'true'
  })

  const toggleSound = () => {
    const nextState = !isMuted
    setIsMuted(nextState)
    localStorage.setItem('porto_sound_muted', String(nextState))
    if (!nextState) playBubblePop()
  }

  useEffect(() => {
    const sectionIds = ['about', 'archive', 'moments', 'skills', 'timeline', 'contact']

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // If user reaches near the bottom of page, highlight contact
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80) {
        setActiveSection('contact')
        return
      }

      const scrollPos = window.scrollY + 160
      let current = ''
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el && scrollPos >= el.offsetTop) {
          current = id
        }
      }
      setActiveSection(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const id = href.startsWith('#') ? href.slice(1) : href
    const matched = navLinks.find((l) => l.href === href)
    setActiveSection(id)

    window.dispatchEvent(
      new CustomEvent('warp-to-section', {
        detail: {
          id,
          name: matched ? matched.name : id.toUpperCase(),
          code: matched ? matched.code : '00',
        },
      })
    )
    setMobileOpen(false)
  }

  const handleLogoClick = (e) => {
    e.preventDefault()
    window.dispatchEvent(
      new CustomEvent('warp-to-section', {
        detail: {
          id: 'hero',
          name: 'Identity & Home',
          code: '00',
        },
      })
    )
  }

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`} role="banner">
      <div className="navbar__inner">
        {/* Logo */}
        <a href="#hero" className="navbar__logo" onClick={handleLogoClick}>
          <span className="navbar__logo-icon">
            <StarIcon />
          </span>
          <span className="navbar__logo-text">
            <span className="logo-main">Rifqi</span>
            <span className="logo-accent">M.</span>
          </span>
          <span className="navbar__logo-badge">DEV</span>
        </a>

        {/* Desktop Nav */}
        <nav className="navbar__nav" aria-label="Main navigation">
          <ul className="navbar__links">
            {navLinks.map(({ label, href, code }, i) => {
              const isActive = activeSection === href.slice(1)
              return (
                <li key={label}>
                  {i > 0 && <span className="navbar__sep" aria-hidden="true" />}
                  <a
                    href={href}
                    className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                    onClick={(e) => handleNavClick(e, href)}
                  >
                    <span className="navbar__link-num">{code}</span>
                    <span className="navbar__link-text">{label}</span>
                    {isActive && <span className="navbar__link-spark">✦</span>}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="navbar__extras">
          {/* Sound FX Toggle Button */}
          <button
            className={`navbar__sound-btn ${isMuted ? 'is-muted' : ''}`}
            onClick={toggleSound}
            title={isMuted ? 'Suara FX: Nonaktif (Klik untuk Mengaktifkan)' : 'Suara FX: Aktif (Klik untuk Mematikan)'}
            aria-label="Toggle Sound Effects"
          >
            <span>{isMuted ? '🔈' : '🔊'}</span>
          </button>
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="navbar__cta btn btn-primary"
          onClick={(e) => {
            playBubblePop()
            handleNavClick(e, '#contact')
          }}
        >
          <span>Hire Me</span>
          <span>✦</span>
        </a>

        {/* Mobile Toggle */}
        <button
          id="mobile-menu-toggle"
          className={`navbar__hamburger ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <nav className="navbar__mobile" aria-label="Mobile navigation">
          <ul className="navbar__mobile-links">
            {navLinks.map(({ label, href, code }) => (
              <li key={label}>
                <a
                  href={href}
                  className={`navbar__mobile-link ${activeSection === href.slice(1) ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, href)}
                >
                  <span className="mobile-code">{code}</span>
                  <span className="mobile-label">{label}</span>
                  <span className="mobile-dot">✦</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M10 2L11.8 7.8H18L12.9 11.4L14.7 17.2L10 13.6L5.3 17.2L7.1 11.4L2 7.8H8.2L10 2Z"
        fill="url(#logoGrad)"
      />
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="20" y2="20">
          <stop offset="0%" stopColor="#0066ff" />
          <stop offset="50%" stopColor="#00ccff" />
          <stop offset="100%" stopColor="#ff007f" />
        </linearGradient>
      </defs>
    </svg>
  )
}
