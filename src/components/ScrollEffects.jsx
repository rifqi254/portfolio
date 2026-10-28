import { useState, useEffect, useRef } from 'react'
import './ScrollEffects.css'

const sections = [
  {
    id: 'hero',
    code: '00',
    label: 'Top',
    name: 'Identity & Home',
    mode: 'hyperspace',
    modeLabel: 'HYPERSPACE STARBURST',
  },
  {
    id: 'about',
    code: '01',
    label: 'About',
    name: 'Profile & Philosophy',
    mode: 'scanline',
    modeLabel: 'HOLOGRAPHIC CRT SCAN',
  },
  {
    id: 'projects',
    code: '02',
    label: 'Projects',
    name: 'Featured Works',
    mode: 'matrix-grid',
    modeLabel: '3D CYBER GRID WARP',
  },
  {
    id: 'skills',
    code: '03',
    label: 'Skills',
    name: 'Tech Arsenal',
    mode: 'hex-stream',
    modeLabel: 'HEX CIRCUIT DATA STREAM',
  },
  {
    id: 'timeline',
    code: '04',
    label: 'Timeline',
    name: 'Career Roadmap',
    mode: 'chrono-slice',
    modeLabel: 'CHRONO-SHIFT VHS SLICE',
  },
  {
    id: 'certificates',
    code: '05',
    label: 'Certificates',
    name: 'Verified Credentials',
    mode: 'holo-foil',
    modeLabel: 'GOLDEN FOIL FLARE',
  },
  {
    id: 'contact',
    code: '06',
    label: 'Contact',
    name: 'Transmission Hub',
    mode: 'radar-sonar',
    modeLabel: 'QUANTUM RADAR PULSE',
  },
]

export default function ScrollEffects() {
  const [scrollPercent, setScrollPercent] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')
  const [warpActive, setWarpActive] = useState(false)
  const [currentWarp, setCurrentWarp] = useState({
    code: '01',
    name: 'Section',
    mode: 'scanline',
    modeLabel: 'CRT SCAN',
    direction: 'down',
  })

  const lastScrollY = useRef(0)
  const isInitialMount = useRef(true)
  const activeSectionRef = useRef('hero')
  const lastWarpTimeRef = useRef(0)
  const warpTimerRef = useRef(null)

  // Track scroll percentage and trigger dynamic transitions when scrolling up/down between sections
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

          // Skip transition on initial page mount
          if (isInitialMount.current) {
            isInitialMount.current = false
            lastScrollY.current = scrollTop
            ticking = false
            return
          }

          const scrollDelta = scrollTop - lastScrollY.current
          // Only evaluate when user has scrolled significantly
          if (Math.abs(scrollDelta) > 15) {
            const direction = scrollDelta >= 0 ? 'down' : 'up'

            // Dynamic viewport target anchor based on scroll direction
            const viewportAnchor =
              direction === 'down'
                ? scrollTop + window.innerHeight * 0.40
                : scrollTop + window.innerHeight * 0.50

            let current = 'hero'
            for (let i = sections.length - 1; i >= 0; i--) {
              const sec = sections[i]
              const el = document.getElementById(sec.id)
              if (el && el.offsetTop <= viewportAnchor) {
                current = sec.id
                break
              }
            }

            // Crossing from one section to another: trigger transition at standard balanced speed
            if (current !== activeSectionRef.current) {
              const now = Date.now()
              // Cooldown 850ms so transitions don't clash or rush
              if (now - lastWarpTimeRef.current > 850) {
                lastWarpTimeRef.current = now
                activeSectionRef.current = current
                setActiveSection(current)

                const matched = sections.find((s) => s.id === current)
                if (matched) {
                  setCurrentWarp({
                    code: matched.code,
                    name: matched.name,
                    mode: matched.mode,
                    modeLabel: matched.modeLabel,
                    direction,
                  })
                  setWarpActive(true)

                  if (warpTimerRef.current) clearTimeout(warpTimerRef.current)
                  warpTimerRef.current = setTimeout(() => {
                    setWarpActive(false)
                  }, 950)
                }
              }
            }
          }

          lastScrollY.current = scrollTop
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (warpTimerRef.current) clearTimeout(warpTimerRef.current)
    }
  }, [])

  // Listen for global custom warp events (navbar clicks / button scrolls)
  useEffect(() => {
    const handleWarp = (e) => {
      const { id, name, code } = e.detail || {}
      if (id) {
        triggerWarp(id, name, code)
      }
    }
    window.addEventListener('warp-to-section', handleWarp)
    return () => window.removeEventListener('warp-to-section', handleWarp)
  }, [])

  const triggerWarp = (targetId, name, code) => {
    const targetEl = document.getElementById(targetId)
    if (!targetEl) return

    const matched = sections.find((s) => s.id === targetId)
    const mode = matched ? matched.mode : 'scanline'
    const modeLabel = matched ? matched.modeLabel : 'CYBER WARP'

    activeSectionRef.current = targetId
    setActiveSection(targetId)

    setCurrentWarp({
      code: code || (matched ? matched.code : '00'),
      name: name || (matched ? matched.name : targetId.toUpperCase()),
      mode,
      modeLabel,
      direction: 'jump',
    })
    setWarpActive(true)

    // Calculate scroll offset for fixed navbar
    const navHeight = 84
    const elementPosition = targetEl.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - navHeight

    window.scrollTo({
      top: targetId === 'hero' ? 0 : offsetPosition,
      behavior: 'smooth',
    })

    lastWarpTimeRef.current = Date.now()
    if (warpTimerRef.current) clearTimeout(warpTimerRef.current)
    warpTimerRef.current = setTimeout(() => {
      setWarpActive(false)
    }, 950)
  }

  const scrollToTop = () => {
    triggerWarp('hero', 'Identity & Home', '00')
  }

  return (
    <>
      {/* 1. Top Cyber Holographic Scroll Progress Bar */}
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

      {/* 2. DYNAMIC MULTI-MODE Y2K TRANSITION OVERLAY */}
      <div
        className={`cyber-warp-overlay ${warpActive ? 'is-active' : ''} y2k-mode--${currentWarp.mode}`}
        aria-hidden="true"
      >
        {/* Mode 1: CRT Scanline (About) */}
        {currentWarp.mode === 'scanline' && (
          <div className="warp-fx warp-fx--scanline">
            <div className="warp-scanline__beam" />
            <div className="warp-scanline__grid" />
          </div>
        )}

        {/* Mode 2: 3D Matrix Grid Warp (Projects) */}
        {currentWarp.mode === 'matrix-grid' && (
          <div className="warp-fx warp-fx--matrix-grid">
            <div className="warp-matrix__wireframe" />
            <div className="warp-matrix__laser warp-matrix__laser--left" />
            <div className="warp-matrix__laser warp-matrix__laser--right" />
          </div>
        )}

        {/* Mode 3: Hex Circuit Data Stream (Skills) */}
        {currentWarp.mode === 'hex-stream' && (
          <div className="warp-fx warp-fx--hex-stream">
            <div className="warp-hex__pattern" />
            <div className="warp-hex__glitch-beam" />
          </div>
        )}

        {/* Mode 4: Chrono VHS Dual Slice (Timeline) */}
        {currentWarp.mode === 'chrono-slice' && (
          <div className="warp-fx warp-fx--chrono-slice">
            <div className="warp-chrono__slice warp-chrono__slice--top" />
            <div className="warp-chrono__slice warp-chrono__slice--bottom" />
            <div className="warp-chrono__vhs-line" />
          </div>
        )}

        {/* Mode 5: Golden Hologram Foil Flare (Certificates) */}
        {currentWarp.mode === 'holo-foil' && (
          <div className="warp-fx warp-fx--holo-foil">
            <div className="warp-foil__shimmer" />
            <div className="warp-foil__star-burst" />
          </div>
        )}

        {/* Mode 6: Quantum Radar Pulse (Contact) */}
        {currentWarp.mode === 'radar-sonar' && (
          <div className="warp-fx warp-fx--radar-sonar">
            <div className="warp-radar__ring warp-radar__ring--1" />
            <div className="warp-radar__ring warp-radar__ring--2" />
            <div className="warp-radar__ring warp-radar__ring--3" />
            <div className="warp-radar__sweep" />
          </div>
        )}

        {/* Hyperspace fallback */}
        {currentWarp.mode === 'hyperspace' && (
          <div className="warp-fx warp-fx--hyperspace">
            <div className="cyber-warp__beam cyber-warp__beam--1" />
            <div className="cyber-warp__beam cyber-warp__beam--2" />
          </div>
        )}

        {/* Universal Holographic Shimmer Backdrop */}
        <div className="cyber-warp__shimmer" />

        {/* Floating cyber navigation HUD Toast */}
        <div className="cyber-warp__toast">
          <div className="cyber-warp__toast-tag">
            <span className="cyber-warp__blink">●</span> {currentWarp.modeLabel}
          </div>
          <div className="cyber-warp__toast-title">
            <span>
              {currentWarp.direction === 'up'
                ? '▲ SCROLLING UP TO'
                : currentWarp.direction === 'down'
                ? '▼ SCROLLING DOWN TO'
                : 'WARPING TO SECTOR'}
            </span>
            <strong>[{currentWarp.code}] {currentWarp.name}</strong>
          </div>
          <div className="cyber-warp__toast-line" />
        </div>
      </div>
    </>
  )
}
