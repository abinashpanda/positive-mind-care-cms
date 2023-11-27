import { NextResponse } from 'next/server'

const BASE_URL = 'https://api.instamojo.com'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const phone = searchParams.get('phone')

  if (!phone) {
    return NextResponse.json({ status: 'error', message: 'Phone number with is required' }, { status: 400 })
  }

  const client_id = process.env.INSTAMOJO_CLIENT_ID
  const client_secret = process.env.INSTAMOJO_CLIENT_SECRET
  const phoneWithCountryCode = `+91${phone}`

  try {
    /** Generating access token */
    const res = await fetch(`${BASE_URL}/oauth2/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grant_type: 'client_credentials', client_id, client_secret }),
    })
    const tokenData = await res.json()

    if (tokenData?.error) {
      return NextResponse.json({ status: 'error', message: tokenData.error }, { status: 400 })
    }

    /** Getting all payments */
    const paymentResponse = await fetch(`${BASE_URL}/v2/payments/`, {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    })
    const paymentsData = await paymentResponse.json()

    /** Filtering for mobile number */
    const filteredPayments = paymentsData.payments.filter((item: any) => item.phone === phoneWithCountryCode)

    return NextResponse.json({ status: 'success', data: filteredPayments })
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Something went wrong!' }, { status: 500 })
  }
}
