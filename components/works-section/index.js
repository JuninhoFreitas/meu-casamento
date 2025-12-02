import cn from 'clsx'
import dynamic from 'next/dynamic'
import { casamento } from 'content/casamento'
import s from './works-section.module.scss'

const AppearTitle = dynamic(
  () => import('components/appear-title').then((mod) => mod.AppearTitle),
  { ssr: false }
)

export const WorksSection = ({ whyRectRef }) => {
  return (
    <section className={s.why} id="works" data-lenis-scroll-snap-align="start">
      <div className="layout-grid">
        <h2 className={cn(s.sticky, 'h2' )}>
          <AppearTitle>{casamento.secoes.infos.titulo}</AppearTitle>
        </h2>
        <aside className={s.features} ref={whyRectRef}>
          <div className={s.feature}>
            <p className="p">{casamento.secoes.infos.subtitulo}</p>
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
  )
}

