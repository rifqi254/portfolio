import { useState, useEffect, useRef } from 'react'
import './MomentsGallery.css'

const momentsPairs = [
  {
    top: {
      id: 'merbabu',
      title: 'Ekspedisi Puncak Merbabu',
      category: 'Outdoor & Summit Adventure',
      location: 'Jalur Selo, Taman Nasional Gn. Merbabu',
      year: '2024',
      badge: '🏔️ SUMMIT',
      type: 'portrait',
      image: '/gallery/gallery-01-merbabu-selo.jpg',
      caption: 'Menembus kabut dan jalur terjal Selo menuju puncak Gunung Merbabu bersama sahabat pejuang.',
      initRotate: -4.5,
      floatDuration: 4.8,
      floatDelay: 0,
    },
    bottom: {
      id: 'uin-event',
      title: 'Kontingen & Delegasi Kampus',
      category: 'Campus Official Delegation',
      location: 'UIN Sultan Maulana Hasanuddin Banten',
      year: '2024',
      badge: '🎓 KONTINGEN',
      type: 'landscape',
      image: '/gallery/gallery-02-uin-event.jpg',
      caption: 'Delegasi mahasiswa Informatika dalam agenda resmi universitas dan pekan kreativitas kampus.',
      initRotate: 4,
      floatDuration: 5.2,
      floatDelay: -1.5,
    },
  },
  {
    top: {
      id: 'saintek',
      title: 'Fakultas Sains & Teknologi',
      category: 'Academic Community',
      location: 'Gedung FST UIN SMH Banten',
      year: '2024',
      badge: '🏛️ SAINTEK',
      type: 'landscape',
      image: '/gallery/gallery-03-saintek-uin.jpg',
      caption: 'Keluarga besar mahasiswa dan civitas akademika Fakultas Sains dan Teknologi UIN Banten.',
      initRotate: -3.5,
      floatDuration: 4.3,
      floatDelay: -0.8,
    },
    bottom: {
      id: 'hmps-hallway',
      title: 'Pengurus HMPS Informatika',
      category: 'Student Association',
      location: 'Hall Kampus Informatika',
      year: '2025',
      badge: '⚡ HMPS TI',
      type: 'portrait',
      image: '/gallery/gallery-04-hmps-hallway.jpg',
      caption: 'Kekompakan pengurus Himpunan Mahasiswa Program Studi Informatika periode kepengurusan aktif.',
      initRotate: 5.5,
      floatDuration: 5.6,
      floatDelay: -2.1,
    },
  },
  {
    top: {
      id: 'himti-hall',
      title: 'Musyawarah & Sidang Himpunan',
      category: 'Organizational Assembly',
      location: 'Ruang Pertemuan Informatika',
      year: '2024',
      badge: '📋 HIMTI',
      type: 'landscape',
      image: '/gallery/gallery-05-himti-hall.jpg',
      caption: 'Forum sidang dan rapat kerja tahunan merumuskan arah gerak organisasi teknologi informasi.',
      initRotate: -4,
      floatDuration: 4.6,
      floatDelay: -1.2,
    },
    bottom: {
      id: 'it-camp',
      title: 'IT Camp Kabinet Sinergi',
      category: 'Leadership & Team Building',
      location: 'Camp Ground Sinergi',
      year: '2025',
      badge: '🏕️ IT CAMP',
      type: 'landscape',
      image: '/gallery/gallery-06-it-camp.jpg',
      caption: 'Pelatihan kepemimpinan, bonding, dan eksplorasi teknologi luar ruangan Kabinet Sinergi HMPS.',
      initRotate: 3.5,
      floatDuration: 5.0,
      floatDelay: -0.4,
    },
  },
  {
    top: {
      id: 'outdoor-group',
      title: 'Makrab & Kebersamaan Angkatan',
      category: 'Community Bonding',
      location: 'Outdoor Nature Retreat',
      year: '2024',
      badge: '🤝 MAKRAB',
      type: 'landscape',
      image: '/gallery/gallery-07-outdoor-group.jpg',
      caption: 'Malam keakraban mahasiswa Informatika mempererat solidaritas, cerita, dan kolaborasi bersama.',
      initRotate: -5,
      floatDuration: 4.4,
      floatDelay: -1.8,
    },
    bottom: {
      id: 'bkd-street',
      title: 'Studi Lapangan & Kunjungan Instansi',
      category: 'Government Field Work',
      location: 'Kawasan Perkantoran BKD',
      year: '2024',
      badge: '🏢 INSTANSI',
      type: 'landscape',
      image: '/gallery/gallery-08-bkd-street.jpg',
      caption: 'Kunjungan kerja dan implementasi sistem informasi pada badan instansi pemerintahan daerah.',
      initRotate: 4.2,
      floatDuration: 5.3,
      floatDelay: -0.9,
    },
  },
  {
    top: {
      id: 'auditorium-sinergi',
      title: 'Pelantikan Kabinet Sinergi',
      category: 'Inauguration Ceremony',
      location: 'Auditorium Kampus UIN SMH Banten',
      year: '2025',
      badge: '🎖️ SINERGI',
      type: 'landscape',
      image: '/gallery/gallery-09-auditorium-sinergi.jpg',
      caption: 'Momen khidmat pelantikan resmi jajaran pengurus HMPS Informatika Kabinet Sinergi 2025.',
      initRotate: -3,
      floatDuration: 4.7,
      floatDelay: -2.3,
    },
    bottom: {
      id: 'ibad-rahman',
      title: 'Education & Mentorship Program',
      category: 'Community Social Outreach',
      location: 'Ibad Ar Rahman Islamic School',
      year: '2024',
      badge: '📚 MENTOR',
      type: 'portrait',
      image: '/gallery/gallery-10-ibad-rahman.jpg',
      caption: 'Program edukasi digital, motivasi beasiswa, dan pendampingan santri muda di bidang teknologi.',
      initRotate: 6,
      floatDuration: 5.1,
      floatDelay: -1.1,
    },
  },
  {
    top: {
      id: 'almamater',
      title: 'Mahasiswa Berjas Almamater',
      category: 'Campus Pride & Identity',
      location: 'Plaza Gedung Rektorat UIN',
      year: '2024',
      badge: '✨ INFORMATIKA',
      type: 'portrait',
      image: '/gallery/gallery-11-almamater-campus.jpg',
      caption: 'Bangga mengenakan almamater kehormatan bersama rekan seperjuangan teknik informatika.',
      initRotate: -4.2,
      floatDuration: 4.5,
      floatDelay: -0.6,
    },
    bottom: {
      id: 'ramadan-iftar',
      title: 'Buka Puasa Bersama Informatika',
      category: 'Annual Gathering & Iftar',
      location: 'Pokel Garden Resto & Venue',
      year: '2025',
      badge: '🌙 IFTAR',
      type: 'landscape',
      image: '/gallery/gallery-12-ramadan-iftar.jpg',
      caption: 'Hangatnya silaturahmi buka puasa bersama Ramadan lintas angkatan dan dosen pembimbing.',
      initRotate: 4.8,
      floatDuration: 5.4,
      floatDelay: -1.7,
    },
  },
]

// Interactive Draggable Floating Photo Component
function FloatingPhoto({ item, onPhotoClick, zIndexBase = 1 }) {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [zIndex, setZIndex] = useState(zIndexBase)
  const dragStartRef = useRef({ x: 0, y: 0, startX: 0, startY: 0, hasMoved: false })

  const handlePointerDown = (e) => {
    // Left click or touch only
    if (e.button !== 0 && e.pointerType === 'mouse') return
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch (_) {}

    setIsDragging(true)
    setZIndex(99)
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      startX: dragOffset.x,
      startY: dragOffset.y,
      hasMoved: false,
    }
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return
    const dx = e.clientX - dragStartRef.current.x
    const dy = e.clientY - dragStartRef.current.y
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      dragStartRef.current.hasMoved = true
    }
    setDragOffset({
      x: dragStartRef.current.startX + dx,
      y: dragStartRef.current.startY + dy,
    })
  }

  const handlePointerUp = (e) => {
    if (!isDragging) return
    setIsDragging(false)
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch (_) {}

    // Quick tap/click triggers lightbox modal
    if (!dragStartRef.current.hasMoved) {
      onPhotoClick(item)
    }
  }

  return (
    <div
      className={`floating-photo-outer floating-photo-outer--${item.type} ${isDragging ? 'is-dragging' : ''}`}
      style={{
        transform: `translate3d(${dragOffset.x}px, ${dragOffset.y}px, 0)`,
        zIndex: isDragging ? 120 : zIndex,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      title={`${item.title} — Klik perbesar / Geser bebas`}
    >
      <div
        className="floating-photo-inner"
        style={{
          transform: `rotate(${item.initRotate + (isDragging ? 2.5 : 0)}deg)`,
          animationDuration: `${item.floatDuration}s`,
          animationDelay: `${item.floatDelay}s`,
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          className="floating-photo-img"
          draggable={false}
          loading="lazy"
        />
        <div className="floating-photo-sheen" />
      </div>
    </div>
  )
}

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
      const maxScroll = Math.max(trackWidth - windowWidth + 120, 0)

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

  // Keyboard navigation for lightbox
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
        {/* Subtle Topographic Lines in Background */}
        <div className="moments-topo-bg">
          <svg viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
            <path
              d="M-100,200 C300,100 600,350 1000,220 C1300,120 1500,280 1600,250"
              stroke="rgba(0, 102, 255, 0.08)"
              strokeWidth="1.5"
            />
            <path
              d="M-100,450 C250,380 700,550 1100,420 C1350,350 1500,480 1600,440"
              stroke="rgba(0, 204, 255, 0.08)"
              strokeWidth="1.5"
            />
            <path
              d="M-100,700 C400,600 750,780 1150,680 C1400,620 1500,720 1600,700"
              stroke="rgba(0, 102, 255, 0.06)"
              strokeWidth="1.5"
            />
          </svg>
        </div>

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
              <div className="moments-drag-hint-pill">
                <span>🖱️ BISA DIGESER / DRAG BEBAS</span>
              </div>
              <div className="moments-progress-bar-track">
                <div
                  className="moments-progress-bar-fill"
                  style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                />
              </div>
              <span className="moments-count-tag">
                ⇄ SCROLL HALAMAN UNTUK JELAJAHI FOTO
              </span>
            </div>
          </div>
        </div>

        {/* Scattered Floating Photos Canvas Track */}
        <div className="moments-track-viewport">
          <div
            className="moments-track"
            ref={trackRef}
            style={{ transform: `translate3d(-${translateX}px, 0, 0)` }}
          >
            {momentsPairs.map((pair, pIdx) => (
              <div
                key={pIdx}
                className={`floating-pair-col floating-pair-col--${(pIdx % 3) + 1}`}
              >
                <FloatingPhoto
                  item={pair.top}
                  onPhotoClick={setActivePhoto}
                  zIndexBase={pIdx * 2 + 1}
                />
                <FloatingPhoto
                  item={pair.bottom}
                  onPhotoClick={setActivePhoto}
                  zIndexBase={pIdx * 2 + 2}
                />
              </div>
            ))}

            {/* Ending Milestone Frame */}
            <div className="moments-outro-col">
              <div className="moments-outro-card">
                <span className="outro-emoji">✨</span>
                <h3 className="outro-title">Perjalanan Terus Berlanjut</h3>
                <p className="outro-desc">
                  Setiap momen adalah bagian dari dedikasi dan pertumbuhan yang tak pernah usai.
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
