import { useState } from 'react'
import './Contact.css'

const contactLinks = [
  { icon: '📧', label: 'Email', value: 'rifqimaulana@email.com', href: 'mailto:rifqimaulana@email.com', color: '#0066ff' },
  { icon: '💼', label: 'LinkedIn', value: 'linkedin.com/in/rifqimaulana', href: 'https://linkedin.com', color: '#0077b5' },
  { icon: '🐙', label: 'GitHub', value: 'github.com/rifqimaulana', href: 'https://github.com', color: '#333' },
  { icon: '📸', label: 'Instagram', value: '@rifqi.maulana', href: 'https://instagram.com', color: '#e1306c' },
]

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('sending')
    // Simulate send
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus(null), 4000)
    }, 1500)
  }

  return (
    <section className="contact section" id="contact" aria-label="Contact">
      <div className="container">
        <div className="section-header">
          <span className="label label-electric">✦ Connect</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">Have a project in mind or just want to say hi? Let's talk!</p>
        </div>

        <div className="contact__grid">
          {/* Left — Info */}
          <div className="contact__info">
            <div className="contact__cta-card glass-card">
              <div className="contact__cta-badge float-anim">✦</div>
              <h3 className="contact__cta-title">Let's Build Something Amazing</h3>
              <p className="contact__cta-text">
                I'm currently open for freelance projects, collaborations, and full-time opportunities.
                Whether you have a specific project or just want to explore possibilities — I'd love to hear from you.
              </p>
              <div className="contact__status">
                <span className="contact__status-dot" />
                <span>Available for new projects</span>
              </div>
            </div>

            {/* Contact Links */}
            <div className="contact__links">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact__link-item glass-card card-hover"
                  style={{ '--link-color': link.color }}
                  aria-label={`${link.label}: ${link.value}`}
                >
                  <span className="contact__link-icon">{link.icon}</span>
                  <div className="contact__link-content">
                    <span className="contact__link-label">{link.label}</span>
                    <span className="contact__link-value">{link.value}</span>
                  </div>
                  <span className="contact__link-arrow">↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="contact__form-wrap glass-card">
            <h3 className="contact__form-title">Send a Message</h3>
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <div className="contact__form-row">
                <div className="contact__field">
                  <label htmlFor="contact-name" className="contact__label">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="contact__input"
                    required
                    aria-required="true"
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="contact-email" className="contact__label">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="contact__input"
                    required
                    aria-required="true"
                  />
                </div>
              </div>

              <div className="contact__field">
                <label htmlFor="contact-subject" className="contact__label">Subject</label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about?"
                  className="contact__input"
                  required
                  aria-required="true"
                />
              </div>

              <div className="contact__field">
                <label htmlFor="contact-message" className="contact__label">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea..."
                  className="contact__textarea contact__input"
                  rows={5}
                  required
                  aria-required="true"
                />
              </div>

              <button
                type="submit"
                id="contact-submit"
                className={`btn btn-primary contact__submit ${status === 'sending' ? 'sending' : ''}`}
                disabled={status === 'sending'}
                aria-label="Send message"
              >
                {status === 'sending' ? (
                  <><span className="contact__spinner" /> Sending...</>
                ) : status === 'success' ? (
                  <><span>✓</span> Sent!</>
                ) : (
                  <><span>Send Message</span><span>✦</span></>
                )}
              </button>

              {status === 'success' && (
                <p className="contact__success" role="alert">
                  ✓ Your message has been sent! I'll get back to you soon.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
