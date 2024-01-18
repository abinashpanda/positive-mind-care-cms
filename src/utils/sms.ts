import { env } from '@/env.mjs'

export async function sendSMS({ mobileNumber, message }: { mobileNumber: string; message: string }) {
  try {
    const response = await fetch(
      `http://164.52.195.161/API/SendMsg.aspx?uname=${env.SMS_UNAME}&pass=${env.SMS_PASS}&send=${env.SMS_SENDER_ID}&dest=${mobileNumber}&msg=${message}`,
    )

    const jsonRes = await response.json()

    console.log(jsonRes)
  } catch (error) {
    console.log(error)
  }
}
