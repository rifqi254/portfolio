import { useState, useEffect, useRef } from 'react'
import './ArchiveVault.css'

// ─── 01. PROJECTS DATA (7 Items) ───
const projectsData = [
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
  },
  {
    id: 'ramenatsu',
    title: 'RAMENATSU · Food App Design',
    subtitle: 'UI/UX Design Concept — Mobile Food Ordering App',
    category: 'UI/UX Mobile Design',
    tagCode: 'UI-FOODAPP',
    label: 'label-pink',
    description: 'Konsep desain aplikasi mobile pemesanan makanan Jepang (ramen) dengan branding visual khas RAMENATSU. Dirancang dengan antarmuka pengguna yang intuitif dan estetika modern untuk pengalaman pemesanan makanan yang seamless, mulai dari menu browsing, customisasi pesanan, hingga checkout dan tracking delivery.',
    tech: ['Figma', 'UI/UX Design', 'Mobile App', 'Prototyping'],
    year: '2025',
    color: '#fef3c7',
    accent: '#d97706',
    emoji: '🍜',
    image: '/projects/ramenatsu.png',
    hostedUrl: 'https://www.figma.com/proto/r9SaRyByniw6bduPPfsLNs/Food-app-design?node-id=569-132&p=f&t=P6gTbIeV4o0PSf7J-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=569%3A132',
    isHosted: true,
  },
]

// ─── 02. CERTIFICATES DATA (7 Items) ───
const certificatesData = [
  {
    id: 'cert-kominfo',
    title: 'Sertifikat Program Magang Diskominfo Tangsel',
    issuer: 'Dinas Komunikasi dan Informatika Tangerang Selatan',
    year: '2026',
    date: '9 Feb – 31 Jul 2026',
    tag: 'GOV // INTERN',
    color: '#0088ff',
    image: '/certificates/cert-magang-kominfo.png',
  },
  {
    id: 'cert-coursera-excel',
    title: 'Getting Started with Microsoft Excel',
    issuer: 'Coursera & Freedom Learning Group',
    year: '2026',
    date: '14 Januari 2026',
    tag: 'COURSERA // DATA',
    color: '#10b981',
    image: '/certificates/cert-coursera-excel.png',
  },
  {
    id: 'cert-linux',
    title: 'Belajar Linux dari Nol+',
    issuer: 'ID-Networkers (IDN.ID)',
    year: '2024',
    date: '12 Juni 2024',
    tag: 'SYS // LINUX',
    color: '#e11d48',
    image: '/certificates/cert-linux.png',
  },
  {
    id: 'cert-hmps-cloud',
    title: 'Seminar IT & Bootcamp: First Step to Cloud',
    issuer: 'HMPS Informatika UIN SMH Banten',
    year: '2025',
    date: '1 November 2025',
    tag: 'CAMP // CLOUD',
    color: '#9333ea',
    image: '/certificates/cert-hmps-cloud.png',
  },
  {
    id: 'cert-dicoding-aws-genai',
    title: 'Belajar Dasar Cloud dan Gen AI di AWS',
    issuer: 'Dicoding Indonesia & AWS',
    year: '2025',
    date: '22 November 2025',
    tag: 'AWS // GEN-AI',
    color: '#ff9900',
    image: '/certificates/cert-dicoding-aws-genai.png',
  },
  {
    id: 'cert-dicoding-backend-js',
    title: 'Belajar Back-End Pemula dengan JavaScript',
    issuer: 'Dicoding Indonesia & AWS',
    year: '2025',
    date: '30 Oktober 2025',
    tag: 'NODE // REST-API',
    color: '#0284c7',
    image: '/certificates/cert-dicoding-backend-js.png',
  },
  {
    id: 'cert-dicoding-dasar-js',
    title: 'Belajar Dasar Pemrograman JavaScript',
    issuer: 'Dicoding Indonesia & AWS',
    year: '2025',
    date: '03 Desember 2025',
    tag: 'ES6+ // JS-CORE',
    color: '#eab308',
    image: '/certificates/cert-dicoding-dasar-js.png',
  },
]

// ─── 03. AWARDS & HONORS DATA (3 Items) ───
const awardsData = [
  {
    id: 'award-magang-sangat-baik',
    title: 'Predikat Hasil Evaluasi Akhir SANGAT BAIK',
    issuer: 'Dinas Komunikasi dan Informatika Tangerang Selatan',
    year: '2026',
    date: 'Juli 2026',
    badge: '🏆',
    tag: 'HONOR // SANGAT BAIK',
    color: '#eab308',
    image: '/certificates/cert-magang-kominfo.png',
  },
  {
    id: 'award-aws-genai',
    title: 'Sertifikasi Kompetensi Global AWS Cloud & Gen AI',
    issuer: 'Amazon Web Services & Dicoding Indonesia',
    year: '2025',
    date: 'November 2025',
    badge: '🌟',
    tag: 'EXCELLENCE // AWS',
    color: '#f97316',
    image: '/certificates/cert-dicoding-aws-genai.png',
  },
  {
    id: 'award-hmps-leadership',
    title: 'Piagam Apresiasi Kepengurusan & Dedikasi HMPS',
    issuer: 'HMPS Informatika UIN Sultan Maulana Hasanuddin',
    year: '2025',
    date: 'November 2025',
    badge: '🎖️',
    tag: 'LEADERSHIP // HMPS',
    color: '#8b5cf6',
    image: '/certificates/cert-hmps-cloud.png',
  },
]

export default function ArchiveVault() {
  // activeFolder: null (showing 3 folders) or 'projects' | 'certificates' | 'awards'
  const [activeFolder, setActiveFolder] = useState(null)
  
  // Modals
  const [activeProject, setActiveProject] = useState(null)
  const [activeCert, setActiveCert] = useState(null)
  const [activeAward, setActiveAward] = useState(null)

  // Carousel ref for horizontal scrolling
  const reelRef = useRef(null)

  // Listen to custom warp events or anchor triggers
  useEffect(() => {
    const handleWarp = (e) => {
      const { id } = e.detail || {}
      if (id === 'projects') {
        setActiveFolder('projects')
      } else if (id === 'certificates') {
        setActiveFolder('certificates')
      } else if (id === 'awards') {
        setActiveFolder('awards')
      }
    }
    window.addEventListener('warp-to-section', handleWarp)
    return () => window.removeEventListener('warp-to-section', handleWarp)
  }, [])

  // Close modals on Escape key
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

  // Prev / Next inside Certificate image viewer
  const handleCertNav = (dir) => {
    if (!activeCert) return
    const currentIdx = certificatesData.findIndex((c) => c.id === activeCert.id)
    if (currentIdx === -1) return
    const nextIdx = (currentIdx + (dir === 'next' ? 1 : -1) + certificatesData.length) % certificatesData.length
    setActiveCert(certificatesData[nextIdx])
  }

  // Prev / Next inside Awards image viewer
  const handleAwardNav = (dir) => {
    if (!activeAward) return
    const currentIdx = awardsData.findIndex((a) => a.id === activeAward.id)
    if (currentIdx === -1) return
    const nextIdx = (currentIdx + (dir === 'next' ? 1 : -1) + awardsData.length) % awardsData.length
    setActiveAward(awardsData[nextIdx])
  }

  return (
    <section className="archive-vault section" id="projects" aria-label="Archive Directory">
      {/* Invisible anchor target for navbar certificates */}
      <div id="certificates" style={{ position: 'relative', top: '-80px' }} />

      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="vault-header-badge">
            <span className="vault-header-dot" />
            <span className="vault-header-code">Y2K ARCHIVE DIRECTORY // VAULT 2026</span>
          </div>
          <h2 className="section-title">
            <span>DIGITAL</span> <span className="vault-title-accent">ARCHIVE VAULT</span>
          </h2>
          <p className="section-subtitle">
            Koleksi karya aplikasi web, dokumen sertifikasi resmi, dan piagam penghargaan yang tersimpan rapi dalam folder digital.
          </p>
        </div>

        {/* ─── STAGE 1: 3 FOLDERS OVERVIEW (DEFAULT VIEW) ─── */}
        {!activeFolder && (
          <div className="vault-folders__grid">
            {/* 01. PROJECTS FOLDER */}
            <div
              className="vault-folder folder--projects"
              onClick={() => setActiveFolder('projects')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveFolder('projects')}
              aria-label="Buka Folder Proyek (7 File)"
            >
              {/* Top Folder Tab */}
              <div className="folder__tab">
                <span className="folder__tab-icon">📁</span>
                <span className="folder__tab-label">01 // PROJECTS</span>
                <span className="folder__tab-count">[07 FILES]</span>
              </div>

              {/* Folder Backing */}
              <div className="folder__back">
                {/* 3 Peek-Out Preview Cards (Pop up on hover / touch) */}
                <div className="folder__peek-stack">
                  <div className="peek-card peek-card--1">
                    <img src="/projects/ramenatsu.png" alt="Ramenatsu Preview" />
                    <span className="peek-tag">RAMENATSU</span>
                  </div>
                  <div className="peek-card peek-card--2">
                    <img src="/projects/freshguard.png" alt="Freshguard Preview" />
                    <span className="peek-tag">FRESHGUARD</span>
                  </div>
                  <div className="peek-card peek-card--3">
                    <img src="/projects/smlti-tangsel.png" alt="SMLTI Preview" />
                    <span className="peek-tag">SMLTI</span>
                  </div>
                </div>
              </div>

              {/* Front Pocket Sleeve */}
              <div className="folder__front">
                <div className="folder__front-sheen" />
                <div className="folder__front-label-strip">
                  <div className="folder__code-line">SEC_ARC // VOL.01</div>
                  <h3 className="folder__title">PROJECTS ARCHIVE</h3>
                  <p className="folder__desc">
                    7 platform web inovatif, aplikasi IoT pintar, sistem pemerintahan &amp; desain UI/UX.
                  </p>
                </div>

                <div className="folder__action-bar">
                  <span className="folder__action-btn">
                    <span>Buka Folder Proyek</span>
                    <span className="folder__arrow">↗</span>
                  </span>
                  <span className="folder__stamp">7 RECS</span>
                </div>
              </div>
            </div>

            {/* 02. CERTIFICATES FOLDER */}
            <div
              className="vault-folder folder--certs"
              onClick={() => setActiveFolder('certificates')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveFolder('certificates')}
              aria-label="Buka Folder Sertifikat (7 Sertifikat)"
            >
              <div className="folder__tab">
                <span className="folder__tab-icon">📁</span>
                <span className="folder__tab-label">02 // CERTIFICATES</span>
                <span className="folder__tab-count">[07 CERTS]</span>
              </div>

              <div className="folder__back">
                <div className="folder__peek-stack">
                  <div className="peek-card peek-card--1">
                    <img src="/certificates/cert-coursera-excel.png" alt="Coursera Preview" />
                    <span className="peek-tag">COURSERA</span>
                  </div>
                  <div className="peek-card peek-card--2">
                    <img src="/certificates/cert-magang-kominfo.png" alt="Kominfo Preview" />
                    <span className="peek-tag">DISKOMINFO</span>
                  </div>
                  <div className="peek-card peek-card--3">
                    <img src="/certificates/cert-dicoding-aws-genai.png" alt="AWS Preview" />
                    <span className="peek-tag">AWS GEN-AI</span>
                  </div>
                </div>
              </div>

              <div className="folder__front">
                <div className="folder__front-sheen" />
                <div className="folder__front-label-strip">
                  <div className="folder__code-line">VERIFIED // CREDENTIALS</div>
                  <h3 className="folder__title">CERTIFICATES ARCHIVE</h3>
                  <p className="folder__desc">
                    7 sertifikat resmi kompetensi industri dari Diskominfo Tangsel, AWS, Coursera &amp; Dicoding.
                  </p>
                </div>

                <div className="folder__action-bar">
                  <span className="folder__action-btn">
                    <span>Buka Folder Sertifikat</span>
                    <span className="folder__arrow">↗</span>
                  </span>
                  <span className="folder__stamp">7 CERTS</span>
                </div>
              </div>
            </div>

            {/* 03. AWARDS FOLDER */}
            <div
              className="vault-folder folder--awards"
              onClick={() => setActiveFolder('awards')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setActiveFolder('awards')}
              aria-label="Buka Folder Penghargaan (3 Awards)"
            >
              <div className="folder__tab">
                <span className="folder__tab-icon">📁</span>
                <span className="folder__tab-label">03 // AWARDS &amp; HONORS</span>
                <span className="folder__tab-count">[03 AWARDS]</span>
              </div>

              <div className="folder__back">
                <div className="folder__peek-stack">
                  <div className="peek-card peek-card--1">
                    <img src="/certificates/cert-dicoding-aws-genai.png" alt="Award 1" />
                    <span className="peek-tag">AWS EXCELLENCE</span>
                  </div>
                  <div className="peek-card peek-card--2">
                    <img src="/certificates/cert-magang-kominfo.png" alt="Award 2" />
                    <span className="peek-tag">SANGAT BAIK</span>
                  </div>
                  <div className="peek-card peek-card--3">
                    <img src="/certificates/cert-hmps-cloud.png" alt="Award 3" />
                    <span className="peek-tag">LEADERSHIP</span>
                  </div>
                </div>
              </div>

              <div className="folder__front">
                <div className="folder__front-sheen" />
                <div className="folder__front-label-strip">
                  <div className="folder__code-line">HONORS // RECOGNITION</div>
                  <h3 className="folder__title">AWARDS &amp; HONORS</h3>
                  <p className="folder__desc">
                    3 pencapaian prestasi dan apresiasi predikat evaluasi kerja terbaik.
                  </p>
                </div>

                <div className="folder__action-bar">
                  <span className="folder__action-btn">
                    <span>Buka Folder Awards</span>
                    <span className="folder__arrow">↗</span>
                  </span>
                  <span className="folder__stamp">3 HONORS</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── STAGE 2: INSIDE OPENED FOLDER (HORIZONTAL REEL DISPLAY) ─── */}
        {activeFolder && (
          <div className="vault-opened">
            {/* Top Folder Navigation Bar & Breadcrumb */}
            <div className="vault-opened__bar">
              <button
                className="vault-opened__back-btn"
                onClick={() => setActiveFolder(null)}
                title="Kembali ke tampilan 3 folder utama"
              >
                <span>← Kembali ke Semua Folder</span>
              </button>

              <div className="vault-opened__breadcrumb">
                <span className="bc-root">ARCHIVE //</span>
                <span className="bc-folder">
                  {activeFolder === 'projects' && '📂 PROJECTS (7 FILES)'}
                  {activeFolder === 'certificates' && '📂 CERTIFICATES (7 CERTS)'}
                  {activeFolder === 'awards' && '📂 AWARDS & HONORS (3 AWARDS)'}
                </span>
              </div>

              {/* Quick Folder Switcher Tabs */}
              <div className="vault-opened__tabs">
                <button
                  className={`vault-tab-pill ${activeFolder === 'projects' ? 'is-active' : ''}`}
                  onClick={() => setActiveFolder('projects')}
                >
                  Projects (7)
                </button>
                <button
                  className={`vault-tab-pill ${activeFolder === 'certificates' ? 'is-active' : ''}`}
                  onClick={() => setActiveFolder('certificates')}
                >
                  Certificates (7)
                </button>
                <button
                  className={`vault-tab-pill ${activeFolder === 'awards' ? 'is-active' : ''}`}
                  onClick={() => setActiveFolder('awards')}
                >
                  Awards (3)
                </button>
              </div>
            </div>

            {/* Horizontal Reel Navigation Controls & Track */}
            <div className="vault-reel-wrapper">
              {/* Prev / Next Track Arrows */}
              <button
                className="reel-arrow reel-arrow--prev"
                onClick={() => scrollReel('left')}
                aria-label="Scroll ke kiri"
              >
                ‹
              </button>
              <button
                className="reel-arrow reel-arrow--next"
                onClick={() => scrollReel('right')}
                aria-label="Scroll ke kanan"
              >
                ›
              </button>

              {/* Horizontal Scroll Track */}
              <div className="vault-reel" ref={reelRef}>
                {/* ── PROJECTS REEL ── */}
                {activeFolder === 'projects' &&
                  projectsData.map((project, idx) => (
                    <div
                      key={project.id}
                      className="reel-card reel-card--project glass-card"
                      onClick={() => setActiveProject(project)}
                      style={{ '--card-accent': project.accent }}
                    >
                      <div className="reel-card__thumb-frame">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="reel-card__thumbnail"
                          loading="lazy"
                        />
                        <span className="reel-card__tag-pill">[{project.tagCode}]</span>
                        <span className="reel-card__year-badge">{project.year}</span>
                      </div>

                      <div className="reel-card__body">
                        <div className="reel-card__category-row">
                          <span className={`label ${project.label}`}>{project.category}</span>
                          <span className="reel-card__emoji">{project.emoji}</span>
                        </div>
                        <h4 className="reel-card__title">{project.title}</h4>
                        <p className="reel-card__sub">{project.subtitle}</p>

                        <div className="reel-card__tech-tags">
                          {project.tech.slice(0, 3).map((t) => (
                            <span key={t} className="reel-card__tech-pill">
                              {t}
                            </span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="reel-card__tech-pill">+{project.tech.length - 3}</span>
                          )}
                        </div>

                        <div className="reel-card__cta">
                          <span>Buka Detail Proyek</span>
                          <span className="reel-card__cta-spark">✦</span>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* ── CERTIFICATES REEL ── */}
                {activeFolder === 'certificates' &&
                  certificatesData.map((cert, idx) => (
                    <div
                      key={cert.id}
                      className="reel-card reel-card--cert glass-card"
                      onClick={() => setActiveCert(cert)}
                      style={{ '--card-accent': cert.color }}
                    >
                      <div className="reel-card__thumb-frame reel-card__thumb-frame--cert">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="reel-card__thumbnail"
                          loading="lazy"
                        />
                        <span className="reel-card__tag-pill">[{cert.tag}]</span>
                        <span className="reel-card__year-badge">{cert.year}</span>
                      </div>

                      <div className="reel-card__body">
                        <span className="label label-pink">{cert.tag}</span>
                        <h4 className="reel-card__title">{cert.title}</h4>
                        <p className="reel-card__sub">{cert.issuer}</p>

                        <div className="reel-card__cta">
                          <span>Lihat Gambar Sertifikat</span>
                          <span className="reel-card__cta-spark">🔍</span>
                        </div>
                      </div>
                    </div>
                  ))}

                {/* ── AWARDS REEL ── */}
                {activeFolder === 'awards' &&
                  awardsData.map((award, idx) => (
                    <div
                      key={award.id}
                      className="reel-card reel-card--award glass-card"
                      onClick={() => setActiveAward(award)}
                      style={{ '--card-accent': award.color }}
                    >
                      <div className="reel-card__thumb-frame reel-card__thumb-frame--cert">
                        <img
                          src={award.image}
                          alt={award.title}
                          className="reel-card__thumbnail"
                          loading="lazy"
                        />
                        <span className="reel-card__tag-pill">[{award.tag}]</span>
                        <span className="reel-card__year-badge">{award.year}</span>
                      </div>

                      <div className="reel-card__body">
                        <div className="reel-card__category-row">
                          <span className="label label-lime">{award.badge} {award.tag}</span>
                        </div>
                        <h4 className="reel-card__title">{award.title}</h4>
                        <p className="reel-card__sub">{award.issuer}</p>

                        <div className="reel-card__cta">
                          <span>Lihat Piagam Penghargaan</span>
                          <span className="reel-card__cta-spark">🏆</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Horizontal Hint Footer */}
            <div className="vault-reel__hint">
              <span>✦ Geser horizontal untuk melihat semua isi folder ({activeFolder.toUpperCase()})</span>
            </div>
          </div>
        )}
      </div>

      {/* ─── MODAL 1: PROJECT SPECIFICATION MODAL (Hologram Spec) ─── */}
      {activeProject && (
        <div className="proj-modal" role="dialog" aria-modal="true" aria-label={`Project: ${activeProject.title}`}>
          <div className="proj-modal__backdrop" onClick={() => setActiveProject(null)}>
            <div className="proj-modal__backdrop-scanlines" />
          </div>

          <div className="proj-modal__dialog">
            <div className="proj-modal__bar">
              <div className="proj-modal__bar-left">
                <div className="proj-modal__window-dots">
                  <span className="dot dot--red" onClick={() => setActiveProject(null)} title="Close (ESC)" />
                  <span className="dot dot--yellow" />
                  <span className="dot dot--green" />
                </div>
                <span className="proj-modal__bar-code">[{activeProject.tagCode}]</span>
                <span className="proj-modal__bar-title">PROJECT SPECIFICATION // {activeProject.title}</span>
              </div>
              <button className="proj-modal__close-btn" onClick={() => setActiveProject(null)}>
                <span>✕ ESC</span>
              </button>
            </div>

            <div className="proj-modal__content">
              <div className="proj-modal__main-layout">
                {/* Left: Project Image with Link */}
                <div className="proj-modal__media-frame y2k-holo-frame">
                  <div className="proj-modal__holo-sheen" />

                  {activeProject.isHosted ? (
                    <a
                      href={activeProject.hostedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proj-modal__img-link"
                      title="Klik untuk membuka website yang sudah dihosting"
                    >
                      <img src={activeProject.image} alt={activeProject.title} className="proj-modal__img proj-modal__img--clickable" />
                      <div className="proj-modal__hosted-overlay-hint">
                        <span className="hint-pulse">● LIVE HOSTED</span>
                        <span className="hint-text">👆 Klik Gambar untuk Buka Website ↗</span>
                      </div>
                    </a>
                  ) : activeProject.htmlUrl ? (
                    <a
                      href={activeProject.htmlUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="proj-modal__img-link"
                      title="Klik untuk membuka demo aplikasi web interaktif"
                    >
                      <img src={activeProject.image} alt={activeProject.title} className="proj-modal__img proj-modal__img--clickable" />
                      <div className="proj-modal__hosted-overlay-hint">
                        <span className="hint-pulse">● DEMO WEB</span>
                        <span className="hint-text">👆 Klik Gambar untuk Buka Demo Web ↗</span>
                      </div>
                    </a>
                  ) : (
                    <div className="proj-modal__img-wrapper">
                      <img src={activeProject.image} alt={activeProject.title} className="proj-modal__img" />
                    </div>
                  )}

                  <div className="proj-modal__corner-stamp">
                    <span>★ AUTHENTIC PROJECT RECORD · {activeProject.year}</span>
                  </div>
                </div>

                {/* Right: Info & Description */}
                <div className="proj-modal__info-panel">
                  <div className="proj-modal__meta-row">
                    <span className={`label ${activeProject.label}`}>{activeProject.category}</span>
                    <span className="proj-modal__year-pill">TAHUN {activeProject.year}</span>
                    {activeProject.isHosted && <span className="proj-modal__live-badge">● TER-HOSTING</span>}
                  </div>

                  <h3 className="proj-modal__title">{activeProject.title}</h3>
                  <p className="proj-modal__subtitle">{activeProject.subtitle}</p>

                  <div className="proj-modal__desc-box">
                    <h5 className="proj-modal__section-heading">Penjelasan Proyek:</h5>
                    <p className="proj-modal__desc">{activeProject.description}</p>
                  </div>

                  <div className="proj-modal__tech-box">
                    <h5 className="proj-modal__section-heading">Teknologi yang Digunakan:</h5>
                    <div className="proj-modal__tech-tags">
                      {activeProject.tech.map((t) => (
                        <span key={t} className="proj-modal__tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="proj-modal__actions">
                    {activeProject.isHosted ? (
                      <a
                        href={activeProject.hostedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-modal__btn proj-modal__btn--launch"
                      >
                        <span>🚀 Kunjungi Website Hosting</span>
                        <span className="proj-modal__btn-arrow">↗</span>
                      </a>
                    ) : activeProject.htmlUrl ? (
                      <a
                        href={activeProject.htmlUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-modal__btn proj-modal__btn--launch"
                      >
                        <span>🚀 Buka Demo Aplikasi Web</span>
                        <span className="proj-modal__btn-arrow">↗</span>
                      </a>
                    ) : null}

                    <button className="proj-modal__btn proj-modal__btn--close" onClick={() => setActiveProject(null)}>
                      ✕ Tutup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL 2: CERTIFICATE IMAGE-ONLY LIGHTBOX MODAL ─── */}
      {activeCert && (
        <div className="clean-lightbox" role="dialog" aria-modal="true" aria-label={`Sertifikat: ${activeCert.title}`}>
          <div className="clean-lightbox__backdrop" onClick={() => setActiveCert(null)} />
          <div className="clean-lightbox__window">
            <div className="clean-lightbox__header">
              <span className="clean-lightbox__badge">CERTIFICATE IMAGE // {activeCert.tag}</span>
              <h3 className="clean-lightbox__title">{activeCert.title}</h3>
              <button className="clean-lightbox__close" onClick={() => setActiveCert(null)} aria-label="Tutup lightbox">
                ✕ ESC
              </button>
            </div>

            <div className="clean-lightbox__image-wrap">
              <button
                className="clean-lightbox__nav-btn clean-lightbox__nav-btn--prev"
                onClick={() => handleCertNav('prev')}
                aria-label="Sertifikat sebelumnya"
              >
                ‹
              </button>

              <img src={activeCert.image} alt={activeCert.title} className="clean-lightbox__image" />

              <button
                className="clean-lightbox__nav-btn clean-lightbox__nav-btn--next"
                onClick={() => handleCertNav('next')}
                aria-label="Sertifikat selanjutnya"
              >
                ›
              </button>
            </div>

            <div className="clean-lightbox__footer">
              <span className="clean-lightbox__meta">Penerbit: {activeCert.issuer} • Tahun {activeCert.year}</span>
              <button className="clean-lightbox__done-btn" onClick={() => setActiveCert(null)}>
                Tutup Gambar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL 3: AWARD IMAGE-ONLY LIGHTBOX MODAL ─── */}
      {activeAward && (
        <div className="clean-lightbox" role="dialog" aria-modal="true" aria-label={`Penghargaan: ${activeAward.title}`}>
          <div className="clean-lightbox__backdrop" onClick={() => setActiveAward(null)} />
          <div className="clean-lightbox__window clean-lightbox__window--award">
            <div className="clean-lightbox__header">
              <span className="clean-lightbox__badge clean-lightbox__badge--award">
                AWARD RECOGNITION // {activeAward.tag}
              </span>
              <h3 className="clean-lightbox__title">{activeAward.title}</h3>
              <button className="clean-lightbox__close" onClick={() => setActiveAward(null)} aria-label="Tutup lightbox">
                ✕ ESC
              </button>
            </div>

            <div className="clean-lightbox__image-wrap">
              <button
                className="clean-lightbox__nav-btn clean-lightbox__nav-btn--prev"
                onClick={() => handleAwardNav('prev')}
                aria-label="Penghargaan sebelumnya"
              >
                ‹
              </button>

              <img src={awardImageFallback(activeAward.image)} alt={activeAward.title} className="clean-lightbox__image" />

              <button
                className="clean-lightbox__nav-btn clean-lightbox__nav-btn--next"
                onClick={() => handleAwardNav('next')}
                aria-label="Penghargaan selanjutnya"
              >
                ›
              </button>
            </div>

            <div className="clean-lightbox__footer">
              <span className="clean-lightbox__meta">{activeAward.badge} Diberikan oleh: {activeAward.issuer} • {activeAward.year}</span>
              <button className="clean-lightbox__done-btn" onClick={() => setActiveAward(null)}>
                Tutup Gambar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function awardImageFallback(img) {
  return img || '/certificates/cert-magang-kominfo.png'
}

