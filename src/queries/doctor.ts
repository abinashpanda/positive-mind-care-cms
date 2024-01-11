import { Doctor } from '@/types/doctor'
import { getFirestore } from '../utils/firebase'
import { EventType } from '@/types/event-type'

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

export async function fetchDoctorByCalendlyLink(calendlyLink: string) {
  const firestore = getFirestore()

  const doctorsCollection = firestore.collection('doctors')
  const doctor = await doctorsCollection.where('calendlyLink', '==', calendlyLink).get()
  if (doctor.empty) {
    return null
  }

  const item = doctor.docs[0].data() as Doctor

  return item
}

export async function fetchEventTypeFromCalendly(eventTypeUrl: string) {
  try {
    const response = await fetch(eventTypeUrl, {
      headers: {
        Authorization: `Bearer ${process.env.CALENDLY_ACCESS_TOKEN}`,
      },
    })

    const { resource } = (await response.json()) as { resource: EventType }

    return resource
  } catch (error) {
    return null
  }
}

export async function fetchDoctorByEventType(eventTypeUrl: string) {
  const eventType = await fetchEventTypeFromCalendly(eventTypeUrl)

  if (!eventType) {
    return null
  }

  const doctor = await fetchDoctorByCalendlyLink(eventType.scheduling_url)

  return doctor
}
