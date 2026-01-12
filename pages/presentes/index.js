import { useState, useEffect } from 'react'
import { Layout } from 'layouts/default'
import { casamento } from 'content/casamento'
import { ProductCard } from 'components/product-card'
import { fetchShopeeProducts, processShopeeItem } from 'lib/shopee-utils'
import dynamic from 'next/dynamic'
import s from './presentes.module.scss'

const AppearTitle = dynamic(
  () => import('components/appear-title').then((mod) => mod.AppearTitle),
  { ssr: false }
)

export default function Presentes() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true)
        const data = await fetchShopeeProducts('joaoegabrielle')
        
        if (data?.data?.storefrontProductList?.itemList) {
          const processedProducts = data.data.storefrontProductList.itemList.map(processShopeeItem)
          setProducts(processedProducts)
        } else {
          setError('Nenhum produto encontrado')
        }
      } catch (err) {
        console.error('Erro ao carregar produtos:', err)
        setError('Erro ao carregar a lista de presentes. Por favor, tente novamente mais tarde.')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <Layout
      theme="light"
      seo={{
        title: `Lista de Presentes - ${casamento.noivos.nomeCompleto}`,
        description: `Confira nossa lista de presentes de casamento na Shopee`,
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
            {loading && (
              <div className={s.loading}>
                <p>Carregando lista de presentes...</p>
              </div>
            )}

            {error && (
              <div className={s.error}>
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && products.length === 0 && (
              <div className={s.empty}>
                <p>Nenhum presente disponível no momento.</p>
              </div>
            )}

            {!loading && !error && products.length > 0 && (
              <div className={s.grid}>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      id: 'presentes',
    },
  }
}
