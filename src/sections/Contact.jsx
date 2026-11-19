import { useState } from 'react'
import {
  InstagramIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  CopyIcon,
  ExternalIcon,
} from '../components/SocialIcons'
import './Contact.css'

const socialChannels = [
  {
    id: 'instagram',
    name: 'Instagram',
    handle: '@alla.an_',
    displayUrl: 'instagram.com/alla.an_',
    href: 'https://www.instagram.com/alla.an_/',
    badge: 'CREATIVE & DAILY',
    themeClass: 'social-item--ig',
    accentColor: '#e1306c',
    icon: InstagramIcon,
    description: 'Updates karya, visual eksperimental, dan interaksi sehari-hari.',
    copyText: '@alla.an_',
    actionLabel: 'Buka Profil IG',
  },
  {
    id: 'github',
    name: 'GitHub',
    handle: 'Rifqi254',
    displayUrl: 'github.com/Rifqi254',
    href: 'https://github.com/Rifqi254',
    badge: 'SOURCE CODE & LAB',
    themeClass: 'social-item--gh',
    accentColor: '#00ccff',
    icon: GitHubIcon,
    description: 'Repository terbuka, arsitektur kode, dan proyek web yang sedang aktif dikembangkan.',
    copyText: 'Rifqi254',
    actionLabel: 'Buka Profil GitHub',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Maulana Rifqi',
    displayUrl: 'linkedin.com/in/maulana-rifqi-1550962b7',
    href: 'https://www.linkedin.com/in/maulana-rifqi-1550962b7/',
    badge: 'CAREER & NETWORK',
    themeClass: 'social-item--li',
    accentColor: '#0a66c2',
    icon: LinkedInIcon,
    description: 'Riwayat profesional, kredensial tersertifikasi, dan koneksi industri teknologi.',
    copyText: 'https://www.linkedin.com/in/maulana-rifqi-1550962b7/',
    actionLabel: 'Connect di LinkedIn',
  },
  {
    id: 'email',
    name: 'Email Direct',
    handle: 'maulanarifqi741@gmail.com',
    displayUrl: 'maulanarifqi741@gmail.com',
    href: 'mailto:maulanarifqi741@gmail.com',
    badge: 'INBOX RESMI',
    themeClass: 'social-item--mail',
    accentColor: '#0055ff',
    icon: MailIcon,
    description: 'Saluran tercepat untuk penawaran proyek lepas (freelance), kerja sama, atau konsultasi.',
    copyText: 'maulanarifqi741@gmail.com',
    actionLabel: 'Kirim Email Sekarang',
  },
]

export default function Contact() {
  const [copiedId, setCopiedId] = useState(null)
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleCopy = (e, item) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard?.writeText(item.copyText).then(() => {
      setCopiedId(item.id)
      setTimeout(() => setCopiedId(null), 2500)
    })
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus(null), 4000)
    }, 1400)
  }

  return (
    <section className="contact section" id="contact" aria-label="Kontak & Sosial Media Resmi">
      {/* Background dreamscape gradient */}
      <div className="contact__sky-backdrop" aria-hidden="true">
        <div className="contact__flare contact__flare--1" />
        <div className="contact__flare contact__flare--2" />
      </div>

      <div className="container contact__container">
        {/* Header Section */}
        <div className="section-header contact__header">
          <div className="contact__header-pill">
            <span className="contact__header-dot" />
            <span className="contact__header-code">DIGITAL EDEN 3000 // SANCTUARY PORTAL</span>
          </div>
          <h2 className="section-title contact__headline">
            STEP INTO <span className="contact__headline-chrome">THE SANCTUARY.</span>
          </h2>
          <p className="section-subtitle contact__subtitle">
            Portal komunikasi terbuka di tengah taman digital. Silakan terhubung untuk kolaborasi web, proyek freelance, atau berdiskusi teknologi.
          </p>
        </div>

        <div className="contact__grid">
          {/* Left Column: Dedicated Social Media Channels (Sosmed) */}
          <div className="contact__sosmed-panel">
            <div className="contact__sosmed-heading-bar">
              <div className="contact__sosmed-title-wrap">
                <span className="contact__sosmed-spark">✦</span>
                <h3 className="contact__sosmed-title">Saluran Sosial Media Resmi</h3>
              </div>
              <span className="contact__sosmed-status-badge">
                <span className="sosmed-live-dot" />
                ONLINE &amp; ACTIVE
              </span>
            </div>

            <p className="contact__sosmed-intro">
              Pilih platform favorit Anda di bawah ini untuk terhubung langsung atau klik ikon salin untuk mencatat username/link:
            </p>

            <div className="contact__sosmed-list">
              {socialChannels.map((item) => {
                const IconComponent = item.icon
                const isCopied = copiedId === item.id

                return (
                  <div
                    key={item.id}
                    className={`sosmed-card ${item.themeClass}`}
                    style={{ '--accent': item.accentColor }}
                  >
                    {/* Left: Brand Icon */}
                    <div className="sosmed-card__icon-box">
                      <IconComponent size={26} />
                    </div>

                    {/* Center: Details */}
                    <div className="sosmed-card__info">
                      <div className="sosmed-card__meta">
                        <span className="sosmed-card__name">{item.name}</span>
                        <span className="sosmed-card__badge">{item.badge}</span>
                      </div>
                      <div className="sosmed-card__handle">{item.handle}</div>
                      <div className="sosmed-card__desc">{item.description}</div>
                    </div>

                    {/* Right: Actions (Copy & Direct Link) */}
                    <div className="sosmed-card__actions">
                      {/* Copy Button */}
                      <button
                        type="button"
                        className={`sosmed-btn sosmed-btn--copy ${isCopied ? 'is-copied' : ''}`}
                        onClick={(e) => handleCopy(e, item)}
                        title={`Salin ${item.name} (${item.copyText})`}
                        aria-label={`Salin ${item.name}`}
                      >
                        {isCopied ? (
                          <>
                            <span className="btn-icon">✓</span>
                            <span className="btn-label">Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <CopyIcon size={14} className="btn-icon" />
                            <span className="btn-label">Salin</span>
                          </>
                        )}
                      </button>

                      {/* Open Link Button */}
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="sosmed-btn sosmed-btn--visit"
                        title={item.actionLabel}
                        aria-label={item.actionLabel}
                      >
                        <span className="btn-label">Buka</span>
                        <ExternalIcon size={14} className="btn-icon" />
                      </a>
                    </div>

                    {/* Holographic Sheen Layer */}
                    <span className="sosmed-card__sheen" aria-hidden="true" />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Direct Message Dispatch Form */}
          <div className="contact__form-wrap">
            <div className="contact__form-header">
              <span className="contact__form-badge">TRANSMISSION // DIRECT DISPATCH</span>
              <h3 className="contact__form-title">Kirim Pesan Langsung</h3>
              <p className="contact__form-subtitle">
                Isi form berikut untuk mengirim pesan langsung ke inbox email saya.
              </p>
            </div>

            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="contact-name" className="contact__label">Nama Lengkap</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nama atau brand Anda"
                    className="contact__input"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="contact-email" className="contact__label">Alamat Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@domain.com"
                    className="contact__input"
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              <div className="contact__field">
                <label htmlFor="contact-subject" className="contact__label">Subjek Proyek</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. Kolaborasi Platform Web / Tawaran Proyek"
                  className="contact__input"
                  required
                  aria-required="true"
                />
              </div>

              <div className="contact__field">
                <label htmlFor="contact-message" className="contact__label">Pesan / Brief</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Jelaskan kebutuhan, ruang lingkup proyek, atau pertanyaan Anda..."
                  className="contact__textarea contact__input"
                  rows={5}
                  required
                  aria-required="true"
                />
              </div>

              <button
                type="submit"
                id="contact-submit"
                className={`contact__submit ${status === 'sending' ? 'sending' : ''}`}
                disabled={status === 'sending'}
                aria-label="Kirim Pesan"
              >
                {status === 'sending' ? (
                  <>
                    <span className="contact__spinner" />
                    <span>Mengirim Transmisi...</span>
                  </>
                ) : status === 'success' ? (
                  <>
                    <span>✓</span>
                    <span>Pesan Terkirim ke Inbox!</span>
                  </>
                ) : (
                  <>
                    <span>Kirim Pesan Sekarang</span>
                    <span className="contact__btn-arrow">→</span>
                  </>
                )}
              </button>

              {status === 'success' && (
                <p className="contact__success" role="alert">
                  ✓ Transmisi berhasil dikirim ke <strong>maulanarifqi741@gmail.com</strong>! Saya akan segera merespon via email.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
