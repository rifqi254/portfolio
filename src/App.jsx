import './index.css'
import './App.css'
import { useScrollReveal } from './hooks/useScrollReveal'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScrollEffects from './components/ScrollEffects'

import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Timeline from './sections/Timeline'
import Certificates from './sections/Certificates'
import Contact from './sections/Contact'

export default function App() {
  useScrollReveal()

  return (
    <>
      {/* Custom Y2K Cursor */}
      <CustomCursor />

      {/* Top Holographic Scroll Progress & Multi-Mode Y2K Transitions */}
      <ScrollEffects />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main id="main-content">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Timeline />
        <Certificates />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </>
  )
}
