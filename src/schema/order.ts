import { z } from 'zod'

export const createOrderSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('service'), serviceId: z.string(), priceId: z.string() }),
  z.object({ type: z.literal('doctor'), doctorId: z.string(), priceId: z.string() }),
  z.object({ type: z.literal('test'), testId: z.string() }),
])
export type CreateOrderSchema = z.infer<typeof createOrderSchema>
