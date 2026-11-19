import { useEffect, useRef } from 'react'
import ChromeSculpture from '../components/ChromeSculpture'
import { InstagramIcon, GitHubIcon, LinkedInIcon, MailIcon } from '../components/SocialIcons'
import './Hero.css'

export default function Hero() {
  const heroRef = useRef(null)

  // Smooth parallax mouse tracking for typography and 3D depth
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
      heroRef.current.style.setProperty('--mx', x.toFixed(3))
      heroRef.current.style.setProperty('--my', y.toFixed(3))
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleScrollTo = (e, targetId, name, code) => {
    e.preventDefault()
    window.dispatchEvent(
      new CustomEvent('warp-to-section', {
        detail: { id: targetId, name, code },
      })
    )
  }

  return (
    <section className="hero" ref={heroRef} id="hero" aria-label="Hero section — Neo-Y2K Liquid Chrome Digital Lab">
      {/* ─── High-End Neo-Y2K Cybernetic Matrix Atmosphere ─── */}
      <div className="hero__cyber-stage" aria-hidden="true">
        {/* Deep Cyber Ambient Aura Orbs */}
        <div className="hero__cyber-orb hero__cyber-orb--cyan" />
        <div className="hero__cyber-orb hero__cyber-orb--magenta" />
        <div className="hero__cyber-orb hero__cyber-orb--violet" />

        {/* Dynamic Holographic Horizon Laser Beam */}
        <div className="hero__cyber-horizon" />

        {/* 3D Perspective Cyber Floor Grid */}
        <div className="hero__cyber-grid" />

        {/* Cyber Holographic Vector Rings */}
        <div className="hero__cyber-vector-rings">
          <svg viewBox="0 0 800 800" fill="none" className="hero__vector-svg">
            <circle cx="400" cy="400" r="320" stroke="rgba(0, 240, 255, 0.12)" strokeWidth="1.5" strokeDasharray="8 8" />
            <circle cx="400" cy="400" r="240" stroke="rgba(255, 0, 150, 0.14)" strokeWidth="1.5" />
            <circle cx="400" cy="400" r="160" stroke="rgba(0, 240, 255, 0.18)" strokeWidth="1" strokeDasharray="4 6" />
            <line x1="80" y1="400" x2="720" y2="400" stroke="rgba(0, 240, 255, 0.08)" strokeWidth="1" />
            <line x1="400" y1="80" x2="400" y2="720" stroke="rgba(255, 0, 150, 0.08)" strokeWidth="1" />
          </svg>
        </div>

        {/* Subtle Cyber Texture & Laser Sparkles */}
        <div className="hero__grain" />
        <span className="hero__cyber-sparkle sparkle--1">✦</span>
        <span className="hero__cyber-sparkle sparkle--2">✧</span>
        <span className="hero__cyber-sparkle sparkle--3">★</span>
        <span className="hero__cyber-sparkle sparkle--4">✦</span>
      </div>

      {/* ─── Main Content Grid — Asymmetric Editorial Layout ─── */}
      <div className="hero__content container">
        {/* Left Column — Oversized Display Typography, Roles & Profile */}
        <div className="hero__left">
          {/* Status badge with neon green dot */}
          <div className="hero__edition-pill">
            <span className="hero__edition-dot" />
            <span className="hero__edition-text">
              ✦ NEO-Y2K DIGITAL ARCHIVE // 2026 ACTIVE
            </span>
          </div>

          {/* Main Oversized Display Typography (Liquid Chrome) */}
          <h1 className="hero__name">
            <span className="hero__name-chrome" data-text="RIFQI">RIFQI</span>
            <span className="hero__name-chrome hero__name-chrome--second" data-text="MAULANA">MAULANA</span>
          </h1>

          {/* Exact Role Badges */}
          <div className="hero__role-badges">
            <span className="hero__role-badge role--inf">INFORMATICS STUDENT (S7)</span>
            <span className="hero__role-sep">✦</span>
            <span className="hero__role-badge role--dev">FULL-STACK WEB DEVELOPER</span>
            <span className="hero__role-sep">✦</span>
            <span className="hero__role-badge role--tech">CREATIVE TECH ENTHUSIAST</span>
          </div>

          {/* Short Bio */}
          <p className="hero__tagline">
            Mahasiswa Semester 7 Teknik Informatika UIN Banten &amp; Web Developer. Berdedikasi merancang sistem informasi modern dan antarmuka web interaktif berestetika neo-futuristik.
          </p>

          {/* Acrylic Action Buttons */}
          <div className="hero__actions">
            <a
              href="#projects"
              className="hero__btn hero__btn--primary"
              onClick={(e) => handleScrollTo(e, 'projects', 'Featured Works', '02')}
            >
              <span className="hero__btn-text">Explore Works</span>
              <span className="hero__btn-arrow">→</span>
            </a>
            <a
              href="#contact"
              className="hero__btn hero__btn--secondary"
              onClick={(e) => handleScrollTo(e, 'contact', 'Let\'s Collaborate', '06')}
            >
              <span className="hero__btn-text">Connect With Me</span>
              <span className="hero__btn-spark">✦</span>
            </a>
          </div>

          {/* Quick Social Media Chips (Direct Sosmed Access in Home) */}
          <div className="hero__socials" aria-label="Sosial Media Resmi">
            <span className="hero__socials-tag">CHANNELS:</span>
            <a
              href="https://www.instagram.com/alla.an_/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-chip hero__social-chip--ig"
              title="Instagram: @alla.an_"
            >
              <InstagramIcon size={14} />
              <span>@alla.an_</span>
            </a>
            <a
              href="https://github.com/Rifqi254"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-chip hero__social-chip--gh"
              title="GitHub: Rifqi254"
            >
              <GitHubIcon size={14} />
              <span>Rifqi254</span>
            </a>
            <a
              href="https://www.linkedin.com/in/maulana-rifqi-1550962b7/"
              target="_blank"
              rel="noopener noreferrer"
              className="hero__social-chip hero__social-chip--li"
              title="LinkedIn: Maulana Rifqi"
            >
              <LinkedInIcon size={14} />
              <span>LinkedIn</span>
            </a>
            <a
              href="mailto:maulanarifqi741@gmail.com"
              className="hero__social-chip hero__social-chip--mail"
              title="Email: maulanarifqi741@gmail.com"
            >
              <MailIcon size={14} />
              <span>Email</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num">10+</span>
              <span className="hero__stat-label">Projects</span>
            </div>
            <div className="hero__stat-sep" />
            <div className="hero__stat">
              <span className="hero__stat-num">3+</span>
              <span className="hero__stat-label">Years Exp</span>
            </div>
            <div className="hero__stat-sep" />
            <div className="hero__stat">
              <span className="hero__stat-num">7</span>
              <span className="hero__stat-label">Verified Certs</span>
            </div>
          </div>
        </div>

        {/* Right Column — 3D Chrome Sculpture Art Installation */}
        <div className="hero__right">
          <div className="hero__artwork-stage">
            {/* Interactive 3D Liquid Chrome Sculpture (Three.js WebGL) */}
            <ChromeSculpture className="hero__3d-sculpture" />

            {/* Installation Exhibition Floating Card */}
            <div className="hero__sculpture-card">
              <div className="sculpture-card__top">
                <span className="sculpture-card__dot" />
                <span className="sculpture-card__badge">EXHIBITION // PIECE 01</span>
              </div>
              <h4 className="sculpture-card__title">LIQUID CHROME TORUS</h4>
              <p className="sculpture-card__meta">
                Interactive Three.js · Equirectangular Reflection · Real-Time Physics
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
