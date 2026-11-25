import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useLenisScroll() {
  useEffect(() => {
    // Disable on touch devices to ensure 100% native 120Hz smooth momentum touch scroll
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (isTouch) {
      return
    }

    // Instantiate Lenis smooth scroll for desktop fine-pointer devices
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      syncTouch: false,
    })

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    const tickerCallback = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    // Expose lenis globally for anchor navigation & modal controls
    window.__lenis = lenis

    return () => {
      gsap.ticker.remove(tickerCallback)
      lenis.destroy()
      window.__lenis = null
    }
  }, [])
}
