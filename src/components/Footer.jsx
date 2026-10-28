import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      {/* Decorative ticker */}
      <div className="footer__ticker ticker-wrap" aria-hidden="true">
        <div className="ticker footer__ticker-inner">
          {Array(12).fill(null).map((_, i) => (
            <span key={i} className="footer__ticker-item">Rifqi Maulana ✦</span>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="footer__main container">
        <div className="footer__left">
          <div className="footer__logo">
            <span className="footer__logo-star star-deco">✦</span>
            <span className="footer__logo-text">Rifqi<span className="footer__logo-accent">M</span></span>
          </div>
          <p className="footer__tagline">
            Digital Creator. Developer.<br />Experimental Thinker.
          </p>
          <div className="footer__socials">
            {[
              { icon: '🐙', label: 'GitHub', href: 'https://github.com' },
              { icon: '💼', label: 'LinkedIn', href: 'https://linkedin.com' },
              { icon: '📸', label: 'Instagram', href: 'https://instagram.com' },
              { icon: '📧', label: 'Email', href: 'mailto:rifqimaulana@email.com' },
            ].map(s => (
              <a key={s.label} href={s.href} className="footer__social" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="footer__links-group">
          <h4 className="footer__links-title">Navigate</h4>
          <ul className="footer__links">
            {['About', 'Projects', 'Skills', 'Timeline', 'Certificates', 'Contact'].map(item => (
              <li key={item}>
                <a href={`#${item.toLowerCase()}`} className="footer__link"
                  onClick={(e) => { e.preventDefault(); document.querySelector(`#${item.toLowerCase()}`)?.scrollIntoView({ behavior: 'smooth' }) }}>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__links-group">
          <h4 className="footer__links-title">Projects</h4>
          <ul className="footer__links">
            {['SMLTI Tangsel', 'EnglAI', 'EcoCampus Lab', 'Portal Seleksi HMPS', 'SUMMITIX 3D'].map(p => (
              <li key={p}><a href="#projects" className="footer__link" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}>{p}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer__badge-col">
          <div className="footer__badge chrome-surface">
            <span className="footer__badge-icon">⚡</span>
            <div>
              <div className="footer__badge-title">Built with React + Vite</div>
              <div className="footer__badge-sub">Y2K Edition — {year}</div>
            </div>
          </div>
          <div className="footer__badge glass-card" style={{ marginTop: 12 }}>
            <span className="footer__badge-icon">🎨</span>
            <div>
              <div className="footer__badge-title">Y2K Design System</div>
              <div className="footer__badge-sub">Cybercore • Chrome • Holographic</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span className="footer__copy">© {year} Rifqi Maulana. All rights reserved.</span>
          <span className="footer__made">Made with ❤️ & Y2K aesthetics</span>
        </div>
      </div>
    </footer>
  )
}
