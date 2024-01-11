import { NextResponse } from 'next/server'
import { razorpayInstance } from '@/utils/razorpay'
import { CreateOrderSchema, createOrderSchema } from '@/schema/order'
import { fetchProduct } from '@/utils/product'

export type OrderType = CreateOrderSchema['type']

export async function POST(req: Request) {
  const data = await req.json()

  const result = createOrderSchema.safeParse(data)
  if (!result.success) {
    return NextResponse.json({ success: false, errors: result.error.flatten().fieldErrors }, { status: 400 })
  }

  const product = await fetchProduct(result.data)
  if (!product) {
    return NextResponse.json({ success: false, error: 'Product not found!' }, { status: 404 })
  }

  try {
    const orderCreated = await razorpayInstance.orders.create({
      /** Razorpay accept amount in currency subunit, so we have to multiply it by 100 to convert in subunits  */
      amount: product?.price * 100,
      currency: 'INR',
      notes: product,
    })

    return NextResponse.json({ success: true, data: orderCreated })
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 })
  }
}
