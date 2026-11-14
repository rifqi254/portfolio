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
    <section className="hero" ref={heroRef} id="hero" aria-label="Hero section — Surrealist Y2K Digital Dreamscape">
      {/* ─── Surreal Sky Background Layers (Reference 01) ─── */}
      <div className="hero__sky" aria-hidden="true">
        <div className="hero__sun" />
        <div className="hero__flare hero__flare--1" />
        <div className="hero__flare hero__flare--2" />
        <div className="hero__flare hero__flare--3" />
        <div className="hero__clouds">
          <div className="hero__cloud hero__cloud--1" />
          <div className="hero__cloud hero__cloud--2" />
          <div className="hero__cloud hero__cloud--3" />
        </div>
      </div>

      {/* ─── Lush Green Grass Meadow & Rolling Hills (Reference 01 & 02) ─── */}
      <div className="hero__meadow" aria-hidden="true">
        {/* Layer 1: Distant rolling green hills */}
        <svg className="hero__hills hero__hills--back" viewBox="0 0 1440 220" fill="none" preserveAspectRatio="none">
          <path d="M0,80 C320,160 540,20 860,90 C1140,150 1320,50 1440,70 L1440,220 L0,220 Z" fill="url(#hillGrad1)" />
          <defs>
            <linearGradient id="hillGrad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2e7d32" />
              <stop offset="50%" stopColor="#1b5e20" />
              <stop offset="100%" stopColor="#0a2e0e" />
            </linearGradient>
          </defs>
        </svg>

        {/* Layer 2: Foreground meadow with wildflowers */}
        <svg className="hero__hills hero__hills--front" viewBox="0 0 1440 160" fill="none" preserveAspectRatio="none">
          <path d="M0,60 C280,10 600,100 960,30 C1200,-10 1360,50 1440,40 L1440,160 L0,160 Z" fill="url(#hillGrad2)" />
          <defs>
            <linearGradient id="hillGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#43a047" />
              <stop offset="40%" stopColor="#2e7d32" />
              <stop offset="100%" stopColor="#1b5e20" />
            </linearGradient>
          </defs>
        </svg>

        {/* Scaffolding Ground Anchor Shadows */}
        <div className="hero__scaffolding">
          <span className="pole pole--1" />
          <span className="pole pole--2" />
          <span className="pole pole--3" />
        </div>

        {/* Scattered Wildflowers across meadow */}
        <div className="hero__wildflowers">
          <span className="flower flower--1" style={{ left: '5%', bottom: '26px' }}>🌸</span>
          <span className="flower flower--2" style={{ left: '14%', bottom: '44px' }}>🌼</span>
          <span className="flower flower--3" style={{ left: '25%', bottom: '18px' }}>🌺</span>
          <span className="flower flower--4" style={{ left: '42%', bottom: '50px' }}>🌼</span>
          <span className="flower flower--5" style={{ left: '60%', bottom: '28px' }}>🌸</span>
          <span className="flower flower--6" style={{ left: '72%', bottom: '46px' }}>🌼</span>
          <span className="flower flower--7" style={{ left: '85%', bottom: '22px' }}>🌺</span>
          <span className="flower flower--8" style={{ left: '95%', bottom: '38px' }}>🌸</span>
        </div>
      </div>

      {/* ─── Film Grain & Editorial Markings Overlay ─── */}
      <div className="hero__grain" aria-hidden="true" />

      {/* Red Graphic Markings & White Scribbles (Reference 02) */}
      <div className="hero__scribble-wrap" aria-hidden="true">
        <svg className="hero__scribble hero__scribble--1" viewBox="0 0 100 100" fill="none">
          <path d="M10,50 Q30,10 60,40 T90,20" stroke="#ff2244" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
          <circle cx="90" cy="20" r="4" fill="#ff2244" />
        </svg>
        <svg className="hero__scribble hero__scribble--2" viewBox="0 0 120 60" fill="none">
          <path d="M10,20 C40,50 80,0 110,35" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 4" opacity="0.6" />
        </svg>
      </div>

      {/* Floating Metallic Y2K Stars */}
      <span className="hero__star hero__star--1" aria-hidden="true">✦</span>
      <span className="hero__star hero__star--2" aria-hidden="true">★</span>
      <span className="hero__star hero__star--3" aria-hidden="true">✧</span>

      {/* ─── Main Content Grid — Asymmetric Editorial Layout ─── */}
      <div className="hero__content container">
        {/* Left Column — Oversized Display Typography, Roles & Profile */}
        <div className="hero__left">
          {/* Status badge with neon green dot */}
          <div className="hero__edition-pill">
            <span className="hero__edition-dot" />
            <span className="hero__edition-text">
              SURREALIST DIGITAL DREAMSCAPE · 2026
            </span>
          </div>

          {/* Main Oversized Display Typography (Reference 01 Graffiti Chrome) */}
          <h1 className="hero__name">
            <span className="hero__name-chrome" data-text="RIFQI">RIFQI</span>
            <span className="hero__name-chrome hero__name-chrome--second" data-text="MAULANA">MAULANA</span>
          </h1>

          {/* Exact Role Badges */}
          <div className="hero__role-badges">
            <span className="hero__role-badge role--inf">INFORMATICS STUDENT</span>
            <span className="hero__role-sep">✦</span>
            <span className="hero__role-badge role--dev">WEB DEVELOPER</span>
            <span className="hero__role-sep">✦</span>
            <span className="hero__role-badge role--tech">CREATIVE TECHNOLOGY ENTHUSIAST</span>
          </div>

          {/* Poetic Motto & Short Bio */}
          <p className="hero__tagline">
            "Akankah kita bertemu matahari?" Membangun karya web eksperimental, arsitektur backend berkinerja tinggi, dan pengalaman digital surrealis di antara logam reflektif &amp; padang rumput digital.
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
