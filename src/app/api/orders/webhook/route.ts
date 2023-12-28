import { NextResponse } from 'next/server'
import { z } from 'zod'
import { validatePaymentVerification } from 'razorpay/dist/utils/razorpay-utils'
import { env } from '@/env.mjs'
import { firestore } from '@/utils/firebase'

const paymentSuccessSchema = z.object({
  productId: z.string(),
  orderId: z.string(),
  userId: z.string(),
  paymentInfo: z.object({
    razorpay_payment_id: z.string(),
    razorpay_order_id: z.string(),
    razorpay_signature: z.string(),
  }),
})

export async function POST(req: Request) {
  const data = await req.json()

  const result = paymentSuccessSchema.safeParse(data)
  if (!result.success) {
    return NextResponse.json({ success: false, error: result.error.flatten().fieldErrors }, { status: 400 })
  }

  /** Verifying payment request */
  const isPaymentValid = validatePaymentVerification(
    {
      order_id: result.data.paymentInfo.razorpay_order_id,
      payment_id: result.data.paymentInfo.razorpay_payment_id,
    },
    result.data.paymentInfo.razorpay_signature,
    env.RAZORPAY_KEY_SECRET,
  )
  if (!isPaymentValid) {
    return NextResponse.json({ success: false, error: 'Invalid payment request!' }, { status: 400 })
  }

  try {
    const purchasedOrderCollectionRef = firestore.collection('purchasedOrders')
    await purchasedOrderCollectionRef.add({
      productId: result.data.productId,
      orderId: result.data.orderId,
      userId: result.data.userId,
      createdAt: new Date(),
    })

    return NextResponse.json({ success: true, message: 'Product purchased successfully!' })
  } catch {
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
