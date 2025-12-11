import cn from 'clsx'
import dynamic from 'next/dynamic'
import { Card } from 'components/card'
import { casamento } from 'content/casamento'
import s from './story-section.module.scss'

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

export const StorySection = ({ cardsRectRef }) => {
  return (
    <section className={s.rethink} id="story">
      <div className={cn('layout-grid', s.pre)}>
        <div className={s.highlight} data-lenis-scroll-snap-align="start">
          <Parallax speed={-0.5}>
            <p className="h2">
              <AppearTitle>{casamento.historia.titulo}</AppearTitle>
            </p>
          </Parallax>
        </div>
        <div id="bloco-citacao-biblica" className={s.comparison}>
          <Parallax speed={0.5}>
            <p className="p">{casamento.citacaoBiblica.textoCompleto}</p>
          </Parallax>
        </div>
      </div>
      <div className={s.cards} ref={cardsRectRef}>
        <HorizontalSlides>
          {casamento.historia.eventos.map((evento, index) => (
            <Card
              key={index}
              className={`${s.card}`}
              number={(index + 1).toString().padStart(2, '0')}
            >
              <p className="top-margin-small align-left">
                <strong>{evento.titulo}</strong>
                <br />
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
                    <br />
                    <br />
                  </>
                )}
              </p>
            </Card>
          ))}
        </HorizontalSlides>
      </div>
    </section>
  )
}

