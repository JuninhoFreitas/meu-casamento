import { useState } from 'react'
import { Layout } from 'layouts/default'
import { casamento } from 'content/casamento'
import { Button } from 'components/button'
import { Link } from 'components/link'
import dynamic from 'next/dynamic'
import s from './confirmar-presenca.module.scss'

const AppearTitle = dynamic(
  () => import('components/appear-title').then((mod) => mod.AppearTitle),
  { ssr: false }
)

export default function ConfirmarPresenca() {
  const [formData, setFormData] = useState({
    nome: '',
    confirmacaoPresenca: '',
    numeroAdultos: '',
    numeroCriancas: '',
    email: '',
    telefone: '',
    observacoes: '',
    precisaHospedagem: '',
    levarAlimento: '',
    usarPadrinhos: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Criar FormData para enviar como multipart/form-data
      const formDataToSend = new FormData()
      formDataToSend.append('field-0', formData.nome)
      formDataToSend.append('field-1', formData.confirmacaoPresenca)
      formDataToSend.append('field-2', formData.numeroAdultos)
      formDataToSend.append('field-3', formData.numeroCriancas || '0')
      formDataToSend.append('field-4', formData.email || '')
      formDataToSend.append('field-5', formData.telefone)
      formDataToSend.append('field-6', formData.observacoes || '')
      formDataToSend.append('field-7', formData.precisaHospedagem)
      formDataToSend.append('field-8', formData.levarAlimento)
      formDataToSend.append('field-9', formData.usarPadrinhos || '')

      const response = await fetch(
        'https://n8n.unidosnosenhor.com.br/form/9026b542-6112-4594-8e88-229a0402d980',
        {
          method: 'POST',
          body: formDataToSend,
        }
      )

      if (response.ok) {
        setSubmitStatus('success')
        // Limpar formulário após sucesso
        setFormData({
          nome: '',
          confirmacaoPresenca: '',
          numeroAdultos: '',
          numeroCriancas: '',
          email: '',
          telefone: '',
          observacoes: '',
          precisaHospedagem: '',
          levarAlimento: '',
          usarPadrinhos: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Layout
      theme="light"
      seo={{
        title: `Confirmar Presença - ${casamento.noivos.nomeCompleto}`,
        description: `Confirme sua presença no casamento de ${casamento.noivos.nomeCompleto} em ${casamento.data.data}`,
      }}
      className={s.page}
    >
      <section className={s.section}>
        <div className="layout-grid">
          <aside className={s.title}>
            <p className="h3">
              <AppearTitle>
                <span>Confirmar Presença</span>
                <br />
                <span className="grey">
                  Ajude-nos a organizar melhor o evento confirmando sua presença
                </span>
              </AppearTitle>
            </p>
          </aside>

          <div className={s.formWrapper}>
            <form onSubmit={handleSubmit} className={s.form}>
              <div className={s.field}>
                <label htmlFor="nome" className={s.label}>
                  Nome completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                  className={s.input}
                  placeholder="Insira seu nome completo"
                />
              </div>

              <div className={s.field}>
                <label htmlFor="confirmacaoPresenca" className={s.label}>
                  Você irá ao casamento? *
                </label>
                <select
                  id="confirmacaoPresenca"
                  name="confirmacaoPresenca"
                  value={formData.confirmacaoPresenca}
                  onChange={handleChange}
                  required
                  className={s.select}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="Sim :)">Sim :)</option>
                  <option value="Não :(">Não :(</option>
                </select>
              </div>

              <div className={s.row}>
                <div className={s.field}>
                  <label htmlFor="numeroAdultos" className={s.label}>
                    Quantidade de adultos incluindo você *
                  </label>
                  <input
                    type="number"
                    id="numeroAdultos"
                    name="numeroAdultos"
                    value={formData.numeroAdultos}
                    onChange={handleChange}
                    required
                    min="1"
                    className={s.input}
                    placeholder="0"
                  />
                </div>

                <div className={s.field}>
                  <label htmlFor="numeroCriancas" className={s.label}>
                    Quantidade de crianças
                  </label>
                  <input
                    type="number"
                    id="numeroCriancas"
                    name="numeroCriancas"
                    value={formData.numeroCriancas}
                    onChange={handleChange}
                    min="0"
                    className={s.input}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className={s.field}>
                <label htmlFor="email" className={s.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={s.input}
                  placeholder="seu@email.com"
                />
              </div>

              <div className={s.field}>
                <label htmlFor="telefone" className={s.label}>
                  Telefone para Contato(com ddd) *
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  required
                  className={s.input}
                  placeholder="(00) 00000-0000"
                />
              </div>

              <div className={s.field}>
                <label htmlFor="observacoes" className={s.label}>
                  observações
                </label>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  value={formData.observacoes}
                  onChange={handleChange}
                  className={s.textarea}
                  placeholder="Deixe uma mensagem ou observação especial..."
                  rows="4"
                />
              </div>

              <div className={s.field}>
                <label htmlFor="precisaHospedagem" className={s.label}>
                  Você vai precisar de hospedagem? *
                </label>
                <select
                  id="precisaHospedagem"
                  name="precisaHospedagem"
                  value={formData.precisaHospedagem}
                  onChange={handleChange}
                  required
                  className={s.select}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </div>

              <div className={s.field}>
                <label htmlFor="levarAlimento" className={s.label}>
                  Consegue levar algum alimento para o Brunch(Café/Almoço) *
                </label>
                <select
                  id="levarAlimento"
                  name="levarAlimento"
                  value={formData.levarAlimento}
                  onChange={handleChange}
                  required
                  className={s.select}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </div>

              <div className={s.field}>
                <label htmlFor="usarPadrinhos" className={s.label}>
                  Precisa da ajuda de padrinhos para entrega dos presentes?
                </label>
                <select
                  id="usarPadrinhos"
                  name="usarPadrinhos"
                  value={formData.usarPadrinhos}
                  onChange={handleChange}
                  className={s.select}
                >
                  <option value="">Selecione uma opção</option>
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </div>

              {submitStatus === 'success' && (
                <div className={s.successMessage}>
                  <p>✓ Presença confirmada com sucesso! Muito obrigado!</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className={s.errorMessage}>
                  <p>
                    ✗ Ops! Houve um erro ao enviar. Por favor, tente novamente ou entre em contato
                    conosco.
                  </p>
                </div>
              )}

              <div className={s.submitWrapper}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className={s.submitButton}
                  arrow
                >
                  {isSubmitting ? 'Enviando...' : 'Confirmar Presença'}
                </Button>
              </div>
            </form>

            <div className={s.backLink}>
              <Link href="/" className={s.backLinkText}>
                ← Voltar para a página principal
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps() {
  return {
    props: {
      id: 'confirmar-presenca',
    },
  }
}
