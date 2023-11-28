import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import EmailTemplate from '@/app/_components/email-template'

const responseSchema = z.object({
  amount: z.coerce.number(),
  buyer: z.string().email(),
  buyer_name: z.string(),
  status: z.enum(['Credit', 'Failed']),
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const formData = await req.formData()
  const data = Object.fromEntries(formData)

  const result = responseSchema.safeParse(data)

  if (result.success) {
    try {
      const data = await resend.emails.send({
        from: process.env.RESEND_EMAIL_FROM!,
        to: result.data.buyer,
        subject: 'Schedule Your Appointment with Positive Mind Care – Your Path to Wellbeing',
        react: EmailTemplate({ name: result.data.buyer_name }),
      })

      return NextResponse.json({ data })
    } catch (error) {
      return NextResponse.json({ error: 'Failed to send email' })
    }
  }

  return NextResponse.json({})
}
