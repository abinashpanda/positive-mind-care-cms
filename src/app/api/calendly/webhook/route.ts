import { NextResponse } from 'next/server'
import { z } from 'zod'
import dayjs from 'dayjs'
import { getAuth, getFirestore } from '@/utils/firebase'
import { fetchDoctorByEventType } from '@/queries/doctor'
import { isOrderPurchased } from '@/queries/order'
import { cancelAppointment } from '@/queries/appointment'
import { sendWhatsappMessageByTemplate } from '@/utils/whatsapp'

const webhookSchema = z.object({
  created_at: z.string(),
  event: z.enum(['invitee.created', 'invitee.canceled']),
  payload: z.object({
    email: z.string().email(),
    name: z.string(),
    cancel_url: z.string().optional(),
    reschedule_url: z.string().optional(),
    rescheduled: z.boolean().optional().default(false),
    scheduled_event: z.object({
      start_time: z.string(),
      end_time: z.string(),
      name: z.string(),
      event_type: z.string().url(),
    }),
  }),
})

export async function POST(request: Request) {
  const data = await request.json()

  const result = webhookSchema.safeParse(data)
  if (!result.success) {
    return NextResponse.json({ message: 'Received invalid response from webhook' }, { status: 200 })
  }

  const auth = getAuth()
  const { users } = await auth.listUsers()
  const user = users.find((user) => user.email === result.data.payload.email)
  if (!user) {
    return NextResponse.json({ message: 'User not found!' }, { status: 404 })
  }

  const doctor = await fetchDoctorByEventType(result.data.payload.scheduled_event.event_type)
  if (!doctor) {
    return NextResponse.json({ message: 'Doctor not found!' }, { status: 404 })
  }

  const firestore = getFirestore()
  const appointmentCollectionRef = firestore.collection('appointments')

  /** In case if an appointment is cancelled */
  if (result.data.event === 'invitee.canceled') {
    await cancelAppointment(user.uid, doctor.id)

    return NextResponse.json({ message: 'Appointment cancelled' }, { status: 200 })
  }

  const purchasedOrder = await isOrderPurchased(user.uid, doctor.id)
  if (!purchasedOrder) {
    return NextResponse.json({ message: 'Order not found!' }, { status: 404 })
  }

  try {
    const startTime = result.data.payload.scheduled_event.start_time

    await appointmentCollectionRef.add({
      user: user.uid,
      doctor: doctor.id,
      startTime,
      endTime: result.data.payload.scheduled_event.end_time,
      status: 'NOT_COMPLETED',
      cancelUrl: result.data.payload.cancel_url,
      rescheduleUrl: result.data.payload.reschedule_url,
    })

    // Sending whatsapp confirmation for booking
    await sendWhatsappMessageByTemplate({
      to: user.phoneNumber!,
      templateName: 'appointment_conf',
      components: [
        {
          type: 'body',
          parameters: [
            {
              type: 'text',
              text: doctor.name,
            },
            {
              type: 'text',
              text: dayjs(startTime).format('DD/MM/YYY'),
            },
            {
              type: 'text',
              text: dayjs(startTime).format('hh:mm A'),
            },
            {
              type: 'text',
              text: 'Positive Mind Care',
            },
          ],
        },
      ],
    })

    return NextResponse.json({ message: 'Appointment created successfully!' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
