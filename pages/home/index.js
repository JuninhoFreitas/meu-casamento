import { useRect } from '@darkroom.engineering/hamo'
import cn from 'clsx'

import { Button } from 'components/button'
import { Card } from 'components/card'
import { Title } from 'components/intro'
import { Link } from 'components/link'
import { casamento } from 'content/casamento'
import { useScroll } from 'hooks/use-scroll'
import { Layout } from 'layouts/default'
import { button, useControls } from 'leva'
import { clamp, mapRange } from 'lib/maths'
import { useStore } from 'lib/store'
import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { useIntersection, useWindowSize } from 'react-use'
import s from './home.module.scss'
import { Modal } from 'components/modal'

const Parallax = dynamic(
  () => import('components/parallax').then((mod) => mod.Parallax),
  { ssr: false }
)

const AppearTitle = dynamic(
  () => import('components/appear-title').then((mod) => mod.AppearTitle),
  { ssr: false }
)

const HorizontalSlides = dynamic(
  () =>
    import('components/horizontal-slides').then((mod) => mod.HorizontalSlides),
  { ssr: false }
)

const RoadmapCards = dynamic(
  () =>
    import('components/roadmap-cards').then((mod) => mod.RoadmapCards),
  { ssr: false }
)

const WebGL = dynamic(
  () => import('components/webgl').then(({ WebGL }) => WebGL),
  { ssr: false }
)

const HeroTextIn = ({ children, introOut }) => {
  return (
    <div className={cn(s['hide-text'], introOut && s['show-text'])}>
      {children}
    </div>
  )
}

const calculateDaysLeft = (dateISO) => {
  const weddingDate = new Date(dateISO)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  weddingDate.setHours(0, 0, 0, 0)
  const diffTime = weddingDate - today
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays > 0 ? diffDays : 0
}

if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
}

export default function Home() {
  const [hasScrolled, setHasScrolled] = useState()
  const zoomRef = useRef(null)
  const [zoomWrapperRectRef, zoomWrapperRect] = useRect()
  const { height: windowHeight } = useWindowSize()
  const introOut = useStore(({ introOut }) => introOut)

  const [theme, setTheme] = useState('dark')
  const lenis = useStore(({ lenis }) => lenis)
  const [daysLeft, setDaysLeft] = useState(
    calculateDaysLeft(casamento.data.dataISO)
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setDaysLeft(calculateDaysLeft(casamento.data.dataISO))
    }, 1000 * 60 * 60) // Update every hour

    return () => clearInterval(interval)
  }, [])

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
    if (!zoomWrapperRect.top) return

    const start = zoomWrapperRect.top + windowHeight * 0.5
    const end = zoomWrapperRect.top + zoomWrapperRect.height - windowHeight

    const progress = clamp(0, mapRange(start, end, scroll, 0, 1), 1)
    const center = 0.6
    const progress1 = clamp(0, mapRange(0, center, progress, 0, 1), 1)
    const progress2 = clamp(0, mapRange(center - 0.055, 1, progress, 0, 1), 1)
    setTheme(progress2 === 1 ? 'light' : 'dark')

    zoomRef.current.style.setProperty('--progress1', progress1)
    zoomRef.current.style.setProperty('--progress2', progress2)

    if (progress === 1) {
      zoomRef.current.style.setProperty('background-color', 'currentColor')
    } else {
      zoomRef.current.style.removeProperty('background-color')
    }
  })

  const [whyRectRef, whyRect] = useRect()
  const [cardsRectRef, cardsRect] = useRect()
  const [whiteRectRef, whiteRect] = useRect()
  const [inuseRectRef, inuseRect] = useRect()

  const addThreshold = useStore(({ addThreshold }) => addThreshold)

  useEffect(() => {
    addThreshold({ id: 'top', value: 0 })
  }, [])

  useEffect(() => {
    const top = whyRect.top - windowHeight / 2
    addThreshold({ id: 'why-start', value: top })
    addThreshold({
      id: 'why-end',
      value: top + whyRect.height,
    })
  }, [whyRect])

  useEffect(() => {
    const top = cardsRect.top - windowHeight / 2
    addThreshold({ id: 'cards-start', value: top })
    addThreshold({ id: 'cards-end', value: top + cardsRect.height })
    addThreshold({
      id: 'red-end',
      value: top + cardsRect.height + windowHeight,
    })
  }, [cardsRect])

  useEffect(() => {
    const top = whiteRect.top - windowHeight
    addThreshold({ id: 'light-start', value: top })
  }, [whiteRect])


  useEffect(() => {
    const top = inuseRect.top
    addThreshold({ id: 'in-use', value: top })
  }, [inuseRect])

  useEffect(() => {
    const top = lenis?.limit
    addThreshold({ id: 'end', value: top })
  }, [lenis?.limit])

  useScroll((e) => {
    console.log(window.scrollY, e.scroll, e.isScrolling, e.velocity, e.isLocked)
  })


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

  const heroSubtitle = casamento.secoes.hero.subtitulo.replace(
    '{daysLeft}',
    daysLeft.toString()
  )

  return (
    <Layout
      theme={theme}
      seo={{
        title: `${casamento.noivos.nomeCompleto} - Casamento ${casamento.data.data}`,
        description: `Casamento de ${casamento.noivos.nomeCompleto} em ${casamento.data.data}. ${casamento.local.cerimonia.enderecoCompleto}`,
      }}
      className={s.home}
    >
      <div className={s.canvas}>
        <WebGL />
      </div>

      <Modal />

      <section className={s.hero} id="hero">
        <div className="layout-grid-inner">
          <Title className={s.title} />
          <span className={cn(s.sub)}>
            <HeroTextIn introOut={introOut}>
              <h2 className={cn('h3', s.subtitle)}>{casamento.noivos.nomeCompleto}</h2>
            </HeroTextIn>
            <HeroTextIn introOut={introOut}>
              <h2 className={cn('p-xs', s.tm)}>
                <span>©</span> {casamento.metadata.site.copyright.split('©')[1].trim()}
              </h2>
            </HeroTextIn>
          </span>
        </div>

        <div className={cn(s.bottom, 'layout-grid')}>
          <div
            className={cn(
              'hide-on-mobile',
              s['scroll-hint'],
              hasScrolled && s.hide,
              introOut && s.show
            )}
          >
            <div className={s.text}>
              <HeroTextIn introOut={introOut}>
                <p>role</p>
              </HeroTextIn>
              <HeroTextIn introOut={introOut}>
                <p> para explorar</p>
              </HeroTextIn>
            </div>
          </div>
          <h1 className={cn(s.description, 'p-s')}>
            <HeroTextIn introOut={introOut}>
              <p className="p-s">{heroSubtitle}</p>
            </HeroTextIn>
            <HeroTextIn introOut={introOut}>
              <p className="p-s">{casamento.local.cerimonia.enderecoCompleto}</p>
            </HeroTextIn>
            <HeroTextIn introOut={introOut}>
              <p className="p-s">Cerimônia às {casamento.data.horario.cerimonia}</p>
            </HeroTextIn>
          </h1>
          <Button
            className={cn(s.cta, s.documentation, introOut && s.in)}
            arrow
            href={`mailto:${casamento.contato.email}?subject=${encodeURIComponent(casamento.contato.opcoes[0].assunto)}`}
          >
            Confirmar Presença
          </Button>
          <Button
            className={cn(s.cta, s.sponsor, introOut && s.in)}
            arrow
            href={`#${casamento.metadata.site.navegacao[0].id}`}
          >
            Ver Informações
          </Button>
        </div>
      </section>

      <section className={s.why} id="works" data-lenis-scroll-snap-align="start">
        <div className="layout-grid">
          <h2 className={cn(s.sticky, 'h2')}>
            <AppearTitle>{casamento.secoes.works.titulo}</AppearTitle>
          </h2>
          <aside className={s.features} ref={whyRectRef}>
            <div className={s.feature}>
              <p className="p">{casamento.secoes.works.subtitulo}</p>
            </div>
            <div className={s.feature}>
              <h3 className={cn(s.title, 'h4')}>Local da Cerimônia</h3>
              <p className="p">
                <strong>{casamento.local.cerimonia.nome}</strong>
                <br />
                {casamento.local.cerimonia.enderecoCompleto}
                <br />
                <br />
                Horário: {casamento.data.horario.cerimonia}
              </p>
            </div>
            <div className={s.feature}>
              <h3 className={cn(s.title, 'h4')}>Hospedagem</h3>
              <p className="p">
                {casamento.hospedagem.descricao}
                <br />
                <br />
                {casamento.hospedagem.tags.map((tag, i) => (
                  <span key={i}>
                    {tag}
                    {i < casamento.hospedagem.tags.length - 1 && ' • '}
                  </span>
                ))}
              </p>
            </div>
            <div className={s.feature}>
              <h3 className={cn(s.title, 'h4')}>Presentes</h3>
              <p className="p">
                {casamento.presentes.descricao}
                <br />
                <br />
                <strong>{casamento.presentes.tipoPreferido}</strong>
                <br />
                {casamento.presentes.observacao}
              </p>
            </div>
          </aside>
        </div>
      </section>
      <section className={s.rethink} id="story">
        <div className={cn('layout-grid', s.pre)}>
          <div className={s.highlight} data-lenis-scroll-snap-align="start">
            <Parallax speed={-0.5}>
              <p className="h2">
                <AppearTitle>{casamento.historia.titulo}</AppearTitle>
              </p>
            </Parallax>
          </div>
          <div className={s.comparison}>
            <Parallax speed={0.5}>
              <p className="p">
                {casamento.citacaoBiblica.textoCompleto}
              </p>
            </Parallax>
          </div>
        </div>
        <div className={s.cards} ref={cardsRectRef}>
          <HorizontalSlides>
            {casamento.historia.eventos.map((evento, index) => (
              <Card
                key={index}
                className={s.card}
                number={(index + 1).toString().padStart(2, '0')}
              >
                <p>
                  <strong>{evento.titulo}</strong>
                  <br />
                  <small>{evento.data}</small>
                  <br />
                  <br />
                  {evento.local && (
                    <>
                      {evento.local}
                      <br />
                      <br />
                    </>
                  )}
                  {evento.noivo.depoimento && (
                    <>
                      <strong>João:</strong> {evento.noivo.depoimento}
                      <br />
                      <br />
                    </>
                  )}
                  {evento.noiva.depoimento && (
                    <>
                      <strong>Gabrielle:</strong> {evento.noiva.depoimento}
                    </>
                  )}
                </p>
              </Card>
            ))}
            
          </HorizontalSlides>
        </div>
      </section>
      <section
        ref={(node) => {
          zoomWrapperRectRef(node)
          zoomRef.current = node
        }}
        className={s.solution}
      >
        <div className={s.inner}>
          <div className={s.zoom}>
            <h2 className={cn(s.first, 'h1 vh')}>
              {casamento.roadmap.titulo}
              <br />
              <span className="contrast">{casamento.roadmap.subtitulo}</span>
            </h2>
            <h2 className={cn(s.enter, 'h3 vh')}>
              {casamento.noivos.iniciais}
            </h2>
            <h2 className={cn(s.second, 'h1 vh')}>
              {casamento.data.data}
            </h2>
          </div>
        </div>
      </section>
      <section className={cn('theme-light', s.featuring)} ref={whiteRectRef} id="process">
        <RoadmapCards
          etapas={casamento.roadmap.etapas}
          titulo={casamento.roadmap.titulo}
          subtitulo={casamento.roadmap.subtitulo}
        />
      </section>
      <section
        ref={(node) => {
          inuseRectRef(node)
          inUseRef.current = node
        }}
        className={cn('theme-light', s['in-use'], visible && s.visible)}
        id="connect"
      >
        <div className="layout-grid">
          <aside className={s.title}>
            <p className="h3">
              <AppearTitle>
                <span>{casamento.secoes.connect.titulo}</span>

                <br />
                <span className="grey">{casamento.secoes.connect.subtitulo}</span>
              </AppearTitle>
            </p>
          </aside>
          <div className={s.list}>
            {casamento.contato.opcoes.map((opcao, i) => (
              <div key={i} style={{ marginBottom: '2rem' }}>
                <h4 className="h4">{opcao.tipo}</h4>
                <p className="p">
                  <Link
                    href={`mailto:${opcao.email}?subject=${encodeURIComponent(opcao.assunto)}`}
                    className="contrast semi-bold"
                  >
                    {opcao.email}
                  </Link>
                </p>
              </div>
            ))}
            {casamento.informacoesAdicionais.observacoes.map((obs, i) => (
              <p key={i} className="p" style={{ marginTop: '1rem' }}>
                {obs}
              </p>
            ))}
          </div>
        </div>
      </section>
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

