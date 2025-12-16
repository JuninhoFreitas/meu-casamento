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
          <div className={s.feature} id="bloco-informacoes-do-casamento">
            <p className="p">{casamento.secoes.infos.subtitulo}</p>
          </div>
          <div id="local" className={s.feature}>
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
          <div className={s.feature} id="bloco-hospedagem">
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
          <div className={s.feature} id="presentes">
            <h3 className={cn(s.title, 'h4')}>Presentes</h3>
            <div className={s.presentesContent}>
              {/* <p className={s.intro}>
                Em breve, enviaremos a lista de presentes e endereços de envio (para aqueles que vêm de longe).
                <br />
                <br />
                Neste momento, o melhor presente que alguém pode nos dar é contribuir via uma das formas abaixo:
              </p> */}

              <div className={s.paymentCategory}>
                <h4 className={s.categoryTitle} style={{ color: '#EE4D2D' }}>
                  <img 
                    src="https://banner2.cleanpng.com/lnd/20241224/hk/bc44a842907fc89fd1b5c33e4b2952.webp" 
                    alt="Shopee" 
                    className={s.shopeeIcon}
                  /> Lista de Presentes - Shopee
                </h4>
                <div className={s.paymentItem}>
                  <span className={s.paymentLabel}>Lista de Presentes:</span>
                  <a
                    href="https://collshp.com/joaoegabrielle?view=storefront"
                    target="_blank"
                    rel="noreferrer"
                    className={s.paymentLink}
                    style={{ color: '#EE4D2D', textDecoration: 'underline' }}
                  >
                    Ver lista na Shopee
                  </a>
                </div>
                <p className={s.shopeeInfo}>
                  Você pode comprar por lá e trazer no dia do casamento ou enviar para o endereço de um padrinho. 
                  Para isso, entre em contato no WhatsApp e envie a palavra-chave: <strong>"ENTREGA"</strong>
                </p>
                <div className={s.paymentItem}>
                  <span className={s.paymentLabel}>Contato WhatsApp:</span>
                  <a
                    href="https://wa.me/5551999354299?text=ENTREGA"
                    target="_blank"
                    rel="noreferrer"
                    className={s.paymentLink}
                  >
                    Entrar em contato
                  </a>
                </div>
              </div>

              <div className={s.paymentCategory}>
                <h4 className={s.categoryTitle}>
                  <span className={s.emoji}>💳</span> Pagamentos Digitais
                </h4>
                <div className={s.paymentItem}>
                  <span className={s.paymentLabel}>PIX:</span>
                  <span className={s.paymentValue}>brizollajr@gmail.com</span>
                </div>
                <div className={s.paymentItem}>
                  <span className={s.paymentLabel}>Cartão de Crédito:</span>
                  <a
                    href="https://link.mercadopago.com.br/casamentodojj"
                    target="_blank"
                    rel="noreferrer"
                    className={s.paymentLink}
                  >
                    Link para pagamento
                  </a>
                </div>
                <div className={s.paymentItem}>
                  <span className={s.paymentLabel}>Cartão de Débito:</span>
                  <a
                    href="https://link.mercadopago.com.br/casamentodojj"
                    target="_blank"
                    rel="noreferrer"
                    className={s.paymentLink}
                  >
                    Link para pagamento
                  </a>
                </div>
                <div className={s.paymentItem}>
                  <span className={s.paymentLabel}>Transferência Bancária:</span>
                  <a
                    href="https://link.mercadopago.com.br/casamentodojj"
                    target="_blank"
                    rel="noreferrer"
                    className={s.paymentLink}
                  >
                    Link para pagamento
                  </a>
                </div>
              </div>

              <div className={s.paymentCategory}>
                <h4 className={s.categoryTitle}>
                  <span className={s.emoji}>₿</span> Criptomoedas
                </h4>
                <div className={s.paymentItem}>
                  <span className={s.paymentLabel}>Binance Smart Chain:</span>
                  <span className={s.paymentValue}>0xf67cfcf7d6ed3bc9c5af539ec73205e57b5f252a</span>
                </div>
                <div className={s.paymentItem}>
                  <span className={s.paymentLabel}>Bitcoin:</span>
                  <span className={s.paymentValue}>bc1qft2wngzsfpkwgvpfwl42zzpvmqjjeq97m2r05x</span>
                </div>
              </div>

              <div className={s.paymentCategory}>
                <h4 className={s.categoryTitle}>
                  <span className={s.emoji}>📄</span> Outras Formas
                </h4>
                <div className={s.paymentItem}>
                  <span className={s.paymentLabel}>Boleto Bancário:</span>
                  <a
                    href="https://wa.me/5551999354299?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.paymentLink}
                  >
                    Solicitar via WhatsApp
                  </a>
                </div>
              </div>

              <div className={s.helpMessage}>
                <span className={s.emoji}>💬</span>
                <p>
                  <strong>Não achou a forma de pagamento que você prefere?</strong>
                  <br />
                  Entre em contato conosco que iremos providenciar imediatamente!
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

