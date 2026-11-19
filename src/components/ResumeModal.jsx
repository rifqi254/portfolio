import { useEffect } from 'react'
import { playBubblePop } from '../hooks/useAudioFX'
import './ResumeModal.css'

export default function ResumeModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handlePrint = () => {
    playBubblePop()
    window.print()
  }

  return (
    <div className="resume-modal" role="dialog" aria-modal="true" aria-label="Curriculum Vitae — Muhammad Rifqi Maulana">
      {/* Backdrop */}
      <div className="resume-modal__backdrop" onClick={onClose} />

      {/* Dialog Card */}
      <div className="resume-modal__dialog">
        {/* Top Control Bar */}
        <div className="resume-modal__bar">
          <div className="resume-modal__bar-left">
            <span className="resume-bar-dot resume-bar-dot--red" onClick={onClose} title="Tutup" />
            <span className="resume-bar-dot resume-bar-dot--yellow" />
            <span className="resume-bar-dot resume-bar-dot--green" />
            <span className="resume-modal__bar-title">DOCUMENT // CURRICULUM_VITAE.PDF</span>
          </div>

          <div className="resume-modal__bar-right">
            <button className="resume-btn resume-btn--print" onClick={handlePrint}>
              <span>🖨️ Cetak / Simpan PDF</span>
            </button>
            <button className="resume-btn resume-btn--close" onClick={onClose}>
              <span>✕ Tutup</span>
            </button>
          </div>
        </div>

        {/* Printable Document Paper */}
        <div className="resume-paper" id="printable-resume">
          {/* Paper Header */}
          <div className="resume-header">
            <div className="resume-header__info">
              <h1 className="resume-name">MUHAMMAD RIFQI MAULANA</h1>
              <p className="resume-title">Full-Stack Web Developer · Mahasiswa Teknik Informatika (Semester 7)</p>
              <div className="resume-contact-row">
                <span>📍 Tangerang Selatan &amp; Banten</span>
                <span>•</span>
                <span>📧 maulanarifqi741@gmail.com</span>
                <span>•</span>
                <span>🐙 github.com/Rifqi254</span>
                <span>•</span>
                <span>💼 linkedin.com/in/maulana-rifqi-1550962b7</span>
              </div>
            </div>
            <div className="resume-badge">
              <span className="resume-badge__status">AVAILABLE FOR HIRE</span>
            </div>
          </div>

          {/* Section: Ringkasan Profesional */}
          <div className="resume-section">
            <h2 className="resume-section-title">RINGKASAN PROFESIONAL</h2>
            <div className="resume-section-line" />
            <p className="resume-summary">
              Mahasiswa Semester 7 Teknik Informatika di UIN Sultan Maulana Hasanuddin Banten dengan fokus keahlian pada Full-Stack Web Development, arsitektur RESTful API, dan perancangan antarmuka pengguna (UI/UX) modern. Berpengalaman menyelesaikan program magang kerja profesional di Dinas Komunikasi dan Informatika (Diskominfo) Kota Tangerang Selatan dengan predikat evaluasi Sangat Baik, serta memiliki rekam jejak kepemimpinan aktif sebagai Ketua Divisi Komunikasi &amp; Informasi di HMPS Informatika.
            </p>
          </div>

          {/* Section: Pendidikan */}
          <div className="resume-section">
            <h2 className="resume-section-title">PENDIDIKAN</h2>
            <div className="resume-section-line" />
            <div className="resume-item">
              <div className="resume-item__head">
                <span className="resume-item__role">S1 Teknik Informatika</span>
                <span className="resume-item__period">2022 – Sekarang (Semester 7)</span>
              </div>
              <span className="resume-item__org">Universitas Islam Negeri Sultan Maulana Hasanuddin Banten</span>
              <p className="resume-item__desc">
                Fokus studi: Rekayasa Perangkat Lunak, Arsitektur Web, Basis Data Relasional, Cloud Computing, dan Jaringan Komputer.
              </p>
            </div>
          </div>

          {/* Section: Pengalaman Kerja & Organisasi */}
          <div className="resume-section">
            <h2 className="resume-section-title">PENGALAMAN KERJA &amp; ORGANISASI</h2>
            <div className="resume-section-line" />

            {/* Magang */}
            <div className="resume-item">
              <div className="resume-item__head">
                <span className="resume-item__role">Program Magang Kerja – Diskominfo Kota Tangerang Selatan</span>
                <span className="resume-item__period">Februari 2026 – Juli 2026</span>
              </div>
              <span className="resume-item__org">Dinas Komunikasi dan Informatika Kota Tangerang Selatan • Predikat SANGAT BAIK</span>
              <ul className="resume-bullets">
                <li>Melaksanakan program magang kerja profesional dengan predikat kelulusan akhir: SANGAT BAIK (No. Sertifikat: 400.14.5.4/3798/Diskominfo/VII/2026).</li>
                <li>Berkontribusi dalam operasional dan pengelolaan platform sistem informasi manajemen logistik teknologi informasi di lingkungan dinas.</li>
                <li>Mendukung pemeliharaan dan pengujian fungsionalitas sistem informasi publik kota.</li>
              </ul>
            </div>

            {/* Ketua Divisi Kominfo */}
            <div className="resume-item">
              <div className="resume-item__head">
                <span className="resume-item__role">Ketua Divisi Komunikasi &amp; Informasi</span>
                <span className="resume-item__period">Februari 2025 – Januari 2026</span>
              </div>
              <span className="resume-item__org">Himpunan Mahasiswa Program Studi (HMPS) Informatika</span>
              <ul className="resume-bullets">
                <li>Memimpin divisi Kominfo dalam perancangan strategi komunikasi digital, publikasi, dan dokumentasi seluruh agenda himpunan.</li>
                <li>Mengembangkan platform web registrasi dan seleksi digital terintegrasi untuk mahasiswa baru.</li>
                <li>Mengkoordinasikan tim kreatif konten sosial media dan media center organisasi.</li>
              </ul>
            </div>

            {/* Anggota Divisi Hubungan Eksternal */}
            <div className="resume-item">
              <div className="resume-item__head">
                <span className="resume-item__role">Anggota Divisi Hubungan Eksternal</span>
                <span className="resume-item__period">Februari 2024 – Desember 2025</span>
              </div>
              <span className="resume-item__org">Himpunan Mahasiswa Program Studi (HMPS) Informatika</span>
              <ul className="resume-bullets">
                <li>Membangun dan memelihara hubungan kemitraan dengan organisasi kemahasiswaan lain dan pihak eksternal kampus.</li>
                <li>Mengkoordinasikan kegiatan studi banding dan delegasi forum teknologi antar perguruan tinggi.</li>
              </ul>
            </div>
          </div>

          {/* Section: Sertifikasi Resmi */}
          <div className="resume-section">
            <h2 className="resume-section-title">SERTIFIKASI KOMPETENSI RESMI</h2>
            <div className="resume-section-line" />
            <div className="resume-certs-grid">
              <div className="resume-cert-chip">
                <strong>Dicoding Academy</strong> — Belajar Dasar Pemrograman JavaScript (2025)
              </div>
              <div className="resume-cert-chip">
                <strong>Dicoding Academy</strong> — Belajar Membuat Aplikasi Back-End Pemula (2025)
              </div>
              <div className="resume-cert-chip">
                <strong>Dicoding &amp; AWS</strong> — Belajar Dasar Cloud dan Generative AI di AWS (2025)
              </div>
              <div className="resume-cert-chip">
                <strong>Coursera</strong> — Getting Started with Microsoft Excel (2026)
              </div>
            </div>
          </div>

          {/* Section: Keahlian Teknis */}
          <div className="resume-section">
            <h2 className="resume-section-title">KEAHLIAN TEKNIS (TECH STACK)</h2>
            <div className="resume-section-line" />
            <div className="resume-skills-block">
              <div className="resume-skill-group">
                <span className="resume-skill-label">Bahasa &amp; Framework:</span>
                <span className="resume-skill-val">HTML5, CSS3, JavaScript (ES6+), PHP, Laravel, React 19, Three.js, Tailwind CSS</span>
              </div>
              <div className="resume-skill-group">
                <span className="resume-skill-label">Database &amp; API:</span>
                <span className="resume-skill-val">MySQL, Relational Data Modeling, RESTful API, JSON Architecture</span>
              </div>
              <div className="resume-skill-group">
                <span className="resume-skill-label">Instrumen &amp; Tools:</span>
                <span className="resume-skill-val">Git, GitHub, Postman, Vite, Figma UI/UX, Microsoft Office, VS Code</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
