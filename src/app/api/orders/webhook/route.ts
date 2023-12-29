import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getAuth, getFirestore } from '@/utils/firebase'

const paymentSuccessSchema = z.object({
  payload: z.object({
    payment: z.object({
      entity: z.object({
        id: z.string(),
        amount: z.number(),
        currency: z.string(),
        order_id: z.string(),
        contact: z.string(),
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
          description: z.string().optional(),
          entityId: z.string(),
          priceId: z.string(),
        }),
        created_at: z.number(),
      }),
    }),
  }),
})

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
      entityId: order.notes.entityId,
      priceId: order.notes.priceId,
      orderId: order.id,
      userId: user.uid,
      createdAt: new Date(),
    })

    return NextResponse.json({ success: true, message: 'Product purchased successfully!' })
  } catch {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
