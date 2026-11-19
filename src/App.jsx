import { useState, useEffect } from 'react'
import './index.css'
import './App.css'
import { useScrollReveal } from './hooks/useScrollReveal'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScrollEffects from './components/ScrollEffects'
import ResumeModal from './components/ResumeModal'

import Hero from './sections/Hero'
import About from './sections/About'
import ArchiveVault from './sections/ArchiveVault'
import MomentsGallery from './sections/MomentsGallery'
import Skills from './sections/Skills'
import Timeline from './sections/Timeline'
import Contact from './sections/Contact'

export default function App() {
  useScrollReveal()
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  useEffect(() => {
    const handleOpenResume = () => setIsResumeOpen(true)
    window.addEventListener('open-resume', handleOpenResume)
    return () => window.removeEventListener('open-resume', handleOpenResume)
  }, [])

  return (
    <>
      {/* Custom Y2K Cursor */}
      <CustomCursor />

      {/* Top Holographic Scroll Progress & Multi-Mode Y2K Transitions */}
      <ScrollEffects />

      {/* Navigation */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content */}
      <main id="main-content">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About onOpenResume={() => setIsResumeOpen(true)} />
        <ArchiveVault />
        <MomentsGallery />
        <Skills />
        <Timeline />
        <Contact />
      </main>

      {/* Curriculum Vitae (CV) Interactive Document Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Footer */}
      <Footer />
    </>
  )
}
