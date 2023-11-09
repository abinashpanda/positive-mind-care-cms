import { buildCollection, buildProperty } from 'firecms'
import { DoctorCategory, DoctorType } from '@/types/doctor'

const doctorTypeValues = Object.values(DoctorType).map((category, index) => ({
  id: index.toString(),
  value: category,
  label: category,
}))

const doctorCategoriesCollection = buildCollection<DoctorCategory>({
  name: 'Doctor Categories',
  singularName: 'Doctor Category',
  path: 'doctor-categories',
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
        storagePath: 'doctor-categories',
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
  },
})

export default doctorCategoriesCollection
