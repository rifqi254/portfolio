import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './SplitTitle.css'

gsap.registerPlugin(ScrollTrigger)

/**
 * SplitTitle
 * Animates titles word-by-word on scroll using GSAP + ScrollTrigger
 * 
 * Props:
 * - tag: HTML heading tag ('h1', 'h2', 'h3', etc., default: 'h2')
 * - className: Outer CSS classes
 * - parts: Array of { text: string, className?: string }
 * - text: Simple string fallback if parts not provided
 * - delay: Animation start delay in seconds (default: 0)
 */
export default function SplitTitle({
  tag: Tag = 'h2',
  className = '',
  parts,
  text,
  delay = 0,
}) {
  const containerRef = useRef(null)

  // Normalize inputs into word segments with their respective class names
  const segments = []

  if (parts && Array.isArray(parts)) {
    parts.forEach((part, partIdx) => {
      const words = String(part.text || '')
        .trim()
        .split(/\s+/)
      words.forEach((w, wordIdx) => {
        if (w) {
          segments.push({
            id: `p-${partIdx}-w-${wordIdx}`,
            word: w,
            className: part.className || '',
          })
        }
      })
    })
  } else if (text) {
    const words = String(text)
      .trim()
      .split(/\s+/)
    words.forEach((w, wordIdx) => {
      if (w) {
        segments.push({
          id: `w-${wordIdx}`,
          word: w,
          className: '',
        })
      }
    })
  }

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const words = el.querySelectorAll('.split-word-inner')
    if (!words.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          y: '100%',
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          y: '0%',
          opacity: 1,
          duration: 0.65,
          stagger: 0.07,
          delay,
          ease: 'power3.out',
          clearProps: 'transform,willChange,opacity',
        }
      )
    }, el)

    return () => ctx.revert()
  }, [delay])

  return (
    <Tag ref={containerRef} className={`${className} split-title-container`}>
      {segments.map((seg) => (
        <span key={seg.id} className="split-word-mask">
          <span className={`split-word-inner ${seg.className}`}>{seg.word}</span>
        </span>
      ))}
    </Tag>
  )
}
