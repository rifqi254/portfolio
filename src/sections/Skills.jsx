import './Skills.css'

const skillGroups = [
  {
    category: 'Frontend',
    icon: '🎨',
    color: 'var(--col-pink)',
    bgColor: 'var(--col-pink-light)',
    skills: [
      { name: 'React', level: 85 },
      { name: 'HTML / CSS', level: 95 },
      { name: 'JavaScript', level: 88 },
      { name: 'Vite', level: 80 },
      { name: 'Bootstrap', level: 90 },
      { name: 'Tailwind CSS', level: 75 },
    ]
  },
  {
    category: 'Backend',
    icon: '⚙️',
    color: 'var(--col-electric)',
    bgColor: 'var(--col-cyan-light)',
    skills: [
      { name: 'PHP', level: 88 },
      { name: 'Laravel', level: 85 },
      { name: 'Node.js', level: 70 },
      { name: 'Python', level: 72 },
      { name: 'FastAPI', level: 65 },
      { name: 'REST API', level: 85 },
    ]
  },
  {
    category: 'Database',
    icon: '🗄️',
    color: 'var(--col-turquoise)',
    bgColor: 'var(--col-mint-light)',
    skills: [
      { name: 'MySQL', level: 90 },
      { name: 'PostgreSQL', level: 70 },
      { name: 'MongoDB', level: 65 },
      { name: 'SQLite', level: 80 },
      { name: 'Redis', level: 55 },
      { name: 'Firebase', level: 68 },
    ]
  },
  {
    category: 'Tools & Design',
    icon: '🛠️',
    color: 'var(--col-lavender)',
    bgColor: 'var(--col-lavender-lt)',
    skills: [
      { name: 'Git / GitHub', level: 88 },
      { name: 'Figma', level: 78 },
      { name: 'Docker', level: 60 },
      { name: 'VS Code', level: 95 },
      { name: 'Postman', level: 85 },
      { name: 'Linux', level: 72 },
    ]
  },
]

const techBadges = [
  'React', 'Laravel', 'PHP', 'JavaScript', 'Python', 'MySQL',
  'HTML5', 'CSS3', 'Node.js', 'Git', 'Figma', 'Docker',
  'REST API', 'Bootstrap', 'Tailwind', 'Vite', 'MongoDB', 'Firebase',
  'Linux', 'Postman', 'Vue.js', 'FastAPI', 'PostgreSQL', 'TypeScript',
]

export default function Skills() {
  return (
    <section className="skills section" id="skills" aria-label="Skills">
      <div className="container">
        <div className="section-header">
          <span className="label label-mint">✦ Capabilities</span>
          <h2 className="section-title">Skills & Tech Stack</h2>
          <p className="section-subtitle">Technologies and tools I use to bring ideas to life.</p>
        </div>

        {/* Skill Groups Grid */}
        <div className="skills__groups">
          {skillGroups.map((group) => (
            <div key={group.category} className="skills__group glass-card card-hover">
              <div className="skills__group-header" style={{ '--group-color': group.color, '--group-bg': group.bgColor }}>
                <span className="skills__group-icon">{group.icon}</span>
                <h3 className="skills__group-title">{group.category}</h3>
              </div>
              <div className="skills__list">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="skills__item">
                    <div className="skills__item-header">
                      <span className="skills__item-name">{skill.name}</span>
                      <span className="skills__item-pct">{skill.level}%</span>
                    </div>
                    <div className="skills__bar-bg">
                      <div
                        className="skills__bar-fill"
                        style={{
                          '--bar-width': `${skill.level}%`,
                          '--bar-color': group.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Badge Cloud */}
        <div className="skills__badges-section">
          <h3 className="skills__badges-title">All Technologies</h3>
          <div className="skills__badges">
            {techBadges.map((badge, i) => (
              <span
                key={badge}
                className="skills__badge chrome-surface"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
