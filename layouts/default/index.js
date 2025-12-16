import { useFrame } from '@darkroom.engineering/hamo'
import cn from 'clsx'
import { CustomHead } from 'components/custom-head'
import { Footer } from 'components/footer'
import { Intro } from 'components/intro'
import { Scrollbar } from 'components/scrollbar'
import Lenis from 'lenis'
import { useStore } from 'lib/store'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import s from './layout.module.scss'

const Cursor = dynamic(
  () => import('components/cursor').then((mod) => mod.Cursor),
  { ssr: false }
)

const PageTransition = dynamic(
  () => import('components/page-transition').then((mod) => mod.PageTransition),
  { ssr: false }
)

const FallingPetals = dynamic(
  () => import('components/falling-petals').then((mod) => mod.FallingPetals),
  { ssr: false }
)

export function Layout({
  seo = { title: '', description: '', image: '', keywords: '' },
  children,
  theme = 'light',
  className,
}) {
  const [lenis, setLenis] = useStore((state) => [state.lenis, state.setLenis])
  const router = useRouter()
  const introOut = useStore(({ introOut }) => introOut)

  useEffect(() => {
    // Only reset scroll if there's no hash in the URL
    const hasHash = typeof window !== 'undefined' && window.location.hash
    if (!hasHash) {
      window.scrollTo(0, 0)
    }
    const lenis = new Lenis({
      // gestureOrientation: 'both',
      smoothWheel: true,
      // smoothTouch: true,
      syncTouch: true,
      debug: process.env.NODE_ENV === 'development',
    })
    window.lenis = lenis
    setLenis(lenis)

    // If there's a hash on mount, ensure lenis is started immediately
    // This prevents ScrollAlert from blocking scroll
    if (hasHash) {
      lenis.start()
    }

    // new ScrollSnap(lenis, { type: 'proximity' })

    return () => {
      lenis.destroy()
      setLenis(null)
    }
  }, [setLenis])

  // Monitor hash changes and ensure lenis is started when hash appears
  useEffect(() => {
    if (!lenis) return

    const handleHashChange = () => {
      if (typeof window !== 'undefined' && window.location.hash) {
        // Ensure lenis is started when hash appears
        lenis.start()
      }
    }

    // Check on mount
    handleHashChange()
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange)
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [lenis])

  const [hash, setHash] = useState()
  const [initialHashProcessed, setInitialHashProcessed] = useState(false)

  // Calculate offset to center the element
  // Using 40% to account for the element being positioned 30% above center
  const getScrollOffset = useCallback(() => {
    if (typeof window === 'undefined') return 0
    // Negative offset to move element up, centering it better
    return -(window.innerHeight * 0.4)
  }, [])

  useEffect(() => {
    if (lenis && hash) {
      // scroll to on hash change
      const target = document.querySelector(hash)
      if (target) {
        // CRITICAL: Ensure lenis is started BEFORE scrolling
        // This prevents ScrollAlert from blocking the scroll
        lenis.start()
        
        // Wait a bit for the page to fully render and lenis to be ready
        const offset = getScrollOffset()
        setTimeout(() => {
          // Use force: true to override any locks/stops from ScrollAlert
          lenis.scrollTo(target, { offset, force: true })
        }, 150)
      }
    }
  }, [lenis, hash, getScrollOffset])

  useEffect(() => {
    // update scroll position on page refresh based on hash
    if (router.asPath.includes('#')) {
      const hashValue = router.asPath.split('#').pop()
      const fullHash = `#${hashValue}`
      // Set hash state to trigger scroll (only if different to avoid loops)
      if (hash !== fullHash) {
        setHash(fullHash)
      }
    }
  }, [router, hash])

  useEffect(() => {
    // Handle initial page load with hash
    if (
      typeof window !== 'undefined' &&
      window.location.hash &&
      lenis &&
      !initialHashProcessed
    ) {
      const isMobile = window.innerWidth <= 800
      // On mobile, intro is skipped, so we can scroll immediately
      // On desktop, wait for intro to finish
      const shouldProcess = isMobile || introOut

      if (shouldProcess) {
        const hash = window.location.hash
        let attempts = 0
        const maxAttempts = 10

        const scrollToHash = () => {
          attempts++
          const target = document.querySelector(hash)
          if (target && lenis) {
            // CRITICAL: Ensure lenis is started BEFORE scrolling
            // This prevents ScrollAlert from blocking the scroll
            lenis.start()
            
            // Wait a tiny bit to ensure lenis is fully started
            setTimeout(() => {
              const offset = getScrollOffset()
              // Use force: true to override any locks/stops
              try {
                lenis.scrollTo(target, { offset, force: true, immediate: false })
                
                // Verify scroll happened by checking if we're close to target
                setTimeout(() => {
                  const targetRect = target.getBoundingClientRect()
                  const viewportCenter = window.innerHeight / 2
                  const distanceFromCenter = Math.abs(targetRect.top - viewportCenter)
                  
                  // If still not centered and we haven't exceeded max attempts, try again
                  if (distanceFromCenter > 100 && attempts < maxAttempts) {
                    scrollToHash()
                  } else {
                    setInitialHashProcessed(true)
                  }
                }, 400)
              } catch (error) {
                console.error('Error scrolling to hash:', error)
                if (attempts < maxAttempts) {
                  setTimeout(scrollToHash, 200)
                } else {
                  setInitialHashProcessed(true)
                }
              }
            }, 50) // Small delay to ensure lenis.start() took effect
          } else if (!target && attempts < maxAttempts) {
            // Target not found yet, retry
            setTimeout(scrollToHash, 200)
          } else {
            // Target not found after max attempts, mark as processed
            setInitialHashProcessed(true)
          }
        }

        // Start trying after initial delay
        // Reduced delay to scroll before ScrollAlert appears (ScrollAlert shows at 2000ms mobile / 500ms desktop)
        const initialDelay = isMobile ? 300 : 400
        setTimeout(scrollToHash, initialDelay)
      }
    }
  }, [lenis, introOut, initialHashProcessed, getScrollOffset])

  useEffect(() => {
    // catch anchor links clicks
    function onClick(e) {
      e.preventDefault()
      const node = e.currentTarget
      const hash = node.href.split('#').pop()
      setHash(`#${hash}`)
      setTimeout(() => {
        window.location.hash = hash
      }, 0)
    }

    const internalLinks = [...document.querySelectorAll('[href]')].filter(
      (node) => node.href.includes(`${router.pathname}#`)
    )

    for (const node of internalLinks) {
      node.addEventListener('click', onClick, false)
    }

    return () => {
      for (const node of internalLinks) {
        node.removeEventListener('click', onClick, false)
      }
    }
  }, [router.pathname])

  useFrame((time) => {
    lenis?.raf(time)
  }, 0)

  return (
    <>
      <CustomHead {...seo} />
      <div className={cn(`theme-${theme}`, s.layout, className)}>
        <PageTransition />
        <FallingPetals />
        <Intro />
        <Cursor />
        <Scrollbar />
        <main className={s.main}>{children}</main>
        <Footer />
      </div>
    </>
  )
}
