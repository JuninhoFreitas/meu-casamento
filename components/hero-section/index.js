import cn from 'clsx'
import { Button } from 'components/button'
import { Title } from 'components/intro'
import { HeroTextIn } from 'components/hero-text-in'
import { casamento } from 'content/casamento'
import s from './hero-section.module.scss'

export const HeroSection = ({ introOut, hasScrolled, daysLeft }) => {
  const heroSubtitle = casamento.secoes.hero.subtitulo.replace(
    '{daysLeft}',
    daysLeft.toString()
  )

  return (
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
          href="/confirmar-presenca"
        >
          Confirmar Presença
        </Button>
        <Button
          className={cn(s.cta, s.presentes, introOut && s.in)}
          arrow
          href="https://collshp.com/joaoegabrielle?view=storefront"
        >
          Ver lista de presentes
        </Button>
        <Button
          className={cn(s.cta, s.info, introOut && s.in)}
          arrow
          href={`#${casamento.metadata.site.navegacao[0].id}`}
        >
          Ver Informações
        </Button>
      </div>
    </section>
  )
}

