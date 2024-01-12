export type Appointment = {
  user: any // @TODO: Figure out correct type
  doctor: any
  startTime: Date
  endTime: Date
  status: 'COMPLETED' | 'RESCHEDULED' | 'NOT_COMPLETED' | 'CANCELLED'
  prescriptionText: string
  prescriptionImage: string
  prescriptionAction: ('BOOK_YOGA' | 'BOOK_COUNSELLING' | 'BOOK_DEEP_TMS')[]
  cancelUrl: string
  rescheduleUrl: string
}
