import { useState, useEffect } from 'react'
import './ScrollEffects.css'

export default function ScrollEffects() {
  const [scrollPercent, setScrollPercent] = useState(0)

  // Track scroll percentage for subtle top progress bar
  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight
          const percent =
            docHeight > 0
              ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))
              : 0
          setScrollPercent(percent)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll handler for navbar clicks / custom events
  useEffect(() => {
    const handleWarp = (e) => {
      const { id } = e.detail || {}
      if (id) {
        if (id === 'hero') {
          if (window.__lenis) {
            window.__lenis.scrollTo(0, { duration: 1.2 })
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
          return
        }

        const targetEl = document.getElementById(id)
        if (targetEl) {
          if (window.__lenis) {
            window.__lenis.scrollTo(targetEl, { offset: -70, duration: 1.2 })
          } else {
            const navHeight = 70
            const elementPosition = targetEl.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - navHeight
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth',
            })
          }
        }
      }
    }
    window.addEventListener('warp-to-section', handleWarp)
    return () => window.removeEventListener('warp-to-section', handleWarp)
  }, [])

  return (
    <>
      {/* Top Cyber Holographic Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        role="progressbar"
        aria-valuenow={Math.round(scrollPercent)}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="scroll-progress-bar__fill"
          style={{ width: `${scrollPercent}%` }}
        >
          <span className="scroll-progress-bar__glow" />
          <span className="scroll-progress-bar__head">✦</span>
        </div>
      </div>
    </>
  )
}
