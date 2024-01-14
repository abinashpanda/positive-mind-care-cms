import { NextResponse } from 'next/server'
import { z } from 'zod'
import dayjs from 'dayjs'
import { generateCode, generateOTP } from '@/utils/auth'
import { getAuth, getFirestore } from '@/utils/firebase'
import { MOBILE_REGEX } from '@/utils/constants'

const loginSchema = z.object({
  mobileNumber: z.string().regex(MOBILE_REGEX, 'Invalid mobile number'),
})

export async function POST(request: Request) {
  const data = await request.json()

  const result = loginSchema.safeParse(data)
  if (!result.success) {
    return NextResponse.json(
      { success: false, error: { message: 'Invalid request!', data: result.error.flatten().fieldErrors } },
      { status: 400 },
    )
  }

  const auth = getAuth()
  const user = await auth.getUserByPhoneNumber(result.data.mobileNumber)
  if (!user) {
    return NextResponse.json(
      { success: false, error: { message: 'User with mobile number not found!' } },
      { status: 404 },
    )
  }

  const otp = generateOTP()
  const code = generateCode()
  const firestore = getFirestore()

  const otpCollectionRef = firestore.collection('otp')

  try {
    // @TODO: Send OTP message
    await otpCollectionRef.add({
      mobileNumber: result.data.mobileNumber,
      otp,
      code,
      status: 'UNUSED',
      expiresAt: dayjs().add(5, 'minutes').toDate(),
      createdAt: dayjs().toDate(),
    })

    // @TODO: Remove OTP from response after sending it in text message
    return NextResponse.json({ success: true, data: { code, otp } })
  } catch {
    return NextResponse.json({ success: false, error: { message: 'Internal server error!' } }, { status: 500 })
  }
}
