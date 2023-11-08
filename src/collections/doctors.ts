import { buildCollection, buildProperty } from 'firecms'
import { Doctor, DoctorServiceType, DoctorType } from '@/types/doctor'

const doctorTypeValues = Object.values(DoctorType).map((category, index) => ({
  id: index.toString(),
  value: category,
  label: category,
}))
const doctorServiceTypeValues = Object.values(DoctorServiceType).map((category, index) => ({
  id: index.toString(),
  value: category,
  label: category,
}))

const doctorsCollection = buildCollection<Doctor>({
  name: 'Doctors',
  singularName: 'Doctor',
  path: 'doctors',
  textSearchEnabled: true,
  permissions: () => ({
    edit: true,
    create: true,
    delete: true,
  }),
  properties: {
    id: buildProperty({
      dataType: 'string',
      name: 'ID',
      isGenerated: true,
      hideInTable: true,
    }),
    name: buildProperty({
      dataType: 'string',
      name: 'Name',
    }),
    image: buildProperty({
      dataType: 'string',
      name: 'Image',
      storage: {
        mediaType: 'image',
        storagePath: 'doctor-images',
        acceptedFiles: ['image/*'],
        metadata: {
          cacheControl: 'max-age=1000000',
        },
      },
    }),
    description: buildProperty({
      dataType: 'string',
      name: 'Description',
    }),
    type: buildProperty({
      dataType: 'string',
      name: 'Doctor Type',
      enumValues: doctorTypeValues,
    }),
    services: buildProperty({
      dataType: 'array',
      name: 'Doctor Services',
      of: {
        dataType: 'map',
        properties: {
          id: buildProperty({
            dataType: 'string',
            name: 'ID',
            isGenerated: true,
            hideInTable: true,
          }),

          name: buildProperty({
            dataType: 'string',
            name: 'Name',
          }),

          description: buildProperty({
            dataType: 'string',
            name: 'Description',
          }),
          doctorServiceType: buildProperty({
            dataType: 'string',
            name: 'Doctor Service Type',
            enumValues: doctorServiceTypeValues,
          }),

          price: buildProperty({
            dataType: 'number',
            name: 'Price',
          }),

          url: buildProperty({
            dataType: 'string',
            name: 'url',
          }),
          doctorId: buildProperty({
            dataType: 'string',
            name: 'Doctor Id',
          }),
        },
      },
    }),
  },
})

export default doctorsCollection
