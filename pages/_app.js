import Tempus from '@darkroom.engineering/tempus'
import { RealViewport } from 'components/real-viewport'
import { ImagePreloader } from 'components/image-preloader'
import { useScroll } from 'hooks/use-scroll'
import { GTM_ID } from 'lib/analytics'
import { useStore } from 'lib/store'
import dynamic from 'next/dynamic'
import Script from 'next/script'
import { useEffect, useState } from 'react'
import 'styles/global.scss'

// Lazy load GSAP apenas quando necessário
let gsapInitialized = false
let ScrollTriggerInstance = null

const initializeGSAP = async () => {
  if (typeof window === 'undefined' || gsapInitialized) {
    return ScrollTriggerInstance
  }
  
  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/dist/ScrollTrigger')
  
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.defaults({ markers: process.env.NODE_ENV === 'development' })

  // merge rafs
  gsap.ticker.lagSmoothing(0)
  gsap.ticker.remove(gsap.updateRoot)
  Tempus.add((time) => {
    gsap.updateRoot(time / 1000)
  }, 0)
  
  ScrollTriggerInstance = ScrollTrigger
  gsapInitialized = true
  return ScrollTrigger
}

// Inicializa GSAP de forma assíncrona no mount
if (typeof window !== 'undefined') {
  initializeGSAP()
}

const Stats = dynamic(
  () => import('components/stats').then(({ Stats }) => Stats),
  { ssr: false }
)

const GridDebugger = dynamic(
  () =>
    import('components/grid-debugger').then(({ GridDebugger }) => GridDebugger),
  { ssr: false }
)

const Leva = dynamic(() => import('leva').then(({ Leva }) => Leva), {
  ssr: false,
})

function MyApp({ Component, pageProps }) {
  const debug = false;
  const lenis = useStore(({ lenis }) => lenis)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [skipPreloader, setSkipPreloader] = useState(false)

  // Configura ScrollTrigger update após GSAP estar carregado
  useScroll(async () => {
    const ScrollTrigger = await initializeGSAP()
    if (ScrollTrigger) {
      ScrollTrigger.update()
    }
  })

  useEffect(() => {
    initializeGSAP().then((ScrollTrigger) => {
      if (ScrollTrigger && lenis) {
        ScrollTrigger.refresh()
        lenis?.start()
      }
    })
  }, [lenis])

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const isMobileViewport =
      window.matchMedia?.('(max-width: 800px)')?.matches ?? false
    const isMobileUA =
      typeof navigator !== 'undefined' &&
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

    // No mobile, pula o preloader para evitar travar na primeira carga
    if (isMobileViewport || isMobileUA) {
      setSkipPreloader(true)
      setImagesLoaded(true)
    }
  }, [])

  return (
    <>
      {!imagesLoaded && !skipPreloader && (
        <ImagePreloader onComplete={() => setImagesLoaded(true)} />
      )}
      
      {imagesLoaded && (
        <>
          <Leva hidden={!debug} />
          {debug && (
            <>
              <GridDebugger />
              <Stats />
            </>
          )}

          {/* Google Tag Manager - Global base code */}
          {process.env.NODE_ENV !== 'development' && (
            <>
              <Script
                async
                strategy="worker"
                src={`https://www.googletagmanager.com/gtag/js?id=${GTM_ID}`}
              />
              <Script
                id="gtm-base"
                strategy="worker"
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GTM_ID}');`,
                }}
              />
            </>
          )}

          <RealViewport />
          <Component {...pageProps} />
        </>
      )}
    </>
  )
}

export default MyApp
