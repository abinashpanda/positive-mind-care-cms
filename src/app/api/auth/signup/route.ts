import { z } from 'zod'
import { NextResponse } from 'next/server'
import { MOBILE_REGEX } from '@/utils/constants'
import { getAuth } from '@/utils/firebase'
import { generateCode, generateOTP, generateOTPDoc } from '@/utils/auth'

const signupSchema = z.object({
  name: z
    .string({ required_error: 'Name is required!' })
    .min(3, 'Please provide at least 4 characters!')
    .max(50, 'Please provide at most 50 characters!'),
  mobileNumber: z.string().regex(MOBILE_REGEX, 'Please provide a valid mobile number!'),
  email: z.string().email('Invalid email address provided!'),
})

export async function POST(request: Request) {
  const data = await request.json()

  const result = signupSchema.safeParse(data)
  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        error: {
          message: 'Invalid request body!',
          data: result.error.flatten().fieldErrors,
        },
      },
      { status: 400 },
    )
  }

  const auth = getAuth()

  try {
    const user = await auth.getUserByPhoneNumber(result.data.mobileNumber)
    if (user) {
      return NextResponse.json(
        { success: false, error: { message: 'User already exists with this mobile number!' } },
        { status: 400 },
      )
    }
  } catch (error: any) {
    if (error?.code !== 'auth/user-not-found') {
      return NextResponse.json({ success: false, error: { message: 'Internal server error' } }, { status: 500 })
    }
  }

  try {
    await auth.createUser({
      phoneNumber: result.data.mobileNumber,
      email: result.data.email,
      displayName: result.data.name,
      disabled: true,
    })

    const otp = generateOTP()
    const code = generateCode()

    // @TODO: Send OTP text message and remove otp from response
    await generateOTPDoc({
      mobileNumber: result.data.mobileNumber,
      otp,
      code,
    })

    return NextResponse.json({
      success: true,
      data: {
        message: 'Signed up successfully!',
        code,
        otp,
      },
    })
  } catch (error: any) {
    if (error?.message) {
      return NextResponse.json({ success: false, error: { message: error.message } }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: { message: 'Internal server error' } }, { status: 500 })
  }
}
