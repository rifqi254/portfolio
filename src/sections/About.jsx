import HangingCard from '../components/HangingCard'
import { playChime } from '../hooks/useAudioFX'
import './About.css'

export default function About({ onOpenResume }) {
  return (
    <section className="about section" id="about" aria-label="About me">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="label label-cyan">✦ About Me</span>
          <h2 className="section-title">Who Am I?</h2>
        </div>

        <div className="about__grid">
          {/* Left — Interactive Pullable Lanyard Badge */}
          <div className="about__visual">
            <HangingCard
              photoSrc="/profile.jpg"
              name="RIFQI M."
              fullName="Muhammad Rifqi Maulana"
              role="Informatika · Semester 7"
              idCode="UIN-SMH // TI-S7"
            />
          </div>

          {/* Right — Text Content */}
          <div className="about__content">
            <p className="about__intro">
              Halo! Saya <strong>Muhammad Rifqi Maulana</strong> — mahasiswa Semester 7 Teknik Informatika di <strong>UIN Sultan Maulana Hasanuddin Banten</strong> sekaligus seorang Web Developer. Saya menyukai perpaduan antara presisi logika pemrograman dengan perancangan antarmuka web modern yang interaktif dan fungsional.
            </p>

            <p className="about__body">
              Dengan fokus di bidang Full-Stack Web Development, saya terbiasa mengembangkan aplikasi menggunakan JavaScript, React, dan Node.js REST API. Selama masa perkuliahan, saya telah menyelesaikan program magang kerja di Diskominfo Kota Tangerang Selatan dengan predikat Sangat Baik, serta aktif memimpin Divisi Komunikasi &amp; Informasi di himpunan mahasiswa (HMPS Informatika) dalam pengelolaan platform digital dan media organisasi.
            </p>

            <p className="about__body">
              Saat ini saya sedang fokus menempuh semester akhir perkuliahan sembari terus mengeksplorasi arsitektur web modern, cloud computing, serta terbuka untuk kesempatan proyek freelance, magang lanjutan, maupun kolaborasi dalam pengembangan produk digital yang solutif.
            </p>

            {/* Info grid */}
            <div className="about__info-grid">
              <div className="about__info-item">
                <span className="about__info-label">Pendidikan</span>
                <span className="about__info-value">🎓 UIN Banten (Informatika S7)</span>
              </div>
              <div className="about__info-item">
                <span className="about__info-label">Status</span>
                <span className="about__info-value about__info-value--available">
                  <span className="about__status-dot" />
                  Available for Hire
                </span>
              </div>
              <div className="about__info-item">
                <span className="about__info-label">Fokus Utama</span>
                <span className="about__info-value">Full-Stack Web Dev</span>
              </div>
              <div className="about__info-item">
                <span className="about__info-label">Lokasi</span>
                <span className="about__info-value">📍 Banten &amp; Tangsel, ID</span>
              </div>
            </div>

            <div className="about__actions">
              <a href="#contact" className="btn btn-primary" onClick={(e) => {
                e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                Let's Collaborate ✦
              </a>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  playChime()
                  if (onOpenResume) onOpenResume()
                  else window.dispatchEvent(new CustomEvent('open-resume'))
                }}
              >
                📄 Buka CV / Resume
              </button>
              <a href="#projects" className="btn btn-ghost" onClick={(e) => {
                e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                View Projects
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
