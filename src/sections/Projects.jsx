import { useState, useEffect } from "react"
import "./Projects.css"

const marqueeItems = [
  "FRESHGUARD Smart Packaging", "★", "SMLTI Diskominfo Tangsel", "✦", "EnglAI AI Classroom", "★",
  "EcoCampus Biodiversity Lab", "✦", "Portal Seleksi HMPS", "★", "SUMMITIX Tiket Gunung 3D", "✦",
  "FRESHGUARD Smart Packaging", "★", "SMLTI Diskominfo Tangsel", "✦", "EnglAI AI Classroom", "★",
  "EcoCampus Biodiversity Lab", "✦", "Portal Seleksi HMPS", "★", "SUMMITIX Tiket Gunung 3D", "✦",
]

const projects = [
  {
    id: "freshguard",
    title: "FRESHGUARD · Smart Fruit Freshness",
    subtitle: "IoT & Smart Packaging Monitoring App",
    category: "Smart IoT & Mobile Web",
    tagCode: "IOT-FRESHGUARD",
    label: "label-lime",
    description: "Aplikasi mobile dan sistem monitoring kesegaran buah pintar terintegrasi sensor FRESHGUARD. Memungkinkan pengguna memantau status kemasan aktif secara real-time (Apel Fuji 92% Segar, Anggur Hijau 68% Hampir Busuk, Stroberi 45%), scan kemasan baru via scanner kamera, grafik tingkat pembusukan, dan notifikasi peringatan dini pencegahan food waste.",
    tech: ["Mobile Web", "IoT Sensor", "Smart Packaging", "Camera Scanner", "Real-Time Tracking"],
    year: "2025",
    color: "#dcfce7",
    accent: "#16a34a",
    emoji: "🍎",
    image: "/projects/freshguard.png",
    htmlUrl: "/projects/freshguard.html",
    isHosted: false,
  },
  {
    id: "smlti",
    title: "SMLTI Diskominfo Tangerang Selatan",
    subtitle: "Sistem Manajemen Layanan TI Kota Tangerang Selatan",
    category: "Government Service Platform",
    tagCode: "GOV-PORTAL",
    label: "label-electric",
    description: "Sistem Manajemen Layanan Teknologi Informasi (SMLTI) resmi untuk Dinas Komunikasi dan Informatika Kota Tangerang Selatan. Platform ini dirancang dengan otentikasi multi-tier untuk Super Administrator dan Admin Perangkat Daerah (PD), modul pelaporan kendala infrastruktur TI, tracking penanganan tiket perbaikan, dan dashboard monitoring layanan digital terintegrasi.",
    tech: ["Laravel", "PHP", "MySQL", "Tailwind CSS", "REST API", "Multi-Tier Role"],
    year: "2024",
    color: "#dbeafe",
    accent: "#0044ee",
    emoji: "🏢",
    image: "/projects/smlti-tangsel.png",
    hostedUrl: "https://dev4-60209.aplikasimu.my.id/login",
    isHosted: true,
  },
  {
    id: "englai",
    title: "EnglAI · AI English Classroom",
    subtitle: "AI-Powered English Learning Environment",
    category: "AI EdTech Platform",
    tagCode: "AI-CLASSROOM",
    label: "label-pink",
    description: "Platform edukasi bertenaga Artificial Intelligence untuk mentransformasi pembelajaran bahasa Inggris di kelas. Mengintegrasikan Large Language Model (LLM) untuk mengubah Rencana Pelaksanaan Pembelajaran (RPP) menjadi materi Self Learning interaktif, generator Live Quiz adaptif otomatis, penilaian tugas siswa instan, serta asisten mengajar cerdas bagi guru.",
    tech: ["AI / LLM", "Prompt Engineering", "React", "Python / FastAPI", "EdTech", "Tailwind"],
    year: "2024",
    color: "#fce7f3",
    accent: "#e11d48",
    emoji: "🤖",
    image: "/projects/englai.png",
    hostedUrl: "https://englai.my.id/",
    isHosted: true,
  },
  {
    id: "ecocampus",
    title: "EcoCampus · Biodiversity Lab",
    subtitle: "UIN Sultan Maulana Hasanuddin Banten",
    category: "Citizen Science & Climate Action",
    tagCode: "CLIMATE-BIO-LAB",
    label: "label-lime",
    description: "Platform digital observasi dan konservasi keanekaragaman hayati kampus UIN Sultan Maulana Hasanuddin Banten. Mengusung konsep Citizen Science bagi mahasiswa dan dosen untuk mendokumentasikan flora & fauna kampus, scan barcode QR Trail di titik-titik pohon konservasi, peta sebaran biodiversitas interaktif, serta edukasi iklim dan aksi hijau kampus.",
    tech: ["Citizen Science", "Interactive Maps", "QR Scanner", "Eco Platform", "Data Viz", "UIN Banten"],
    year: "2025",
    color: "#ecfccb",
    accent: "#65a30d",
    emoji: "🌿",
    image: "/projects/ecocampus.png",
    isHosted: false,
  },
  {
    id: "pengumuman-hmps",
    title: "Portal Seleksi HMPS Informatika",
    subtitle: "HMPS Informatika UIN SMH Banten 2025",
    category: "Academic Organization Portal",
    tagCode: "ACAD-SELEKSI",
    label: "label-cyan",
    description: "Portal web sistem informasi seleksi dan verifikasi kelulusan calon anggota pengurus divisi Himpunan Mahasiswa Program Studi (HMPS) Informatika UIN Sultan Maulana Hasanuddin Banten periode 2025. Dilengkapi fitur pencarian otomatis berbasis Nomor Induk Mahasiswa (NIM) untuk memvalidasi status kelulusan wawancara dan penempatan divisi secara real-time.",
    tech: ["JavaScript", "Tailwind CSS", "Student Verification", "JSON Database", "Live Lookup"],
    year: "2025",
    color: "#e0f2fe",
    accent: "#0284c7",
    emoji: "🎓",
    image: "/projects/pengumuman-hmps.jpg",
    isHosted: false,
  },
  {
    id: "summitix",
    title: "SUMMITIX · Portal Tiket Gunung 3D",
    subtitle: "Official E-Simaksi Hub & Ekspedisi Nusantara",
    category: "3D Web & E-Ticketing Platform",
    tagCode: "3D-ESIMAKSI",
    label: "label-cyan",
    description: "Platform E-Simaksi digital dan reservasi tiket pendakian gunung di Indonesia secara legal, aman, dan terpadu. Mengintegrasikan teknologi visualisasi medan 3D untuk eksplorasi jalur pendakian (Gunung Rinjani, Bromo, Merbabu), sistem kuota harian jalur, penerbitan barcode E-Pass instan, asuransi jiwa & integrasi tim SAR, serta stasiun pemantauan cuaca pos pendakian.",
    tech: ["Laravel", "Three.js / 3D", "PHP", "MySQL", "Tailwind CSS", "Leaflet GIS", "Payment Gateway"],
    year: "2024",
    color: "#cffafe",
    accent: "#0891b2",
    emoji: "🏔️",
    image: "/projects/summitix.png",
    isHosted: false,
  },
]

export default function Projects() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(null)
  const activeProject = activeProjectIndex !== null ? projects[activeProjectIndex] : null

  const openModal = (idx) => {
    setActiveProjectIndex(idx)
  }

  const closeModal = () => {
    setActiveProjectIndex(null)
  }

  const nextProject = (e) => {
    e.stopPropagation()
    setActiveProjectIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = (e) => {
    e.stopPropagation()
    setActiveProjectIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeProjectIndex === null) return
      if (e.key === "Escape") closeModal()
      else if (e.key === "ArrowRight") setActiveProjectIndex((prev) => (prev + 1) % projects.length)
      else if (e.key === "ArrowLeft") setActiveProjectIndex((prev) => (prev - 1 + projects.length) % projects.length)
    }

    if (activeProjectIndex !== null) {
      document.body.style.overflow = "hidden"
      window.addEventListener("keydown", handleKeyDown)
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeProjectIndex])

  return (
    <section className="projects section" id="projects" aria-label="Projects">
      <div className="container">
        <div className="section-header">
          <span className="label label-electric">✦ Work Archive</span>
          <h2 className="section-title">Selected Projects</h2>
          <p className="section-subtitle">
            Kumpulan platform web aplikasi, kecerdasan buatan, sistem pemerintahan, dan inovasi digital yang telah saya kembangkan.
          </p>
        </div>

        {/* Y2K marquee strip */}
        <div className="projects__marquee-strip" aria-hidden="true">
          <div className="projects__marquee-text">
            {marqueeItems.map((item, i) => (
              <span key={i} className="projects__marquee-item">{item}</span>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects__grid" style={{ marginTop: "28px" }}>
          {projects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={idx}
              onView={() => openModal(idx)}
            />
          ))}
        </div>
      </div>

      {/* Y2K Project Hologram Modal Lightbox (Clean White Theme) */}
      {activeProject && (
        <div
          className="proj-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`Project: ${activeProject.title}`}
        >
          {/* Frosted White Backdrop */}
          <div className="proj-modal__backdrop" onClick={closeModal}>
            <div className="proj-modal__backdrop-scanlines" />
          </div>

          {/* Modal Dialog */}
          <div className="proj-modal__dialog">
            {/* Top Window Bar */}
            <div className="proj-modal__bar">
              <div className="proj-modal__bar-left">
                <div className="proj-modal__window-dots">
                  <span className="dot dot--red" onClick={closeModal} title="Close (ESC)" />
                  <span className="dot dot--yellow" title="Minimize" />
                  <span className="dot dot--green" title="Maximize" />
                </div>
                <span className="proj-modal__bar-code">[{activeProject.tagCode}]</span>
                <span className="proj-modal__bar-title">
                  PROJECT SPECIFICATION // {activeProject.title}
                </span>
              </div>

              <button
                className="proj-modal__close-btn"
                onClick={closeModal}
                aria-label="Close project preview"
              >
                <span>✕ ESC</span>
              </button>
            </div>

            {/* Modal Body with Media Preview & Info */}
            <div className="proj-modal__content">
              {/* Prev / Next Nav Buttons */}
              <button
                className="proj-modal__nav proj-modal__nav--prev"
                onClick={prevProject}
                aria-label="Previous project"
                title="Previous (Left Arrow)"
              >
                ‹
              </button>
              <button
                className="proj-modal__nav proj-modal__nav--next"
                onClick={nextProject}
                aria-label="Next project"
                title="Next (Right Arrow)"
              >
                ›
              </button>

              <div className="proj-modal__main-layout">
                {/* Left: Hologram Media Frame */}
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
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="proj-modal__img proj-modal__img--clickable"
                      />
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
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="proj-modal__img proj-modal__img--clickable"
                      />
                      <div className="proj-modal__hosted-overlay-hint">
                        <span className="hint-pulse">● DEMO WEB</span>
                        <span className="hint-text">👆 Klik Gambar untuk Buka Demo Web ↗</span>
                      </div>
                    </a>
                  ) : (
                    <div className="proj-modal__img-wrapper">
                      <img
                        src={activeProject.image}
                        alt={activeProject.title}
                        className="proj-modal__img"
                      />
                    </div>
                  )}

                  <div className="proj-modal__corner-stamp">
                    <span>★ AUTHENTIC PROJECT RECORD · {activeProject.year}</span>
                  </div>
                </div>

                {/* Right: Info & Penjelasan Proyek */}
                <div className="proj-modal__info-panel">
                  <div className="proj-modal__meta-row">
                    <span className={`label ${activeProject.label}`}>{activeProject.category}</span>
                    <span className="proj-modal__year-pill">TAHUN {activeProject.year}</span>
                    {activeProject.isHosted && (
                      <span className="proj-modal__live-badge">● TER-HOSTING</span>
                    )}
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
                        <span key={t} className="proj-modal__tag">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="proj-modal__actions">
                    {activeProject.isHosted ? (
                      <a
                        href={activeProject.hostedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="proj-modal__btn proj-modal__btn--launch"
                        title="Buka website yang sudah dihosting"
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
                        title="Buka halaman demo aplikasi web interaktif"
                      >
                        <span>🚀 Buka Demo Aplikasi Web</span>
                        <span className="proj-modal__btn-arrow">↗</span>
                      </a>
                    ) : (
                      <div className="proj-modal__unhosted-hint">
                        <span>✦ Screenshot Resmi Proyek {activeProject.title}</span>
                      </div>
                    )}

                    <button
                      className="proj-modal__btn proj-modal__btn--close"
                      onClick={closeModal}
                    >
                      ✕ Tutup
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function ProjectCard({ project, index, onView }) {
  return (
    <div
      className="project-card glass-card"
      style={{
        "--card-color": project.color,
        "--card-accent": project.accent,
        animationDelay: `${index * 80}ms`,
      }}
    >
      {/* Thumbnail Frame with Y2K Hologram & Scanlines */}
      <div className="project-card__thumb-frame" onClick={onView}>
        <div className="project-card__holo-sheen" />
        <div className="project-card__scanlines" />

        <img
          src={project.image}
          alt={project.title}
          className="project-card__thumbnail"
          loading="lazy"
        />

        {/* Top Tag & Year Badge */}
        <div className="project-card__corner-badge">
          [{project.tagCode}]
        </div>
        <div className="project-card__year-badge">
          {project.year}
        </div>

        {/* Hover Quick Preview Overlay */}
        <div className="project-card__preview-overlay">
          <button className="project-card__quick-btn" type="button">
            <span>👁️ View Project</span>
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="project-card__body">
        <div className="project-card__meta">
          <span className={`label ${project.label}`}>{project.category}</span>
          <span className="project-card__emoji" aria-hidden="true">{project.emoji}</span>
        </div>

        <h3 className="project-card__title" onClick={onView} title="Lihat penjelasan & hologram">
          {project.title}
        </h3>
        <p className="project-card__subtitle">{project.subtitle}</p>

        {/* Tech stack */}
        <div className="project-card__tech">
          {project.tech.map((t) => (
            <span key={t} className="project-card__tag">{t}</span>
          ))}
        </div>

        {/* Action Link Button - Opens the Hologram View Modal */}
        <div className="project-card__footer-actions">
          <button
            type="button"
            className="project-card__launch-btn"
            onClick={onView}
            title={`View Project ${project.title}`}
          >
            <span>View Project</span>
            <span className="project-card__arrow">✦</span>
          </button>

          {project.isHosted ? (
            <a
              href={project.hostedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__hosted-tag"
              onClick={(e) => e.stopPropagation()}
              title="Kunjungi website yang sudah dihosting"
            >
              <span>Live ↗</span>
            </a>
          ) : project.htmlUrl ? (
            <a
              href={project.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card__hosted-tag project-card__hosted-tag--demo"
              onClick={(e) => e.stopPropagation()}
              title="Buka demo web aplikasi langsung"
            >
              <span>Demo ↗</span>
            </a>
          ) : null}
        </div>
      </div>
    </div>
  )
}
