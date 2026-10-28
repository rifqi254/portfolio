import { useEffect, useState } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [trail, setTrail] = useState({ x: -100, y: -100 })
  const [clicking, setClicking] = useState(false)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    let animFrame
    let currentTrailX = -100
    let currentTrailY = -100
    let targetX = -100
    let targetY = -100

    const onMove = (e) => {
      targetX = e.clientX
      targetY = e.clientY
      setPos({ x: e.clientX, y: e.clientY })
    }

    const onDown = () => setClicking(true)
    const onUp = () => setClicking(false)

    const onMouseOver = (e) => {
      const isInteractive = e.target.closest('a, button, [role="button"], input, textarea, select, .card-hover, .project-card, .project-card__thumb-frame, .cert-card, .y2k-thumb-frame, .proj-modal__media-frame, .proj-modal__nav, .cert-modal__nav, .proj-modal__close-btn, .cert-modal__close-btn, .timeline-card')
      setHovering(Boolean(isInteractive))
    }

    const animateTrail = () => {
      currentTrailX += (targetX - currentTrailX) * 0.12
      currentTrailY += (targetY - currentTrailY) * 0.12
      setTrail({ x: currentTrailX, y: currentTrailY })
      animFrame = requestAnimationFrame(animateTrail)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseover', onMouseOver)
    animFrame = requestAnimationFrame(animateTrail)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(animFrame)
    }
  }, [])

  // Hide on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={`cursor cursor--dot ${clicking ? 'cursor--click' : ''} ${hovering ? 'cursor--hover' : ''}`}
        style={{ transform: `translate(${pos.x - 6}px, ${pos.y - 6}px)` }}
        aria-hidden="true"
      />
      {/* Trail ring */}
      <div
        className={`cursor cursor--ring ${hovering ? 'cursor--ring-hover' : ''}`}
        style={{ transform: `translate(${trail.x - 18}px, ${trail.y - 18}px)` }}
        aria-hidden="true"
      />
    </>
  )
}
