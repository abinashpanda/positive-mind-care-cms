import { getFirestore } from '@/utils/firebase'

export async function cancelAppointment(userId: string, doctorId: string) {
  const firestore = getFirestore()

  const appointmentCollection = firestore.collection('appointments')
  const appointment = await appointmentCollection.where('user', '==', userId).where('doctor', '==', doctorId).get()
  if (appointment.empty) {
    return null
  }

  const data = appointment.docs[0].data()

  await appointment.docs[0].ref.set({
    ...data,
    status: 'CANCELLED',
  })

  return data
}
