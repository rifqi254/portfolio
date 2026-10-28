import { useState, useEffect, useRef } from 'react'
import './Y2KShowcase.css'

export default function Y2KShowcase() {
  const showcaseRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [activeSticker, setActiveSticker] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Interactive 3D parallax on mouse move
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!showcaseRef.current) return
      const rect = showcaseRef.current.getBoundingClientRect()
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
      setMousePos({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleStickerClick = (name) => {
    setActiveSticker(name)
    setTimeout(() => setActiveSticker(null), 800)
  }

  // Equalizer heights
  const eqBars = [65, 90, 45, 100, 75, 55, 85, 95, 40, 70, 85, 60]

  return (
    <div
      className="y2k-showcase"
      ref={showcaseRef}
      style={{
        '--tilt-x': `${-mousePos.y * 12}deg`,
        '--tilt-y': `${mousePos.x * 14}deg`,
        '--move-x': `${mousePos.x * 10}px`,
        '--move-y': `${mousePos.y * 10}px`,
      }}
      aria-label="Y2K Cyber Aesthetic Showcase"
    >
      {/* 1. Main Retro Cyber Window: Winamp / Cyber Player */}
      <div className="y2k-card y2k-player glass-card glossy">
        {/* Title Bar */}
        <div className="y2k-player__titlebar">
          <div className="y2k-player__dots">
            <span className="dot dot--close" />
            <span className="dot dot--min" />
            <span className="dot dot--max" />
          </div>
          <span className="y2k-player__title">✦ CYBER_DECK_v2.5.EXE ✦</span>
          <span className="y2k-player__ver">320K</span>
        </div>

        {/* LCD Screen with Audio Visualizer */}
        <div className="y2k-player__screen">
          <div className="y2k-player__track-info">
            <span className="y2k-player__icon">♪</span>
            <div className="y2k-player__marquee">
              <span>RIFQI_MAULANA — FULLSTACK_BEATS.MP3 (CYBERNETIC ARCHIVE)</span>
            </div>
          </div>

          <div className="y2k-player__visualizer">
            {eqBars.map((height, i) => (
              <div
                key={i}
                className={`y2k-player__eq-bar ${isPlaying ? 'is-animated' : ''}`}
                style={{
                  '--target-height': `${height}%`,
                  '--delay': `${i * 0.08}s`,
                }}
              />
            ))}
          </div>

          <div className="y2k-player__screen-footer">
            <span className="y2k-player__time">02:14 / 04:20</span>
            <span className="y2k-player__mode">STEREO · 44.1kHz</span>
            <span className="y2k-player__eq-label">EQ: ON</span>
          </div>
        </div>

        {/* Player Controls */}
        <div className="y2k-player__controls">
          <button
            type="button"
            className="y2k-btn y2k-btn--prev"
            title="Previous"
            aria-label="Previous Track"
          >
            ◀◀
          </button>
          <button
            type="button"
            className={`y2k-btn y2k-btn--play ${isPlaying ? 'is-playing' : ''}`}
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause' : 'Play'}
            aria-label="Play or Pause"
          >
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <button
            type="button"
            className="y2k-btn y2k-btn--next"
            title="Next"
            aria-label="Next Track"
          >
            ▶▶
          </button>
          <div className="y2k-player__vol">
            <span>VOL</span>
            <div className="y2k-player__vol-bar">
              <div className="y2k-player__vol-fill" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Holographic Spinning CD-ROM Disk */}
      <div className="y2k-cd float-anim-1">
        <div className="y2k-cd__inner">
          <div className="y2k-cd__shine" />
          <div className="y2k-cd__grooves" />
          <div className="y2k-cd__ring">
            <span className="y2k-cd__text">✦ RIFQI MAULANA · CYBERNETIC ARCHIVE 2025 · 700MB ✦</span>
          </div>
          <div className="y2k-cd__hole" />
        </div>
      </div>

      {/* 3. Retro Terminal / System Info Badge */}
      <div className="y2k-terminal glass-card float-anim-2">
        <div className="y2k-terminal__header">
          <span className="y2k-terminal__icon">⚡</span>
          <span className="y2k-terminal__title">SYSTEM_CORE.LOG</span>
        </div>
        <div className="y2k-terminal__body">
          <div className="y2k-terminal__line">
            <span className="prompt">&gt;</span> <span className="key">STACK:</span> React 19 + Laravel
          </div>
          <div className="y2k-terminal__line">
            <span className="prompt">&gt;</span> <span className="key">DEV:</span> Rifqi Maulana
          </div>
          <div className="y2k-terminal__line">
            <span className="prompt">&gt;</span> <span className="key">STATUS:</span> <span className="status-online">AVAILABLE 🟢</span>
          </div>
        </div>
      </div>

      {/* 4. Holographic Chrome Starburst Badge */}
      <div
        className={`y2k-sticker y2k-sticker--star ${activeSticker === 'star' ? 'is-clicked' : ''}`}
        onClick={() => handleStickerClick('star')}
        title="Click to interact!"
      >
        <div className="y2k-starburst">
          <span>✦</span>
          <span>Y2K</span>
          <span>CERTIFIED</span>
        </div>
      </div>

      {/* 5. 100% Virus Free Cyber Shield */}
      <div
        className={`y2k-sticker y2k-sticker--shield ${activeSticker === 'shield' ? 'is-clicked' : ''}`}
        onClick={() => handleStickerClick('shield')}
        title="100% Virus Free"
      >
        <span className="y2k-shield-icon">🛡️</span>
        <div>
          <div className="y2k-shield-title">100% SECURE</div>
          <div className="y2k-shield-sub">VIRUS FREE ARCHIVE</div>
        </div>
      </div>

      {/* 6. Chrome Liquid Orbs (Mercury Bubbles) */}
      <div className="y2k-chrome-bubble y2k-chrome-bubble--1" aria-hidden="true" />
      <div className="y2k-chrome-bubble y2k-chrome-bubble--2" aria-hidden="true" />
      <div className="y2k-chrome-bubble y2k-chrome-bubble--3" aria-hidden="true" />

      {/* 7. Barcode Tag Sticker */}
      <div className="y2k-sticker y2k-sticker--barcode">
        <div className="barcode-lines" aria-hidden="true">
          <span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span /><span />
        </div>
        <div className="barcode-text">NO. 2025-DEV-0402</div>
      </div>

      {/* 8. Tamagotchi / Cyber Pet Pixel Sticker */}
      <div
        className={`y2k-sticker y2k-sticker--pixel ${activeSticker === 'pixel' ? 'is-clicked' : ''}`}
        onClick={() => handleStickerClick('pixel')}
        title="Tamagotchi Health"
      >
        <span className="pixel-heart">👾</span>
        <span className="pixel-label">99 HP · LEVEL 01</span>
      </div>

      {/* 9. Floating Cyber Stars */}
      <div className="y2k-cyber-sparkle sparkle--1" aria-hidden="true">★</div>
      <div className="y2k-cyber-sparkle sparkle--2" aria-hidden="true">✦</div>
      <div className="y2k-cyber-sparkle sparkle--3" aria-hidden="true">✧</div>
    </div>
  )
}
