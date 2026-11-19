import { useState, useEffect, useRef } from 'react'
import './MomentsGallery.css'

const momentsPhotos = [
  {
    id: 'merbabu',
    title: 'Ekspedisi Puncak Merbabu',
    category: 'Outdoor & Summit Adventure',
    location: 'Jalur Selo, Taman Nasional Gn. Merbabu',
    year: '2024',
    badge: '🏔️ SUMMIT',
    type: 'portrait',
    image: '/gallery/gallery-01-merbabu-selo.jpg',
    caption: 'Menembus kabut dan jalur terjal Selo menuju puncak Gunung Merbabu bersama sahabat pejuang.',
    initRotate: -3.5,
    offsetY: -55,
    marginLeft: 0,
    zIndex: 2,
    floatDuration: 4.8,
    floatDelay: 0,
  },
  {
    id: 'uin-event',
    title: 'Kontingen & Delegasi Kampus',
    category: 'Campus Official Delegation',
    location: 'UIN Sultan Maulana Hasanuddin Banten',
    year: '2024',
    badge: '🎓 KONTINGEN',
    type: 'landscape',
    image: '/gallery/gallery-02-uin-event.jpg',
    caption: 'Delegasi mahasiswa Informatika dalam agenda resmi universitas dan pekan kreativitas kampus.',
    initRotate: 3,
    offsetY: 48,
    marginLeft: -55,
    zIndex: 4,
    floatDuration: 5.2,
    floatDelay: -1.5,
  },
  {
    id: 'saintek',
    title: 'Fakultas Sains & Teknologi',
    category: 'Academic Community',
    location: 'Gedung FST UIN SMH Banten',
    year: '2024',
    badge: '🏛️ SAINTEK',
    type: 'portrait',
    image: '/gallery/gallery-03-saintek-uin.jpg',
    caption: 'Keluarga besar mahasiswa dan civitas akademika Fakultas Sains dan Teknologi UIN Banten.',
    initRotate: 2.5,
    offsetY: -60,
    marginLeft: -45,
    zIndex: 1,
    floatDuration: 4.3,
    floatDelay: -0.8,
  },
  {
    id: 'hmps-hallway',
    title: 'Pengurus HMPS Informatika',
    category: 'Student Association',
    location: 'Hall Kampus Informatika',
    year: '2025',
    badge: '⚡ HMPS TI',
    type: 'portrait',
    image: '/gallery/gallery-04-hmps-hallway.jpg',
    caption: 'Kekompakan pengurus Himpunan Mahasiswa Program Studi Informatika periode kepengurusan aktif.',
    initRotate: -4,
    offsetY: 52,
    marginLeft: -50,
    zIndex: 3,
    floatDuration: 5.6,
    floatDelay: -2.1,
  },
  {
    id: 'himti-hall',
    title: 'Musyawarah & Sidang Himpunan',
    category: 'Organizational Assembly',
    location: 'Ruang Pertemuan Informatika',
    year: '2024',
    badge: '📋 HIMTI',
    type: 'landscape',
    image: '/gallery/gallery-05-himti-hall.jpg',
    caption: 'Forum sidang dan rapat kerja tahunan merumuskan arah gerak organisasi teknologi informasi.',
    initRotate: -2.5,
    offsetY: -50,
    marginLeft: -35,
    zIndex: 2,
    floatDuration: 4.6,
    floatDelay: -1.2,
  },
  {
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
    offsetY: 50,
    marginLeft: -60,
    zIndex: 4,
    floatDuration: 5.0,
    floatDelay: -0.4,
  },
  {
    id: 'outdoor-group',
    title: 'Makrab & Kebersamaan Angkatan',
    category: 'Community Bonding',
    location: 'Outdoor Nature Retreat',
    year: '2024',
    badge: '🤝 MAKRAB',
    type: 'landscape',
    image: '/gallery/gallery-07-outdoor-group.jpg',
    caption: 'Malam keakraban mahasiswa Informatika mempererat solidaritas, cerita, dan kolaborasi bersama.',
    initRotate: 4,
    offsetY: -58,
    marginLeft: -40,
    zIndex: 1,
    floatDuration: 4.4,
    floatDelay: -1.8,
  },
  {
    id: 'bkd-street',
    title: 'Studi Lapangan & Kunjungan Instansi',
    category: 'Government Field Work',
    location: 'Kawasan Perkantoran BKD',
    year: '2024',
    badge: '🏢 INSTANSI',
    type: 'landscape',
    image: '/gallery/gallery-08-bkd-street.jpg',
    caption: 'Kunjungan kerja dan implementasi sistem informasi pada badan instansi pemerintahan daerah.',
    initRotate: -3,
    offsetY: 54,
    marginLeft: -55,
    zIndex: 3,
    floatDuration: 5.3,
    floatDelay: -0.9,
  },
  {
    id: 'auditorium-sinergi',
    title: 'Pelantikan Kabinet Sinergi',
    category: 'Inauguration Ceremony',
    location: 'Auditorium Kampus UIN SMH Banten',
    year: '2025',
    badge: '🎖️ SINERGI',
    type: 'landscape',
    image: '/gallery/gallery-09-auditorium-sinergi.jpg',
    caption: 'Momen khidmat pelantikan resmi jajaran pengurus HMPS Informatika Kabinet Sinergi 2025.',
    initRotate: -4,
    offsetY: -56,
    marginLeft: -40,
    zIndex: 2,
    floatDuration: 4.7,
    floatDelay: -2.3,
  },
  {
    id: 'ibad-rahman',
    title: 'Education & Mentorship Program',
    category: 'Community Social Outreach',
    location: 'Ibad Ar Rahman Islamic School',
    year: '2024',
    badge: '📚 MENTOR',
    type: 'landscape',
    image: '/gallery/gallery-10-ibad-rahman.jpg',
    caption: 'Program edukasi digital, motivasi beasiswa, dan pendampingan santri muda di bidang teknologi.',
    initRotate: 3,
    offsetY: 46,
    marginLeft: -60,
    zIndex: 4,
    floatDuration: 5.1,
    floatDelay: -1.1,
  },
  {
    id: 'almamater',
    title: 'Mahasiswa Berjas Almamater',
    category: 'Campus Pride & Identity',
    location: 'Plaza Gedung Rektorat UIN',
    year: '2024',
    badge: '✨ INFORMATIKA',
    type: 'landscape',
    image: '/gallery/gallery-11-almamater-campus.jpg',
    caption: 'Bangga mengenakan almamater kehormatan bersama rekan seperjuangan teknik informatika.',
    initRotate: 3.5,
    offsetY: -52,
    marginLeft: -45,
    zIndex: 2,
    floatDuration: 4.5,
    floatDelay: -0.6,
  },
  {
    id: 'ramadan-iftar',
    title: 'Buka Puasa Bersama Informatika',
    category: 'Annual Gathering & Iftar',
    location: 'Pokel Garden Resto & Venue',
    year: '2025',
    badge: '🌙 IFTAR',
    type: 'portrait',
    image: '/gallery/gallery-12-ramadan-iftar.jpg',
    caption: 'Hangatnya silaturahmi buka puasa bersama Ramadan lintas angkatan dan dosen pembimbing.',
    initRotate: -3.5,
    offsetY: 50,
    marginLeft: -50,
    zIndex: 3,
    floatDuration: 5.4,
    floatDelay: -1.7,
  },
]

// Interactive Draggable Floating Photo (ORGANIC SCATTERED COLLAGE — GAYA EKA WAHYU)
function FloatingPhoto({ item, onPhotoClick }) {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [zIndex, setZIndex] = useState(item.zIndex || 1)
  const dragStartRef = useRef({ x: 0, y: 0, startX: 0, startY: 0, hasMoved: false })

  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch (_) {}

    setIsDragging(true)
    setZIndex(100)
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

    if (!dragStartRef.current.hasMoved) {
      onPhotoClick(item)
    }
  }

  return (
    <div
      className={`floating-photo-item ${isDragging ? 'is-dragging' : ''}`}
      style={{
        transform: `translate3d(${dragOffset.x}px, ${dragOffset.y + (item.offsetY || 0)}px, 0)`,
        zIndex: isDragging ? 200 : zIndex,
        marginLeft: item.marginLeft ? `${item.marginLeft}px` : '0px',
        '--base-rot': `${item.initRotate}deg`,
        '--float-dur': `${item.floatDuration}s`,
        '--float-delay': `${item.floatDelay}s`,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <img
        src={item.image}
        alt={item.title}
        className={`floating-photo-img floating-photo-img--${item.type}`}
        draggable={false}
        loading="lazy"
      />
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
        {/* Subtle Topographic Lines in Background (Eka Wahyu Style Elevation Contours) */}
        <div className="moments-topo-bg">
          <svg viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
            <path
              d="M-100,120 C200,60 500,220 850,140 C1200,60 1400,200 1600,160"
              stroke="rgba(0, 102, 255, 0.08)"
              strokeWidth="1.5"
            />
            <path
              d="M-100,260 C250,180 600,380 980,270 C1300,160 1480,320 1600,280"
              stroke="rgba(0, 150, 255, 0.07)"
              strokeWidth="1.5"
            />
            <path
              d="M-100,420 C220,340 680,510 1080,390 C1340,310 1480,440 1600,410"
              stroke="rgba(0, 204, 255, 0.08)"
              strokeWidth="1.5"
            />
            <path
              d="M-100,580 C320,490 740,680 1140,560 C1380,480 1500,600 1600,570"
              stroke="rgba(0, 102, 255, 0.07)"
              strokeWidth="1.5"
            />
            <path
              d="M-100,740 C380,640 760,820 1180,710 C1420,640 1520,740 1600,720"
              stroke="rgba(0, 150, 255, 0.06)"
              strokeWidth="1.5"
            />
            {/* Topographic Elevation Rings */}
            <ellipse cx="260" cy="520" rx="180" ry="110" stroke="rgba(0, 102, 255, 0.05)" strokeWidth="1.5" />
            <ellipse cx="260" cy="520" rx="120" ry="70" stroke="rgba(0, 150, 255, 0.06)" strokeWidth="1.5" />
            <ellipse cx="1180" cy="340" rx="220" ry="130" stroke="rgba(0, 204, 255, 0.05)" strokeWidth="1.5" />
            <ellipse cx="1180" cy="340" rx="140" ry="80" stroke="rgba(0, 102, 255, 0.06)" strokeWidth="1.5" />
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

        {/* Scattered Floating Photos Canvas Track (FULL GAMBAR — ZERO CARD / ZERO CARD HOVER) */}
        <div className="moments-track-viewport">
          <div
            className="moments-track"
            ref={trackRef}
            style={{ transform: `translate3d(-${translateX}px, 0, 0)` }}
          >
            {momentsPhotos.map((item) => (
              <FloatingPhoto
                key={item.id}
                item={item}
                onPhotoClick={setActivePhoto}
              />
            ))}
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
