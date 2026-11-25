import { motion } from 'motion/react'
import SplitTitle from '../components/SplitTitle'
import './Timeline.css'

const timelineItems = [
  {
    year: '2026',
    period: '9 Feb – 31 Jul 2026',
    title: 'Program Magang Kerja – Diskominfo Kota Tangerang Selatan',
    org: 'Dinas Komunikasi dan Informatika Kota Tangerang Selatan',
    type: 'Internship',
    color: '#0088ff',
    glowColor: 'rgba(0, 136, 255, 0.35)',
    description: 'Melaksanakan program magang kerja profesional di Dinas Komunikasi dan Informatika Kota Tangerang Selatan dengan predikat hasil SANGAT BAIK.',
    bullets: [
      'Melaksanakan program magang di Dinas Komunikasi dan Informatika Kota Tangerang Selatan (9 Februari s.d 31 Juli 2026)',
      'Meraih predikat hasil evaluasi akhir: SANGAT BAIK',
      'Nomor Sertifikat Resmi: 400.14.5.4/3798/Diskominfo/VII/2026'
    ],
    tags: ['Program Magang', 'Diskominfo Tangsel', 'Government IT', 'Predikat Sangat Baik', 'Tangerang Selatan'],
    icon: '🏛️',
    status: 'Sangat Baik'
  },
  {
    year: '2026',
    period: '14 Januari 2026',
    title: 'Getting Started with Microsoft Excel',
    org: 'Coursera & Freedom Learning Group',
    type: 'Course',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    description: 'Menyelesaikan program sertifikasi spreadsheet dan analisis data bisnis tingkat pemula hingga menengah bersama Coursera.',
    bullets: [
      'Getting Started with Microsoft Excel – Coursera (2026)',
      'ID Kredensial: 89WNUXSIH1BW • Authorized by Coursera'
    ],
    tags: ['Microsoft Excel', 'Data Analysis', 'Coursera', 'Spreadsheet', 'Certified'],
    icon: '📊',
    status: 'Completed'
  },
  {
    year: '2025',
    period: 'Dicoding Academy (2025)',
    title: 'Sertifikasi Pemrograman & Cloud',
    org: 'Dicoding Academy & AWS',
    type: 'Certification',
    color: '#0284c7',
    glowColor: 'rgba(2, 132, 199, 0.35)',
    description: 'Menyelesaikan serangkaian sertifikasi kompetensi pemrograman web JavaScript, back-end development, dan cloud computing AWS:',
    bullets: [
      'Belajar Dasar Pemrograman JavaScript – Dicoding Academy (2025)',
      'Belajar Back-End Pemula dengan JavaScript – Dicoding Academy (2025)',
      'Belajar Dasar Cloud dan Gen AI di AWS – Dicoding Academy (2025)'
    ],
    tags: ['JavaScript', 'Back-End API', 'Cloud AWS', 'Generative AI', 'Dicoding'],
    icon: '💻',
    status: 'Certified'
  },
  {
    year: '2025 – 2026',
    period: '23 Feb 2025 – 28 Jan 2026',
    title: 'Ketua Divisi Komunikasi & Informasi',
    org: 'HMPS Informatika',
    type: 'Organization',
    color: '#00ccff',
    glowColor: 'rgba(0, 204, 255, 0.35)',
    description: 'Memimpin divisi Komunikasi dan Informasi dalam pengelolaan media informasi dan komunikasi organisasi HMPS Informatika.',
    bullets: [
      'Mengkoordinasikan pengelolaan media informasi dan komunikasi organisasi',
      'Bertanggung jawab atas publikasi dan dokumentasi kegiatan HMPS',
      'Mengelola konten sosial media dan platform digital organisasi'
    ],
    tags: ['Ketua Kominfo', 'HMPS Informatika', 'Media & Publikasi', 'Dokumentasi'],
    icon: '📡',
    status: 'Active'
  },
  {
    year: '2024 – 2025',
    period: '4 Feb 2024 – 28 Des 2025',
    title: 'Anggota Divisi Hubungan Eksternal',
    org: 'HMPS Informatika',
    type: 'Organization',
    color: '#8b5cf6',
    glowColor: 'rgba(139, 92, 246, 0.35)',
    description: 'Berkontribusi dalam membangun dan menjaga relasi kemitraan dengan pihak eksternal organisasi HMPS Informatika.',
    bullets: [
      'Menjalin komunikasi dengan pihak eksternal dan organisasi lain',
      'Mendukung koordinasi kerjasama dan kolaborasi antar organisasi',
      'Mewakili HMPS dalam kegiatan dan forum eksternal kampus'
    ],
    tags: ['Hubungan Eksternal', 'HMPS Informatika', 'Partnership', 'Networking'],
    icon: '🤝',
    status: 'Active'
  }
]

export default function Timeline() {
  return (
    <section className="timeline section" id="timeline" aria-label="Timeline Journey">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="timeline__header-badge">
            <span className="timeline__header-dot" />
            <span className="timeline__header-code">EXPERIENCE &amp; JOURNEY</span>
          </div>
          <SplitTitle
            parts={[
              { text: 'CAREER' },
              { text: '&', className: 'vault-title-amp' },
              { text: 'EXPERIENCE', className: 'timeline__title-accent' },
            ]}
            className="section-title"
          />
          <p className="section-subtitle">
            Rekam jejak pengalaman magang kerja, kepemimpinan organisasi kemahasiswaan, dan pelatihan kompetensi teknologi.
          </p>
        </div>

        {/* Timeline Structure */}
        <div className="timeline__container">
          {/* Laser spine glow line */}
          <div className="timeline__spine" aria-hidden="true">
            <div className="timeline__spine-pulse" />
          </div>

          <div className="timeline__rows">
            {timelineItems.map((item, idx) => {
              const isEven = idx % 2 === 0
              return (
                <div
                  key={`${item.year}-${idx}`}
                  className={`timeline__row ${isEven ? 'timeline__row--left' : 'timeline__row--right'}`}
                >
                  {/* Left Column (Card for even, spacer for odd) */}
                  <div className="timeline__col timeline__col--left">
                    {isEven && <TimelineCard item={item} isEven={true} />}
                  </div>

                  {/* Center Node (Spine anchor) */}
                  <div className="timeline__center">
                    <div
                      className="timeline__node"
                      style={{
                        '--node-color': item.color,
                        '--node-glow': item.glowColor,
                      }}
                    >
                      <div className="timeline__node-ring" />
                      <div className="timeline__node-dot">
                        <span className="timeline__node-icon">{item.icon}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (Spacer for even, card for odd) */}
                  <div className="timeline__col timeline__col--right">
                    {!isEven && <TimelineCard item={item} isEven={false} />}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom milestone pill */}
          <div className="timeline__footer-flag">
            <span className="timeline__footer-flag-icon">★</span>
            <span className="timeline__footer-flag-text">Future Milestones In Progress</span>
            <span className="timeline__footer-flag-dot" />
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineCard({ item, isEven = true }) {
  return (
    <motion.div
      className="timeline-card glass-card card-hover"
      whileHover={{ y: -5, scale: 1.015, transition: { duration: 0.22 } }}
      style={{
        '--card-accent': item.color,
      }}
    >
      {/* Top Cyber Window Bar */}
      <div className="timeline-card__top">
        <div className="timeline-card__year-badge">
          <span className="timeline-card__year">{item.year}</span>
          <span className="timeline-card__period">//{item.period}</span>
        </div>
        <div className="timeline-card__status">
          <span
            className="timeline-card__type-pill"
            style={{
              borderColor: `${item.color}50`,
              color: item.color,
              background: `${item.color}14`,
            }}
          >
            {item.type}
          </span>
          <span className="timeline-card__status-dot" style={{ background: item.color }} />
        </div>
      </div>

      {/* Card Body */}
      <div className="timeline-card__body">
        <h3 className="timeline-card__title">{item.title}</h3>
        <div className="timeline-card__org">
          <span className="timeline-card__org-icon">🏛️</span>
          <span>{item.org}</span>
        </div>
        {item.description && <p className="timeline-card__desc">{item.description}</p>}

        {/* Bullet Points */}
        {item.bullets && item.bullets.length > 0 && (
          <ul className="timeline-card__bullets">
            {item.bullets.map((bullet, idx) => (
              <li key={idx} className="timeline-card__bullet-item">
                <span className="timeline-card__bullet-dot">✦</span>
                <span className="timeline-card__bullet-text">{bullet}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Tech Tags */}
        <div className="timeline-card__tags">
          {item.tags.map(tag => (
            <span key={tag} className="timeline-card__tag">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
