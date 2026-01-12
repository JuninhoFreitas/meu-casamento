import { useEffect, useRef, useState, useCallback } from 'react'
import cn from 'clsx'
import { StatusScreenBrick } from 'components/status-screen-brick'
import { useStore } from 'lib/store'
import s from './checkout-modal.module.scss'

const MERCADOPAGO_PUBLIC_KEY = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || 'x'

// Global script loading state
let scriptLoaded = false
let scriptLoading = false
const scriptLoadCallbacks = []

function loadMercadoPagoScript() {
  return new Promise((resolve, reject) => {
    if (window.MercadoPago) {
      resolve()
      return
    }

    if (scriptLoaded) {
      resolve()
      return
    }

    scriptLoadCallbacks.push(resolve)

    if (scriptLoading) {
      return
    }

    scriptLoading = true
    const script = document.createElement('script')
    script.src = 'https://sdk.mercadopago.com/js/v2'
    script.async = true
    script.crossOrigin = 'anonymous'
    script.onload = () => {
      scriptLoaded = true
      scriptLoading = false
      scriptLoadCallbacks.forEach((cb) => cb())
      scriptLoadCallbacks.length = 0
    }
    script.onerror = () => {
      scriptLoading = false
      // Check if script was actually loaded (might be blocked by ad blocker but still work)
      setTimeout(() => {
        if (window.MercadoPago) {
          scriptLoaded = true
          scriptLoadCallbacks.forEach((cb) => cb())
          scriptLoadCallbacks.length = 0
        } else {
          reject(new Error('Failed to load Mercado Pago SDK'))
        }
      }, 100)
    }
    document.body.appendChild(script)
  })
}

export function CheckoutModal({ isOpen, onClose, product }) {
  const [loading, setLoading] = useState(false)
  const [preferenceId, setPreferenceId] = useState(null)
  const [error, setError] = useState(null)
  const [paymentId, setPaymentId] = useState(null)
  const [showStatusScreen, setShowStatusScreen] = useState(false)
  const brickControllerRef = useRef(null)
  const containerRef = useRef(null)
  const lenis = useStore(({ lenis }) => lenis)

  const createPreference = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/mercadopago/create-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: product.titulo,
          amount: product.valorNumerico,
          quantity: 1,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to create preference')
      }

      const data = await response.json()
      setPreferenceId(data.preferenceId)
      return data.preferenceId
    } catch (err) {
      console.error('Error creating preference:', err)
      setError('Erro ao inicializar o checkout. Por favor, tente novamente.')
      throw err
    } finally {
      setLoading(false)
    }
  }, [product])

  const initializeBrick = useCallback(async () => {
    if (!window.MercadoPago || !containerRef.current) {
      console.error('MercadoPago SDK not loaded or container not found')
      return
    }

    try {
      // Create preference first
      const prefId = await createPreference()
      if (!prefId) {
        console.error('Failed to create preference')
        return
      }

      const mp = new window.MercadoPago(MERCADOPAGO_PUBLIC_KEY)
      const bricksBuilder = mp.bricks()

      const settings = {
        initialization: {
          amount: product.valorNumerico,
          preferenceId: prefId,
        },
        customization: {
          paymentMethods: {
            ticket: 'all',
            bankTransfer: 'all',
            creditCard: 'all',
            prepaidCard: 'all',
            debitCard: 'all',
            mercadoPago: 'all',
          },
        },
        callbacks: {
          onReady: () => {
            setLoading(false)
          },
          onSubmit: async ({ selectedPaymentMethod, formData }) => {
            return new Promise((resolve, reject) => {
              // Ensure payment_method_id is included
              const paymentData = {
                ...formData,
                transaction_amount: product.valorNumerico,
                description: product.titulo,
                // Ensure payment_method_id is set from selectedPaymentMethod if not in formData
                payment_method_id: formData.payment_method_id || formData.paymentMethodId || selectedPaymentMethod?.id || selectedPaymentMethod,
              }

              console.log('Submitting payment:', {
                selectedPaymentMethod,
                payment_method_id: paymentData.payment_method_id,
                formDataKeys: Object.keys(formData),
              })

              fetch('/api/mercadopago/process-payment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(paymentData),
              })
                .then((response) => {
                  if (!response.ok) {
                    return response.json().then((err) => {
                      throw new Error(err.message || 'Payment failed')
                    })
                  }
                  return response.json()
                })
                .then((response) => {
                  // Success
                  resolve()

                  // Check if payment is PIX
                  const isPix = paymentData.payment_method_id === 'pix'

                  if (isPix && response.id) {
                    // For PIX, show status screen with QR code
                    setPaymentId(response.id)
                    setShowStatusScreen(true)
                    // Unmount payment brick
                    if (brickControllerRef.current) {
                      try {
                        brickControllerRef.current.unmount()
                      } catch (e) {
                        console.error('Error unmounting payment brick:', e)
                      }
                      brickControllerRef.current = null
                    }
                  } else {
                    // For other payment methods, close modal
                    setTimeout(() => {
                      onClose()
                      alert('Pagamento processado com sucesso!')
                    }, 1000)
                  }
                })
                .catch((error) => {
                  console.error('Payment error:', error)
                  setError(error.message || 'Erro ao processar o pagamento. Por favor, tente novamente.')
                  reject()
                })
            })
          },
          onError: (error) => {
            // Ignore tracking errors (ERR_BLOCKED_BY_CLIENT) as they don't affect functionality
            if (error?.message?.includes('ERR_BLOCKED_BY_CLIENT') ||
              error?.message?.includes('tracks') ||
              error?.type === 'tracking') {
              console.warn('Mercado Pago tracking blocked (this is normal with ad blockers):', error)
              return
            }
            console.error('Brick error:', error)
            setError('Erro ao processar o pagamento. Por favor, tente novamente.')
          },
        },
      }

      brickControllerRef.current = await bricksBuilder.create(
        'payment',
        'paymentBrick_container',
        settings
      )
    } catch (err) {
      console.error('Error initializing brick:', err)
      setError('Erro ao inicializar o checkout. Por favor, tente novamente.')
      setLoading(false)
    }
  }, [product, createPreference])

  // Control Lenis when modal is open
  useEffect(() => {
    if (!lenis) return

    if (isOpen) {
      // Stop Lenis to prevent interference with modal scroll
      lenis.stop()
    } else {
      // Restart Lenis when modal closes
      lenis.start()
    }

    return () => {
      // Ensure Lenis is started when component unmounts
      if (lenis && !isOpen) {
        lenis.start()
      }
    }
  }, [isOpen, lenis])

  useEffect(() => {
    if (!isOpen || !product) {
      // Cleanup when closing
      if (brickControllerRef.current) {
        try {
          brickControllerRef.current.unmount()
        } catch (e) {
          console.error('Error unmounting brick:', e)
        }
        brickControllerRef.current = null
      }
      setPreferenceId(null)
      setError(null)
      setPaymentId(null)
      setShowStatusScreen(false)
      return
    }

    // Load script and initialize brick
    loadMercadoPagoScript()
      .then(() => {
        initializeBrick()
      })
      .catch((err) => {
        console.error('Error loading Mercado Pago SDK:', err)
        setError('Erro ao carregar o checkout. Por favor, tente novamente.')
        setLoading(false)
      })

    return () => {
      // Cleanup
      if (brickControllerRef.current) {
        try {
          brickControllerRef.current.unmount()
        } catch (e) {
          console.error('Error unmounting brick:', e)
        }
        brickControllerRef.current = null
      }
    }
  }, [isOpen, product, initializeBrick])

  if (!isOpen) return null

  return (
    <div className={s.overlay} onClick={onClose} data-lenis-prevent>
      <div className={s.modal} onClick={(e) => e.stopPropagation()} data-lenis-prevent>
        <button className={s.closeButton} onClick={onClose} aria-label="Fechar">
          ×
        </button>
        <div className={s.header}>
          <h2 className={s.title}>{product?.titulo}</h2>
          <p className={s.price}>{product?.valor}</p>
        </div>
        <div className={s.content}>
          {showStatusScreen && paymentId ? (
            <StatusScreenBrick
              paymentId={paymentId}
              onReady={() => {
                setLoading(false)
              }}
              onError={(error) => {
                console.error('Status screen error:', error)
                setError('Erro ao exibir o status do pagamento.')
              }}
            />
          ) : (
            <>
              {loading && !preferenceId && (
                <div className={s.loading}>
                  <p>Carregando checkout...</p>
                </div>
              )}
              {error && (
                <div className={s.error}>
                  <p>{error}</p>
                </div>
              )}
              <div
                id="paymentBrick_container"
                ref={containerRef}
                className={s.brickContainer}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
