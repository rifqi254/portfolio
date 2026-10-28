import { useEffect, useRef } from 'react'
import Y2KShowcase from '../components/Y2KShowcase'
import './Hero.css'

const tickerItems = [
  'Digital Creator', '✦', 'Full Stack Developer', '✦', 'Experimental Thinker', '✦',
  'Y2K Cybercore', '✦', 'Laravel + React', '✦', 'Creative Coding', '✦',
  'Cloud & AI', '✦', 'Interactive UI/UX', '✦', 'Linux SysAdmin', '✦',
  'Digital Creator', '✦', 'Full Stack Developer', '✦', 'Experimental Thinker', '✦',
  'Y2K Cybercore', '✦', 'Laravel + React', '✦', 'Creative Coding', '✦',
  'Cloud & AI', '✦', 'Interactive UI/UX', '✦', 'Linux SysAdmin', '✦',
]

export default function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10
      heroRef.current.style.setProperty('--hero-x', `${x}px`)
      heroRef.current.style.setProperty('--hero-y', `${y}px`)
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
    <section className="hero" ref={heroRef} id="hero" aria-label="Hero section">
      {/* Background Cyber Orbs */}
      <div className="hero__orb hero__orb--1" aria-hidden="true" />
      <div className="hero__orb hero__orb--2" aria-hidden="true" />
      <div className="hero__orb hero__orb--3" aria-hidden="true" />
      <div className="hero__orb hero__orb--4" aria-hidden="true" />

      {/* Grid overlay */}
      <div className="hero__grid" aria-hidden="true" />

      {/* Corner decorations */}
      <div className="hero__deco hero__deco--tl" aria-hidden="true">
        <ChromeCircle />
      </div>
      <div className="hero__deco hero__deco--br" aria-hidden="true">
        <ChromeCircle />
      </div>

      {/* Floating Stars */}
      <div className="hero__star hero__star--1" aria-hidden="true">✦</div>
      <div className="hero__star hero__star--2" aria-hidden="true">★</div>
      <div className="hero__star hero__star--3" aria-hidden="true">✦</div>
      <div className="hero__star hero__star--4" aria-hidden="true">◆</div>
      <div className="hero__star hero__star--5" aria-hidden="true">✧</div>

      {/* Main Content */}
      <div className="hero__content container">
        {/* Left column */}
        <div className="hero__left">
          <div className="hero__edition-pill" aria-hidden="true">
            <span className="hero__edition-dot">●</span>
            <span className="hero__edition-text">
              AVAILABLE FOR NEW PROJECTS · PORTFOLIO 2025
            </span>
          </div>

          <h1 className="hero__name">
            <span className="hero__name-main">
              <span className="hero__name-line">CREATIVE</span>
              <span className="hero__name-line">DEVELOPER</span>
            </span>
            <span className="hero__name-sub">
              <span>✦</span> Muhammad Rifqi Maulana <span>✦</span>
            </span>
          </h1>

          <div className="hero__cyber-sub">
            <span className="hero__cyber-kanji">サイバー・エンジニア</span>
            <span className="hero__cyber-badge">FULL-STACK ARCHITECT // UI/UX</span>
          </div>

          <p className="hero__tagline">
            Passionate <strong>Full-Stack Developer</strong> &amp; <strong>Digital Creator</strong> based in Indonesia. Crafting high-performance web applications, scalable backend systems, and interactive digital experiences with an authentic Y2K cyber spirit.
          </p>

          {/* Action Buttons */}
          <div className="hero__actions">
            <a
              href="#projects"
              className="btn btn-primary hero__btn"
              onClick={(e) => handleScrollTo(e, 'projects', 'Featured Works', '02')}
            >
              Explore Works <span aria-hidden="true">✦</span>
            </a>
            <a
              href="#contact"
              className="btn btn-secondary hero__btn"
              onClick={(e) => handleScrollTo(e, 'contact', 'Let’s Collaborate', '06')}
            >
              Let’s Connect ✉
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

        {/* Right column — Y2K Cyber Aesthetic Collage Showcase */}
        <div className="hero__right">
          <Y2KShowcase />
        </div>
      </div>

      {/* Bottom Marquee Ticker */}
      <div className="hero__ticker" aria-hidden="true">
        <div className="ticker-wrap">
          <div className="ticker">
            {tickerItems.map((item, i) => (
              <span key={i} className="hero__ticker-item">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ChromeCircle() {
  return (
    <svg width="88" height="88" viewBox="0 0 88 88" fill="none" opacity="0.55">
      <circle
        cx="44"
        cy="44"
        r="40"
        stroke="url(#chromeGrad)"
        strokeWidth="1.5"
        strokeDasharray="8 4"
      />
      <circle cx="44" cy="44" r="28" stroke="url(#chromeGrad)" strokeWidth="1" />
      <circle
        cx="44"
        cy="44"
        r="12"
        stroke="url(#chromeGrad)"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <circle cx="44" cy="44" r="4" fill="url(#chromeGrad)" />
      <defs>
        <linearGradient id="chromeGrad" x1="0" y1="0" x2="88" y2="88">
          <stop offset="0%" stopColor="#00ccff" />
          <stop offset="33%" stopColor="#ffffff" />
          <stop offset="66%" stopColor="#ff007f" />
          <stop offset="100%" stopColor="#55ff00" />
        </linearGradient>
      </defs>
    </svg>
  )
}
