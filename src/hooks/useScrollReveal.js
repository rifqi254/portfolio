import { useEffect } from 'react'

export function useScrollReveal() {
  useEffect(() => {
    // 1. Observe Sections for in-view state and header glint
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section--in-view')
          } else {
            const rect = entry.boundingClientRect
            if (rect.top > window.innerHeight || rect.bottom < 0) {
              entry.target.classList.remove('section--in-view')
            }
          }
        })
      },
      { threshold: 0.08, rootMargin: '-20px 0px -15% 0px' }
    )

    document.querySelectorAll('section').forEach((sec) => {
      sectionObserver.observe(sec)
    })

    // 2. Comprehensive selectors across all sections:
    // About, Projects, Skills, Timeline, Certificates, Contact
    const targets = [
      // Headers
      { selector: '.section-header', type: 'fade-down' },
      
      // About Section Elements
      { selector: '.about__visual', type: 'slide-left', delay: 80 },
      { selector: '.about__intro', type: 'fade-up', delay: 140 },
      { selector: '.about__body', type: 'fade-up', delay: 220 },
      { selector: '.about__info-grid', type: 'scale-up', delay: 300 },
      { selector: '.about__actions', type: 'fade-up', delay: 380 },

      // Projects Section Elements
      { selector: '.projects__marquee-strip', type: 'fade-up' },
      { selector: '.project-card', type: 'scale-up', stagger: 90 },

      // Skills Section Elements
      { selector: '.skills__group', type: 'scale-up', stagger: 100 },
      { selector: '.skills__badges-section', type: 'fade-up', delay: 200 },

      // Timeline Section Elements
      { selector: '.timeline__center-line', type: 'fade-up' },
      { selector: '.timeline__row:nth-child(odd)', type: 'slide-left', stagger: 90 },
      { selector: '.timeline__row:nth-child(even)', type: 'slide-right', stagger: 90 },

      // Certificates Section Elements
      { selector: '.cert-card', type: 'scale-up', stagger: 80 },

      // Contact Section Elements
      { selector: '.contact__card', type: 'scale-up', stagger: 90 },
      { selector: '.contact__form-wrap', type: 'slide-right', delay: 150 },
    ]

    const allElements = []

    targets.forEach(({ selector, type, delay, stagger }) => {
      const els = document.querySelectorAll(selector)
      els.forEach((el, index) => {
        el.classList.add('scroll-reveal')
        if (type === 'slide-left') el.classList.add('scroll-reveal--left')
        if (type === 'slide-right') el.classList.add('scroll-reveal--right')
        if (type === 'scale-up') el.classList.add('scroll-reveal--scale')

        const computedDelay =
          delay !== undefined
            ? delay
            : stagger !== undefined
            ? (index % 4) * stagger
            : 0

        el.style.setProperty('--reveal-delay', `${computedDelay}ms`)

        if (!allElements.includes(el)) {
          allElements.push(el)
        }
      })
    })

    // Also pick up any manual .reveal elements
    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('scroll-reveal')
      if (!allElements.includes(el)) allElements.push(el)
    })

    // IntersectionObserver with re-triggering when scrolling down into view
    const elementObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
          } else {
            // When user scrolls back up and element moves below viewport,
            // remove is-revealed so scrolling down re-triggers smoothly!
            const rect = entry.boundingClientRect
            if (rect.top > window.innerHeight * 0.95) {
              entry.target.classList.remove('is-revealed')
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    )

    allElements.forEach((el) => {
      elementObserver.observe(el)
      // Check if already in viewport on mount
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.85 && rect.bottom > 0) {
        el.classList.add('is-revealed')
      }
    })

    return () => {
      sectionObserver.disconnect()
      elementObserver.disconnect()
    }
  }, [])
}
