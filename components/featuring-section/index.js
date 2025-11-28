import cn from 'clsx'
import dynamic from 'next/dynamic'
import { casamento } from 'content/casamento'
import s from './featuring-section.module.scss'

const RoadmapCards = dynamic(
  () =>
    import('components/roadmap-cards').then((mod) => mod.RoadmapCards),
  { ssr: false }
)

export const FeaturingSection = ({ whiteRectRef }) => {
  return (
    <section className={cn('theme-light', s.featuring)} ref={whiteRectRef} id="process">
      <RoadmapCards
        etapas={casamento.roadmap.etapas}
        titulo={casamento.roadmap.titulo}
        subtitulo={casamento.roadmap.subtitulo}
      />
    </section>
  )
}

