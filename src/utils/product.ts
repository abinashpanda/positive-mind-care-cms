import { match } from 'ts-pattern'
import { CreateOrderSchema } from '@/schema/order'
import { getFirestore } from './firebase'
import { Service } from '@/types/service'
import { fetchDoctorById } from '@/queries/doctor'
import { ComprehensiveTest } from '@/types/comprehensive-test'

type Product = {
  name: string
  description?: string
  price: number
  entityId: string
  priceId?: string
  type: CreateOrderSchema['type']
  priceName?: string
}

export async function fetchProduct(data: CreateOrderSchema) {
  const firestore = getFirestore()

  const product = await match(data)
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
        priceName: price.name,
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
        priceName: price.name,
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

  return product
}
