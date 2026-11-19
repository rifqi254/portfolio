import { useEffect, useRef } from 'react'
import ChromeSculpture from '../components/ChromeSculpture'
import { InstagramIcon, GitHubIcon, LinkedInIcon, MailIcon } from '../components/SocialIcons'
import { playBubblePop, playChime } from '../hooks/useAudioFX'
import './Hero.css'

export default function Hero({ onOpenResume }) {
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
    playBubblePop()
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
      {/* ─── Lush Emerald Meadow & Rolling Botanical Hills (Surreal Botanical) ─── */}
      <div className="hero__meadow" aria-hidden="true">
        {/* Layer 1: Distant rolling emerald hills */}
        <svg className="hero__hills hero__hills--back" viewBox="0 0 1440 220" fill="none" preserveAspectRatio="none">
          <path d="M0,80 C320,160 540,20 860,90 C1140,150 1320,50 1440,70 L1440,220 L0,220 Z" fill="url(#hillGrad1)" />
          <defs>
            <linearGradient id="hillGrad1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="50%" stopColor="#059669" />
              <stop offset="100%" stopColor="#064e3b" />
            </linearGradient>
          </defs>
        </svg>

        {/* Layer 2: Foreground meadow with soft dew reflection */}
        <svg className="hero__hills hero__hills--front" viewBox="0 0 1440 160" fill="none" preserveAspectRatio="none">
          <path d="M0,60 C280,10 600,100 960,30 C1200,-10 1360,50 1440,40 L1440,160 L0,160 Z" fill="url(#hillGrad2)" />
          <defs>
            <linearGradient id="hillGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="40%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>
        </svg>

        {/* ─── Giant Surreal Botanical Flora (20% Surreal Botanical - Metallic Chrome & Iridescent) ─── */}
        <div className="hero__surreal-flora">
          {/* Flower 1: Metallic Chrome Mirror Daisy with Golden Amber Center (Ref: Image 2) */}
          <div className="surreal-flower surreal-flower--lotus" title="Surreal Chrome Daisy (Y3K Botanical)">
            <svg viewBox="0 0 120 140" className="surreal-flower__svg">
              <path d="M60,140 Q55,100 60,60" stroke="#059669" strokeWidth="4" fill="none" strokeLinecap="round" />
              <path d="M40,90 Q60,75 55,60" stroke="#10b981" strokeWidth="2.5" fill="none" />
              {/* Metallic Chrome Mirror Petals */}
              <ellipse cx="60" cy="50" rx="14" ry="32" fill="url(#chromePetal1)" transform="rotate(-30 60 50)" />
              <ellipse cx="60" cy="50" rx="14" ry="32" fill="url(#chromePetal1)" transform="rotate(30 60 50)" />
              <ellipse cx="60" cy="46" rx="13" ry="28" fill="url(#chromePetal2)" transform="rotate(-15 60 46)" />
              <ellipse cx="60" cy="46" rx="13" ry="28" fill="url(#chromePetal2)" transform="rotate(15 60 46)" />
              <ellipse cx="60" cy="42" rx="11" ry="24" fill="url(#chromePetal1)" />
              {/* Glowing Golden Amber Center Pistil (Image 2 style) */}
              <circle cx="60" cy="44" r="7.5" fill="#f59e0b" filter="drop-shadow(0 0 8px #f59e0b)" />
              <circle cx="60" cy="44" r="4.5" fill="#fbbf24" />
              <defs>
                <linearGradient id="chromePetal1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="25%" stopColor="#e2e8f0" />
                  <stop offset="50%" stopColor="#94a3b8" />
                  <stop offset="75%" stopColor="#ffffff" />
                  <stop offset="90%" stopColor="#bae6fd" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
                <linearGradient id="chromePetal2" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="35%" stopColor="#cbd5e1" />
                  <stop offset="65%" stopColor="#64748b" />
                  <stop offset="85%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#7dd3fc" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Flower 2: Iridescent Liquid Chrome Orchid (Ref: Image 4) */}
          <div className="surreal-flower surreal-flower--orchid" title="Iridescent Liquid Chrome Orchid">
            <svg viewBox="0 0 100 130" className="surreal-flower__svg">
              <path d="M50,130 Q45,85 50,55" stroke="#047857" strokeWidth="3.5" fill="none" strokeLinecap="round" />
              <path d="M50,90 Q70,80 62,65" stroke="#10b981" strokeWidth="2" fill="none" />
              <ellipse cx="50" cy="48" rx="18" ry="12" fill="url(#iridPetal1)" transform="rotate(-35 50 48)" />
              <ellipse cx="50" cy="48" rx="18" ry="12" fill="url(#iridPetal1)" transform="rotate(35 50 48)" />
              <ellipse cx="50" cy="40" rx="14" ry="22" fill="url(#iridPetal2)" />
              {/* Golden Amber Glowing Stamen */}
              <circle cx="50" cy="42" r="5.5" fill="#f59e0b" filter="drop-shadow(0 0 10px #f59e0b)" />
              <circle cx="50" cy="42" r="3" fill="#fbbf24" />
              <defs>
                <linearGradient id="iridPetal1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="25%" stopColor="#fed7aa" />
                  <stop offset="50%" stopColor="#e2e8f0" />
                  <stop offset="75%" stopColor="#93c5fd" />
                  <stop offset="90%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
                <linearGradient id="iridPetal2" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#cbd5e1" />
                  <stop offset="40%" stopColor="#fef08a" />
                  <stop offset="70%" stopColor="#7dd3fc" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Flower 3: Liquid Chrome Cyan Flora Bloom */}
          <div className="surreal-flower surreal-flower--bloom" title="Liquid Chrome Botanical Bloom">
            <svg viewBox="0 0 90 120" className="surreal-flower__svg">
              <path d="M45,120 Q50,80 45,50" stroke="#059669" strokeWidth="3" fill="none" strokeLinecap="round" />
              <ellipse cx="45" cy="42" rx="10" ry="20" fill="url(#bloomChromeGrad)" transform="rotate(-40 45 42)" />
              <ellipse cx="45" cy="42" rx="10" ry="20" fill="url(#bloomChromeGrad)" transform="rotate(40 45 42)" />
              <ellipse cx="45" cy="42" rx="10" ry="20" fill="url(#bloomChromeGrad)" transform="rotate(0 45 42)" />
              <circle cx="45" cy="40" r="4.5" fill="#10b981" filter="drop-shadow(0 0 8px #10b981)" />
              <circle cx="45" cy="40" r="2" fill="#a3e635" />
              <defs>
                <linearGradient id="bloomChromeGrad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#64748b" />
                  <stop offset="35%" stopColor="#cbd5e1" />
                  <stop offset="65%" stopColor="#ffffff" />
                  <stop offset="85%" stopColor="#67e8f9" />
                  <stop offset="100%" stopColor="#ffffff" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Scattered Wildflowers across meadow */}
        <div className="hero__wildflowers">
          <span className="flower flower--1" style={{ left: '6%', bottom: '26px' }}>🌿</span>
          <span className="flower flower--2" style={{ left: '18%', bottom: '44px' }}>✨</span>
          <span className="flower flower--3" style={{ left: '32%', bottom: '20px' }}>🌱</span>
          <span className="flower flower--4" style={{ left: '48%', bottom: '50px' }}>🌸</span>
          <span className="flower flower--5" style={{ left: '62%', bottom: '28px' }}>✨</span>
          <span className="flower flower--6" style={{ left: '76%', bottom: '46px' }}>🌿</span>
          <span className="flower flower--7" style={{ left: '88%', bottom: '22px' }}>🌱</span>
        </div>
      </div>

      {/* ─── Floating Aero Glass Water Bubbles (70% Frutiger Aero) ─── */}
      <div className="hero__aero-bubbles" aria-hidden="true">
        <div className="aero-bubble aero-bubble--1" />
        <div className="aero-bubble aero-bubble--2" />
        <div className="aero-bubble aero-bubble--3" />
        <div className="aero-bubble aero-bubble--4" />
        <div className="aero-bubble aero-bubble--5" />
      </div>

      {/* Floating Metallic Chrome Stars (10% Y3K) */}
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
              Available for Opportunities · Full-Stack Web Developer
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

          {/* Short Bio */}
          <p className="hero__tagline">
            Passionate about crafting digital experiences that merge technical precision with creative vision. Specializing in full-stack web development, backend architecture, and UI/UX design.
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
            <button
              type="button"
              className="hero__btn hero__btn--cv"
              onClick={() => {
                playChime()
                if (onOpenResume) onOpenResume()
                else window.dispatchEvent(new CustomEvent('open-resume'))
              }}
              title="Buka Dokumen Resmi CV (Curriculum Vitae)"
            >
              <span className="hero__btn-icon">📄</span>
              <span className="hero__btn-text">Curriculum Vitae</span>
            </button>
            <a
              href="#contact"
              className="hero__btn hero__btn--secondary"
              onClick={(e) => handleScrollTo(e, 'contact', 'Let\'s Collaborate', '06')}
            >
              <span className="hero__btn-text">Connect</span>
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

            {/* Digital Eden Artifact Floating Glass Card */}
            <div className="hero__sculpture-card">
              <div className="sculpture-card__top">
                <span className="sculpture-card__dot" />
                <span className="sculpture-card__badge">INTERACTIVE 3D OBJECT</span>
              </div>
              <h4 className="sculpture-card__title">LIQUID CHROME TORUS</h4>
              <p className="sculpture-card__meta">
                Three.js WebGL · Real-Time Reflection · Cursor Physics
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
