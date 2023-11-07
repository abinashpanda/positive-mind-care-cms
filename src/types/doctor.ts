export enum DoctorType {
  PSYCHOLOGIST = 'PSYCHOLOGIST',
  MEDITATION_EXPERT = 'MEDICATION_EXPERT',
}
export type Doctor = {
  id: string
  name: string
  description: string
  image: string
  type: DoctorType
  services: DoctorService[]
}

export enum DoctorServiceType {
  ONLINE = 'ONLINE',
  CLINIC_VISIT = 'CLINIC_VISIT',
}

export type DoctorService = {
  id: string
  name: string
  description: string
  price: Number
  url: string
  doctorId: string
  doctor: Doctor
}
