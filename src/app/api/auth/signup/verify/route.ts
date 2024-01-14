import { z } from 'zod'
import { NextResponse } from 'next/server'
import dayjs from 'dayjs'
import { MOBILE_REGEX } from '@/utils/constants'
import { getAuth, getFirestore } from '@/utils/firebase'

const verifySignupSchema = z.object({
  mobileNumber: z.string().regex(MOBILE_REGEX, 'Invalid mobile number'),
  otp: z.string().regex(/^\d{6}$/, 'Invalid code provided'),
  code: z.string().regex(/^\d{4}$/, 'Invalid OTP provided'),
})

export async function POST(request: Request) {
  const data = await request.json()

  const result = verifySignupSchema.safeParse(data)
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
  const firestore = getFirestore()
  const otpCollectionRef = firestore.collection('otp')

  try {
    const user = await auth.getUserByPhoneNumber(result.data.mobileNumber)
    const otpDocs = await otpCollectionRef
      .where('mobileNumber', '==', result.data.mobileNumber)
      .where('status', '==', 'UNUSED')
      .get()
    if (otpDocs.empty) {
      return NextResponse.json(
        { success: false, error: { message: 'OTP not found or already used!' } },
        { status: 404 },
      )
    }

    const otpDoc = otpDocs.docs[0].data()
    /** 1. Verify expiry of OTP */
    if (dayjs(otpDoc.expiresAt.toDate()).isBefore(dayjs())) {
      return NextResponse.json({ success: false, error: { message: 'OTP is expired' } }, { status: 400 })
    }

    /** 2. Verify code */
    if (otpDoc.code !== result.data.code) {
      return NextResponse.json({ success: false, error: { message: 'Code does not match!' } }, { status: 400 })
    }

    /** 3.Verify actual OTP */
    if (otpDoc.otp !== result.data.otp) {
      return NextResponse.json({ success: false, error: { message: 'OTP does not match!' } }, { status: 400 })
    }

    await otpDocs.docs[0].ref.set({
      ...otpDoc,
      status: 'USED',
    })

    await auth.updateUser(user.uid, { disabled: false })

    const token = await auth.createCustomToken(user.uid)

    return NextResponse.json({ success: true, data: { message: 'OTP verified successfully!', token } })
  } catch (error: any) {
    if (error?.code === 'auth/user-not-found') {
      return NextResponse.json({ success: false, error: { message: 'User not found!' } }, { status: 400 })
    }

    return NextResponse.json({ success: false, error: { message: 'Internal server error!' } }, { status: 500 })
  }
}
