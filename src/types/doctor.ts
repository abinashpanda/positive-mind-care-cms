export enum DoctorType {
  PSYCHOLOGIST = 'PSYCHOLOGIST',
  MEDITATION_EXPERT = 'MEDICATION_EXPERT',
  PSYCHIATRIST = 'PSYCHIATRIST',
}
export type Doctor = {
  id: string
  name: string
  description: string
  image: string
  type: DoctorType
  services: DoctorService[]
  calendlyLink: string
}

export enum DoctorServiceType {
  ONLINE = 'ONLINE',
  CLINIC_VISIT = 'CLINIC_VISIT',
}

export type DoctorService = {
  id: string
  name: string
  description: string
  doctorServiceType: DoctorServiceType
  price: number
  url: string
  doctorId: string
  doctor: Doctor
}

export type DoctorCategory = {
  id: string
  type: DoctorType
  name: string
  description: string
  image: string
}
