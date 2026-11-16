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
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'reel'

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
            {/* 📁 FOLDER 1: PROJECTS (CYBER ICE CYAN Y2K) */}
            <div
              className="vault-folder-card vault-folder-card--projects"
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
                    fill="url(#folderBackProjects)"
                    stroke="rgba(14, 165, 233, 0.55)"
                    strokeWidth="1.5"
                  />
                  <defs>
                    <linearGradient id="folderBackProjects" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#bae6fd" />
                      <stop offset="100%" stopColor="#7dd3fc" />
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
                    fill="url(#folderFrontProjects)"
                    stroke="rgba(14, 165, 233, 0.6)"
                    strokeWidth="1.5"
                  />
                  <defs>
                    <linearGradient id="folderFrontProjects" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(240, 249, 255, 0.95)" />
                      <stop offset="100%" stopColor="rgba(186, 230, 253, 0.92)" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="folder-front-content">
                  <div className="folder-info-meta">
                    <span className="folder-count-num folder-count-num--projects">7</span>
                    <span className="folder-count-label">Projects</span>
                  </div>

                  <div className="folder-dots-pill folder-dots-pill--projects">
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

            {/* 📁 FOLDER 2: CERTIFICATES (CYBER LAVENDER VIOLET Y2K) */}
            <div
              className="vault-folder-card vault-folder-card--certs"
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
                    fill="url(#folderBackCerts)"
                    stroke="rgba(168, 85, 247, 0.55)"
                    strokeWidth="1.5"
                  />
                  <defs>
                    <linearGradient id="folderBackCerts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#e9d5ff" />
                      <stop offset="100%" stopColor="#c084fc" />
                    </linearGradient>
                  </defs>
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
                    fill="url(#folderFrontCerts)"
                    stroke="rgba(168, 85, 247, 0.6)"
                    strokeWidth="1.5"
                  />
                  <defs>
                    <linearGradient id="folderFrontCerts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(250, 245, 255, 0.95)" />
                      <stop offset="100%" stopColor="rgba(233, 213, 255, 0.92)" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="folder-front-content">
                  <div className="folder-info-meta">
                    <span className="folder-count-num folder-count-num--certs">7</span>
                    <span className="folder-count-label">Certificates</span>
                  </div>

                  <div className="folder-dots-pill folder-dots-pill--certs">
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

            {/* 📁 FOLDER 3: AWARDS (CYBER SUNBEAM AMBER Y2K) */}
            <div
              className="vault-folder-card vault-folder-card--awards"
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
                    fill="url(#folderBackAwards)"
                    stroke="rgba(245, 158, 11, 0.55)"
                    strokeWidth="1.5"
                  />
                  <defs>
                    <linearGradient id="folderBackAwards" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
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
                    fill="url(#folderFrontAwards)"
                    stroke="rgba(245, 158, 11, 0.6)"
                    strokeWidth="1.5"
                  />
                  <defs>
                    <linearGradient id="folderFrontAwards" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(254, 252, 232, 0.95)" />
                      <stop offset="100%" stopColor="rgba(254, 240, 138, 0.92)" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="folder-front-content">
                  <div className="folder-info-meta">
                    <span className="folder-count-num folder-count-num--awards">3</span>
                    <span className="folder-count-label">Awards</span>
                  </div>

                  <div className="folder-dots-pill folder-dots-pill--awards">
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
            {/* Top Bar with Back Button, Breadcrumb & View Toggle */}
            <div className="vault-inside__bar">
              <div className="vault-inside__bar-left">
                <button
                  className="vault-inside__back-btn"
                  onClick={() => setActiveFolder(null)}
                  title="Kembali ke semua folder"
                >
                  <span>‹ KEMBALI KE FOLDER</span>
                </button>

                <div className="vault-inside__breadcrumb">
                  <span className="bc-root">SYS.ARCHIVE //</span>
                  <span className="bc-folder">
                    {activeFolder === 'projects' && '📁 PROJECTS [7 FILES]'}
                    {activeFolder === 'certificates' && '📜 CERTIFICATES [7 CERTS]'}
                    {activeFolder === 'awards' && '🏆 AWARDS [3 AWARDS]'}
                  </span>
                </div>
              </div>

              <div className="vault-inside__bar-right">
                {/* View Mode Toggle: Grid vs Carousel Reel */}
                <div className="vault-view-toggle">
                  <button
                    className={`vault-view-btn ${viewMode === 'grid' ? 'is-active' : ''}`}
                    onClick={() => setViewMode('grid')}
                    title="Tampilan Grid Katalog Luas"
                  >
                    <span>⊞ Grid</span>
                  </button>
                  <button
                    className={`vault-view-btn ${viewMode === 'reel' ? 'is-active' : ''}`}
                    onClick={() => setViewMode('reel')}
                    title="Tampilan Carousel Horizontal"
                  >
                    <span>⇄ Carousel</span>
                  </button>
                </div>

                {/* Quick Folder Switch Pills */}
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
                    Certs (7)
                  </button>
                  <button
                    className={`drawer-switch-pill ${activeFolder === 'awards' ? 'is-active' : ''}`}
                    onClick={() => setActiveFolder('awards')}
                  >
                    Awards (3)
                  </button>
                </div>
              </div>
            </div>

            {/* Content Container (Reel or Grid) */}
            <div className={`vault-content-container vault-content-container--${viewMode}`}>
              {viewMode === 'reel' && (
                <>
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
                </>
              )}

              <div
                className={`vault-files-track ${viewMode === 'reel' ? 'vault-files-track--reel' : 'vault-files-track--grid'}`}
                ref={reelRef}
              >
                {/* 1. PROJECTS CARDS (BENER-BENER FULL GAMBAR — NO RETICLES, NO HOVER BADGES) */}
                {activeFolder === 'projects' &&
                  projectsData.map((project) => (
                    <div
                      key={project.id}
                      className="y2k-folder-project-card"
                      onClick={() => setActiveProject(project)}
                      title={`Klik untuk membuka detail lengkap: ${project.title}`}
                    >
                      <img
                        src={project.image}
                        alt={project.title}
                        className="y2k-folder-project-card__img"
                        loading="lazy"
                      />
                    </div>
                  ))}

                {/* 2. CERTIFICATES CARDS (BENER-BENER FULL GAMBAR) */}
                {activeFolder === 'certificates' &&
                  certificatesData.map((cert) => (
                    <div
                      key={cert.id}
                      className="y2k-folder-cert-card"
                      onClick={() => setActiveCert(cert)}
                      title={`Klik untuk preview sertifikat: ${cert.title}`}
                    >
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="y2k-folder-cert-card__img"
                        loading="lazy"
                      />
                    </div>
                  ))}

                {/* 3. AWARDS CARDS (BENER-BENER FULL GAMBAR) */}
                {activeFolder === 'awards' &&
                  awardsData.map((award) => (
                    <div
                      key={award.id}
                      className="y2k-folder-cert-card y2k-folder-cert-card--award"
                      onClick={() => setActiveAward(award)}
                      title={`Klik untuk preview piagam penghargaan: ${award.title}`}
                    >
                      <img
                        src={award.image}
                        alt={award.title}
                        className="y2k-folder-cert-card__img"
                        loading="lazy"
                      />
                    </div>
                  ))}
              </div>
            </div>

            <div className="vault-inside__hint">
              <span>✦ {viewMode === 'grid' ? 'Klik kartu file untuk membuka preview interaktif Y2K & link hasil proyek' : 'Geser horizontal atau klik panah untuk melihat seluruh file folder'}</span>
            </div>
          </div>
        )}
      </div>

      {/* ─── MODAL 1: Y2K CYBERCORE PROJECT SHOWCASE MODAL ─── */}
      {/* DESKTOP: PENJELASAN DI KIRI, GAMBAR BESAR DI KANAN | MOBILE: GAMBAR DI ATAS, PENJELASAN DI BAWAH KETIKA SCROLL */}
      {activeProject && (
        <div
          className="y2k-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`Y2K Preview: ${activeProject.title}`}
        >
          <div className="y2k-modal__backdrop" onClick={() => setActiveProject(null)} />
          <div className="y2k-modal__scanlines" />

          <div className="y2k-modal__dialog">
            {/* Y2K Top Window Header Bar */}
            <div className="y2k-window-bar">
              <div className="y2k-window-bar__left">
                <div className="y2k-window-dots">
                  <span className="y2k-dot y2k-dot--pink" onClick={() => setActiveProject(null)} title="Close window" />
                  <span className="y2k-dot y2k-dot--yellow" title="Minimize" />
                  <span className="y2k-dot y2k-dot--cyan" title="Expand" />
                </div>
                <div className="y2k-window-bar__code">
                  [SYS.VAULT // PROJECT_VIEWER.EXE]
                </div>
                <div className="y2k-window-bar__id">
                  #{activeProject.tagCode}
                </div>
              </div>

              <div className="y2k-window-bar__center">
                <span className="y2k-live-ticker">● SYS.STATUS: ONLINE // 200_OK</span>
              </div>

              <div className="y2k-window-bar__right">
                <button
                  className="y2k-window-close-btn"
                  onClick={() => setActiveProject(null)}
                  aria-label="Tutup preview proyek"
                >
                  <span>✕ ESC // CLOSE</span>
                </button>
              </div>
            </div>

            <div className="y2k-modal__layout">
              {/* LEFT COLUMN: CYBER DETAILS & ACTIONS */}
              <div className="y2k-modal__info-col">
                <div className="y2k-info-header">
                  <div className="y2k-badges-row">
                    <span className="y2k-badge y2k-badge--category">✦ {activeProject.category}</span>
                    <span className="y2k-badge y2k-badge--year">YR // {activeProject.year}</span>
                    {activeProject.isHosted && (
                      <span className="y2k-badge y2k-badge--live">● LIVE ONLINE</span>
                    )}
                  </div>

                  <h3 className="y2k-info-title">{activeProject.title}</h3>
                  <p className="y2k-info-subtitle">▸ {activeProject.subtitle}</p>
                </div>

                <div className="y2k-holographic-divider" />

                <div className="y2k-info-section">
                  <h4 className="y2k-section-heading">
                    <span className="heading-glyph">// 01</span> SPESIFIKASI &amp; DESKRIPSI
                  </h4>
                  <p className="y2k-desc-text">{activeProject.description}</p>
                </div>

                <div className="y2k-info-section">
                  <h4 className="y2k-section-heading">
                    <span className="heading-glyph">// 02</span> CORE TECH MATRIX
                  </h4>
                  <div className="y2k-tech-tags">
                    {activeProject.tech.map((t) => (
                      <span key={t} className="y2k-tech-pill">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="y2k-modal-actions">
                  {activeProject.isHosted ? (
                    <a
                      href={activeProject.hostedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="y2k-action-btn y2k-action-btn--primary"
                    >
                      <span>🚀 {activeProject.actionText || 'Kunjungi Website'}</span>
                      <span className="btn-arrow">↗</span>
                    </a>
                  ) : activeProject.htmlUrl ? (
                    <a
                      href={activeProject.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="y2k-action-btn y2k-action-btn--primary"
                    >
                      <span>🚀 {activeProject.actionText || 'Buka Demo Web App'}</span>
                      <span className="btn-arrow">↗</span>
                    </a>
                  ) : null}

                  <button
                    className="y2k-action-btn y2k-action-btn--secondary"
                    onClick={() => setActiveProject(null)}
                  >
                    ✕ Tutup Window
                  </button>
                </div>
              </div>

              {/* RIGHT COLUMN: CYBER VIEWPORT / HUD STUDIO */}
              <div className="y2k-modal__media-col">
                <div className="y2k-viewport-hud-bar">
                  <span className="hud-label">CAM_01 // HIGH-RES MOCKUP</span>
                  <span className="hud-res">DISPLAY: 100% NATIVE</span>
                </div>

                <div className="y2k-viewport-stage">
                  <div className="y2k-stage-reticle y2k-stage-reticle--tl">⌜</div>
                  <div className="y2k-stage-reticle y2k-stage-reticle--tr">⌝</div>
                  <div className="y2k-stage-reticle y2k-stage-reticle--bl">⌞</div>
                  <div className="y2k-stage-reticle y2k-stage-reticle--br">⌟</div>

                  {activeProject.isHosted ? (
                    <a
                      href={activeProject.hostedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="y2k-media-link"
                      title="Klik untuk membuka prototype / website"
                    >
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="y2k-big-mockup-img"
                      />
                      <div className="y2k-media-hover-overlay">
                        <span className="y2k-media-hover-pill">
                          ⚡ BUKA HASIL PROYEK ↗
                        </span>
                      </div>
                    </a>
                  ) : activeProject.htmlUrl ? (
                    <a
                      href={activeProject.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="y2k-media-link"
                      title="Klik untuk membuka demo web app"
                    >
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="y2k-big-mockup-img"
                      />
                      <div className="y2k-media-hover-overlay">
                        <span className="y2k-media-hover-pill">
                          ⚡ BUKA DEMO WEB ↗
                        </span>
                      </div>
                    </a>
                  ) : (
                    <div className="y2k-media-link y2k-media-link--static">
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="y2k-big-mockup-img"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL 2: Y2K CERTIFICATE LIGHTBOX (PURE IMAGE IN Y2K CYBER WINDOW) ─── */}
      {activeCert && (
        <div className="y2k-cert-modal" role="dialog" aria-modal="true" aria-label="Sertifikat">
          <div className="y2k-cert-modal__backdrop" onClick={() => setActiveCert(null)} />
          <div className="y2k-cert-modal__scanlines" />

          <div className="y2k-cert-modal__window">
            <div className="y2k-window-bar">
              <div className="y2k-window-bar__left">
                <div className="y2k-window-dots">
                  <span className="y2k-dot y2k-dot--pink" onClick={() => setActiveCert(null)} />
                  <span className="y2k-dot y2k-dot--yellow" />
                  <span className="y2k-dot y2k-dot--cyan" />
                </div>
                <div className="y2k-window-bar__code">[SYS.ARCHIVE // CERT_VIEWER.EXE]</div>
              </div>
              <div className="y2k-window-bar__center">
                <span className="y2k-live-ticker">● 100% LOSSLESS RESOLUTION</span>
              </div>
              <div className="y2k-window-bar__right">
                <button className="y2k-window-close-btn" onClick={() => setActiveCert(null)}>
                  <span>✕ ESC // CLOSE</span>
                </button>
              </div>
            </div>

            <div className="y2k-cert-modal__body">
              <button
                className="y2k-cert-nav y2k-cert-nav--prev"
                onClick={() => handleCertNav('prev')}
                aria-label="Sertifikat sebelumnya"
              >
                ‹ PREV
              </button>

              <div className="y2k-cert-stage" onClick={() => setActiveCert(null)}>
                <div className="y2k-stage-reticle y2k-stage-reticle--tl">⌜</div>
                <div className="y2k-stage-reticle y2k-stage-reticle--tr">⌝</div>
                <div className="y2k-stage-reticle y2k-stage-reticle--bl">⌞</div>
                <div className="y2k-stage-reticle y2k-stage-reticle--br">⌟</div>
                <img
                  src={activeCert.image}
                  alt="Sertifikat"
                  className="y2k-cert-img"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <button
                className="y2k-cert-nav y2k-cert-nav--next"
                onClick={() => handleCertNav('next')}
                aria-label="Sertifikat selanjutnya"
              >
                NEXT ›
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL 3: Y2K AWARD LIGHTBOX (PURE IMAGE IN Y2K CYBER WINDOW) ─── */}
      {activeAward && (
        <div className="y2k-cert-modal y2k-cert-modal--award" role="dialog" aria-modal="true" aria-label="Penghargaan">
          <div className="y2k-cert-modal__backdrop" onClick={() => setActiveAward(null)} />
          <div className="y2k-cert-modal__scanlines" />

          <div className="y2k-cert-modal__window">
            <div className="y2k-window-bar y2k-window-bar--award">
              <div className="y2k-window-bar__left">
                <div className="y2k-window-dots">
                  <span className="y2k-dot y2k-dot--pink" onClick={() => setActiveAward(null)} />
                  <span className="y2k-dot y2k-dot--yellow" />
                  <span className="y2k-dot y2k-dot--cyan" />
                </div>
                <div className="y2k-window-bar__code">[SYS.ARCHIVE // AWARD_VIEWER.EXE]</div>
              </div>
              <div className="y2k-window-bar__center">
                <span className="y2k-live-ticker">🏆 {activeAward.badge} // OFFICIAL PIAGAM</span>
              </div>
              <div className="y2k-window-bar__right">
                <button className="y2k-window-close-btn" onClick={() => setActiveAward(null)}>
                  <span>✕ ESC // CLOSE</span>
                </button>
              </div>
            </div>

            <div className="y2k-cert-modal__body">
              <button
                className="y2k-cert-nav y2k-cert-nav--prev"
                onClick={() => handleAwardNav('prev')}
                aria-label="Penghargaan sebelumnya"
              >
                ‹ PREV
              </button>

              <div className="y2k-cert-stage" onClick={() => setActiveAward(null)}>
                <div className="y2k-stage-reticle y2k-stage-reticle--tl">⌜</div>
                <div className="y2k-stage-reticle y2k-stage-reticle--tr">⌝</div>
                <div className="y2k-stage-reticle y2k-stage-reticle--bl">⌞</div>
                <div className="y2k-stage-reticle y2k-stage-reticle--br">⌟</div>
                <img
                  src={activeAward.image}
                  alt="Penghargaan"
                  className="y2k-cert-img"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>

              <button
                className="y2k-cert-nav y2k-cert-nav--next"
                onClick={() => handleAwardNav('next')}
                aria-label="Penghargaan selanjutnya"
              >
                NEXT ›
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
