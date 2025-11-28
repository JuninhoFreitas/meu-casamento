import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import s from './falling-petals.module.scss'

export function FallingPetals() {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const total = 10
    const w = window.innerWidth
    const h = window.innerHeight
    const container = containerRef.current

    const R = (min, max) => min + Math.random() * (max - min)

    // Clear existing petals if any (mostly for hot reload or re-mount)
    container.innerHTML = ''

    for (let i = 0; i < total; i++) {
      const div = document.createElement('div')
      div.className = s.dot
      
      gsap.set(div, {
        x: R(0, w),
        y: R(-200, -150),
        z: R(-200, 200),
        xPercent: -50,
        yPercent: -50
      })
      
      container.appendChild(div)
      animm(div)
    }

    function animm(elm) {
      // Fall down
      gsap.to(elm, {
        duration: R(6, 15),
        y: h + 100,
        ease: 'none',
        repeat: -1,
        delay: -15
      })

      // Horizontal movement
      gsap.to(elm, {
        duration: R(4, 8),
        x: '+=100',
        rotationZ: R(0, 180),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      // Rotation
      gsap.to(elm, {
        duration: R(2, 8),
        rotationX: R(0, 360),
        rotationY: R(0, 360),
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: -5
      })
    }

    return () => {
      // Cleanup GSAP animations
      gsap.killTweensOf(`.${s.dot}`)
      if (container) container.innerHTML = ''
    }
  }, [])

  return <div ref={containerRef} className={s.container} id="petals-container" />
}

