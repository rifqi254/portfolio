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
  // Modals
  const [activeProject, setActiveProject] = useState(null)
  const [activeCert, setActiveCert] = useState(null)
  const [activeAward, setActiveAward] = useState(null)

  // Carousel refs
  const projectsTrackRef = useRef(null)
  const certsTrackRef = useRef(null)
  const awardsTrackRef = useRef(null)

  useEffect(() => {
    const handleWarp = (e) => {
      const { id } = e.detail || {}
      if (id === 'projects' || id === 'certificates' || id === 'awards' || id === 'archive') {
        const targetId = id === 'projects' ? 'projects-section' : id === 'certificates' ? 'certificates-section' : id === 'awards' ? 'awards-section' : 'archive'
        const el = document.getElementById(targetId)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
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

  const scrollCarousel = (trackRef, direction) => {
    if (!trackRef.current) return
    const cardWidth = trackRef.current.clientWidth > 768 ? 400 : 310
    const offset = direction === 'left' ? -cardWidth : cardWidth
    trackRef.current.scrollBy({ left: offset, behavior: 'smooth' })
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

      {/* Subtle Topographic Lines in Background */}
      <div className="vault-topo-bg" aria-hidden="true">
        <svg viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
          <path d="M-100,120 C200,60 500,220 850,140 C1200,60 1400,200 1600,160" stroke="rgba(0, 102, 255, 0.08)" strokeWidth="1.5" />
          <path d="M-100,260 C250,180 600,380 980,270 C1300,160 1480,320 1600,280" stroke="rgba(0, 150, 255, 0.07)" strokeWidth="1.5" />
          <path d="M-100,420 C220,340 680,510 1080,390 C1340,310 1480,440 1600,410" stroke="rgba(0, 204, 255, 0.08)" strokeWidth="1.5" />
          <path d="M-100,580 C320,490 740,680 1140,560 C1380,480 1500,600 1600,570" stroke="rgba(0, 102, 255, 0.07)" strokeWidth="1.5" />
          <ellipse cx="260" cy="520" rx="180" ry="110" stroke="rgba(0, 102, 255, 0.05)" strokeWidth="1.5" />
        </svg>
      </div>

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
            Koleksi proyek terpilih, sertifikasi resmi, dan piagam penghargaan dalam carousel interaktif.
          </p>

          {/* Quick Category Jump Pills */}
          <div className="vault-nav-pills">
            <a href="#projects-section" className="vault-nav-pill">
              <span className="pill-icon">💻</span>
              <span className="pill-text">Projects</span>
              <span className="pill-count">7</span>
            </a>
            <a href="#certificates-section" className="vault-nav-pill">
              <span className="pill-icon">📜</span>
              <span className="pill-text">Certificates</span>
              <span className="pill-count">7</span>
            </a>
            <a href="#awards-section" className="vault-nav-pill">
              <span className="pill-icon">🏆</span>
              <span className="pill-text">Awards</span>
              <span className="pill-count">3</span>
            </a>
          </div>
        </div>

        {/* ─── 01. PROJECTS CAROUSEL (7 ITEMS) ─── */}
        <div className="vault-carousel-block" id="projects-section">
          <div className="vault-carousel-header">
            <div className="vault-carousel-header__left">
              <div className="carousel-tag-row">
                <span className="carousel-tag carousel-tag--cyan">SYS.PROJECTS // 01</span>
                <span className="carousel-count-bubble">7 PROYEK</span>
              </div>
              <h3 className="vault-carousel-title">Featured Projects</h3>
            </div>
            <div className="vault-carousel-header__right">
              <span className="carousel-drag-hint">⇄ Drag / Geser</span>
              <div className="carousel-nav-arrows">
                <button
                  className="carousel-arrow carousel-arrow--prev"
                  onClick={() => scrollCarousel(projectsTrackRef, 'left')}
                  aria-label="Geser proyek ke kiri"
                >
                  ‹
                </button>
                <button
                  className="carousel-arrow carousel-arrow--next"
                  onClick={() => scrollCarousel(projectsTrackRef, 'right')}
                  aria-label="Geser proyek ke kanan"
                >
                  ›
                </button>
              </div>
            </div>
          </div>

          <div className="vault-carousel-track" ref={projectsTrackRef}>
            {projectsData.map((project) => (
              <div
                key={project.id}
                className={`carousel-card carousel-card--project carousel-card--stage-${project.id}`}
                style={{
                  '--proj-accent': project.accent,
                  '--proj-bg': project.color,
                }}
                onClick={() => setActiveProject(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveProject(project)}
                title={`Buka detail ${project.title}`}
              >
                <div className="carousel-card__thumb-wrap">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="carousel-card__img"
                    loading="lazy"
                  />
                  {/* Distinct Project Stage Aura */}
                  <div className="carousel-card__stage-aura" aria-hidden="true" />
                  <div className="carousel-card__meta-bar">
                    <span className="carousel-meta-cat">
                      <span className="carousel-meta-emoji">{project.emoji}</span>
                      {project.category}
                    </span>
                    <span className="carousel-meta-year">{project.year}</span>
                  </div>
                  {project.isHosted && (
                    <span className="carousel-live-pill">● LIVE</span>
                  )}
                </div>

                <div className="carousel-card__content">
                  <h4 className="carousel-card__title">{project.title}</h4>
                  <p className="carousel-card__subtitle">{project.subtitle}</p>

                  <div className="carousel-card__tech">
                    {project.tech.slice(0, 3).map((t) => (
                      <span key={t} className="tech-badge-mini">{t}</span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="tech-badge-mini tech-badge-mini--more">+{project.tech.length - 3}</span>
                    )}
                  </div>

                  <div className="carousel-card__footer">
                    <span className="card-action-text">{project.actionText || 'Preview Project'}</span>
                    <span className="card-action-arrow">↗</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── 02. CERTIFICATES CAROUSEL (7 ITEMS - HOLOGRAPHIC 3D FLIP) ─── */}
        <div className="vault-carousel-block" id="certificates-section">
          <div className="vault-carousel-header">
            <div className="vault-carousel-header__left">
              <div className="carousel-tag-row">
                <span className="carousel-tag carousel-tag--purple">SYS.CERTS // 02</span>
                <span className="carousel-count-bubble">7 SERTIFIKAT</span>
              </div>
              <h3 className="vault-carousel-title">Licenses &amp; Certifications</h3>
            </div>
            <div className="vault-carousel-header__right">
              <span className="carousel-drag-hint">⇄ Drag / Flip Card</span>
              <div className="carousel-nav-arrows">
                <button
                  className="carousel-arrow carousel-arrow--prev"
                  onClick={() => scrollCarousel(certsTrackRef, 'left')}
                  aria-label="Geser sertifikat ke kiri"
                >
                  ‹
                </button>
                <button
                  className="carousel-arrow carousel-arrow--next"
                  onClick={() => scrollCarousel(certsTrackRef, 'right')}
                  aria-label="Geser sertifikat ke kanan"
                >
                  ›
                </button>
              </div>
            </div>
          </div>

          <div className="vault-carousel-track" ref={certsTrackRef}>
            {certificatesData.map((cert) => (
              <div
                key={cert.id}
                className="carousel-card carousel-card--cert cert-flip-container"
                onClick={() => setActiveCert(cert)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveCert(cert)}
                title={`Preview ${cert.title}`}
              >
                <div className="cert-flip-inner">
                  {/* Front Face: Holographic Card & Image Preview */}
                  <div className="cert-flip-front">
                    <div className="carousel-card__cert-frame">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="carousel-card__cert-img"
                        loading="lazy"
                      />
                      {/* Holographic Iridescent Foil Sheen */}
                      <div className="cert-holo-foil" aria-hidden="true" />
                      <div className="carousel-card__zoom-overlay">
                        <span className="zoom-pill">🔍 Lossless View</span>
                      </div>
                    </div>
                    <div className="carousel-card__cert-info">
                      <div className="cert-front-status">
                        <span className="cert-holo-badge">✦ HOLOGRAPHIC</span>
                        <span className="carousel-card__cert-yr">YR // {cert.year}</span>
                      </div>
                      <h4 className="carousel-card__cert-title" title={cert.title}>{cert.title}</h4>
                    </div>
                  </div>

                  {/* Back Face: Holographic Security Credentials Pass */}
                  <div className="cert-flip-back">
                    <div className="cert-back-hologram" aria-hidden="true" />
                    <div className="cert-back-seal">★ OFFICIAL CREDENTIAL ★</div>
                    <h5 className="cert-back-title">{cert.title}</h5>
                    <div className="cert-back-meta">
                      <div className="cert-back-meta-row">
                        <span className="cert-back-lbl">STATUS:</span>
                        <span className="cert-back-val">VERIFIED AUTHENTIC</span>
                      </div>
                      <div className="cert-back-meta-row">
                        <span className="cert-back-lbl">YEAR:</span>
                        <span className="cert-back-val">{cert.year}</span>
                      </div>
                      <div className="cert-back-meta-row">
                        <span className="cert-back-lbl">REGISTRY:</span>
                        <span className="cert-back-val">DIGITAL EDEN 3000</span>
                      </div>
                    </div>
                    <div className="cert-back-footer">
                      <span className="cert-back-click-hint">Buka Lightbox Penuh ↗</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── 03. AWARDS & HONORS CAROUSEL (3 ITEMS) ─── */}
        <div className="vault-carousel-block" id="awards-section">
          <div className="vault-carousel-header">
            <div className="vault-carousel-header__left">
              <div className="carousel-tag-row">
                <span className="carousel-tag carousel-tag--amber">SYS.AWARDS // 03</span>
                <span className="carousel-count-bubble">3 PENGHARGAAN</span>
              </div>
              <h3 className="vault-carousel-title">Honors &amp; Awards</h3>
            </div>
            <div className="vault-carousel-header__right">
              <span className="carousel-drag-hint">⇄ Drag / Geser</span>
              <div className="carousel-nav-arrows">
                <button
                  className="carousel-arrow carousel-arrow--prev"
                  onClick={() => scrollCarousel(awardsTrackRef, 'left')}
                  aria-label="Geser penghargaan ke kiri"
                >
                  ‹
                </button>
                <button
                  className="carousel-arrow carousel-arrow--next"
                  onClick={() => scrollCarousel(awardsTrackRef, 'right')}
                  aria-label="Geser penghargaan ke kanan"
                >
                  ›
                </button>
              </div>
            </div>
          </div>

          <div className="vault-carousel-track" ref={awardsTrackRef}>
            {awardsData.map((award) => (
              <div
                key={award.id}
                className="carousel-card carousel-card--award"
                onClick={() => setActiveAward(award)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setActiveAward(award)}
                title={`Preview ${award.title}`}
              >
                <div className="carousel-card__cert-frame carousel-card__cert-frame--award">
                  <img
                    src={award.image}
                    alt={award.title}
                    className="carousel-card__cert-img"
                    loading="lazy"
                  />
                  <span className="carousel-award-badge-floating">{award.badge}</span>
                  <div className="carousel-card__zoom-overlay">
                    <span className="zoom-pill">🏆 Piagam Penghargaan</span>
                  </div>
                </div>
                <div className="carousel-card__cert-info">
                  <h4 className="carousel-card__cert-title" title={award.title}>{award.title}</h4>
                  <span className="carousel-card__cert-yr">YR // {award.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
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
