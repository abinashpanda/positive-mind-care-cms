import { NextResponse } from 'next/server'
import { z } from 'zod'
import { match } from 'ts-pattern'
import { getFirestore } from '@/utils/firebase'
import { Service } from '@/types/service'
import { razorpayInstance } from '@/utils/razorpay'
import { ComprehensiveTest } from '@/types/comprehensive-test'
import { fetchDoctorById } from '@/queries/doctor'

const createOrderSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('service'), serviceId: z.string(), priceId: z.string() }),
  z.object({ type: z.literal('doctor'), doctorId: z.string(), priceId: z.string() }),
  z.object({ type: z.literal('test'), testId: z.string() }),
])

export type OrderType = z.infer<typeof createOrderSchema>['type']

type Product = {
  name: string
  description?: string
  price: number
  entityId: string
  priceId?: string
  type: OrderType
}

export async function POST(req: Request) {
  const data = await req.json()

  const result = createOrderSchema.safeParse(data)
  if (!result.success) {
    return NextResponse.json({ success: false, errors: result.error.flatten().fieldErrors }, { status: 400 })
  }

  const firestore = getFirestore()

  const product = await match(result.data)
    .returnType<Promise<Product | null>>()
    .with({ type: 'service' }, async ({ serviceId, priceId, type }) => {
      const serviceCollection = firestore.collection('services')
      const service = await serviceCollection.where('id', '==', serviceId).get()
      if (service.empty) {
        return null
      }

      const item = service.docs[0].data() as Service
      const price = item.price.find((price) => price.id === priceId)

      if (!price) return null

      return {
        type,
        name: item.name,
        description: item.description,
        price: price.price,
        entityId: serviceId,
        priceId,
      }
    })
    .with({ type: 'doctor' }, async ({ doctorId, priceId, type }) => {
      const doctor = await fetchDoctorById(doctorId)
      if (!doctor) {
        return null
      }

      const price = doctor.services.find((service) => service.id === priceId)

      if (!price) return null

      return {
        type,
        name: doctor.name,
        description: doctor.description,
        price: price.price,
        entityId: doctorId,
        priceId,
      }
    })
    .with({ type: 'test' }, async ({ testId, type }) => {
      const comprehensiveTestCollection = firestore.collection('comprehensive-tests')
      const test = await comprehensiveTestCollection.where('id', '==', testId).get()

      if (test.empty) {
        return null
      }

      const item = test.docs[0].data() as ComprehensiveTest

      return {
        type,
        name: item.name,
        description: item.description,
        price: item.price,
        entityId: item.id,
      }
    })
    .exhaustive()

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
