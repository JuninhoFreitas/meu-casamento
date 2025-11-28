import cn from 'clsx'
import { casamento } from 'content/casamento'
import s from './solution-section.module.scss'

export const SolutionSection = ({ zoomRef, zoomWrapperRectRef }) => {
  return (
    <section
      ref={(node) => {
        zoomWrapperRectRef(node)
        zoomRef.current = node
      }}
      className={s.solution}
    >
      <div className={s.inner} style={{ marginBottom: '100px', alignContent: 'center'}} >
        <div className={s.zoom}>
          <h2 className={cn(s.first, 'h1 vh')} style={{ lineHeight: '1.1'}}>
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
  )
}

