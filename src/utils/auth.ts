import dayjs from 'dayjs'
import { getFirestore } from './firebase'

export function generateOTP() {
  const digits = '0123456789'
  let OTP = ''
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)]
  }

  return OTP
}

export function generateCode() {
  const codeCharacters = '0123456789abcdefghijklmnopqrstuvwxyz'
  let code = ''
  for (let i = 0; i < 4; i++) {
    code += codeCharacters[Math.floor(Math.random() * 10)]
  }
  return code
}

export async function generateOTPDoc({ otp, code, mobileNumber }: { otp: string; code: string; mobileNumber: string }) {
  const firestore = getFirestore()
  const otpCollectionRef = firestore.collection('otp')

  return otpCollectionRef.add({
    mobileNumber,
    otp,
    code,
    status: 'UNUSED',
    expiresAt: dayjs().add(5, 'minutes').toDate(),
    createdAt: dayjs().toDate(),
  })
}
