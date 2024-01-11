import { buildCollection, buildProperty } from 'firecms'
import { Appointment } from '@/types/appointment'

const appointmentCollection = buildCollection<Appointment>({
  name: 'Appointments',
  singularName: 'Appointment',
  path: 'aapointments',
  textSearchEnabled: true,
  permissions: () => ({
    edit: true,
    create: true,
    delete: true,
  }),
  properties: {
    user: buildProperty({
      dataType: 'reference',
      path: 'users',
      name: 'User',
    }),
    doctor: buildProperty({
      dataType: 'reference',
      path: 'doctors',
      name: 'Doctor',
    }),
    start_time: buildProperty({
      dataType: 'date',
      name: 'Start Date',
    }),
    end_time: buildProperty({
      dataType: 'date',
      name: 'End Date',
    }),
    status: buildProperty({
      dataType: 'string',
      name: 'Status',
      defaultValue: 'NOT_COMPLETED',
      enumValues: [
        {
          id: 'COMPLETED',
          label: 'Completed',
        },
        {
          id: 'RESCHEDULED',
          label: 'Rescheduled',
        },
        {
          id: 'NOT_COMPLETED',
          label: 'Not Completed',
        },
        {
          id: 'CANCELLED',
          label: 'Cancelled',
        },
      ],
    }),
    prescriptionText: buildProperty({
      dataType: 'string',
      name: 'Prescription Text',
    }),
    prescriptionImage: buildProperty({
      dataType: 'string',
      name: 'Prescription Image',
      storage: {
        mediaType: 'image',
        storagePath: 'appointment-images',
        acceptedFiles: ['image/*'],
        metadata: {
          cacheControl: 'max-age=1000000',
        },
      },
    }),
    prescriptionAction: buildProperty({
      dataType: 'array',
      name: 'Prescription Actions',
      of: {
        dataType: 'string',
        enumValues: [
          { id: 'BOOK_YOGA', label: 'Book Yoga' },
          { id: 'BOOK_COUNSELLING', label: 'Book Counselling' },
          { id: 'BOOK_DEEP_TMS', label: 'Book Deep TMS' },
        ],
      },
    }),
  },
})

export default appointmentCollection
