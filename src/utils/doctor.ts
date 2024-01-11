import { Doctor } from '@/types/doctor'
import { getFirestore } from './firebase'

export async function fetchDoctorById(doctorId: string) {
  const firestore = getFirestore()

  const doctorsCollection = firestore.collection('doctors')
  const doctor = await doctorsCollection.where('id', '==', doctorId).get()
  if (doctor.empty) {
    return null
  }

  const item = doctor.docs[0].data() as Doctor

  return item
}
