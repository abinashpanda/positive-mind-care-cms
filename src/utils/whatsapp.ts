import { env } from 'process'

type SendPaymentWhatsappPayload = {
  to: string
  customerName: string
  orderName: string
  amount: number
}

export async function sendPaymentConfirmationWhatsapp({
  to,
  customerName,
  orderName,
  amount,
}: SendPaymentWhatsappPayload) {
  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/${env.WA_PHONE_NUMBER_ID}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.WA_CLOUD_API_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'template',
        template: {
          name: 'payment_confirm',
          language: { policy: 'deterministic', code: 'en_US' },
          components: [
            {
              type: 'body',
              parameters: [
                {
                  type: 'text',
                  text: customerName,
                },
                {
                  type: 'text',
                  text: orderName,
                },
                {
                  type: 'text',
                  text: `₹ ${amount}`,
                },
                {
                  type: 'text',
                  text: 'Positive Mind Care',
                },
              ],
            },
          ],
        },
      }),
    })

    const jsonResponse = await response.json()
    return jsonResponse
  } catch {
    return null
  }
}
