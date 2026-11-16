import { useState, useEffect, useRef } from 'react'
import './MomentsGallery.css'

const momentsData = [
  {
    id: 'merbabu',
    title: 'Ekspedisi Puncak Merbabu',
    category: 'Outdoor & Summit Adventure',
    location: 'Jalur Selo, Taman Nasional Gn. Merbabu',
    year: '2024',
    badge: '🏔️ SUMMIT',
    image: '/gallery/gallery-01-merbabu-selo.jpg',
    caption: 'Menembus kabut dan jalur terjal Selo menuju puncak Gunung Merbabu bersama sahabat pejuang.',
  },
  {
    id: 'uin-event',
    title: 'Kontingen & Delegasi Kampus',
    category: 'Campus Official Delegation',
    location: 'UIN Sultan Maulana Hasanuddin Banten',
    year: '2024',
    badge: '🎓 KONTINGEN',
    image: '/gallery/gallery-02-uin-event.jpg',
    caption: 'Delegasi mahasiswa Informatika dalam agenda resmi universitas dan pekan kreativitas kampus.',
  },
  {
    id: 'saintek',
    title: 'Fakultas Sains & Teknologi',
    category: 'Academic Community',
    location: 'Gedung FST UIN SMH Banten',
    year: '2024',
    badge: '🏛️ SAINTEK',
    image: '/gallery/gallery-03-saintek-uin.jpg',
    caption: 'Keluarga besar mahasiswa dan civitas akademika Fakultas Sains dan Teknologi UIN Banten.',
  },
  {
    id: 'hmps-hallway',
    title: 'Pengurus HMPS Informatika',
    category: 'Student Association',
    location: 'Hall Kampus Informatika',
    year: '2025',
    badge: '⚡ HMPS TI',
    image: '/gallery/gallery-04-hmps-hallway.jpg',
    caption: 'Kekompakan pengurus Himpunan Mahasiswa Program Studi Informatika periode kepengurusan aktif.',
  },
  {
    id: 'himti-hall',
    title: 'Musyawarah & Sidang Himpunan',
    category: 'Organizational Assembly',
    location: 'Ruang Pertemuan Informatika',
    year: '2024',
    badge: '📋 HIMTI',
    image: '/gallery/gallery-05-himti-hall.jpg',
    caption: 'Forum sidang dan rapat kerja tahunan merumuskan arah gerak organisasi teknologi informasi.',
  },
  {
    id: 'it-camp',
    title: 'IT Camp Kabinet Sinergi',
    category: 'Leadership & Team Building',
    location: 'Camp Ground Sinergi',
    year: '2025',
    badge: '🏕️ IT CAMP',
    image: '/gallery/gallery-06-it-camp.jpg',
    caption: 'Pelatihan kepemimpinan, bonding, dan eksplorasi teknologi luar ruangan Kabinet Sinergi HMPS.',
  },
  {
    id: 'outdoor-group',
    title: 'Makrab & Kebersamaan Angkatan',
    category: 'Community Bonding',
    location: 'Outdoor Nature Retreat',
    year: '2024',
    badge: '🤝 MAKRAB',
    image: '/gallery/gallery-07-outdoor-group.jpg',
    caption: 'Malam keakraban mahasiswa Informatika mempererat solidaritas, cerita, dan kolaborasi bersama.',
  },
  {
    id: 'bkd-street',
    title: 'Studi Lapangan & Kunjungan Instansi',
    category: 'Government Field Work',
    location: 'Kawasan Perkantoran BKD',
    year: '2024',
    badge: '🏢 INSTANSI',
    image: '/gallery/gallery-08-bkd-street.jpg',
    caption: 'Kunjungan kerja dan implementasi sistem informasi pada badan instansi pemerintahan daerah.',
  },
  {
    id: 'auditorium-sinergi',
    title: 'Pelantikan Kabinet Sinergi',
    category: 'Inauguration Ceremony',
    location: 'Auditorium Kampus UIN SMH Banten',
    year: '2025',
    badge: '🎖️ SINERGI',
    image: '/gallery/gallery-09-auditorium-sinergi.jpg',
    caption: 'Momen khidmat pelantikan resmi jajaran pengurus HMPS Informatika Kabinet Sinergi 2025.',
  },
  {
    id: 'ibad-rahman',
    title: 'Education & Mentorship Program',
    category: 'Community Social Outreach',
    location: 'Ibad Ar Rahman Islamic School',
    year: '2024',
    badge: '📚 MENTOR',
    image: '/gallery/gallery-10-ibad-rahman.jpg',
    caption: 'Program edukasi digital, motivasi beasiswa, dan pendampingan santri muda di bidang teknologi.',
  },
  {
    id: 'almamater',
    title: 'Mahasiswa Berjas Almamater',
    category: 'Campus Pride & Identity',
    location: 'Plaza Gedung Rektorat UIN',
    year: '2024',
    badge: '✨ INFORMATIKA',
    image: '/gallery/gallery-11-almamater-campus.jpg',
    caption: 'Bangga mengenakan almamater kehormatan bersama rekan seperjuangan teknik informatika.',
  },
  {
    id: 'ramadan-iftar',
    title: 'Buka Puasa Bersama Informatika',
    category: 'Annual Gathering & Iftar',
    location: 'Pokel Garden Resto & Venue',
    year: '2025',
    badge: '🌙 IFTAR',
    image: '/gallery/gallery-12-ramadan-iftar.jpg',
    caption: 'Hangatnya silaturahmi buka puasa bersama Ramadan lintas angkatan dan dosen pembimbing.',
  },
]

export default function MomentsGallery() {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const [translateX, setTranslateX] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activePhoto, setActivePhoto] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !trackRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const totalScrollable = containerRef.current.offsetHeight - windowHeight

      if (totalScrollable <= 0) return

      // Progress from 0 to 1
      const scrolled = -rect.top
      const progress = Math.min(Math.max(scrolled / totalScrollable, 0), 1)

      const track = trackRef.current
      const trackWidth = track.scrollWidth
      const windowWidth = window.innerWidth
      // Leave nice trailing padding so last card is fully visible
      const maxScroll = Math.max(trackWidth - windowWidth + 140, 0)

      setScrollProgress(progress)
      setTranslateX(progress * maxScroll)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Keyboard navigation for full screen lightbox
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && activePhoto) {
        setActivePhoto(null)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [activePhoto])

  return (
    <section className="moments-section" id="moments" ref={containerRef}>
      {/* Sticky Viewport Frame */}
      <div className="moments-sticky-frame">
        {/* Subtle Cyber Dreamscape Grid Background */}
        <div className="moments-cyber-grid" />
        <div className="moments-glow-orb moments-glow-orb--1" />
        <div className="moments-glow-orb moments-glow-orb--2" />

        {/* Section Top Header Bar */}
        <div className="moments-header-bar">
          <div className="moments-header-left">
            <div className="moments-badge">
              <span className="moments-badge-dot" />
              <span className="moments-badge-code">✦ LIFE &amp; COMMUNITY CHRONICLES // 2024–2026</span>
            </div>
            <h2 className="moments-title">
              MOMENTS &amp; <span className="moments-title-accent">MEMORIES</span>
            </h2>
            <p className="moments-subtitle">
              Dokumentasi perjalanan hidup, organisasi mahasiswa HMPS Informatika, petualangan alam, dan kebersamaan.
            </p>
          </div>

          <div className="moments-header-right">
            <div className="moments-scroll-indicator">
              <span className="moments-scroll-label">
                ⇄ SCROLL KE BAWAH UNTUK GESER FOTO
              </span>
              <div className="moments-progress-bar-track">
                <div
                  className="moments-progress-bar-fill"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
              <span className="moments-count-tag">
                {Math.min(Math.floor(scrollProgress * momentsData.length) + 1, momentsData.length)} / {momentsData.length} DOKUMENTASI
              </span>
            </div>
          </div>
        </div>

        {/* Horizontal Moving Track (FULL GAMBAR - NO CARD WRAPPER / NO CARD HOVER) */}
        <div className="moments-track-viewport">
          <div
            className="moments-track"
            ref={trackRef}
            style={{ transform: `translate3d(-${translateX}px, 0, 0)` }}
          >
            {momentsData.map((item) => (
              <div
                key={item.id}
                className="moments-photo-frame"
                onClick={() => setActivePhoto(item)}
                title={`${item.title} — Klik untuk perbesar`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="moments-photo-img"
                  loading="lazy"
                />
              </div>
            ))}

            {/* Ending Milestone Frame */}
            <div className="moments-outro-frame">
              <div className="outro-card-content">
                <span className="outro-emoji">✨</span>
                <h3 className="outro-title">Perjalanan Terus Berlanjut</h3>
                <p className="outro-desc">
                  Setiap langkah adalah bagian dari dedikasi dan pertumbuhan yang tak pernah usai.
                </p>
                <div className="outro-pill">
                  <span>Scroll ke Bawah untuk Skills ➔</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Y2K LIGHTBOX PREVIEW MODAL ─── */}
      {activePhoto && (
        <div
          className="moments-modal"
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
        >
          <div className="moments-modal__backdrop" onClick={() => setActivePhoto(null)} />

          <div className="moments-modal__window">
            {/* Retro OS Window Bar */}
            <div className="moments-modal__bar">
              <div className="moments-modal__bar-left">
                <div className="moments-dots">
                  <span className="dot dot--pink" onClick={() => setActivePhoto(null)} />
                  <span className="dot dot--yellow" />
                  <span className="dot dot--cyan" />
                </div>
                <span className="moments-modal__code">
                  [MOMENTS_VIEWER.EXE // FULL_HD]
                </span>
              </div>

              <div className="moments-modal__bar-center">
                <span className="moments-modal__title-tag">{activePhoto.title}</span>
              </div>

              <div className="moments-modal__bar-right">
                <button
                  className="moments-modal__close-btn"
                  onClick={() => setActivePhoto(null)}
                >
                  ✕ ESC // CLOSE
                </button>
              </div>
            </div>

            {/* Modal Body with Large Image & Caption */}
            <div className="moments-modal__body">
              <div className="moments-modal__media-stage">
                <img
                  src={activePhoto.image}
                  alt=""
                  aria-hidden="true"
                  className="moments-modal__bg-blur"
                />
                <img
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  className="moments-modal__img"
                />
              </div>

              <div className="moments-modal__info-bar">
                <div className="moments-modal__info-left">
                  <span className="info-badge">{activePhoto.badge}</span>
                  <span className="info-category">{activePhoto.category}</span>
                  <span className="info-year">YR // {activePhoto.year}</span>
                </div>
                <p className="moments-modal__caption">{activePhoto.caption}</p>
                <p className="moments-modal__loc">📍 {activePhoto.location}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

