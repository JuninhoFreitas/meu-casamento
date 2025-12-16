import { useMediaQuery } from '@darkroom.engineering/hamo'
import cn from 'clsx'
import { useStore } from 'lib/store'
import { useEffect, useRef, useState } from 'react'
import s from './intro.module.scss'

export const Intro = () => {
  const isMobile = useMediaQuery('(max-width: 800px)')
  const [isLoaded, setIsLoaded] = useState(false)
  const [scroll, setScroll] = useState(false)
  const introOut = useStore(({ introOut }) => introOut)
  const setIntroOut = useStore(({ setIntroOut }) => setIntroOut)
  const lenis = useStore(({ lenis }) => lenis)
  const hasCompletedRef = useRef(false)

  useEffect(() => {
    // Skip timeout logic on mobile (intro is already skipped)
    if (isMobile) {
      return
    }

    const timeoutId = setTimeout(() => {
      if (!hasCompletedRef.current) {
        setIsLoaded(true)
      }
    }, 1000)

    // Safety timeout: skip loading if it takes more than 5 seconds
    const maxTimeoutId = setTimeout(() => {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true
        setIsLoaded(true)
        // Force scroll to start immediately after a short delay
        setTimeout(() => {
          setScroll(true)
          setIntroOut(true)
        }, 100)
      }
    }, 5000)

    return () => {
      clearTimeout(timeoutId)
      clearTimeout(maxTimeoutId)
    }
  }, [isMobile, setIntroOut])

  useEffect(() => {
    if (isMobile) {
      lenis.start()
      document.documentElement.classList.toggle('intro', false)
      return
    }

    if (!scroll) {
      document.documentElement.classList.toggle('intro', true)
    }

    if (!lenis) return
    if (scroll) {
      lenis.start()
      document.documentElement.classList.toggle('intro', false)
    } else {
      setTimeout(() => {
        lenis.stop()
      }, 0)

      document.documentElement.classList.toggle('intro', true)
    }
  }, [scroll, lenis, isMobile])

  return (
    <div
      className={cn(s.wrapper, isLoaded && s.out)}
      onTransitionEnd={(e) => {
        for (const value of e.target.classList) {
          if (value.includes('out')) {
            hasCompletedRef.current = true
            setScroll(true)
          }
          if (value.includes('show')) {
            setIntroOut(true)
          }
        }
      }}
    >
      <div className={cn(isLoaded && s.relative)}>
        <LNS isLoaded={isLoaded} fill={'var(--black)'} />
        <EI
          isLoaded={isLoaded}
          fill={'var(--black)'}
          className={cn(introOut && s.translate)}
        />
      </div>
    </div>
  )
}

export const Title = ({ className }) => {
  const introOut = useStore(({ introOut }) => introOut)

  return (
    <div className={className}>
      <LNS fill={'var(--pink)'} />
      <EI
        fill={'var(--pink)'}
        className={cn(introOut && s.translate, s.mobile)}
      />
    </div>
  )
}

const LNS = ({ isLoaded, className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1360 336"
      className={cn(s.lns, className)}
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <style>
          {`@import url(https://fonts.googleapis.com/css2?family=Beau+Rivage%3Aital%2Cwght%400%2C400&display=swap);`}
        </style>
      </defs>
      <g fill={fill}>
        <text
          className={cn(s.start, isLoaded && s.show)}
          style={{
            '--index': 1,
            fill: fill,
            fontFamily: '"Beau Rivage"',
            fontSize: '153.3px',
            fontWeight: 700,
            textAnchor: 'middle',
            textTransform: 'uppercase',
            whiteSpace: 'pre',
          }}
          transform="translate(1160, 200) matrix(1, 0, 0, 1, 0, 2.842170943040401e-14)"
        >
          <tspan
            style={{ fontSize: '153.3px' }}
            x="0"
            y="0"
            dx="0"
            dy="0"
          >
            {'G'}
          </tspan>
        </text>
      </g>
    </svg>
  )
}

const EI = ({ isLoaded, className, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1360 336"
      className={cn(s.ei, className)}
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <style>
          {`@import url(https://fonts.googleapis.com/css2?family=Beau+Rivage%3Aital%2Cwght%400%2C400&display=swap);`}
        </style>
      </defs>
      <g fill={fill}>
        <g
          className={cn(s.start, isLoaded && s.show)}
          style={{ '--index': 3 }}
        >
          <text
            style={{
              fill: fill,
              fontFamily: '"Beau Rivage"',
              fontSize: '153.3px',
              fontWeight: 700,
              textAnchor: 'middle',
              textTransform: 'uppercase',
              whiteSpace: 'pre',
            }}
            transform="translate(200, 200) matrix(1, 0, 0, 1, 0, 2.842170943040401e-14)"
          >
            <tspan
              style={{ fontSize: '153.3px' }}
              x="0"
              y="0"
              dx="0"
              dy="0"
            >
              {'J'}
            </tspan>
          </text>
        </g>
        <g
          className={cn(s.start, isLoaded && s.show)}
          style={{ '--index': 2 }}
        >
          <text
            style={{
              fill: fill,
              fontFamily: '"Beau Rivage"',
              fontSize: '105.3px',
              fontWeight: 700,
              textAnchor: 'middle',
              textTransform: 'capitalize',
              whiteSpace: 'pre',
            }}
            transform="translate(680, 200) matrix(1, 0, 0, 1, 0, 2.842170943040401e-14)"
          >
            <tspan
              style={{ fontSize: '105.3px', textTransform: 'capitalize' }}
              x="0"
              y="0"
              dx="0"
              dy="0"
            >
              {'&'}
            </tspan>
          </text>
        </g>
      </g>
    </svg>
  )
}
