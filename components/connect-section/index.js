import cn from 'clsx'
import dynamic from 'next/dynamic'
import { Link } from 'components/link'
import { casamento } from 'content/casamento'
import s from './connect-section.module.scss'

const AppearTitle = dynamic(
  () => import('components/appear-title').then((mod) => mod.AppearTitle),
  { ssr: false }
)

export const ConnectSection = ({ inuseRectRef, inUseRef, visible }) => {
  return (
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
              <span>{casamento.secoes.connectSectionInfo.titulo}</span>
              <br />
              <span className="grey">{casamento.secoes.connectSectionInfo.subtitulo}</span>
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
  )
}

