import { InstagramIcon, GitHubIcon, LinkedInIcon, MailIcon } from './SocialIcons'
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
            Informatics Student · Web Developer · Creative Technology Enthusiast.<br />
            Membangun karya digital di antara logam &amp; padang rumput.
          </p>
          <div className="footer__socials">
            {[
              { icon: InstagramIcon, label: 'Instagram @alla.an_', href: 'https://www.instagram.com/alla.an_/' },
              { icon: GitHubIcon, label: 'GitHub Rifqi254', href: 'https://github.com/Rifqi254' },
              { icon: LinkedInIcon, label: 'LinkedIn Maulana Rifqi', href: 'https://www.linkedin.com/in/maulana-rifqi-1550962b7/' },
              { icon: MailIcon, label: 'Email maulanarifqi741@gmail.com', href: 'mailto:maulanarifqi741@gmail.com' },
            ].map(s => {
              const IconComp = s.icon
              return (
                <a
                  key={s.label}
                  href={s.href}
                  className="footer__social"
                  aria-label={s.label}
                  title={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconComp size={18} />
                </a>
              )
            })}
          </div>
        </div>

        <div className="footer__links-group">
          <h4 className="footer__links-title">Navigate</h4>
          <ul className="footer__links">
            {['About', 'Archive', 'Skills', 'Timeline', 'Contact'].map(item => (
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
            {['SMLTI Tangsel', 'EnglAI', 'EcoCampus Lab', 'Portal Seleksi HMPS', 'SUMMITIX 3D', 'RAMENATSU'].map(p => (
              <li key={p}><a href="#projects" className="footer__link" onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }) }}>{p}</a></li>
            ))}
          </ul>
        </div>

        <div className="footer__badge-col">
          <div className="footer__badge chrome-surface">
            <span className="footer__badge-icon">⚡</span>
            <div>
              <div className="footer__badge-title">Built with React 19 + Three.js</div>
              <div className="footer__badge-sub">Digital Eden 3000 Edition — {year}</div>
            </div>
          </div>
          <div className="footer__badge glass-card" style={{ marginTop: 12 }}>
            <span className="footer__badge-icon">🌿</span>
            <div>
              <div className="footer__badge-title">Visual Paradigm System</div>
              <div className="footer__badge-sub">70% Aero • 20% Botanical • 10% Y3K</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <span className="footer__copy">© {year} Rifqi Maulana. All rights reserved.</span>
          <span className="footer__made">Crafted with 🌿 &amp; Digital Eden 3000 Aesthetics</span>
        </div>
      </div>
    </footer>
  )
}
