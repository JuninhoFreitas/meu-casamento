import { MercadoPagoConfig, Preference } from 'mercadopago'

// Get access token from environment variable
// In production, this should NEVER have a fallback value
const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN

if (!accessToken) {
  console.error('MERCADOPAGO_ACCESS_TOKEN não está configurado')
  // In production, you might want to throw an error instead
  // throw new Error('MERCADOPAGO_ACCESS_TOKEN não configurado')
}

const client = new MercadoPagoConfig({
  accessToken: accessToken || 'z', // Fallback apenas para desenvolvimento
  options: { timeout: 5000 },
})

const preference = new Preference(client)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { title, amount, quantity = 1 } = req.body

    if (!title || !amount) {
      return res.status(400).json({ error: 'Title and amount are required' })
    }

    // Get origin from request headers or use default
    let origin = 'http://localhost:3000'

    if (req.headers.origin) {
      origin = req.headers.origin
    } else if (req.headers.host) {
      const protocol = req.headers['x-forwarded-proto'] || (req.headers.referer && req.headers.referer.startsWith('https') ? 'https' : 'http')
      origin = `${protocol}://${req.headers.host}`
    }

    // Ensure origin is a valid URL (starts with http:// or https://)
    if (!origin.startsWith('http://') && !origin.startsWith('https://')) {
      origin = `http://${origin}`
    }

    const successUrl = `${origin}/presentes?status=success`
    const failureUrl = `${origin}/presentes?status=failure`
    const pendingUrl = `${origin}/presentes?status=pending`

    // Validate URLs are complete
    if (!successUrl || !successUrl.startsWith('http')) {
      throw new Error(`Invalid success URL: ${successUrl}`)
    }

    const body = {
      items: [
        {
          id: `presente-${Date.now()}`,
          title: title,
          quantity: quantity,
          unit_price: parseFloat(amount),
        },
      ],
      purpose: 'wallet_purchase',
      back_urls: {
        success: successUrl,
        failure: failureUrl,
        pending: pendingUrl,
      },
      // auto_return: 'approved',
    }

    // Log for debugging
    console.log('Creating preference with back_urls:', {
      success: successUrl,
      failure: failureUrl,
      pending: pendingUrl,
    })

    const response = await preference.create({ body })

    return res.status(200).json({
      preferenceId: response.id,
    })
  } catch (error) {
    console.error('Error creating preference:', error)
    return res.status(500).json({
      error: 'Failed to create preference',
      message: error.message,
    })
  }
}
