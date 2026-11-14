import { useState, useEffect, useRef } from 'react'
import './HangingCard.css'

export default function HangingCard({
  photoSrc = '/profile.jpg',
  name = 'RIFQI M.',
  fullName = 'Muhammad Rifqi Maulana',
  role = 'Full-Stack Developer',
  idCode = 'RM-2026-ARCHIVE',
  className = '',
}) {
  const containerRef = useRef(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [imgError, setImgError] = useState(false)

  // Physics state stored in refs to run smoothly at 60fps without React re-render lag
  const physicsRef = useRef({
    // Anchor at top center of container
    anchorX: 160,
    anchorY: 10,

    // Resting card position
    restX: 160,
    restY: 245,

    // Current card center position
    posX: 160,
    posY: 245,

    // Velocity
    vx: 0,
    vy: 0,

    // Card rotation (degrees)
    angle: 0,
    rotVel: 0,

    // Drag tracking
    dragStartX: 0,
    dragStartY: 0,
    cardStartX: 0,
    cardStartY: 0,
    lastPointerX: 0,
    lastPointerY: 0,
    lastPointerTime: 0,
    pointerVx: 0,
    pointerVy: 0,

    // Physical constants for Floppy Disk Keychain
    cardWidth: 310,
    cardHeight: 430,
    strapLength: 42,
    stiffness: 0.088,
    damping: 0.85,
    angularStiffness: 0.07,
    angularDamping: 0.86,
  })

  // DOM elements refs for direct 60fps transform manipulation
  const cardElementRef = useRef(null)
  const strapPathRef = useRef(null)
  const strapStitchRef = useRef(null)
  const anchorGroupRef = useRef(null)
  const shineRef = useRef(null)
  const clipRef = useRef(null)
  const charmRef = useRef(null)
  const isDraggingRef = useRef(false)
  const animFrameIdRef = useRef(null)

  // Update container dimensions & resting anchor on mount/resize
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      const width = rect.width || 300
      const anchorX = width / 2
      const anchorY = 10
      const restX = anchorX
      const restY = anchorY + physicsRef.current.strapLength + physicsRef.current.cardHeight / 2 - 14

      physicsRef.current.anchorX = anchorX
      physicsRef.current.anchorY = anchorY
      physicsRef.current.restX = restX
      physicsRef.current.restY = restY

      // Position the top anchor group directly
      if (anchorGroupRef.current) {
        anchorGroupRef.current.setAttribute('transform', `translate(${anchorX}, ${anchorY})`)
      }

      if (!isDraggingRef.current) {
        physicsRef.current.posX = restX
        physicsRef.current.posY = restY
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Main Physics Engine Loop (rAF)
  useEffect(() => {
    let lastTime = performance.now()

    const tick = (now) => {
      const dt = Math.min((now - lastTime) / 1000, 0.033)
      lastTime = now
      const p = physicsRef.current

      if (!isDraggingRef.current) {
        // Spring Rebound Simulation
        const dispX = p.posX - p.restX
        const dispY = p.posY - p.restY

        const fx = -p.stiffness * dispX * 60
        const fy = -p.stiffness * dispY * 60

        p.vx = (p.vx + fx * dt) * Math.pow(p.damping, dt * 60)
        p.vy = (p.vy + fy * dt) * Math.pow(p.damping, dt * 60)

        p.posX += p.vx
        p.posY += p.vy

        // Target angular tilt from horizontal displacement & velocity
        const targetAngle = Math.max(-28, Math.min(28, (p.posX - p.anchorX) * 0.16 + p.vx * 0.45))
        const angleDisp = p.angle - targetAngle
        const torque = -p.angularStiffness * angleDisp * 60
        p.rotVel = (p.rotVel + torque * dt) * Math.pow(p.angularDamping, dt * 60)
        p.angle += p.rotVel

        // Stop tiny micro-jitters
        if (
          Math.abs(dispX) < 0.08 &&
          Math.abs(dispY) < 0.08 &&
          Math.abs(p.vx) < 0.08 &&
          Math.abs(p.vy) < 0.08 &&
          Math.abs(angleDisp) < 0.08
        ) {
          p.posX = p.restX
          p.posY = p.restY
          p.vx = 0
          p.vy = 0
          p.angle = 0
          p.rotVel = 0
        }
      }

      // Render transforms directly to DOM
      const cardEl = cardElementRef.current
      if (cardEl) {
        const left = p.posX - p.cardWidth / 2
        const top = p.posY - p.cardHeight / 2
        cardEl.style.transform = `translate3d(${left}px, ${top}px, 0px) rotate(${p.angle}deg)`
      }

      // Calculate attachment slot on top of the card
      const rad = (p.angle * Math.PI) / 180
      const slotDistY = -p.cardHeight / 2 + 10
      const slotX = p.posX + Math.sin(rad) * -slotDistY
      const slotY = p.posY + Math.cos(rad) * slotDistY

      // Position clip / swivel hook at attachment slot
      const clipEl = clipRef.current
      if (clipEl) {
        clipEl.style.transform = `translate3d(${slotX}px, ${slotY}px, 0px) rotate(${p.angle}deg)`
      }

      // Update elastic chain curve (Quadratic Bezier curve)
      const strapEl = strapPathRef.current
      const strapStitchEl = strapStitchRef.current
      if (strapEl) {
        const midX = (p.anchorX + slotX) / 2 + (p.posX - p.restX) * 0.18
        const midY = (p.anchorY + slotY) / 2 + Math.abs(p.posX - p.anchorX) * 0.08
        const pathData = `M ${p.anchorX} ${p.anchorY} Q ${midX} ${midY} ${slotX} ${slotY}`
        strapEl.setAttribute('d', pathData)
        if (strapStitchEl) {
          strapStitchEl.setAttribute('d', pathData)
        }
      }

      // Update neon charm position along chain
      const charmEl = charmRef.current
      if (charmEl) {
        const charmX = (p.anchorX * 0.4 + slotX * 0.6) + 14
        const charmY = (p.anchorY * 0.4 + slotY * 0.6)
        charmEl.style.transform = `translate3d(${charmX}px, ${charmY}px, 0px) rotate(${p.angle * 1.4}deg)`
      }

      // Dynamic light reflection shift across translucent acrylic
      const shineEl = shineRef.current
      if (shineEl) {
        const normAngle = Math.max(-1, Math.min(1, p.angle / 20))
        const gradX = 50 + normAngle * 35
        shineEl.style.background = `linear-gradient(${125 + p.angle * 0.8}deg, rgba(255,255,255,0.4) ${gradX - 25}%, rgba(255,100,200,0.2) ${gradX}%, transparent ${gradX + 28}%)`
      }

      animFrameIdRef.current = requestAnimationFrame(tick)
    }

    animFrameIdRef.current = requestAnimationFrame(tick)
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current)
    }
  }, [])

  // Pointer event handlers for drag physics
  const handlePointerDown = (e) => {
    // Only primary mouse button or touch
    if (e.button !== undefined && e.button !== 0) return

    e.preventDefault()
    setHasInteracted(true)
    setIsDragging(true)
    isDraggingRef.current = true

    const p = physicsRef.current
    p.dragStartX = e.clientX
    p.dragStartY = e.clientY
    p.cardStartX = p.posX
    p.cardStartY = p.posY
    p.lastPointerX = e.clientX
    p.lastPointerY = e.clientY
    p.lastPointerTime = performance.now()
    p.pointerVx = 0
    p.pointerVy = 0

    const handlePointerMove = (moveEvt) => {
      if (!isDraggingRef.current) return
      const now = performance.now()
      const dtMove = Math.max(0.001, (now - p.lastPointerTime) / 1000)

      const rawDx = moveEvt.clientX - p.dragStartX
      const rawDy = moveEvt.clientY - p.dragStartY

      // Elastic resistance when dragged too far
      const maxDist = 200
      const dist = Math.hypot(rawDx, rawDy)
      const scale = dist > maxDist ? 1 - Math.exp(-dist / maxDist) * 0.4 : 1

      p.posX = p.cardStartX + rawDx * scale
      p.posY = p.cardStartY + rawDy * scale

      // Track drag release velocity for realistic fling
      p.pointerVx = (moveEvt.clientX - p.lastPointerX) / dtMove * 0.015
      p.pointerVy = (moveEvt.clientY - p.lastPointerY) / dtMove * 0.015

      p.lastPointerX = moveEvt.clientX
      p.lastPointerY = moveEvt.clientY
      p.lastPointerTime = now

      // Dynamic tilt during dragging
      const dragTilt = Math.max(-28, Math.min(28, (p.posX - p.anchorX) * 0.22))
      p.angle = dragTilt
    }

    const handlePointerUp = () => {
      if (!isDraggingRef.current) return
      isDraggingRef.current = false
      setIsDragging(false)

      // Impart throw velocity into spring
      p.vx = Math.max(-22, Math.min(22, p.pointerVx))
      p.vy = Math.max(-22, Math.min(22, p.pointerVy))
      p.rotVel = p.vx * 0.4

      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)
  }

  // Click bounce animation if clicked without dragging
  const handleCardClick = () => {
    if (!hasInteracted) setHasInteracted(true)
    const p = physicsRef.current
    if (Math.abs(p.vx) < 1 && Math.abs(p.vy) < 1) {
      p.vy += 9
      p.vx += (Math.random() - 0.5) * 8
      p.rotVel += (Math.random() - 0.5) * 6
    }
  }

  return (
    <div
      className={`hanging-badge-container ${isDragging ? 'is-dragging' : ''} ${className}`}
      ref={containerRef}
      aria-label="Floppy Disk Acrylic Keychain — Interactive profile photo frame"
    >
      {/* SVG Canvas for Ball Chain */}
      <svg className="hanging-badge__svg" aria-hidden="true">
        <defs>
          {/* Chrome Metal Chain Gradient */}
          <linearGradient id="chromeBallChain" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8899aa" />
            <stop offset="30%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#99aacc" />
            <stop offset="85%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#667788" />
          </linearGradient>

          {/* Chrome Anchor Gradient */}
          <linearGradient id="chromeMetal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#667788" />
            <stop offset="25%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#99aabb" />
            <stop offset="75%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#556677" />
          </linearGradient>
        </defs>

        {/* Top Fixed Anchor Pin / Keychain Loop */}
        <g ref={anchorGroupRef} className="hanging-badge__anchor-group">
          <circle
            cx={0}
            cy={5}
            r={8}
            fill="none"
            stroke="url(#chromeMetal)"
            strokeWidth={3}
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
          />
          <circle
            cx={0}
            cy={5}
            r={3}
            fill="#cbd5e1"
          />
        </g>

        {/* Metal Ball Chain (Beaded necklace effect) */}
        <path
          ref={strapPathRef}
          d=""
          fill="none"
          stroke="url(#chromeBallChain)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray="2 7"
          className="hanging-badge__ball-chain"
        />

        {/* Center Metallic Shimmer Line */}
        <path
          ref={strapStitchRef}
          d=""
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeDasharray="1 7"
          strokeOpacity="0.9"
          className="hanging-badge__ball-chain-core"
        />
      </svg>

      {/* Keychain Connector Swivel Ring */}
      <div className="hanging-badge__clip" ref={clipRef} aria-hidden="true">
        <div className="floppy-keychain__ring" />
      </div>

      {/* Dangling Neon Lime Acrylic Charm */}
      <div className="floppy-keychain__charm" ref={charmRef} aria-hidden="true">
        <div className="floppy-keychain__charm-inner">
          <span className="floppy-keychain__charm-icon">✦</span>
          <span className="floppy-keychain__charm-text">RM</span>
        </div>
      </div>

      {/* The Physical Floppy Disk Acrylic Keychain Card */}
      <div
        className="hanging-badge__card floppy-disk"
        ref={cardElementRef}
        onPointerDown={handlePointerDown}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        aria-label="Floppy disk acrylic keychain, tarik untuk memantulkan"
      >
        {/* Translucent Pink Acrylic Sheen & Highlights */}
        <div className="floppy__shine" ref={shineRef} aria-hidden="true" />
        <div className="floppy__bevel-edge" aria-hidden="true" />

        {/* Top Keychain Attachment Grommet */}
        <div className="floppy__grommet">
          <div className="floppy__grommet-hole" />
        </div>

        {/* Top Sliding Metal Shutter */}
        <div className="floppy__shutter">
          <div className="floppy__shutter-metal">
            <div className="floppy__shutter-notch">
              <span className="floppy__shutter-arrow">▲</span>
            </div>
            <div className="floppy__shutter-window" />
            <div className="floppy__shutter-text">
              <span>RIFQI M // 2HD</span>
              <span className="floppy__shutter-cap">1.44 MB</span>
            </div>
          </div>
        </div>

        {/* Floppy Disk Label Sticker (Houses the Profile Photo) */}
        <div className="floppy__label">
          {/* Retro Label Header Stripes */}
          <div className="floppy__label-stripes">
            <span className="stripe stripe--pink" />
            <span className="stripe stripe--cyan" />
          </div>

          <div className="floppy__label-header">
            <span className="floppy__label-brand">ARCHIVE 2025</span>
            <span className="floppy__label-density">FORMATTED · 2HD</span>
          </div>

          {/* Profile Photo Frame */}
          <div className="floppy__photo-frame">
            <img
              src={photoSrc}
              alt={fullName}
              className={`floppy__photo-img ${imgError ? 'is-hidden' : ''}`}
              onError={() => setImgError(true)}
              draggable={false}
            />

            {imgError && (
              <div className="floppy__photo-fallback">
                <span>RM</span>
              </div>
            )}

            {/* Subtle vintage photo grain & scanline */}
            <div className="floppy__photo-sheen" />
            <div className="floppy__photo-corner corner--tl" />
            <div className="floppy__photo-corner corner--tr" />
            <div className="floppy__photo-corner corner--bl" />
            <div className="floppy__photo-corner corner--br" />
          </div>

          {/* Identity & Role Text inside Label */}
          <div className="floppy__label-info">
            <div className="floppy__label-name">{fullName}</div>
            <div className="floppy__label-role">
              <span className="floppy__label-dot" />
              <span>{role}</span>
            </div>
            <div className="floppy__label-meta">
              <span className="floppy__label-code">{idCode}</span>
              <span className="floppy__label-stamp">INDONESIA // VERIFIED</span>
            </div>
          </div>
        </div>

        {/* Circular Disk Hub visible through translucent acrylic */}
        <div className="floppy__hub" aria-hidden="true">
          <div className="floppy__hub-ring" />
          <div className="floppy__hub-center" />
          <div className="floppy__hub-notch" />
        </div>

        {/* Corner Cutout & Write-Protect Notches */}
        <div className="floppy__corner-notch" aria-hidden="true" />
        <div className="floppy__wp-notch" aria-hidden="true" />
        <div className="floppy__hd-notch" aria-hidden="true" />
      </div>

      {/* Floating Prompt Hint */}
      {!hasInteracted && (
        <div className="hanging-badge__hint" aria-hidden="true">
          <span className="hanging-badge__hint-icon">👇</span>
          <span className="hanging-badge__hint-text">TARIK KEYCHAIN NYA! · PULL ME</span>
        </div>
      )}
    </div>
  )
}
