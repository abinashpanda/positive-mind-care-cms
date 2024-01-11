export type Appointment = {
  user: any // @TODO: Figure out correct type
  doctor: any
  start_time: Date
  end_time: Date
  status: 'COMPLETED' | 'RESCHEDULED' | 'NOT_COMPLETED' | 'CANCELLED'
  prescriptionText: string
  prescriptionImage: string
  prescriptionAction: ('BOOK_YOGA' | 'BOOK_COUNSELLING' | 'BOOK_DEEP_TMS')[]
  cancel_url: string
  reschedule_url: string
}
