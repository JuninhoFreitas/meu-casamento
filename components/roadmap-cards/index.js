import { useRect } from '@darkroom.engineering/hamo'
import cn from 'clsx'

import { Card } from 'components/card'
import { useScroll } from 'hooks/use-scroll'
import { clamp, mapRange } from 'lib/maths'
import dynamic from 'next/dynamic'
import { useRef, useState } from 'react'
import { useWindowSize } from 'react-use'

const AppearTitle = dynamic(
  () => import('components/appear-title').then((mod) => mod.AppearTitle),
  { ssr: false }
)

import s from './roadmap-cards.module.scss'

export const RoadmapCards = ({ etapas, titulo, subtitulo }) => {
  const element = useRef()
  const [setRef, rect] = useRect()
  const { height: windowHeight } = useWindowSize()

  const [current, setCurrent] = useState()

  useScroll(
    ({ scroll }) => {
      const start = rect.top - windowHeight * 2
      const end = rect.top + rect.height - windowHeight

      const progress = clamp(0, mapRange(start, end, scroll, 0, 1), 1)

      element.current.style.setProperty(
        '--progress',
        clamp(0, mapRange(rect.top, end, scroll, 0, 1), 1)
      )
      const step = Math.floor(progress * etapas.length)
      setCurrent(step)
    },
    [rect, etapas.length]
  )

  return (
    <div
      ref={(node) => {
        setRef(node)
      }}
      className={s.roadmap}
    >
      <div className={cn('layout-block-inner', s.sticky)}>
        <aside className={s.title}>
          <p className="h3">
            <AppearTitle>
              {titulo || 'Cronograma da'}
              <br />
              <span className="grey">{subtitulo || 'Nossa Celebração'}</span>
            </AppearTitle>
          </p>
        </aside>
        <div ref={element}>
          {etapas.map((etapa, index) => (
            <SingleCard
              key={index}
              index={index}
              number={etapa.numero}
              title={etapa.titulo}
              description={etapa.descricao}
              current={index <= current - 1}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

const SingleCard = ({ number, title, description, index, current }) => {
  return (
    <div className={cn(s.card, current && s.current)} style={{ '--i': index }}>
      <Card
        background="rgba(255, 255, 255, 1)"
        number={number}
      >
        <p>
          <strong>{title}</strong>
          <br />
          <br />
          {description}
        </p>
      </Card>
    </div>
  )
}

