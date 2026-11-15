import { useState, useEffect, useRef } from 'react'
import './ArchiveVault.css'

// ─── 01. PROJECTS DATA (7 Items) ───
const projectsData = [
  {
    id: 'ramenatsu',
    title: 'RAMENATSU · Food App Design',
    subtitle: 'UI/UX Design Concept — Mobile Food Ordering App',
    category: 'UI/UX Mobile Design',
    tagCode: 'UI-FOODAPP',
    label: 'label-pink',
    description: 'Konsep desain aplikasi mobile pemesanan makanan Jepang (ramen) dengan branding visual khas RAMENATSU. Dirancang dengan antarmuka pengguna yang intuitif dan estetika modern untuk pengalaman pemesanan makanan yang seamless, mulai dari menu browsing, kustomisasi pesanan, hingga checkout dan tracking delivery.',
    tech: ['Figma', 'UI/UX Design', 'Mobile App', 'Prototyping'],
    year: '2025',
    color: '#fef3c7',
    accent: '#d97706',
    emoji: '🍜',
    image: '/projects/ramenatsu.png',
    hostedUrl: 'https://www.figma.com/proto/r9SaRyByniw6bduPPfsLNs/Food-app-design?node-id=569-132&p=f&t=P6gTbIeV4o0PSf7J-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=569%3A132',
    isHosted: true,
    actionText: 'Buka Prototype Figma',
  },
  {
    id: 'freshguard',
    title: 'FRESHGUARD · Smart Fruit Freshness',
    subtitle: 'IoT & Smart Packaging Monitoring App',
    category: 'Smart IoT & Mobile Web',
    tagCode: 'IOT-FRESHGUARD',
    label: 'label-lime',
    description: 'Aplikasi mobile dan sistem monitoring kesegaran buah pintar terintegrasi sensor FRESHGUARD. Memungkinkan pengguna memantau status kemasan aktif secara real-time (Apel Fuji 92% Segar, Anggur Hijau 68% Hampir Busuk, Stroberi 45%), scan kemasan baru via scanner kamera, grafik tingkat pembusukan, dan notifikasi peringatan dini pencegahan food waste.',
    tech: ['Mobile Web', 'IoT Sensor', 'Smart Packaging', 'Camera Scanner', 'Real-Time Tracking'],
    year: '2025',
    color: '#dcfce7',
    accent: '#16a34a',
    emoji: '🍎',
    image: '/projects/freshguard.png',
    htmlUrl: '/projects/freshguard.html',
    isHosted: false,
    actionText: 'Buka Demo Web App',
  },
  {
    id: 'smlti',
    title: 'SMLTI Diskominfo Tangerang Selatan',
    subtitle: 'Sistem Manajemen Layanan TI Kota Tangerang Selatan',
    category: 'Government Service Platform',
    tagCode: 'GOV-PORTAL',
    label: 'label-electric',
    description: 'Sistem Manajemen Layanan Teknologi Informasi (SMLTI) resmi untuk Dinas Komunikasi dan Informatika Kota Tangerang Selatan. Platform ini dirancang dengan otentikasi multi-tier untuk Super Administrator dan Admin Perangkat Daerah (PD), modul pelaporan kendala infrastruktur TI, tracking penanganan tiket perbaikan, dan dashboard monitoring layanan digital terintegrasi.',
    tech: ['Laravel', 'PHP', 'MySQL', 'Tailwind CSS', 'REST API', 'Multi-Tier Role'],
    year: '2024',
    color: '#dbeafe',
    accent: '#0044ee',
    emoji: '🏢',
    image: '/projects/smlti-tangsel.png',
    hostedUrl: 'https://dev4-60209.aplikasimu.my.id/login',
    isHosted: true,
    actionText: 'Kunjungi Website Portal',
  },
  {
    id: 'englai',
    title: 'EnglAI · AI English Classroom',
    subtitle: 'AI-Powered English Learning Environment',
    category: 'AI EdTech Platform',
    tagCode: 'AI-CLASSROOM',
    label: 'label-pink',
    description: 'Platform edukasi bertenaga Artificial Intelligence untuk mentransformasi pembelajaran bahasa Inggris di kelas. Mengintegrasikan Large Language Model (LLM) untuk mengubah Rencana Pelaksanaan Pembelajaran (RPP) menjadi materi Self Learning interaktif, generator Live Quiz adaptif otomatis, penilaian tugas siswa instan, serta asisten mengajar cerdas bagi guru.',
    tech: ['AI / LLM', 'Prompt Engineering', 'React', 'Python / FastAPI', 'EdTech', 'Tailwind'],
    year: '2024',
    color: '#fce7f3',
    accent: '#e11d48',
    emoji: '🤖',
    image: '/projects/englai.png',
    hostedUrl: 'https://englai.my.id/',
    isHosted: true,
    actionText: 'Kunjungi Platform EnglAI',
  },
  {
    id: 'ecocampus',
    title: 'EcoCampus · Biodiversity Lab',
    subtitle: 'UIN Sultan Maulana Hasanuddin Banten',
    category: 'Citizen Science & Climate Action',
    tagCode: 'CLIMATE-BIO-LAB',
    label: 'label-lime',
    description: 'Platform digital observasi dan konservasi keanekaragaman hayati kampus UIN Sultan Maulana Hasanuddin Banten. Mengusung konsep Citizen Science bagi mahasiswa dan dosen untuk mendokumentasikan flora & fauna kampus, scan barcode QR Trail di titik-titik pohon konservasi, peta sebaran biodiversitas interaktif, serta edukasi iklim dan aksi hijau kampus.',
    tech: ['Citizen Science', 'Interactive Maps', 'QR Scanner', 'Eco Platform', 'Data Viz', 'UIN Banten'],
    year: '2025',
    color: '#ecfccb',
    accent: '#65a30d',
    emoji: '🌿',
    image: '/projects/ecocampus.png',
    isHosted: false,
    actionText: 'Lihat Dokumentasi Proyek',
  },
  {
    id: 'pengumuman-hmps',
    title: 'Portal Seleksi HMPS Informatika',
    subtitle: 'HMPS Informatika UIN SMH Banten 2025',
    category: 'Academic Organization Portal',
    tagCode: 'ACAD-SELEKSI',
    label: 'label-cyan',
    description: 'Portal web sistem informasi seleksi dan verifikasi kelulusan calon anggota pengurus divisi Himpunan Mahasiswa Program Studi (HMPS) Informatika UIN Sultan Maulana Hasanuddin Banten periode 2025. Dilengkapi fitur pencarian otomatis berbasis Nomor Induk Mahasiswa (NIM) untuk memvalidasi status kelulusan wawancara dan penempatan divisi secara real-time.',
    tech: ['JavaScript', 'Tailwind CSS', 'Student Verification', 'JSON Database', 'Live Lookup'],
    year: '2025',
    color: '#e0f2fe',
    accent: '#0284c7',
    emoji: '🎓',
    image: '/projects/pengumuman-hmps.jpg',
    isHosted: false,
    actionText: 'Lihat Dokumentasi Proyek',
  },
  {
    id: 'summitix',
    title: 'SUMMITIX · Portal Tiket Gunung 3D',
    subtitle: 'Official E-Simaksi Hub & Ekspedisi Nusantara',
    category: '3D Web & E-Ticketing Platform',
    tagCode: '3D-ESIMAKSI',
    label: 'label-cyan',
    description: 'Platform E-Simaksi digital dan reservasi tiket pendakian gunung di Indonesia secara legal, aman, dan terpadu. Mengintegrasikan teknologi visualisasi medan 3D untuk eksplorasi jalur pendakian (Gunung Rinjani, Bromo, Merbabu), sistem kuota harian jalur, penerbitan barcode E-Pass instan, asuransi jiwa & integrasi tim SAR, serta stasiun pemantauan cuaca pos pendakian.',
    tech: ['Laravel', 'Three.js / 3D', 'PHP', 'MySQL', 'Tailwind CSS', 'Leaflet GIS', 'Payment Gateway'],
    year: '2024',
    color: '#cffafe',
    accent: '#0891b2',
    emoji: '🏔️',
    image: '/projects/summitix.png',
    isHosted: false,
    actionText: 'Lihat Dokumentasi Proyek',
  },
]

// ─── 02. CERTIFICATES DATA (7 Items) ───
const certificatesData = [
  {
    id: 'cert-kominfo',
    title: 'Sertifikat Program Magang Diskominfo Tangsel',
    year: '2026',
    image: '/certificates/cert-magang-kominfo.png',
  },
  {
    id: 'cert-coursera-excel',
    title: 'Getting Started with Microsoft Excel',
    year: '2026',
    image: '/certificates/cert-coursera-excel.png',
  },
  {
    id: 'cert-linux',
    title: 'Belajar Linux dari Nol+',
    year: '2024',
    image: '/certificates/cert-linux.png',
  },
  {
    id: 'cert-hmps-cloud',
    title: 'Seminar IT & Bootcamp: First Step to Cloud',
    year: '2025',
    image: '/certificates/cert-hmps-cloud.png',
  },
  {
    id: 'cert-dicoding-aws-genai',
    title: 'Belajar Dasar Cloud dan Gen AI di AWS',
    year: '2025',
    image: '/certificates/cert-dicoding-aws-genai.png',
  },
  {
    id: 'cert-dicoding-backend-js',
    title: 'Belajar Back-End Pemula dengan JavaScript',
    year: '2025',
    image: '/certificates/cert-dicoding-backend-js.png',
  },
  {
    id: 'cert-dicoding-dasar-js',
    title: 'Belajar Dasar Pemrograman JavaScript',
    year: '2025',
    image: '/certificates/cert-dicoding-dasar-js.png',
  },
]

// ─── 03. AWARDS & HONORS DATA (3 Items) ───
const awardsData = [
  {
    id: 'award-magang-sangat-baik',
    title: 'Predikat Hasil Evaluasi Akhir SANGAT BAIK',
    year: '2026',
    badge: '🏆',
    image: '/certificates/cert-magang-kominfo.png',
  },
  {
    id: 'award-aws-genai',
    title: 'Sertifikasi Kompetensi Global AWS Cloud & Gen AI',
    year: '2025',
    badge: '🌟',
    image: '/certificates/cert-dicoding-aws-genai.png',
  },
  {
    id: 'award-hmps-leadership',
    title: 'Piagam Apresiasi Kepengurusan & Dedikasi HMPS',
    year: '2025',
    badge: '🎖️',
    image: '/certificates/cert-hmps-cloud.png',
  },
]

export default function ArchiveVault() {
  const [activeFolder, setActiveFolder] = useState(null)
  
  // Modals
  const [activeProject, setActiveProject] = useState(null)
  const [activeCert, setActiveCert] = useState(null)
  const [activeAward, setActiveAward] = useState(null)

  const reelRef = useRef(null)

  useEffect(() => {
    const handleWarp = (e) => {
      const { id } = e.detail || {}
      if (id === 'projects') {
        setActiveFolder('projects')
      } else if (id === 'certificates') {
        setActiveFolder('certificates')
      } else if (id === 'awards') {
        setActiveFolder('awards')
      } else if (id === 'archive') {
        setActiveFolder(null)
      }
    }
    window.addEventListener('warp-to-section', handleWarp)
    return () => window.removeEventListener('warp-to-section', handleWarp)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (activeProject) setActiveProject(null)
        if (activeCert) setActiveCert(null)
        if (activeAward) setActiveAward(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeProject, activeCert, activeAward])

  const scrollReel = (direction) => {
    if (!reelRef.current) return
    const offset = direction === 'left' ? -380 : 380
    reelRef.current.scrollBy({ left: offset, behavior: 'smooth' })
  }

  const handleCertNav = (dir) => {
    if (!activeCert) return
    const currentIdx = certificatesData.findIndex((c) => c.id === activeCert.id)
    if (currentIdx === -1) return
    const nextIdx = (currentIdx + (dir === 'next' ? 1 : -1) + certificatesData.length) % certificatesData.length
    setActiveCert(certificatesData[nextIdx])
  }

  const handleAwardNav = (dir) => {
    if (!activeAward) return
    const currentIdx = awardsData.findIndex((a) => a.id === activeAward.id)
    if (currentIdx === -1) return
    const nextIdx = (currentIdx + (dir === 'next' ? 1 : -1) + awardsData.length) % awardsData.length
    setActiveAward(awardsData[nextIdx])
  }

  return (
    <section className="archive-vault section" id="archive" aria-label="Archive Directory">
      {/* Anchor targets */}
      <div id="projects" style={{ position: 'relative', top: '-90px' }} />
      <div id="certificates" style={{ position: 'relative', top: '-90px' }} />
      <div id="awards" style={{ position: 'relative', top: '-90px' }} />

      <div className="container">
        {/* Section Header */}
        <div className="section-header vault-header">
          <div className="vault-header-badge">
            <span className="vault-header-dot" />
            <span className="vault-header-code">UNIFIED ARCHIVE // WORKS &amp; CREDENTIALS</span>
          </div>
          <h2 className="section-title vault-title">
            PORTFOLIO &amp; <span className="vault-title-accent">ARCHIVE</span>
          </h2>
          <p className="section-subtitle vault-subtitle">
            {activeFolder ? (
              <span>Sedang membuka folder <strong>{activeFolder.toUpperCase()}</strong>. Klik tombol kembali untuk melihat semua folder.</span>
            ) : (
              <span>Koleksi proyek web, sertifikasi resmi, dan penghargaan terkurasi dalam 3 folder. Sentuh atau klik folder untuk masuk ke dalamnya.</span>
            )}
          </p>
        </div>

        {/* ─── TAMPILAN 1: HANYA MENAMPILKAN 3 FOLDER (SEBELUM DIKLIK) ─── */}
        {!activeFolder && (
          <div className="vault-folders__deck" aria-label="Pilih Folder Arsip">
            {/* 📁 FOLDER 1: PROJECTS */}
            <div
              className="vault-folder-card"
              onClick={() => setActiveFolder('projects')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveFolder('projects')}
              title="Klik untuk masuk ke folder Projects (7 File)"
            >
              <div className="folder-back-piece">
                <svg className="folder-back-svg" viewBox="0 0 360 260" preserveAspectRatio="none">
                  <path
                    d="M 0,38 Q 0,18 18,18 L 140,18 C 160,18 175,0 195,0 L 340,0 Q 360,0 360,20 L 360,240 Q 360,260 340,260 L 20,260 Q 0,260 0,240 Z"
                    fill="url(#folderBackGrad)"
                    stroke="rgba(255,255,255,0.14)"
                    strokeWidth="1.5"
                  />
                  <defs>
                    <linearGradient id="folderBackGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#222838" />
                      <stop offset="100%" stopColor="#101420" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <div className="folder-peek-stack">
                <div className="peek-thumb peek-thumb--1">
                  <img src="/projects/englai.png" alt="EnglAI" />
                </div>
                <div className="peek-thumb peek-thumb--2">
                  <img src="/projects/smlti-tangsel.png" alt="SMLTI" />
                </div>
                <div className="peek-thumb peek-thumb--3">
                  <img src="/projects/freshguard.png" alt="Freshguard" />
                </div>
                <div className="peek-thumb peek-thumb--4">
                  <img src="/projects/ramenatsu.png" alt="Ramenatsu" />
                </div>
              </div>

              <div className="folder-front-piece">
                <svg className="folder-front-svg" viewBox="0 0 360 190" preserveAspectRatio="none">
                  <path
                    d="M 0,20 Q 0,0 20,0 L 125,0 C 145,0 155,24 178,24 L 340,24 Q 360,24 360,44 L 360,170 Q 360,190 340,190 L 20,190 Q 0,190 0,170 Z"
                    fill="url(#folderFrontGlassGrad)"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1.5"
                  />
                  <defs>
                    <linearGradient id="folderFrontGlassGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(34, 42, 60, 0.88)" />
                      <stop offset="100%" stopColor="rgba(16, 20, 32, 0.94)" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="folder-front-content">
                  <div className="folder-info-meta">
                    <span className="folder-count-num">7</span>
                    <span className="folder-count-label">Projects</span>
                  </div>

                  <div className="folder-dots-pill">
                    <span className="dot-circle" />
                    <span className="dot-circle" />
                    <span className="dot-circle" />
                  </div>
                </div>
              </div>

              <div className="folder-open-hover-hint">
                <span>Masuk ke Folder ↗</span>
              </div>
            </div>

            {/* 📁 FOLDER 2: CERTIFICATES */}
            <div
              className="vault-folder-card"
              onClick={() => setActiveFolder('certificates')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveFolder('certificates')}
              title="Klik untuk masuk ke folder Certificates (7 Sertifikat)"
            >
              <div className="folder-back-piece">
                <svg className="folder-back-svg" viewBox="0 0 360 260" preserveAspectRatio="none">
                  <path
                    d="M 0,38 Q 0,18 18,18 L 140,18 C 160,18 175,0 195,0 L 340,0 Q 360,0 360,20 L 360,240 Q 360,260 340,260 L 20,260 Q 0,260 0,240 Z"
                    fill="url(#folderBackGrad)"
                    stroke="rgba(255,255,255,0.14)"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <div className="folder-peek-stack">
                <div className="peek-thumb peek-thumb--1">
                  <img src="/certificates/cert-linux.png" alt="Linux IDN" />
                </div>
                <div className="peek-thumb peek-thumb--2">
                  <img src="/certificates/cert-coursera-excel.png" alt="Coursera" />
                </div>
                <div className="peek-thumb peek-thumb--3">
                  <img src="/certificates/cert-magang-kominfo.png" alt="Diskominfo" />
                </div>
                <div className="peek-thumb peek-thumb--4">
                  <img src="/certificates/cert-dicoding-aws-genai.png" alt="AWS GenAI" />
                </div>
              </div>

              <div className="folder-front-piece">
                <svg className="folder-front-svg" viewBox="0 0 360 190" preserveAspectRatio="none">
                  <path
                    d="M 0,20 Q 0,0 20,0 L 125,0 C 145,0 155,24 178,24 L 340,24 Q 360,24 360,44 L 360,170 Q 360,190 340,190 L 20,190 Q 0,190 0,170 Z"
                    fill="url(#folderFrontGlassGrad)"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1.5"
                  />
                </svg>

                <div className="folder-front-content">
                  <div className="folder-info-meta">
                    <span className="folder-count-num">7</span>
                    <span className="folder-count-label">Certificates</span>
                  </div>

                  <div className="folder-dots-pill">
                    <span className="dot-circle" />
                    <span className="dot-circle" />
                    <span className="dot-circle" />
                  </div>
                </div>
              </div>

              <div className="folder-open-hover-hint">
                <span>Masuk ke Folder ↗</span>
              </div>
            </div>

            {/* 📁 FOLDER 3: AWARDS */}
            <div
              className="vault-folder-card"
              onClick={() => setActiveFolder('awards')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveFolder('awards')}
              title="Klik untuk masuk ke folder Awards (3 Awards)"
            >
              <div className="folder-back-piece">
                <svg className="folder-back-svg" viewBox="0 0 360 260" preserveAspectRatio="none">
                  <path
                    d="M 0,38 Q 0,18 18,18 L 140,18 C 160,18 175,0 195,0 L 340,0 Q 360,0 360,20 L 360,240 Q 360,260 340,260 L 20,260 Q 0,260 0,240 Z"
                    fill="url(#folderBackGrad)"
                    stroke="rgba(255,255,255,0.14)"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              <div className="folder-peek-stack">
                <div className="peek-thumb peek-thumb--1">
                  <img src="/certificates/cert-hmps-cloud.png" alt="HMPS Leadership" />
                </div>
                <div className="peek-thumb peek-thumb--2">
                  <img src="/certificates/cert-dicoding-aws-genai.png" alt="AWS Excellence" />
                </div>
                <div className="peek-thumb peek-thumb--3">
                  <img src="/certificates/cert-magang-kominfo.png" alt="Diskominfo Sangat Baik" />
                </div>
              </div>

              <div className="folder-front-piece">
                <svg className="folder-front-svg" viewBox="0 0 360 190" preserveAspectRatio="none">
                  <path
                    d="M 0,20 Q 0,0 20,0 L 125,0 C 145,0 155,24 178,24 L 340,24 Q 360,24 360,44 L 360,170 Q 360,190 340,190 L 20,190 Q 0,190 0,170 Z"
                    fill="url(#folderFrontGlassGrad)"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1.5"
                  />
                </svg>

                <div className="folder-front-content">
                  <div className="folder-info-meta">
                    <span className="folder-count-num">3</span>
                    <span className="folder-count-label">Awards</span>
                  </div>

                  <div className="folder-dots-pill">
                    <span className="dot-circle" />
                    <span className="dot-circle" />
                    <span className="dot-circle" />
                  </div>
                </div>
              </div>

              <div className="folder-open-hover-hint">
                <span>Masuk ke Folder ↗</span>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAMPILAN 2: MASUK KE DALAM FOLDER ─── */}
        {activeFolder && (
          <div className="vault-inside-view">
            {/* Top Bar with Back Button & Breadcrumbs */}
            <div className="vault-inside__bar">
              <button
                className="vault-inside__back-btn"
                onClick={() => setActiveFolder(null)}
                title="Keluar dari folder dan kembali ke pilihan 3 folder utama"
              >
                <span>← Kembali ke Semua Folder</span>
              </button>

              <div className="vault-inside__breadcrumb">
                <span className="bc-root">ARCHIVE //</span>
                <span className="bc-folder">
                  {activeFolder === 'projects' && '📂 PROJECTS (7 FILES)'}
                  {activeFolder === 'certificates' && '📂 CERTIFICATES (7 CERTS)'}
                  {activeFolder === 'awards' && '📂 AWARDS (3 AWARDS)'}
                </span>
              </div>

              {/* Quick Switch Pills */}
              <div className="vault-inside__switchers">
                <button
                  className={`drawer-switch-pill ${activeFolder === 'projects' ? 'is-active' : ''}`}
                  onClick={() => setActiveFolder('projects')}
                >
                  Projects (7)
                </button>
                <button
                  className={`drawer-switch-pill ${activeFolder === 'certificates' ? 'is-active' : ''}`}
                  onClick={() => setActiveFolder('certificates')}
                >
                  Certificates (7)
                </button>
                <button
                  className={`drawer-switch-pill ${activeFolder === 'awards' ? 'is-active' : ''}`}
                  onClick={() => setActiveFolder('awards')}
                >
                  Awards (3)
                </button>
              </div>
            </div>

            {/* Horizontal Reel Navigation Controls & Track */}
            <div className="vault-reel-wrapper">
              <button
                className="reel-arrow reel-arrow--prev"
                onClick={() => scrollReel('left')}
                aria-label="Geser ke kiri"
              >
                ‹
              </button>
              <button
                className="reel-arrow reel-arrow--next"
                onClick={() => scrollReel('right')}
                aria-label="Geser ke kanan"
              >
                ›
              </button>

              <div className="vault-reel" ref={reelRef}>
                {/* ── 1. PROJECTS HORIZONTAL REEL ── */}
                {activeFolder === 'projects' &&
                  projectsData.map((project) => (
                    <div
                      key={project.id}
                      className="clean-project-card"
                      onClick={() => setActiveProject(project)}
                    >
                      <div className="clean-project-card__thumb-wrap">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="clean-project-card__img"
                          loading="lazy"
                        />
                        <div className="clean-project-card__overlay-pill">
                          <span>Preview ↗</span>
                        </div>
                      </div>

                      <div className="clean-project-card__body">
                        <div className="clean-project-card__meta">
                          <span className="clean-project-card__category">{project.category}</span>
                          <span className="clean-project-card__year">{project.year}</span>
                        </div>
                        <h4 className="clean-project-card__title">{project.title}</h4>
                        <p className="clean-project-card__sub">{project.subtitle}</p>

                        <div className="clean-project-card__tech">
                          {project.tech.slice(0, 3).map((t) => (
                            <span key={t} className="clean-tech-tag">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}

                {/* ── 2. CERTIFICATES HORIZONTAL REEL (CLEAN IMAGE CARDS) ── */}
                {activeFolder === 'certificates' &&
                  certificatesData.map((cert) => (
                    <div
                      key={cert.id}
                      className="clean-cert-card"
                      onClick={() => setActiveCert(cert)}
                      title="Klik untuk melihat gambar sertifikat full"
                    >
                      <div className="clean-cert-card__img-wrap">
                        <img
                          src={cert.image}
                          alt="Sertifikat"
                          className="clean-cert-card__img"
                          loading="lazy"
                        />
                        <div className="clean-cert-card__zoom-badge">
                          <span>Lihat Gambar 🔍</span>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* ── 3. AWARDS HORIZONTAL REEL (CLEAN IMAGE CARDS) ── */}
                {activeFolder === 'awards' &&
                  awardsData.map((award) => (
                    <div
                      key={award.id}
                      className="clean-cert-card clean-cert-card--award"
                      onClick={() => setActiveAward(award)}
                      title="Klik untuk melihat piagam penghargaan full"
                    >
                      <div className="clean-cert-card__img-wrap">
                        <img
                          src={award.image}
                          alt="Penghargaan"
                          className="clean-cert-card__img"
                          loading="lazy"
                        />
                        <div className="clean-cert-card__zoom-badge clean-cert-card__zoom-badge--award">
                          <span>{award.badge} Lihat Piagam 🔍</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            <div className="vault-inside__hint">
              <span>✦ Geser horizontal untuk melihat seluruh file di dalam folder {activeFolder.toUpperCase()}</span>
            </div>
          </div>
        )}
      </div>

      {/* ─── MODAL 1: RESPONSIVE SPLIT 2-COLUMN PROJECT SHOWCASE MODAL ─── */}
      {/* DESKTOP: PENJELASAN DI KIRI, GAMBAR BESAR DI KANAN | MOBILE: GAMBAR DI ATAS, PENJELASAN DI BAWAH KETIKA SCROLL */}
      {activeProject && (
        <div
          className="project-showcase-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`Preview: ${activeProject.title}`}
        >
          <div className="project-showcase-modal__backdrop" onClick={() => setActiveProject(null)} />

          <div className="project-showcase-modal__dialog">
            {/* Top Close Button */}
            <button
              className="project-showcase-modal__close-btn"
              onClick={() => setActiveProject(null)}
              aria-label="Tutup preview proyek"
            >
              ✕
            </button>

            <div className="project-showcase-modal__layout">
              {/* LEFT COLUMN: PENJELASAN & ACTION BUTTONS */}
              <div className="project-showcase-modal__info-col">
                <div className="showcase-header">
                  <div className="showcase-badges">
                    <span className="showcase-badge showcase-badge--category">{activeProject.category}</span>
                    <span className="showcase-badge showcase-badge--year">{activeProject.year}</span>
                    {activeProject.isHosted && (
                      <span className="showcase-badge showcase-badge--live">● Live Online</span>
                    )}
                  </div>

                  <h3 className="showcase-title">{activeProject.title}</h3>
                  <p className="showcase-subtitle">{activeProject.subtitle}</p>
                </div>

                <div className="showcase-divider" />

                <div className="showcase-section">
                  <h4 className="showcase-section-heading">
                    <span className="heading-icon">📋</span> Tentang Proyek
                  </h4>
                  <p className="showcase-desc-text">{activeProject.description}</p>
                </div>

                <div className="showcase-section">
                  <h4 className="showcase-section-heading">
                    <span className="heading-icon">⚡</span> Teknologi & Fitur
                  </h4>
                  <div className="showcase-tech-tags">
                    {activeProject.tech.map((t) => (
                      <span key={t} className="showcase-tech-tag">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="showcase-actions">
                  {activeProject.isHosted ? (
                    <a
                      href={activeProject.hostedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="showcase-btn showcase-btn--primary"
                    >
                      <span>🚀 {activeProject.actionText || 'Kunjungi Website'}</span>
                      <span className="btn-arrow">↗</span>
                    </a>
                  ) : activeProject.htmlUrl ? (
                    <a
                      href={activeProject.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="showcase-btn showcase-btn--primary"
                    >
                      <span>🚀 {activeProject.actionText || 'Buka Demo Web App'}</span>
                      <span className="btn-arrow">↗</span>
                    </a>
                  ) : null}

                  <button
                    className="showcase-btn showcase-btn--secondary"
                    onClick={() => setActiveProject(null)}
                  >
                    Tutup Preview
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: GAMBAR PROYEK BESAR & JERNIH (STUDIO STAGE) */}
              <div className="project-showcase-modal__media-col">
                <div className="showcase-media-stage">
                  {activeProject.isHosted ? (
                    <a
                      href={activeProject.hostedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="showcase-media-link"
                      title="Klik untuk membuka hasil proyek"
                    >
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="showcase-media-img"
                      />
                      <div className="showcase-media-hover-overlay">
                        <span className="showcase-media-hover-pill">
                          Buka Hasil Proyek ↗
                        </span>
                      </div>
                    </a>
                  ) : activeProject.htmlUrl ? (
                    <a
                      href={activeProject.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="showcase-media-link"
                      title="Klik untuk membuka demo web app"
                    >
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="showcase-media-img"
                      />
                      <div className="showcase-media-hover-overlay">
                        <span className="showcase-media-hover-pill">
                          Buka Demo Web ↗
                        </span>
                      </div>
                    </a>
                  ) : (
                    <div className="showcase-media-link showcase-media-link--static">
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="showcase-media-img"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL 2: CERTIFICATE PURE IMAGE LIGHTBOX (NO TEXT, NO TITLES) ─── */}
      {activeCert && (
        <div className="pure-image-lightbox" role="dialog" aria-modal="true" aria-label="Sertifikat">
          <div className="pure-image-lightbox__backdrop" onClick={() => setActiveCert(null)} />

          <button
            className="pure-image-lightbox__close"
            onClick={() => setActiveCert(null)}
            aria-label="Tutup sertifikat"
          >
            ✕
          </button>

          <button
            className="pure-image-lightbox__nav pure-image-lightbox__nav--prev"
            onClick={() => handleCertNav('prev')}
            aria-label="Sertifikat sebelumnya"
          >
            ‹
          </button>

          <div className="pure-image-lightbox__container" onClick={() => setActiveCert(null)}>
            <img
              src={activeCert.image}
              alt="Sertifikat"
              className="pure-image-lightbox__img"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <button
            className="pure-image-lightbox__nav pure-image-lightbox__nav--next"
            onClick={() => handleCertNav('next')}
            aria-label="Sertifikat selanjutnya"
          >
            ›
          </button>
        </div>
      )}

      {/* ─── MODAL 3: AWARD PURE IMAGE LIGHTBOX (NO TEXT, NO TITLES) ─── */}
      {activeAward && (
        <div className="pure-image-lightbox" role="dialog" aria-modal="true" aria-label="Penghargaan">
          <div className="pure-image-lightbox__backdrop" onClick={() => setActiveAward(null)} />

          <button
            className="pure-image-lightbox__close"
            onClick={() => setActiveAward(null)}
            aria-label="Tutup penghargaan"
          >
            ✕
          </button>

          <button
            className="pure-image-lightbox__nav pure-image-lightbox__nav--prev"
            onClick={() => handleAwardNav('prev')}
            aria-label="Penghargaan sebelumnya"
          >
            ‹
          </button>

          <div className="pure-image-lightbox__container" onClick={() => setActiveAward(null)}>
            <img
              src={activeAward.image}
              alt="Penghargaan"
              className="pure-image-lightbox__img"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          <button
            className="pure-image-lightbox__nav pure-image-lightbox__nav--next"
            onClick={() => handleAwardNav('next')}
            aria-label="Penghargaan selanjutnya"
          >
            ›
          </button>
        </div>
      )}
    </section>
  )
}
