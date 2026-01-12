import { useState } from 'react'
import { Layout } from 'layouts/default'
import { casamento } from 'content/casamento'
import { ProductCard } from 'components/product-card'
import { CheckoutModal } from 'components/checkout-modal'
import { parsePrice } from 'lib/price-utils'
import dynamic from 'next/dynamic'
import s from './presentes.module.scss'

const AppearTitle = dynamic(
  () => import('components/appear-title').then((mod) => mod.AppearTitle),
  { ssr: false }
)

export default function Presentes({ presentesData }) {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  // Process products from JSON
  const products = presentesData.map((item, index) => ({
    id: `presente-${index}`,
    titulo: item.titulo,
    valor: item.valor,
    valorNumerico: parsePrice(item.valor),
    url_imagem: item.url_imagem,
  }))

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    setIsCheckoutOpen(true)
  }

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false)
    setSelectedProduct(null)
  }

  return (
    <Layout
      theme="light"
      seo={{
        title: `Lista de Presentes - ${casamento.noivos.nomeCompleto}`,
        description: `Confira nossa lista de presentes de casamento`,
      }}
      className={s.page}
    >
      <section className={s.section}>
        <div className="layout-grid">
          <aside className={s.title}>
            <p className="h3">
              <AppearTitle>
                <span>Lista de Presentes</span>
                <br />
                <span className="grey">
                  Escolha um presente especial para o nosso casamento
                </span>
              </AppearTitle>
            </p>
          </aside>

          <div className={s.content}>
            <div className={s.banner}>
              <p className={s.bannerText}>
                Você também pode comprar presentes através da Shopee:{' '}
                <a
                  href="https://collshp.com/joaoegabrielle?view=storefront"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={s.bannerLink}
                >
                  LINK PARA A LISTA NA SHOPEE
                </a>
              </p>
            </div>

            <div className={s.disclaimer}>
              <p className={s.disclaimerText}>
                A lista de presentes abaixo é somente representativa, isto é: você não estará comprando exatamente o produto da foto, mas sim nos dando de presente o valor que será usado para pagar parcialmente ou completamente o presente representado na imagem.
              </p>
            </div>

            {products.length === 0 && (
              <div className={s.empty}>
                <p>Carregando lista de presentes...</p>
              </div>
            )}

            {products.length > 0 && (
              <div className={s.grid}>
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={{
                      id: product.id,
                      name: product.titulo,
                      price: product.valor,
                      image: product.url_imagem,
                    }}
                    onClick={() => handleProductClick(product)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={handleCloseCheckout}
        product={selectedProduct}
      />
    </Layout>
  )
}

export async function getStaticProps() {
  const fs = require('fs')
  const path = require('path')

  const filePath = path.join(process.cwd(), 'presentes.json')
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const presentesData = JSON.parse(fileContents)

  return {
    props: {
      id: 'presentes',
      presentesData,
    },
  }
}
