import { NextResponse } from 'next/server'
import { z } from 'zod'
import { razorpayInstance } from '@/utils/razorpay'

const createOrderSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  amount: z.number(),
})

export async function POST(req: Request) {
  const data = await req.json()

  const result = createOrderSchema.safeParse(data)
  if (!result.success) {
    return NextResponse.json({ success: false, errors: result.error.flatten().fieldErrors }, { status: 400 })
  }

  try {
    const orderCreated = await razorpayInstance.orders.create({
      /** Razorpay accept amount in currency subunit, so we have to multiply it by 100 to convert in subunits  */
      amount: result.data.amount * 100,
      currency: 'INR',
      notes: {
        productId: result.data.productId,
        productName: result.data.productName,
      },
    })

    return NextResponse.json({ success: true, data: orderCreated })
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}
