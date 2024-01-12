import { EntityReference } from 'firecms'

export type Appointment = {
  user: EntityReference
  doctor: EntityReference
  startTime: Date
  endTime: Date
  status: 'COMPLETED' | 'RESCHEDULED' | 'NOT_COMPLETED' | 'CANCELLED'
  prescriptionText: string
  prescriptionImage: string
  prescriptionAction: ('BOOK_YOGA' | 'BOOK_COUNSELLING' | 'BOOK_DEEP_TMS')[]
  cancelUrl: string
  rescheduleUrl: string
}
