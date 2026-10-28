import { useState, useEffect, useRef } from 'react'
import './HangingCard.css'

export default function HangingCard({
  photoSrc = '/profile.jpg',
  name = 'FADTABEIT',
  fullName = 'Muhammad Rifqi Maulana',
  role = 'Full-Stack Developer',
  idCode = 'RM-2025-DEV',
  className = '',
}) {
  const containerRef = useRef(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [imgError, setImgError] = useState(false)

  // Physics state stored in refs to run smoothly at 60fps without React re-render lag
  const physicsRef = useRef({
    // Anchor at top center of container
    anchorX: 140,
    anchorY: 10,

    // Resting card position
    restX: 140,
    restY: 205,

    // Current card center position
    posX: 140,
    posY: 205,

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

    // Physical constants
    cardWidth: 254,
    cardHeight: 374,
    strapLength: 50,
    stiffness: 0.088,      // Spring constant k (snappy return)
    damping: 0.85,         // Friction / oscillation decay
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
      const restY = anchorY + physicsRef.current.strapLength + physicsRef.current.cardHeight / 2 - 10

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
      const dt = Math.min((now - lastTime) / 1000, 0.033) // clamp dt
      lastTime = now
      const p = physicsRef.current

      if (!isDraggingRef.current) {
        // --- SPRING REBOUND SIMULATION ("TERPENTAL") ---
        const dispX = p.posX - p.restX
        const dispY = p.posY - p.restY

        // Hooke's Law Spring Force: F = -k * x
        const fx = -p.stiffness * dispX * 60
        const fy = -p.stiffness * dispY * 60

        // Acceleration (assuming mass = 1)
        p.vx = (p.vx + fx * dt) * Math.pow(p.damping, dt * 60)
        p.vy = (p.vy + fy * dt) * Math.pow(p.damping, dt * 60)

        p.posX += p.vx * dt * 60
        p.posY += p.vy * dt * 60

        // Rotational spring simulation (card swings like a pendulum)
        // Horizontal displacement and horizontal velocity create torque
        const naturalSwing = (dispX / 140) * 25 + (p.vx * 0.45)
        const angleDisp = p.angle - naturalSwing
        const torque = -p.angularStiffness * angleDisp * 60

        p.rotVel = (p.rotVel + torque * dt) * Math.pow(p.angularDamping, dt * 60)
        p.angle += p.rotVel * dt * 60

        // When motion settles, stay COMPLETELY STILL ("diem aja")
        const kineticEnergy = Math.abs(p.vx) + Math.abs(p.vy) + Math.abs(p.rotVel)
        if (kineticEnergy < 0.05 && Math.abs(dispX) < 0.6 && Math.abs(dispY) < 0.6) {
          p.posX = p.restX
          p.posY = p.restY
          p.angle = 0
          p.vx = 0
          p.vy = 0
          p.rotVel = 0
        }
      } else {
        // While dragging: smooth angle tracking based on pull direction
        const pullDx = p.posX - p.anchorX
        const pullDy = Math.max(p.posY - p.anchorY, 15)
        const targetAngle = Math.atan2(pullDx, pullDy) * (180 / Math.PI) * 0.52
        p.angle += (targetAngle - p.angle) * 0.2
      }

      // --- RENDER UPDATES DIRECTLY TO DOM FOR 60FPS PERFORMANCE ---
      const rad = (p.angle * Math.PI) / 180
      // Attachment hole on card: top-center of the card (offset from card center by cardHeight / 2 - 12)
      const holeDist = p.cardHeight / 2 - 10
      const holeX = p.posX - Math.sin(rad) * holeDist
      const holeY = p.posY - Math.cos(rad) * holeDist

      // Update Card transform & 3D tilt
      if (cardElementRef.current) {
        const tiltX = Math.max(-20, Math.min(20, -(p.posY - p.restY) * 0.08))
        const tiltY = Math.max(-20, Math.min(20, (p.posX - p.restX) * 0.12))
        cardElementRef.current.style.transform = `translate3d(${p.posX - p.cardWidth / 2}px, ${p.posY - p.cardHeight / 2}px, 0) rotate(${p.angle}deg) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`

        // Dynamic 3D depth shadow
        const shadowX = -p.angle * 0.6
        const shadowY = 16 + Math.abs(p.posY - p.restY) * 0.15
        const shadowBlur = 28 + Math.abs(p.posY - p.restY) * 0.2
        cardElementRef.current.style.filter = `drop-shadow(${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0, 18, 60, 0.45))`
      }

      // Update Holographic Shine reflection angle
      if (shineRef.current) {
        const shineAngle = 125 + p.angle * 1.8
        const shinePos = 50 + (p.posX - p.restX) * 0.3
        shineRef.current.style.background = `linear-gradient(${shineAngle}deg, transparent ${shinePos - 35}%, rgba(255,255,255,0.45) ${shinePos}%, rgba(0,204,255,0.3) ${shinePos + 15}%, rgba(255,0,153,0.3) ${shinePos + 30}%, transparent ${shinePos + 50}%)`
      }

      // Calculate Elastic Strap curve
      const strapDist = Math.hypot(holeX - p.anchorX, holeY - p.anchorY)
      let cpX = (p.anchorX + holeX) / 2
      let cpY = (p.anchorY + holeY) / 2

      if (strapDist < p.strapLength) {
        // Slack: rope sags naturally with gravity
        const sag = (p.strapLength - strapDist) * 0.65
        cpY += sag
      } else {
        // Taut / Stretched: slight elastic lateral oscillation when vibrating
        const stretchRatio = strapDist / p.strapLength
        const wave = Math.sin(now * 0.02) * Math.min(8, (stretchRatio - 1) * 12)
        const perpX = -(holeY - p.anchorY) / strapDist
        const perpY = (holeX - p.anchorX) / strapDist
        cpX += perpX * wave
        cpY += perpY * wave
      }

      const pathData = `M ${p.anchorX} ${p.anchorY} Q ${cpX} ${cpY} ${holeX} ${holeY}`
      if (strapPathRef.current) {
        strapPathRef.current.setAttribute('d', pathData)
        // When stretched elastically, strap gets slightly thinner (elastic tension effect)
        const width = Math.max(8, 12 - Math.max(0, (strapDist - p.strapLength) * 0.04))
        strapPathRef.current.setAttribute('stroke-width', width)
      }
      if (strapStitchRef.current) {
        strapStitchRef.current.setAttribute('d', pathData)
      }

      // Update metal clip position to match hole
      if (clipRef.current) {
        clipRef.current.style.transform = `translate3d(${holeX}px, ${holeY}px, 0) rotate(${p.angle}deg)`
      }

      animFrameIdRef.current = requestAnimationFrame(tick)
    }

    animFrameIdRef.current = requestAnimationFrame(tick)
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current)
    }
  }, [])

  // Pointer Down (Mouse or Touch)
  const handlePointerDown = (e) => {
    // Only primary button
    if (e.button !== undefined && e.button !== 0) return
    e.preventDefault()

    const p = physicsRef.current
    isDraggingRef.current = true
    setIsDragging(true)
    setHasInteracted(true)

    p.dragStartX = e.clientX
    p.dragStartY = e.clientY
    p.cardStartX = p.posX
    p.cardStartY = p.posY
    p.lastPointerX = e.clientX
    p.lastPointerY = e.clientY
    p.lastPointerTime = performance.now()
    p.pointerVx = 0
    p.pointerVy = 0

    // Capture global pointer movements
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)
  }

  // Pointer Move (Mouse drag or Touch drag)
  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return
    const p = physicsRef.current
    const now = performance.now()
    const dt = Math.max((now - p.lastPointerTime) / 1000, 0.008)

    // Calculate drag offset
    const deltaX = e.clientX - p.dragStartX
    const deltaY = e.clientY - p.dragStartY

    let targetX = p.cardStartX + deltaX
    let targetY = p.cardStartY + deltaY

    // Elastic limit resistance (rubber-band feeling if pulled extremely far)
    const pullDist = Math.hypot(targetX - p.anchorX, targetY - p.anchorY)
    const maxPull = 320
    if (pullDist > maxPull) {
      const excess = pullDist - maxPull
      const dampedExcess = Math.log(1 + excess * 0.02) * 45
      const angle = Math.atan2(targetY - p.anchorY, targetX - p.anchorX)
      targetX = p.anchorX + Math.cos(angle) * (maxPull + dampedExcess)
      targetY = p.anchorY + Math.sin(angle) * (maxPull + dampedExcess)
    }

    p.posX = targetX
    p.posY = targetY

    // Compute pointer release velocity
    p.pointerVx = (e.clientX - p.lastPointerX) / dt
    p.pointerVy = (e.clientY - p.lastPointerY) / dt
    p.lastPointerX = e.clientX
    p.lastPointerY = e.clientY
    p.lastPointerTime = now
  }

  // Pointer Up (Release -> FLING / BOUNCE "TERPENTAL")
  const handlePointerUp = () => {
    if (!isDraggingRef.current) return
    const p = physicsRef.current
    isDraggingRef.current = false
    setIsDragging(false)

    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', handlePointerUp)
    window.removeEventListener('pointercancel', handlePointerUp)

    // Inject release momentum into the spring physics
    // Clamping to avoid extreme runaway speeds
    const maxVel = 950
    p.vx = Math.max(-maxVel, Math.min(maxVel, p.pointerVx * 0.88))
    p.vy = Math.max(-maxVel, Math.min(maxVel, p.pointerVy * 0.88))

    // Give an extra playful recoil boost if pulled down and let go!
    const pullDown = p.posY - p.restY
    if (pullDown > 25) {
      p.vy -= pullDown * 1.85
    }

    // Angular kick from lateral velocity
    p.rotVel = (p.vx * 0.14)
  }

  // Playful tap/click bounce if clicked without dragging
  const handleCardClick = () => {
    const p = physicsRef.current
    if (Math.abs(p.vx) < 10 && Math.abs(p.vy) < 10) {
      p.vy += (Math.random() > 0.5 ? 1 : -1) * 140
      p.vx += (Math.random() - 0.5) * 220
      p.rotVel += (Math.random() - 0.5) * 24
      setHasInteracted(true)
    }
  }

  return (
    <div
      className={`hanging-badge-container ${className} ${isDragging ? 'is-dragging' : ''}`}
      ref={containerRef}
      aria-label="Interactive Lanyard ID Badge"
    >
      {/* SVG Canvas for Elastic Strap and Metallic Top Clasp */}
      <svg className="hanging-badge__svg" aria-hidden="true">
        <defs>
          {/* Lanyard Strap Gradient with Cybernetic Accent */}
          <linearGradient id="lanyardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#001899" />
            <stop offset="35%" stopColor="#0077ff" />
            <stop offset="70%" stopColor="#00ccff" />
            <stop offset="100%" stopColor="#ff007f" />
          </linearGradient>

          {/* Chrome Metallic Anchor Gradient */}
          <linearGradient id="chromeMetal" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#667788" />
            <stop offset="25%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#99aabb" />
            <stop offset="75%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#556677" />
          </linearGradient>
        </defs>

        {/* Top Fixed Anchor Pin / Carabiner Clip (Dynamically positioned via ref) */}
        <g ref={anchorGroupRef} className="hanging-badge__anchor-group">
          {/* Base plate */}
          <rect
            x={-18}
            y={-6}
            width={36}
            height={8}
            rx={4}
            fill="url(#chromeMetal)"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.4))"
          />
          {/* Carabiner ring */}
          <circle
            cx={0}
            cy={5}
            r={7}
            fill="none"
            stroke="url(#chromeMetal)"
            strokeWidth={3}
          />
        </g>

        {/* Elastic Lanyard Ribbon (Main Body) */}
        <path
          ref={strapPathRef}
          d=""
          fill="none"
          stroke="url(#lanyardGrad)"
          strokeWidth="12"
          strokeLinecap="round"
          className="hanging-badge__strap-ribbon"
        />

        {/* Center Cyber Stitch / Monospace Trace on Strap */}
        <path
          ref={strapStitchRef}
          d=""
          fill="none"
          stroke="#a5f3fc"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          strokeOpacity="0.85"
          className="hanging-badge__strap-stitch"
        />
      </svg>

      {/* Chrome Swivel Hook (Connector between strap and card slot) */}
      <div className="hanging-badge__clip" ref={clipRef} aria-hidden="true">
        <div className="hanging-badge__clip-ring" />
        <div className="hanging-badge__clip-body" />
      </div>

      {/* The Physical ID Card (Draggable / Springs back) */}
      <div
        className="hanging-badge__card glass-card"
        ref={cardElementRef}
        onPointerDown={handlePointerDown}
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        aria-label="Kartu ID profil gantung, tarik untuk memantulkan"
      >
        {/* Holographic Sheen Reflection Overlay */}
        <div className="hanging-badge__shine" ref={shineRef} aria-hidden="true" />

        {/* Top Punch Hole Slot (Where the lanyard attaches) */}
        <div className="hanging-badge__slot-wrap">
          <div className="hanging-badge__slot-hole" />
        </div>

        {/* Card Header Strip */}
        <div className="hanging-badge__header">
          <div className="hanging-badge__pass-tag">
            <span className="hanging-badge__tag-dot">✦</span>
            <span>CYBER PASS // 2025</span>
          </div>
          <div className="hanging-badge__chip" title="Security Smart Chip">
            <span className="hanging-badge__chip-line" />
            <span className="hanging-badge__chip-line" />
            <span className="hanging-badge__chip-line" />
          </div>
        </div>

        {/* Main Photo Area */}
        <div className="hanging-badge__photo-frame">
          <div className="hanging-badge__photo-corners">
            <span className="corner corner--tl" />
            <span className="corner corner--tr" />
            <span className="corner corner--bl" />
            <span className="corner corner--br" />
          </div>

          <img
            src={photoSrc}
            alt={fullName}
            className={`hanging-badge__photo-img ${imgError ? 'is-hidden' : ''}`}
            onError={() => setImgError(true)}
            draggable={false}
          />

          {imgError && (
            <div className="hanging-badge__photo-fallback">
              <span>RM</span>
            </div>
          )}

          {/* Micro scanline / lens sheen */}
          <div className="hanging-badge__photo-overlay" aria-hidden="true" />
          <div className="hanging-badge__photo-badge">ARCHIVE // ID</div>
        </div>

        {/* Identity & Role Text */}
        <div className="hanging-badge__info">
          <div className="hanging-badge__name-main">{name}</div>
          <div className="hanging-badge__name-sub">{fullName}</div>
          <div className="hanging-badge__role-badge">
            <span className="hanging-badge__status-dot" />
            <span className="hanging-badge__role-text">{role}</span>
          </div>
        </div>

        {/* Card Footer Barcode & Clearance */}
        <div className="hanging-badge__footer">
          <div className="hanging-badge__barcode" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
          <div className="hanging-badge__code">{idCode}</div>
          <div className="hanging-badge__holo-seal" title="Authentic Hologram Seal">
            ★
          </div>
        </div>
      </div>

      {/* Floating Prompt Hint (Disappears once user pulls or interacts) */}
      {!hasInteracted && (
        <div className="hanging-badge__hint" aria-hidden="true">
          <span className="hanging-badge__hint-icon">👇</span>
          <span className="hanging-badge__hint-text">TARIK KARTUNYA! · PULL ME</span>
        </div>
      )}
    </div>
  )
}
