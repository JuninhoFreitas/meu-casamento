import { casamento } from 'content/casamento'
import cn from 'clsx'
import { Link } from 'components/link'
import s from './footer.module.scss'

export const Footer = () => {
  return (
    <footer className={cn('theme-light', s.footer)}>
      <div className={cn(s.top, 'layout-grid hide-on-mobile')}>
        <p className={cn(s['first-line'], 'h1')}>
          {casamento.noivos.nomeCompleto}
          <br />
          <span className="contrast">Casamento</span>
        </p>
        <p className={cn(s['last-line'], 'h3')}>
          {casamento.data.data} <br />
          <span className="hide-on-desktop">&nbsp;</span>
          {casamento.local.cerimonia.cidade} - {casamento.local.cerimonia.estado}
        </p>
      </div>
      <div className={cn(s.top, 'layout-block hide-on-desktop')}>
        <p className={cn(s['first-line'], 'h1')}>
          {casamento.noivos.nomeCompleto}
          <br />
          <span className="contrast">Casamento</span>
          <br /> {casamento.data.data}
          <br /> {casamento.local.cerimonia.cidade} - {casamento.local.cerimonia.estado}
        </p>
      </div>
      <div className={s.bottom}>
        <div className={s.links}>
          {casamento.metadata.site.navegacao.map((item) => (
            <Link
              key={item.id}
              className={cn(s.link, 'p-xs')}
              href={`#${item.id}`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className={cn(s.link, 'p-xs')}
            href={`mailto:${casamento.contato.email}`}
          >
            Contato
          </Link>
        </div>
        <p className={cn('p-xs', s.tm)}>
          <span>©</span> {casamento.metadata.site.copyright}
        </p>
      </div>
    </footer>
  )
}
