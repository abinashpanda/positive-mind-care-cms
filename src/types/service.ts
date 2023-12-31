export enum ServiceDuration {
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  HALF_YEARLY = 'HALF YEARLY',
  YEARLY = 'YEARLY',
}

export enum ServiceType {
  PSYCHOLOGICAL_COUNSELLING = 'PSYCHOLOGICAL COUNSELLING',
  MINDFULLNESS = 'MINDFULLNESS',
  CLINICAL_TREATMENT = 'CLINICAL TREATMENT',
}

export type ServicePrice = {
  id: string
  price: number
  name: string
  description: string
  duration: ServiceDuration
  shopLink?: string
}

export type Service = {
  id: string
  image: string
  name: string
  description: string
  serviceType: ServiceType
  price: ServicePrice[]
}
