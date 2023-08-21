export enum ServiceDuration {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  HALF_YEARLY = 'HALF_YEARLY',
  YEARLY = 'YEARLY',
}

export enum ServiceType {
  PSYCHOLOGICAL_COUNSELLING = 'PSYCHOLOGICAL_COUNSELLING',
  MINDFULLNESS = 'MINDFULLNESS',
  CLINICAL_TREATMENT = 'CLINICAL_TREATMENT',
}

export type ServicePrice = {
  id: string
  price: number
  name: string
  description: string
  duration: ServiceDuration
}

export type Service = {
  id: string
  image: string
  name: string
  description: string
  serviceType: ServiceType
  price: ServicePrice[]
}
