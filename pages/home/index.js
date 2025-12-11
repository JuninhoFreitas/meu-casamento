import { useRect } from '@darkroom.engineering/hamo'
import { casamento } from 'content/casamento'
import { useScroll } from 'hooks/use-scroll'
import { useDaysLeft } from 'hooks/use-days-left'
import { useScrollThresholds } from 'hooks/use-scroll-thresholds'
import { useThemeScroll } from 'hooks/use-theme-scroll'
import { Layout } from 'layouts/default'
import { button, useControls } from 'leva'
import { useStore } from 'lib/store'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useIntersection } from 'react-use'
import s from './home.module.scss'
import { Modal } from 'components/modal'
import { ScrollAlert } from 'components/scroll-alert'
import { HeroSection } from 'components/hero-section'
import { WorksSection } from 'components/works-section'
import { StorySection } from 'components/story-section'
import { SolutionSection } from 'components/solution-section'
import { FeaturingSection } from 'components/featuring-section'
import { GalleryCarousel } from 'components/gallery-carousel'

const FloatingImages = dynamic(
  () => import('components/floating-images').then((mod) => mod.FloatingImages),
  { ssr: false }
)

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
}

export default function Home() {
  const [hasScrolled, setHasScrolled] = useState()
  const introOut = useStore(({ introOut }) => introOut)
  const [theme, setTheme] = useState('dark')
  const lenis = useStore(({ lenis }) => lenis)
  const daysLeft = useDaysLeft(casamento.data.dataISO)

  const { zoomRef, zoomWrapperRectRef } = useThemeScroll(setTheme)

  useControls(
    'lenis',
    () => ({
      stop: button(() => {
        lenis.stop()
      }),
      start: button(() => {
        lenis.start()
      }),
    }),
    [lenis]
  )

  useControls(
    'scrollTo',
    () => ({
      immediate: button(() => {
        lenis.scrollTo(30000, { immediate: true })
      }),
      smoothDuration: button(() => {
        lenis.scrollTo(30000, { lock: true, duration: 10 })
      }),
      smooth: button(() => {
        lenis.scrollTo(30000)
      }),
      forceScrollTo: button(() => {
        lenis.scrollTo(30000, { force: true })
      }),
    }),
    [lenis]
  )

  useEffect(() => {
    if (!lenis) return

    function onClassNameChange(lenis) {
      console.log(lenis.className)
    }

    lenis.on('className change', onClassNameChange)

    return () => {
      lenis.off('className change', onClassNameChange)
    }
  }, [lenis])

  useScroll(({ scroll }) => {
    setHasScrolled(scroll > 10)
  })

  const [whyRectRef, whyRect] = useRect()
  const [cardsRectRef, cardsRect] = useRect()
  const [whiteRectRef, whiteRect] = useRect()
  const [inuseRectRef, inuseRect] = useRect()

  useScrollThresholds({
    whyRect,
    cardsRect,
    whiteRect,
    inuseRect,
    lenisLimit: lenis?.limit,
  })

  // Removido console.log para melhorar performance
  // useScroll((e) => {
  //   console.log(window.scrollY, e.scroll, e.isScrolling, e.velocity, e.isLocked)
  // })


  const inUseRef = useRef()

  const [visible, setIsVisible] = useState(false)
  const intersection = useIntersection(inUseRef, {
    threshold: 0.2,
  })
  
  useEffect(() => {
    if (intersection?.isIntersecting) {
      setIsVisible(true)
    }
  }, [intersection])

  return (
    <Layout
      theme={theme}
      seo={{
        title: `${casamento.noivos.nomeCompleto} - Casamento ${casamento.data.data}`,
        description: `Casamento de ${casamento.noivos.nomeCompleto} em ${casamento.data.data}. ${casamento.local.cerimonia.enderecoCompleto}`,
      }}
      className={s.home}
    >
      <FloatingImages roadmapRef={zoomRef} />
      <Modal />
      <ScrollAlert />

      <HeroSection
        introOut={introOut}
        hasScrolled={hasScrolled}
        daysLeft={daysLeft}
      />

      <WorksSection whyRectRef={whyRectRef} />

      <StorySection cardsRectRef={cardsRectRef} />

      <SolutionSection
        zoomRef={zoomRef}
        zoomWrapperRectRef={zoomWrapperRectRef}
      />

      <FeaturingSection whiteRectRef={whiteRectRef} />

      <GalleryCarousel />

      {/* <ConnectSection
        inuseRectRef={inuseRectRef}
        inUseRef={inUseRef}
        visible={visible}
      /> */}
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      id: 'home',
    }, // will be passed to the page component as props
  }
}

