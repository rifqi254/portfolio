import { useState } from 'react'
import './Skills.css'

const skillCategories = [
  {
    id: 'dev',
    category: 'Development',
    code: '01 // DEV_CORE',
    icon: '⚡',
    color: '#0055ff',
    accent: '#ff0077',
    description: 'Modern front-end, reactive systems, and solid back-end architecture.',
    skills: [
      { name: 'HTML', tag: 'Semantic 5', desc: 'Modern semantic structure & accessibility' },
      { name: 'CSS', tag: 'Styling & FX', desc: 'Custom layouts, 3D transforms, animation engines' },
      { name: 'JavaScript', tag: 'ES6+ / Async', desc: 'Modern ECMAScript, DOM manipulation & state' },
      { name: 'PHP', tag: 'Server-side', desc: 'Object-oriented programming, MVC frameworks' },
      { name: 'Laravel', tag: 'Full Framework', desc: 'Eloquent ORM, Blade, migrations, auth systems' },
      { name: 'React', tag: 'UI Library', desc: 'Component architectures, hooks & performance' },
    ],
  },
  {
    id: 'db',
    category: 'Database & API',
    code: '02 // DATA_SYNC',
    icon: '📡',
    color: '#00cc88',
    accent: '#00ccff',
    description: 'Relational data design, optimized queries, and RESTful web protocols.',
    skills: [
      { name: 'MySQL', tag: 'RDBMS', desc: 'Relational modeling, indexing, ACID transactions' },
      { name: 'REST API', tag: 'Architecture', desc: 'RESTful endpoints, JSON schemas, auth tokens' },
      { name: 'Postman', tag: 'Testing / Docs', desc: 'API debugging, mock servers, automated testing' },
    ],
  },
  {
    id: 'design',
    category: 'Design & Productivity',
    code: '03 // CREATIVE_LAB',
    icon: '✦',
    color: '#ff0077',
    accent: '#ffdd00',
    description: 'Vector UI/UX prototyping, visual systems, and documentation tooling.',
    skills: [
      { name: 'Figma', tag: 'UI/UX Design', desc: 'Design systems, auto-layout, interactive prototypes' },
      { name: 'Microsoft Office', tag: 'Productivity', desc: 'Technical documentation, analysis, sheets' },
    ],
  },
]

const marqueeItems = [
  'HTML5', 'CSS3', 'JAVASCRIPT (ES6+)', 'PHP', 'LARAVEL', 'REACT 19',
  'MYSQL', 'REST API', 'POSTMAN', 'FIGMA', 'THREE.JS', 'VITE',
  'MICROSOFT OFFICE', 'GIT & GITHUB', 'RESPONSIVE WEB', 'CREATIVE TECH',
]

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all')

  const filteredCategories = activeTab === 'all'
    ? skillCategories
    : skillCategories.filter((c) => c.id === activeTab)

  return (
    <section className="skills section" id="skills" aria-label="Skills & Digital Capabilities">
      {/* Background Ambience */}
      <div className="skills__ambient-glow" aria-hidden="true" />

      <div className="container">
        {/* Section Header */}
        <div className="section-header skills__header">
          <div className="skills__header-badge">
            <span className="skills__header-dot" />
            <span className="skills__header-code">SKILL MATRIX // Y2K DIGITAL LAB</span>
          </div>
          <h2 className="section-title skills__title">
            <span>DIGITAL</span> <span className="skills__title-accent">EXPERIMENTS</span>
          </h2>
          <p className="section-subtitle">
            Fondasi teknis dan instrumen kreatif yang saya gunakan untuk mengeksekusi ide menjadi produk web fungsional &amp; berkarakter.
          </p>

          {/* Filter Pills */}
          <div className="skills__filter-bar">
            <button
              className={`skills__filter-btn ${activeTab === 'all' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              ALL MATRIX
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

              {/* Badges Matrix */}
              <div className="skills__pills">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="skills__pill">
                    <div className="skills__pill-top">
                      <span className="skills__pill-name">{skill.name}</span>
                      <span className="skills__pill-tag">{skill.tag}</span>
                    </div>
                    <span className="skills__pill-detail">{skill.desc}</span>
                    <span className="skills__pill-sheen" aria-hidden="true" />
                  </div>
                ))}
              </div>

              {/* Decorative Corner Screws */}
              <div className="skills__screw skills__screw--tl" aria-hidden="true" />
              <div className="skills__screw skills__screw--tr" aria-hidden="true" />
              <div className="skills__screw skills__screw--bl" aria-hidden="true" />
              <div className="skills__screw skills__screw--br" aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* Horizontal Marquee Ticker */}
        <div className="skills__ticker" aria-hidden="true">
          <div className="skills__ticker-track">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span key={index} className="skills__ticker-item">
                <span className="skills__ticker-star">★</span>
                <span className="skills__ticker-text">{item}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
