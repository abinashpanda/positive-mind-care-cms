import { NextResponse } from 'next/server'
import { z } from 'zod'
import { razorpayInstance } from '@/utils/razorpay'

const createOrderSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('service'), serviceId: z.string(), priceId: z.string() }),
  z.object({ type: z.literal('doctor'), doctorId: z.string(), priceId: z.string() }),
  z.object({ type: z.literal('test'), testId: z.string() }),
])

export async function POST(req: Request) {
  const data = await req.json()

  const result = createOrderSchema.safeParse(data)
  if (!result.success) {
    return NextResponse.json({ success: false, errors: result.error.flatten().fieldErrors }, { status: 400 })
  }

  const product = match

  // try {
  //   const orderCreated = await razorpayInstance.orders.create({
  //     /** Razorpay accept amount in currency subunit, so we have to multiply it by 100 to convert in subunits  */
  //     amount: result.data.amount * 100,
  //     currency: 'INR',
  //     notes: {
  //       productId: result.data.productId,
  //       productName: result.data.productName,
  //     },
  //   })

  //   return NextResponse.json({ success: true, data: orderCreated })
  // } catch (error) {
  //   return NextResponse.json({ success: false, error }, { status: 500 })
  // }
}
