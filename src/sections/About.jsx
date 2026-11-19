import HangingCard from '../components/HangingCard'
import './About.css'

export default function About() {
  return (
    <section className="about section" id="about" aria-label="About me">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="label label-pink">✦ About Me</span>
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
              Halo! Saya <strong>Muhammad Rifqi Maulana</strong> — mahasiswa aktif <strong>Semester 7 Teknik Informatika</strong> di <strong>UIN Sultan Maulana Hasanuddin Banten</strong> (Fakultas Sains &amp; Teknologi). Berfokus pada <strong>Full-Stack Web Development</strong>, perancangan sistem informasi, serta eksplorasi antarmuka digital modern berestetika Y2K &amp; retro-futuristik.
            </p>

            <p className="about__body">
              Selama masa perkuliahan, saya aktif mengasah keahlian teknis dan kepemimpinan secara langsung melalui pengalaman nyata:
            </p>

            <ul className="about__highlights">
              <li>
                <span className="about__highlight-icon">🏛️</span>
                <div>
                  <strong>Magang Kerja Diskominfo Kota Tangerang Selatan</strong> — Menyelesaikan program magang di Dinas Komunikasi &amp; Informatika Kota Tangerang Selatan dengan predikat evaluasi <em>SANGAT BAIK</em>.
                </div>
              </li>
              <li>
                <span className="about__highlight-icon">⚡</span>
                <div>
                  <strong>Ketua Divisi Komunikasi &amp; Informasi HMPS Informatika</strong> — Memimpin pengelolaan publikasi resmi, aset digital, media sosial, dan dokumentasi organisasi mahasiswa Informatika.
                </div>
              </li>
              <li>
                <span className="about__highlight-icon">💻</span>
                <div>
                  <strong>Pengembangan Web &amp; Sertifikasi Cloud</strong> — Berpengalaman membangun aplikasi web berbasis React dan Node.js REST API, serta tersertifikasi Cloud AWS &amp; JavaScript (Dicoding) dan Analisis Data (Coursera).
                </div>
              </li>
            </ul>

            <p className="about__body">
              Saat ini saya berfokus menyelesaikan studi tingkat akhir sembari terus terbuka untuk peluang kolaborasi proyek, magang lanjutan, maupun freelance pengembangan aplikasi web.
            </p>

            {/* Info grid */}
            <div className="about__info-grid">
              <div className="about__info-item">
                <span className="about__info-label">Status Akademik</span>
                <span className="about__info-value">🎓 Mahasiswa Semester 7</span>
              </div>
              <div className="about__info-item">
                <span className="about__info-label">Universitas</span>
                <span className="about__info-value">🏛️ UIN SMH Banten (Saintek)</span>
              </div>
              <div className="about__info-item">
                <span className="about__info-label">Program Studi</span>
                <span className="about__info-value">⚡ Teknik Informatika</span>
              </div>
              <div className="about__info-item">
                <span className="about__info-label">Pengalaman Magang</span>
                <span className="about__info-value">🏢 Diskominfo Tangsel</span>
              </div>
              <div className="about__info-item">
                <span className="about__info-label">Fokus Utama</span>
                <span className="about__info-value">💻 Web Dev &amp; Full-Stack</span>
              </div>
              <div className="about__info-item">
                <span className="about__info-label">Ketersediaan</span>
                <span className="about__info-value about__info-value--available">
                  <span className="about__status-dot" />
                  Open for Projects / Hire
                </span>
              </div>
            </div>

            <div className="about__actions">
              <a href="#contact" className="btn btn-primary" onClick={(e) => {
                e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                Let's Collaborate ✦
              </a>
              <a href="#projects" className="btn btn-ghost" onClick={(e) => {
                e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                Lihat Proyek &amp; Arsip
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
