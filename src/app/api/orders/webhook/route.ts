import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { getAuth, getFirestore } from '@/utils/firebase'
import EmailTemplate from '@/app/_components/email-template'
import { fetchDoctorById } from '@/utils/doctor'

const paymentSuccessSchema = z.object({
  payload: z.object({
    payment: z.object({
      entity: z.object({
        id: z.string(),
        amount: z.number(),
        currency: z.string(),
        order_id: z.string(),
        contact: z.string(),
        email: z.string().email(),
      }),
    }),
    order: z.object({
      entity: z.object({
        id: z.string(),
        amount: z.number(),
        currency: z.literal('INR'),
        status: z.literal('paid'),
        notes: z.object({
          name: z.string(),
          description: z.string().optional().nullable(),
          entityId: z.string(),
          priceId: z.string().optional(),
          type: z.enum(['service', 'doctor', 'test']),
        }),
      }),
    }),
  }),
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const data = await req.json()

  const result = paymentSuccessSchema.safeParse(data)

  if (!result.success) {
    return NextResponse.json({ success: false, error: result.error.flatten().fieldErrors }, { status: 400 })
  }

  const auth = getAuth()
  const user = await auth.getUserByPhoneNumber(result.data.payload.payment.entity.contact)
  if (!user) {
    return NextResponse.json({ success: false, error: 'User does not exists!' }, { status: 400 })
  }

  try {
    const order = result.data.payload.order.entity
    const firestore = getFirestore()
    const purchasedOrderCollectionRef = firestore.collection('purchasedOrders')
    await purchasedOrderCollectionRef.add({
      type: order.notes.type,
      entityId: order.notes.entityId,
      priceId: order.notes.priceId ?? null,
      orderId: order.id,
      userId: user.uid,
      createdAt: new Date(),
    })

    // Send email if the order is a doctor's appointment
    if (order.notes.type === 'doctor') {
      const doctor = await fetchDoctorById(order.notes.entityId)

      if (doctor && doctor.calendlyLink) {
        await resend.emails.send({
          from: process.env.RESEND_EMAIL_FROM!,
          to: result.data.payload.payment.entity.email,
          subject: 'Schedule Your Appointment with Positive Mind Care - Your Path to Wellbeing',
          react: EmailTemplate({ name: '', calendlyLink: doctor.calendlyLink }),
        })
      }
    }

    return NextResponse.json({ success: true, message: 'Product purchased successfully!' })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
