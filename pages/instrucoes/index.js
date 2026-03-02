import { Layout } from 'layouts/default'
import { casamento } from 'content/casamento'
import s from './instrucoes.module.scss'

const BASE_URL = 'https://storage.googleapis.com/casamentodojuninho/casamento/'
const PDF_URL = 'https://storage.googleapis.com/casamentodojuninho/Guia%20casamento.pdf'

const images = Array.from({ length: 10 }, (_, i) => `${BASE_URL}${i + 1}.png`)

function GuideImage({ src }) {
  return (
    <img
      src={src}
      className={s.image}
      onError={(e) => {
        e.currentTarget.style.display = 'none'
      }}
      alt=""
    />
  )
}

export default function Instrucoes() {
  return (
    <Layout
      theme="light"
      seo={{
        title: `Guia do Convidado - ${casamento.noivos.nomeCompleto}`,
        description: `Todas as informações para o casamento de ${casamento.noivos.nomeCompleto}`,
      }}
      className={s.page}
    >
      <section className={s.section}>
        <div className={s.images}>
          {images.map((src) => (
            <GuideImage key={src} src={src} />
          ))}
        </div>

        <div className={s.pdfLink}>
          <a href={PDF_URL} target="_blank" rel="noopener noreferrer">
            Baixar guia em PDF
          </a>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      id: 'instrucoes',
    },
  }
}
