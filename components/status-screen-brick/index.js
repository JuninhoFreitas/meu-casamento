import { useEffect, useRef, useState } from 'react'
import s from './status-screen-brick.module.scss'

const MERCADOPAGO_PUBLIC_KEY = process.env.NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY || 'x'

// Reuse script loading from checkout-modal
// The script should already be loaded, but we check anyway
function loadMercadoPagoScript() {
  return new Promise((resolve, reject) => {
    if (window.MercadoPago) {
      resolve()
      return
    }

    // If script is not loaded, wait a bit and check again (it might be loading)
    let attempts = 0
    const maxAttempts = 10
    const checkInterval = setInterval(() => {
      if (window.MercadoPago) {
        clearInterval(checkInterval)
        resolve()
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval)
        // Script should already be loaded by checkout-modal
        // If not, try to load it
        const script = document.createElement('script')
        script.src = 'https://sdk.mercadopago.com/js/v2'
        script.async = true
        script.onload = () => resolve()
        script.onerror = () => reject(new Error('Failed to load Mercado Pago SDK'))
        document.body.appendChild(script)
      }
      attempts++
    }, 100)
  })
}

export function StatusScreenBrick({ paymentId, onReady, onError }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const brickControllerRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!paymentId) return

    loadMercadoPagoScript()
      .then(() => {
        initializeStatusScreen()
      })
      .catch((err) => {
        console.error('Error loading Mercado Pago SDK:', err)
        setError('Erro ao carregar o status do pagamento.')
        setLoading(false)
        if (onError) onError(err)
      })

    return () => {
      // Cleanup
      if (brickControllerRef.current) {
        try {
          brickControllerRef.current.unmount()
        } catch (e) {
          console.error('Error unmounting status screen brick:', e)
        }
        brickControllerRef.current = null
      }
    }
  }, [paymentId])

  const initializeStatusScreen = async () => {
    if (!window.MercadoPago || !containerRef.current) {
      console.error('MercadoPago SDK not loaded or container not found')
      return
    }

    try {
      const mp = new window.MercadoPago(MERCADOPAGO_PUBLIC_KEY)
      const bricksBuilder = mp.bricks()

      const settings = {
        initialization: {
          paymentId: paymentId,
        },
        callbacks: {
          onReady: () => {
            setLoading(false)
            if (onReady) onReady()
          },
          onError: (error) => {
            console.error('Status Screen Brick error:', error)
            setError('Erro ao exibir o status do pagamento.')
            setLoading(false)
            if (onError) onError(error)
          },
        },
      }

      brickControllerRef.current = await bricksBuilder.create(
        'statusScreen',
        'statusScreenBrick_container',
        settings
      )
    } catch (err) {
      console.error('Error initializing status screen brick:', err)
      setError('Erro ao inicializar o status do pagamento.')
      setLoading(false)
      if (onError) onError(err)
    }
  }

  if (!paymentId) return null

  return (
    <div className={s.container}>
      {loading && (
        <div className={s.loading}>
          <p>Carregando status do pagamento...</p>
        </div>
      )}
      {error && (
        <div className={s.error}>
          <p>{error}</p>
        </div>
      )}
      <div
        id="statusScreenBrick_container"
        ref={containerRef}
        className={s.brickContainer}
      />
    </div>
  )
}
