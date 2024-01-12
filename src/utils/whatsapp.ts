import { env } from '@/env.mjs'

type Component = {
  type: 'body'
  parameters: { type: 'text'; text: string }[]
}

type SendPaymentWhatsappPayload = {
  to: string
  templateName: 'payment_confirm' | 'appointment_conf'
  components: Component[]
}

export async function sendWhatsappMessageByTemplate({ to, templateName, components }: SendPaymentWhatsappPayload) {
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
          name: templateName,
          language: { policy: 'deterministic', code: 'en_US' },
          components,
        },
      }),
    })

    const jsonResponse = await response.json()
    return jsonResponse
  } catch {
    return null
  }
}
