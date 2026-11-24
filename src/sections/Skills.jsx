import { useState } from 'react'
import { motion } from 'motion/react'
import SplitTitle from '../components/SplitTitle'
import { playFlipSound } from '../hooks/useAudioFX'
import './Skills.css'

const skillCategories = [
  {
    id: 'dev',
    category: 'Development Ecosystem',
    code: '01 // DEV_ECOSYSTEM',
    icon: '⚡',
    color: '#0284c7',
    accent: '#10b981',
    summary: 'Full-Stack Web & Reactive Architecture',
    count: '6 Technologies',
    skills: [
      { name: 'HTML5', icon: '🌐', tag: 'Semantic 5', desc: 'Semantic structure & SEO' },
      { name: 'CSS3', icon: '🎨', tag: 'Aero FX & 3D', desc: 'Glassmorphism & animations' },
      { name: 'JavaScript', icon: '⚡', tag: 'ES6+ / Async', desc: 'Reactive state & async DOM' },
      { name: 'PHP', icon: '🐘', tag: 'Server-side', desc: 'OOP & MVC architecture' },
      { name: 'Laravel', icon: '🔺', tag: 'Framework', desc: 'Eloquent ORM & multi-tier auth' },
      { name: 'React 19', icon: '⚛️', tag: 'UI Library', desc: 'Component tree & custom hooks' },
    ],
  },
  {
    id: 'db',
    category: 'Database & Cloud API',
    code: '02 // DATA_SYNAPSE',
    icon: '🐬',
    color: '#10b981',
    accent: '#84cc16',
    summary: 'Relational DB & High-Throughput APIs',
    count: '3 Technologies',
    skills: [
      { name: 'MySQL', icon: '🐬', tag: 'RDBMS', desc: 'Relational modeling & ACID' },
      { name: 'REST API', icon: '📡', tag: 'Architecture', desc: 'Stateless endpoints & JSON auth' },
      { name: 'Postman', icon: '🚀', tag: 'Testing / Docs', desc: 'API test suites & mock servers' },
    ],
  },
  {
    id: 'design',
    category: 'Design & Productivity',
    code: '03 // CREATIVE_LAB',
    icon: '❖',
    color: '#06b6d4',
    accent: '#a855f7',
    summary: 'UI/UX Prototyping & Collaboration',
    count: '3 Technologies',
    skills: [
      { name: 'Figma', icon: '❖', tag: 'UI/UX Design', desc: 'Design systems & prototypes' },
      { name: 'Microsoft Office', icon: '📊', tag: 'Productivity', desc: 'Technical docs & Excel modeling' },
      { name: 'Git & GitHub', icon: '🐙', tag: 'Version Control', desc: 'Branching & code collaboration' },
    ],
  },
]

const marqueeItems = [
  'HTML5', 'CSS3', 'JAVASCRIPT ES6+', 'PHP', 'LARAVEL', 'REACT 19',
  'THREE.JS', 'MYSQL', 'REST API', 'POSTMAN', 'FIGMA', 'VITE', 'TAILWIND CSS', 'GIT',
]

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all')
  const [flippedCards, setFlippedCards] = useState({})

  const toggleCard = (id) => {
    playFlipSound()
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const allFlipped =
    Boolean(flippedCards['dev']) &&
    Boolean(flippedCards['db']) &&
    Boolean(flippedCards['design'])

  const toggleAll = () => {
    playFlipSound()
    const nextState = !allFlipped
    setFlippedCards({
      dev: nextState,
      db: nextState,
      design: nextState,
    })
  }

  const filteredCategories =
    activeTab === 'all'
      ? skillCategories
      : skillCategories.filter((c) => c.id === activeTab)

  return (
    <section className="skills section" id="skills" aria-label="Skills & Capabilities">
      {/* Ambient Atmosphere */}
      <div className="skills__ambient-glow" aria-hidden="true" />
      <div className="skills__floating-bubble skills__floating-bubble--1" aria-hidden="true" />
      <div className="skills__floating-bubble skills__floating-bubble--2" aria-hidden="true" />
      <div className="skills__floating-bubble skills__floating-bubble--3" aria-hidden="true" />

      <div className="container">
        {/* Section Header */}
        <div className="section-header skills__header">
          <div className="skills__header-badge">
            <span className="skills__header-dot" />
            <span className="skills__header-code">SKILLS &amp; TECHNOLOGIES</span>
          </div>
          <SplitTitle
            parts={[
              { text: 'TECH' },
              { text: 'STACK', className: 'skills__title-accent' },
            ]}
            className="section-title skills__title"
          />
          <p className="section-subtitle">
            Keahlian teknis dan instrumen pengembangan web yang saya gunakan. Klik kartu untuk membalik dan melihat rincian teknologi di dalamnya.
          </p>

          {/* Filter Bar & Quick Flip Toggle */}
          <div className="skills__filter-bar">
            <button
              className={`skills__filter-btn ${activeTab === 'all' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              ✦ ALL
            </button>
            <button
              className={`skills__filter-btn ${activeTab === 'dev' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('dev')}
            >
              DEVELOPMENT
            </button>
            <button
              className={`skills__filter-btn ${activeTab === 'db' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('db')}
            >
              DATABASE &amp; API
            </button>
            <button
              className={`skills__filter-btn ${activeTab === 'design' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('design')}
            >
              DESIGN &amp; TOOLS
            </button>

            {/* Quick Flip All Button */}
            <button
              className="skills__flip-all-btn"
              onClick={toggleAll}
              title={allFlipped ? 'Tutup semua kartu' : 'Buka semua kartu'}
            >
              <span className="flip-btn-icon">↻</span>
              <span>{allFlipped ? 'Tutup Semua' : 'Buka Semua Kartu'}</span>
            </button>
          </div>
        </div>

        {/* 3D Flip Cards Grid */}
        <div className="skills__grid">
          {filteredCategories.map((group, groupIdx) => {
            const isFlipped = Boolean(flippedCards[group.id])

            return (
              <motion.div
                key={group.id}
                className={`skills__card-container ${isFlipped ? 'is-flipped' : ''}`}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: groupIdx * 0.12 }}
                whileHover={{ y: -4 }}
                style={{
                  '--cat-color': group.color,
                  '--cat-accent': group.accent,
                }}
                onClick={() => toggleCard(group.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleCard(group.id)
                  }
                }}
                aria-label={`Kartu skill ${group.category}. Klik untuk ${isFlipped ? 'menutup' : 'membuka'}.`}
              >
                <div className="skills__card-inner">
                  {/* ─── SISI 1: SAMPUL BELAKANG KARTU (POSISI AWAL / DECK COVER) ─── */}
                  <div className="skills__face skills__face--front">
                    {/* Top Accent Line */}
                    <div className="skills__deck-top-stripe" aria-hidden="true" />

                    {/* Header Bar */}
                    <div className="skills__deck-header">
                      <span className="skills__deck-code">{group.code}</span>
                      <span className="skills__deck-status">● VERIFIED STACK</span>
                    </div>

                    {/* Center Emblem & Title */}
                    <div className="skills__deck-body">
                      <div className="skills__deck-emblem-wrap">
                        <div className="skills__deck-emblem-glow" aria-hidden="true" />
                        <span className="skills__deck-emblem-icon">{group.icon}</span>
                      </div>

                      <h3 className="skills__deck-title">{group.category}</h3>
                      <p className="skills__deck-summary">{group.summary}</p>

                      <div className="skills__deck-count-pill">
                        <span>{group.count}</span>
                      </div>
                    </div>

                    {/* Bottom Action / Flip Trigger */}
                    <div className="skills__deck-footer">
                      <div className="skills__deck-action-pill">
                        <span className="deck-action-text">KLIK UNTUK BUKA SKILL</span>
                        <span className="deck-action-icon">↻</span>
                      </div>
                      <span className="skills__deck-hint">3D Backflip Card Interaction</span>
                    </div>

                    {/* Corner Chrome Accents */}
                    <div className="skills__corner-rivet skills__corner-rivet--tl" aria-hidden="true" />
                    <div className="skills__corner-rivet skills__corner-rivet--tr" aria-hidden="true" />
                    <div className="skills__corner-rivet skills__corner-rivet--bl" aria-hidden="true" />
                    <div className="skills__corner-rivet skills__corner-rivet--br" aria-hidden="true" />
                  </div>

                  {/* ─── SISI 2: ISIAN SKILL (TERBUKA SETELAH BACKFLIP) ─── */}
                  <div className="skills__face skills__face--back">
                    {/* Top Header */}
                    <div className="skills__back-header">
                      <div className="skills__back-title-wrap">
                        <span className="skills__back-icon">{group.icon}</span>
                        <div>
                          <h4 className="skills__back-title">{group.category}</h4>
                          <span className="skills__back-count">{group.count}</span>
                        </div>
                      </div>

                      <button
                        className="skills__back-flip-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleCard(group.id)
                        }}
                        title="Tutup kartu"
                      >
                        <span>Tutup</span>
                        <span>↺</span>
                      </button>
                    </div>

                    {/* Skills Content Grid */}
                    <div className={`skills__back-content ${group.id === 'dev' ? 'skills__back-content--dev' : ''}`}>
                      {group.skills.map((skill) => (
                        <div key={skill.name} className="skills__back-item">
                          <div className="skills__back-item-head">
                            <span className="skills__back-item-icon">{skill.icon}</span>
                            <span className="skills__back-item-name">{skill.name}</span>
                            <span className="skills__back-item-tag">{skill.tag}</span>
                          </div>
                          <p className="skills__back-item-desc">{skill.desc}</p>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Back Footer */}
                    <div className="skills__back-footer">
                      <span className="skills__back-hint">✦ Klik kartu untuk menutup kembali</span>
                    </div>

                    {/* Corner Chrome Accents */}
                    <div className="skills__corner-rivet skills__corner-rivet--tl" aria-hidden="true" />
                    <div className="skills__corner-rivet skills__corner-rivet--tr" aria-hidden="true" />
                    <div className="skills__corner-rivet skills__corner-rivet--bl" aria-hidden="true" />
                    <div className="skills__corner-rivet skills__corner-rivet--br" aria-hidden="true" />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Horizontal Marquee Ticker */}
        <div className="skills__ticker" aria-hidden="true">
          <div className="skills__ticker-track">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={index} className="skills__ticker-item">
                <span className="skills__ticker-star">✦</span>
                <span className="skills__ticker-text">{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
