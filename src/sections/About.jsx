import HangingCard from '../components/HangingCard'
import './About.css'

export default function About() {
  return (
    <section className="about section" id="about" aria-label="About me">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="label label-pink">✦ About Me</span>
          <h2 className="section-title">Who Am I?</h2>
        </div>

        <div className="about__grid">
          {/* Left — Interactive Pullable Lanyard Badge */}
          <div className="about__visual">
            <HangingCard
              photoSrc="/profile.jpg"
              name="RIFQI M."
              fullName="Muhammad Rifqi Maulana"
              role="Full-Stack Developer"
              idCode="RM-2026-ARCHIVE"
            />
          </div>

          {/* Right — Text Content */}
          <div className="about__content">
            <p className="about__intro">
              Hi, I'm <strong>Rifqi Maulana</strong> — a passionate digital creator and developer 
              from Indonesia. I love crafting unique digital experiences that blend technical 
              precision with creative vision.
            </p>

            <p className="about__body">
              With a background in full-stack development and a keen eye for design, I specialize 
              in building web applications that are not just functional, but visually compelling. 
              I'm fascinated by the intersection of technology, art, and culture — especially 
              the retro-futuristic aesthetics of the Y2K era.
            </p>

            <p className="about__body">
              When I'm not coding, you'll find me exploring experimental interfaces, studying 
              editorial design, and pushing the boundaries of what web experiences can be.
            </p>

            {/* Info grid */}
            <div className="about__info-grid">
              <div className="about__info-item">
                <span className="about__info-label">Location</span>
                <span className="about__info-value">📍 Indonesia</span>
              </div>
              <div className="about__info-item">
                <span className="about__info-label">Status</span>
                <span className="about__info-value about__info-value--available">
                  <span className="about__status-dot" />
                  Available for Hire
                </span>
              </div>
              <div className="about__info-item">
                <span className="about__info-label">Focus</span>
                <span className="about__info-value">Web Development</span>
              </div>
              <div className="about__info-item">
                <span className="about__info-label">Languages</span>
                <span className="about__info-value">ID / EN</span>
              </div>
            </div>

            <div className="about__actions">
              <a href="#contact" className="btn btn-primary" onClick={(e) => {
                e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                Let's Collaborate ✦
              </a>
              <a href="#projects" className="btn btn-ghost" onClick={(e) => {
                e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
              }}>
                View Projects
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
