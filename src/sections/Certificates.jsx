import { useState, useEffect } from 'react'
import './Certificates.css'

const certificates = [
  {
    id: 'cert-kominfo',
    code: '01',
    title: 'Sertifikat Program Magang Diskominfo Kota Tangerang Selatan',
    issuer: 'Dinas Komunikasi dan Informatika Kota Tangerang Selatan',
    issuerSub: 'Pemerintah Kota Tangerang Selatan • Predikat: SANGAT BAIK',
    recipient: 'Muhammad Rifqi',
    date: '9 Februari – 31 Juli 2026',
    validUntil: 'Official Government Credential',
    category: 'Government & Internship',
    color: '#0088ff',
    accent: '#38bdf8',
    badge: '🏛️',
    id_number: '400.14.5.4/3798/Diskominfo/VII/2026',
    description: 'Melaksanakan program magang kerja profesional di Dinas Komunikasi dan Informatika (Diskominfo) Kota Tangerang Selatan selama 6 bulan penuh (Februari – Juli 2026). Bertanggung jawab dalam pengelolaan sistem informasi layanan publik, pemantauan dan dokumentasi infrastruktur jaringan TI, asistensi portal e-government kota, koordinasi publikasi media informasi, dan evaluasi kepuasan layanan dengan perolehan predikat kelulusan akhir SANGAT BAIK.',
    image: '/certificates/cert-magang-kominfo.png',
    pdf: '/certificates/cert-magang-kominfo.pdf',
    verifyUrl: 'https://tte.komdigi.go.id/verifyPDF',
    signatory: 'Dr. TB. Asep Nurdin, S.Kom., M.Kom (Kepala Diskominfo Tangsel)',
    skills: ['Program Magang', 'Diskominfo Tangsel', 'E-Government', 'Sangat Baik', 'IT & Media'],
    y2kTag: 'GOV // INTERN.2026',
  },
  {
    id: 'cert-coursera-excel',
    code: '02',
    title: 'Getting Started with Microsoft Excel',
    issuer: 'Coursera & Freedom Learning Group',
    issuerSub: 'Authorized by Coursera • Verified Project Certificate',
    recipient: 'Muhammad Rifqi Maulana',
    date: '14 Januari 2026',
    validUntil: 'Lifetime / Verified Online',
    category: 'Data & Spreadsheet',
    color: '#10b981',
    accent: '#34d399',
    badge: '📊',
    id_number: '89WNUXSIH1BW',
    description: 'Menyelesaikan pelatihan intensif spreadsheet dan analisis data bisnis berbasis proyek (Project Certificate) yang diotorisasi resmi oleh Coursera bersama Freedom Learning Group. Mempelajari formula dan fungsi komputasi data (VLOOKUP, IF, SUMIFS), perancangan tabel dinamis, visualisasi data bisnis via grafik interaktif, pembersihan data (data cleansing), serta analisis pivot table untuk kebutuhan pelaporan bisnis profesional.',
    image: '/certificates/cert-coursera-excel.png',
    pdf: '/certificates/cert-coursera-excel.pdf',
    verifyUrl: 'https://coursera.org/verify/89WNUXSIH1BW',
    signatory: 'Summer Scaggs (Subject Matter Expert, Freedom Learning Group)',
    skills: ['Microsoft Excel', 'Data Analysis', 'Formulas & Functions', 'Spreadsheets', 'Data Visualization'],
    y2kTag: 'CRS // EXCEL.2026',
  },
  {
    id: 'cert-1',
    code: '03',
    title: 'Belajar Linux dari Nol+',
    issuer: 'ID-Networkers (IDN.ID)',
    issuerSub: 'Indonesian IT Expert Factory',
    recipient: 'Rifqi Maulana',
    date: '12 Juni 2024',
    validUntil: '12-06-2029',
    category: 'SysAdmin & Linux',
    color: '#e11d48',
    accent: '#fb7185',
    badge: '🐧',
    id_number: 'IDN-1781238491-11033-78009',
    description: 'Menyelesaikan program pelatihan komprehensif administrasi sistem operasi Linux dari dasar hingga tingkat lanjut bersama ID-Networkers. Meliputi penguasaan Command Line Interface (CLI), manajemen hak akses (permissions & ownership), manajemen paket software Linux, konfigurasi jaringan server, pengelolaan sistem file & storage, automasi shell scripting, serta pengelolaan service daemon dan keamanan server Linux.',
    image: '/certificates/cert-linux.png',
    pdf: '/certificates/cert-linux.pdf',
    verifyUrl: 'https://lms.idn.id/cert-verification',
    signatory: 'Dedi Gunawan, M.T., CCIE (CEO IDN)',
    skills: ['Linux OS', 'CLI & Terminal', 'Server Admin', 'Networking'],
    y2kTag: 'SYS // LINUX.01',
  },
  {
    id: 'cert-2',
    code: '04',
    title: 'Seminar IT & Bootcamp: First Step to the Cloud',
    issuer: 'HMPS Informatika UIN SMH Banten',
    issuerSub: 'Kabinet Sinergi 2025 • FSAINS UIN Banten',
    recipient: 'Muhammad Rifqi Maulana',
    date: '1 November 2025',
    validUntil: 'Lifetime / Official Archive',
    category: 'Cloud & Bootcamp',
    color: '#9333ea',
    accent: '#c084fc',
    badge: '⚡',
    id_number: '108/B/HMPSINF-FSAINS/UIN-SMHB/XI/2025',
    description: 'Mengikuti dan memimpin rangkaian Seminar IT & Bootcamp intensif pengenalan teknologi Cloud Computing tingkat universitas bersama HMPS Informatika UIN SMH Banten. Mempelajari arsitektur dasar infrastruktur cloud, deployment aplikasi berbasis serverless, virtualisasi server, prinsip High Availability (HA) dan skalabilitas sistem cloud, serta implementasi dasar cloud security untuk mendukung ekosistem digital kampus modern.',
    image: '/certificates/cert-hmps-cloud.png',
    pdf: '/certificates/cert-hmps-cloud.pdf',
    verifyUrl: null,
    signatory: 'Muhammad Rifqi Maulana & Hilmy Ibrahim',
    skills: ['Cloud Computing', 'Seminar IT', 'Infrastructure', 'UIN Banten'],
    y2kTag: 'S-CODE // 03.04',
  },
  {
    id: 'cert-3',
    code: '05',
    title: 'Belajar Dasar Cloud dan Gen AI di AWS',
    issuer: 'Dicoding Indonesia & AWS',
    issuerSub: 'AWS Global Standard Competency',
    recipient: 'Muhammad Rifqi Maulana',
    date: '22 November 2025',
    validUntil: '22 November 2028',
    category: 'Cloud & GenAI',
    color: '#ff9900',
    accent: '#38bdf8',
    badge: '☁️',
    id_number: '6RPNGJV38Z2M',
    description: 'Menyelesaikan program sertifikasi resmi kolaborasi Dicoding Indonesia dan Amazon Web Services (AWS) berstandar global. Mempelajari konsep fundamental cloud computing AWS (Compute EC2, Storage S3, IAM, Database RDS), prinsip Shared Responsibility Model, serta pemanfaatan kecerdasan buatan generatif (Generative AI), fondasi Large Language Models (LLM), prompt engineering, dan etika AI di cloud.',
    image: '/certificates/cert-dicoding-aws-genai.png',
    pdf: '/certificates/cert-dicoding-aws-genai.pdf',
    verifyUrl: 'https://dicoding.com/certificates/6RPNGJV38Z2M',
    signatory: 'Narendra Wicaksono (CEO Dicoding Indonesia)',
    skills: ['AWS Cloud', 'Generative AI', 'Amazon EC2', 'Cloud Security'],
    y2kTag: 'AWS // CLOUD.AI',
  },
  {
    id: 'cert-4',
    code: '06',
    title: 'Belajar Back-End Pemula dengan JavaScript',
    issuer: 'Dicoding Indonesia & AWS',
    issuerSub: 'AWS Validated Back-End Developer Track',
    recipient: 'Muhammad Rifqi Maulana',
    date: '30 Oktober 2025',
    validUntil: '30 Oktober 2028',
    category: 'Backend Web',
    color: '#0284c7',
    accent: '#38bdf8',
    badge: '🚀',
    id_number: '07Z6J7LDJXQR',
    description: 'Menyelesaikan sertifikasi pemrograman sisi server (Back-End Development) berbasis JavaScript standar AWS. Membangun aplikasi RESTful API dari nol menggunakan Node.js dan Hapi Framework, merancang routing dinamis, request validation, handling CORS & error payload, implementasi database persistence, serta berhasil membangun dan men-deploy proyek Bookshelf API mandiri yang lolos uji otomatis (automated testing).',
    image: '/certificates/cert-dicoding-backend-js.png',
    pdf: '/certificates/cert-dicoding-backend-js.pdf',
    verifyUrl: 'https://dicoding.com/certificates/07Z6J7LDJXQR',
    signatory: 'Narendra Wicaksono (CEO Dicoding Indonesia)',
    skills: ['Node.js', 'Hapi Framework', 'RESTful API', 'Bookshelf API'],
    y2kTag: 'NODE // REST.API',
  },
  {
    id: 'cert-5',
    code: '07',
    title: 'Belajar Dasar Pemrograman JavaScript',
    issuer: 'Dicoding Indonesia & AWS',
    issuerSub: 'AWS Validated Software Engineering Track',
    recipient: 'Muhammad Rifqi Maulana',
    date: '03 Desember 2025',
    validUntil: '03 Desember 2028',
    category: 'Programming',
    color: '#eab308',
    accent: '#fbbf24',
    badge: '⭐',
    id_number: 'JLX15EWN5Z72',
    description: 'Menyelesaikan kurikulum fundamental rekayasa perangkat lunak JavaScript modern (ES6+) berstandar industri bersama Dicoding dan AWS. Menguasai struktur data dan algoritma dasar, paradigma Object-Oriented Programming (OOP) berbasis prototype & class, functional programming, penanganan asinkron (Callback, Promise, Async/Await), modularisasi kode (ESM), hingga penulisan unit test otomatis.',
    image: '/certificates/cert-dicoding-dasar-js.png',
    pdf: '/certificates/cert-dicoding-dasar-js.pdf',
    verifyUrl: 'https://dicoding.com/certificates/JLX15EWN5Z72',
    signatory: 'Narendra Wicaksono (CEO Dicoding Indonesia)',
    skills: ['JavaScript ES6+', 'OOP', 'Async/Await', 'Code Quality'],
    y2kTag: 'ES6+ // CORE.JS',
  },
]

export default function Certificates() {
  const [activeCertIndex, setActiveCertIndex] = useState(null)

  const activeCert = activeCertIndex !== null ? certificates[activeCertIndex] : null

  // Keyboard navigation & close on ESC
  useEffect(() => {
    function handleKeyDown(e) {
      if (activeCertIndex === null) return

      if (e.key === 'Escape') {
        setActiveCertIndex(null)
      } else if (e.key === 'ArrowRight') {
        setActiveCertIndex((prev) => (prev + 1) % certificates.length)
      } else if (e.key === 'ArrowLeft') {
        setActiveCertIndex((prev) => (prev - 1 + certificates.length) % certificates.length)
      }
    }

    if (activeCertIndex !== null) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [activeCertIndex])

  const openModal = (idx) => {
    setActiveCertIndex(idx)
  }

  const closeModal = () => {
    setActiveCertIndex(null)
  }

  const nextCert = (e) => {
    e.stopPropagation()
    setActiveCertIndex((prev) => (prev + 1) % certificates.length)
  }

  const prevCert = (e) => {
    e.stopPropagation()
    setActiveCertIndex((prev) => (prev - 1 + certificates.length) % certificates.length)
  }

  return (
    <section className="certificates section" id="certificates" aria-label="Certificates">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="label label-pink">✦ Verified Credentials</span>
          <h2 className="section-title">Certificates &amp; Awards</h2>
        </div>

        {/* Certificates Grid */}
        <div className="certs__grid">
          {certificates.map((cert, idx) => (
            <CertCard
              key={cert.id}
              cert={cert}
              delay={idx * 60}
              onView={() => openModal(idx)}
            />
          ))}
        </div>
      </div>

      {/* Y2K Holographic Certificate Modal Lightbox */}
      {activeCert && (
        <div
          className="cert-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate: ${activeCert.title}`}
        >
          {/* Backdrop with blur & scanlines */}
          <div className="cert-modal__backdrop" onClick={closeModal}>
            <div className="cert-modal__backdrop-scanlines" />
          </div>

          {/* Modal Container */}
          <div className="cert-modal__dialog y2k-cyber-box">
            {/* Top Y2K Window Bar */}
            <div className="cert-modal__bar">
              <div className="cert-modal__bar-left">
                <div className="cert-modal__window-dots">
                  <span className="dot dot--red" onClick={closeModal} title="Close" />
                  <span className="dot dot--yellow" title="Minimize" />
                  <span className="dot dot--green" title="Maximize" />
                </div>
                <span className="cert-modal__bar-code">[{activeCert.y2kTag}]</span>
                <span className="cert-modal__bar-title">
                  VERIFIED CREDENTIAL // #{activeCert.id_number}
                </span>
              </div>

              <button
                className="cert-modal__close-btn"
                onClick={closeModal}
                aria-label="Close certificate preview"
              >
                <span>✕ ESC</span>
              </button>
            </div>

            {/* Modal Image Area with Y2K Holographic Frame */}
            <div className="cert-modal__content">
              {/* Previous Arrow */}
              <button
                className="cert-modal__nav cert-modal__nav--prev"
                onClick={prevCert}
                aria-label="Previous certificate"
                title="Previous certificate (Left Arrow)"
              >
                ‹
              </button>

              {/* Holographic Image Frame */}
              <div className="cert-modal__image-wrapper y2k-holo-frame">
                {/* Holographic Sheen Layer */}
                <div className="cert-modal__holo-sheen" />

                <img
                  src={activeCert.image}
                  alt={`Sertifikat ${activeCert.title} - ${activeCert.recipient}`}
                  className="cert-modal__img"
                />

                {/* Y2K Cyber Stamp */}
                <div className="cert-modal__stamp">
                  <span className="cert-modal__stamp-star">★</span>
                  <span className="cert-modal__stamp-text">AUTHENTIC RECORD</span>
                  <span className="cert-modal__stamp-sub">VERIFIED 2025</span>
                </div>
              </div>

              {/* Next Arrow */}
              <button
                className="cert-modal__nav cert-modal__nav--next"
                onClick={nextCert}
                aria-label="Next certificate"
                title="Next certificate (Right Arrow)"
              >
                ›
              </button>
            </div>

            {/* Modal Footer Controls */}
            <div className="cert-modal__footer cert-modal__footer--minimal">
              <div className="cert-modal__cert-info">
                <h4 className="cert-modal__cert-title">{activeCert.title}</h4>
                <span className="cert-modal__count">
                  {activeCertIndex + 1} / {certificates.length}
                </span>
              </div>

              <div className="cert-modal__actions">
                {activeCert.verifyUrl && (
                  <a
                    href={activeCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-modal__btn cert-modal__btn--verify"
                  >
                    <span>Verify Link ↗</span>
                  </a>
                )}
                <a
                  href={activeCert.pdf}
                  download={`${activeCert.id}-${activeCert.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.pdf`}
                  className="cert-modal__btn cert-modal__btn--primary"
                >
                  <span>Download PDF ⤓</span>
                </a>
                <button
                  onClick={closeModal}
                  className="cert-modal__btn cert-modal__btn--close"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function CertCard({ cert, delay, onView }) {
  return (
    <div
      className="cert-cassette-card"
      style={{
        '--cert-color': cert.color,
        '--cert-accent': cert.accent,
        animationDelay: `${delay}ms`,
      }}
      onClick={onView}
      role="button"
      tabIndex={0}
      aria-label={`Buka sertifikat ${cert.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onView()
        }
      }}
    >
      <div className="tape-back">
        {/* Corner Screws */}
        <span className="tape-screw screw--tl" />
        <span className="tape-screw screw--tr" />
        <span className="tape-screw screw--bl" />
        <span className="tape-screw screw--br" />

        {/* Top Tape Info */}
        <div className="tape-back__header">
          <span className="tape-back__side">SIDE B</span>
          <span className="tape-back__code">[{cert.y2kTag}]</span>
          <span className="tape-back__tech">CrO₂ · TYPE II</span>
        </div>

        {/* Retro Track Label Sticker */}
        <div className="tape-back__label">
          <div className="tape-back__stripes">
            <span className="stripe stripe--red" />
            <span className="stripe stripe--blue" />
          </div>

          <div className="tape-back__label-body">
            <div className="tape-back__meta">
              <span className="tape-back__track-num">TRACK #{cert.code}</span>
              <span className="tape-back__category">{cert.category}</span>
            </div>
            <h3 className="tape-back__title">{cert.title}</h3>
            
          </div>
        </div>

        {/* Cassette Window with Magnetic Reels */}
        <div className="tape-back__window">
          <div className="tape-back__reel reel--left">
            <div className="reel-teeth" />
            <div className="reel-hub" />
          </div>
          <div className="tape-back__spool-gauge">
            <div className="gauge-tape-strip" />
            <span className="gauge-marks">100 • 50 • 0</span>
          </div>
          <div className="tape-back__reel reel--right">
            <div className="reel-teeth" />
            <div className="reel-hub" />
          </div>
        </div>

        {/* Interactive Prompt: Directly Launches Floating Pop-up */}
        <div className="tape-back__footer">
          <div className="tape-back__prompt">
            <span className="prompt-spin-icon">👁️</span>
            <span className="prompt-spin-text">KLIK UNTUK LIHAT SERTIFIKAT ↗</span>
          </div>
        </div>
      </div>
    </div>
  )
}
