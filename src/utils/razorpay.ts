import Razorpay from 'razorpay'
import { env } from '@/env.mjs'

export const razorpayInstance = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
})
