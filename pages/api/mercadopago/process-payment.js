import { MercadoPagoConfig, Payment } from 'mercadopago'
import { randomUUID } from 'crypto'

// Get access token from environment variable
// In production, this should NEVER have a fallback value
const accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN

if (!accessToken) {
  console.error('MERCADOPAGO_ACCESS_TOKEN não está configurado')
  // In production, you might want to throw an error instead
  // throw new Error('MERCADOPAGO_ACCESS_TOKEN não configurado')
}

const client = new MercadoPagoConfig({
  accessToken: accessToken || 'z-7513617067227982-011200-59288f7a7ca3a4248012e7c3aa9af3d5-219913974', // Fallback apenas para desenvolvimento
  options: { timeout: 5000 },
})

const payment = new Payment(client)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const formData = req.body

    // Log for debugging
    console.log('Received payment data:', JSON.stringify(formData, null, 2))

    // Generate idempotency key
    const idempotencyKey = randomUUID()

    // Extract payment_method_id from various possible locations
    const paymentMethodId =
      formData.payment_method_id ||
      formData.paymentMethodId ||
      formData.selectedPaymentMethod?.id ||
      formData.selectedPaymentMethod

    if (!paymentMethodId) {
      console.error('Payment method ID not found in formData:', formData)
      return res.status(400).json({
        error: 'Payment method ID is required',
        message: 'payment_method_id attribute can\'t be null',
      })
    }

    // Prepare payment data based on payment method
    let paymentData = {
      transaction_amount: parseFloat(formData.transaction_amount || formData.amount),
      description: formData.description || 'Presente de Casamento',
      payment_method_id: paymentMethodId,
      payer: {
        email: formData.payer?.email || formData.email || formData.payerEmail,
      },
    }

    // Validate required fields
    if (!paymentData.payer.email) {
      return res.status(400).json({
        error: 'Payer email is required',
        message: 'payer.email attribute can\'t be null',
      })
    }

    // Add payment method specific fields
    if (paymentMethodId === 'pix') {
      // Pix payment - requires email, which is already set
      // No additional fields needed for PIX
    } else if (paymentMethodId === 'bolbradesco' || paymentMethodId === 'pec') {
      // Boleto payment
      paymentData.payer = {
        ...paymentData.payer,
        first_name: formData.payer?.first_name || formData.first_name,
        last_name: formData.payer?.last_name || formData.last_name,
        identification: {
          type: formData.payer?.identification?.type || formData.identificationType || 'CPF',
          number: formData.payer?.identification?.number || formData.identificationNumber,
        },
      }
    } else if (formData.token) {
      // Credit/debit card payment
      paymentData.token = formData.token
      paymentData.installments = parseInt(formData.installments || 1)
      paymentData.issuer_id = formData.issuer_id || formData.issuer
      paymentData.payer = {
        ...paymentData.payer,
        identification: {
          type: formData.payer?.identification?.type || formData.identificationType || 'CPF',
          number: formData.payer?.identification?.number || formData.identificationNumber,
        },
      }
    }

    const requestOptions = {
      idempotencyKey: idempotencyKey,
    }

    const response = await payment.create({
      body: paymentData,
      requestOptions,
    })

    // Return full response for PIX to get QR code data
    return res.status(200).json({
      status: response.status,
      status_detail: response.status_detail,
      id: response.id,
      transaction_amount: response.transaction_amount,
      transaction_details: response.transaction_details,
      point_of_interaction: response.point_of_interaction,
      // Include full response for debugging
      ...(response.point_of_interaction?.transaction_data && {
        qr_code: response.point_of_interaction.transaction_data.qr_code,
        qr_code_base64: response.point_of_interaction.transaction_data.qr_code_base64,
        ticket_url: response.point_of_interaction.transaction_data.ticket_url,
      }),
    })
  } catch (error) {
    console.error('Error processing payment:', error)
    return res.status(500).json({
      error: 'Failed to process payment',
      message: error.message,
    })
  }
}
