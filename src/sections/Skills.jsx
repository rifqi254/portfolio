import { useState } from 'react'
import './Skills.css'

const skillCategories = [
  {
    id: 'dev',
    category: 'Development Ecosystem',
    code: '01 // DEV_ECOSYSTEM',
    icon: '⚡',
    color: '#0284c7',
    accent: '#10b981',
    description: 'Modern front-end, reactive systems, and solid back-end architecture with high-precision engineering.',
    skills: [
      { name: 'HTML5', icon: '🌐', tag: 'Semantic 5', desc: 'Modern semantic structure, SEO & accessibility' },
      { name: 'CSS3', icon: '🎨', tag: 'Aero FX & 3D', desc: 'Custom layouts, glassmorphism, 3D transforms & animation engines' },
      { name: 'JavaScript', icon: '⚡', tag: 'ES6+ / Async', desc: 'Modern ECMAScript, reactive state & async DOM manipulation' },
      { name: 'PHP', icon: '🐘', tag: 'Server-side', desc: 'Object-oriented programming, secure MVC architectures' },
      { name: 'Laravel', icon: '🔺', tag: 'Full Framework', desc: 'Eloquent ORM, Blade templating, migrations & multi-tier auth' },
      { name: 'React 19', icon: '⚛️', tag: 'UI Library', desc: 'Component architectures, custom hooks & performance optimization' },
    ],
  },
  {
    id: 'db',
    category: 'Database & Cloud API',
    code: '02 // DATA_SYNAPSE',
    icon: '📡',
    color: '#10b981',
    accent: '#84cc16',
    description: 'Relational data modeling, optimized transactions, and high-throughput RESTful endpoints.',
    skills: [
      { name: 'MySQL', icon: '🐬', tag: 'RDBMS', desc: 'Relational data modeling, indexing, foreign keys & ACID transactions' },
      { name: 'REST API', icon: '📡', tag: 'Architecture', desc: 'Stateless endpoints, JSON schemas, token auth & error resilience' },
      { name: 'Postman', icon: '🚀', tag: 'Testing / Docs', desc: 'Automated test scripts, mock servers & API collection documentation' },
    ],
  },
  {
    id: 'design',
    category: 'Design & Productivity',
    code: '03 // CREATIVE_LAB',
    icon: '✦',
    color: '#06b6d4',
    accent: '#a855f7',
    description: 'Vector UI/UX prototyping, design systems, and analytical business productivity documentation.',
    skills: [
      { name: 'Figma', icon: '❖', tag: 'UI/UX Design', desc: 'Design systems, auto-layout, components & interactive high-fi prototypes' },
      { name: 'Microsoft Office', icon: '📊', tag: 'Productivity', desc: 'Technical documentation, data analysis & spreadsheet modeling' },
    ],
  },
]

const marqueeItems = [
  'HTML5', 'CSS3', 'JAVASCRIPT ES6+', 'PHP', 'LARAVEL', 'REACT 19',
  'THREE.JS', 'MYSQL', 'REST API', 'POSTMAN', 'FIGMA', 'VITE', 'TAILWIND CSS', 'GIT',
]

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all')

  const filteredCategories = activeTab === 'all'
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
          <h2 className="section-title skills__title">
            <span>TECH</span> <span className="skills__title-accent">STACK</span>
          </h2>
          <p className="section-subtitle">
            Keahlian teknis dan instrumen pengembangan web yang saya gunakan untuk membangun antarmuka interaktif dan sistem backend yang solid.
          </p>

          {/* Filter Pills */}
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
          </div>
        </div>

        {/* Categories Grid */}
        <div className="skills__grid">
          {filteredCategories.map((group) => (
            <div
              key={group.id}
              className="skills__card"
              style={{
                '--cat-color': group.color,
                '--cat-accent': group.accent,
              }}
            >
              {/* Card Header */}
              <div className="skills__card-header">
                <div className="skills__card-badge">
                  <span className="skills__card-icon">{group.icon}</span>
                  <span className="skills__card-code">{group.code}</span>
                </div>
                <h3 className="skills__card-title">{group.category}</h3>
                <p className="skills__card-desc">{group.description}</p>
              </div>

              {/* Floating Aero Glass Capsules */}
              <div className="skills__pills">
                {group.skills.map((skill, sIdx) => (
                  <div
                    key={skill.name}
                    className="skills__pill"
                    style={{
                      '--float-delay': `${(sIdx % 4) * 0.45}s`,
                      '--float-duration': `${3.8 + (sIdx % 3) * 0.5}s`,
                    }}
                  >
                    {/* Glass capsule specular highlight & inner depth */}
                    <span className="skills__capsule-specular" aria-hidden="true" />
                    
                    <div className="skills__pill-top">
                      <div className="skills__pill-name-wrap">
                        <span className="skills__pill-3d-icon">{skill.icon}</span>
                        <span className="skills__pill-name">{skill.name}</span>
                      </div>
                      <span className="skills__pill-tag">{skill.tag}</span>
                    </div>

                    <span className="skills__pill-detail">{skill.desc}</span>

                    {/* Iridescent shimmer sweep */}
                    <span className="skills__pill-sheen" aria-hidden="true" />
                  </div>
                ))}
              </div>

              {/* Chrome corner spheres */}
              <div className="skills__chrome-orb skills__chrome-orb--tl" aria-hidden="true" />
              <div className="skills__chrome-orb skills__chrome-orb--tr" aria-hidden="true" />
              <div className="skills__chrome-orb skills__chrome-orb--bl" aria-hidden="true" />
              <div className="skills__chrome-orb skills__chrome-orb--br" aria-hidden="true" />
            </div>
          ))}
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
