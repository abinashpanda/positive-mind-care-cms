import { buildCollection, buildProperty } from 'firecms'
import { Service, ServiceDuration, ServiceType } from '@/types/service'

const serviceTypeValues = Object.values(ServiceType).map((category, index) => ({
  id: index.toString(),
  value: category,
  label: category,
}))

const serviceDurationValues = Object.values(ServiceDuration).map((category, index) => ({
  id: index.toString(),
  value: category,
  label: category,
}))

const servicesCollection = buildCollection<Service>({
  name: 'Services',
  singularName: 'Service',
  path: 'services',
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
        storagePath: 'service-images',
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
    serviceType: buildProperty({
      dataType: 'string',
      name: 'Service Type',
      enumValues: serviceTypeValues,
    }),
    price: buildProperty({
      dataType: 'array',
      name: 'Price',
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
          price: buildProperty({
            dataType: 'number',
            name: 'Price',
          }),
          description: buildProperty({
            dataType: 'string',
            name: 'Description',
          }),
          duration: buildProperty({
            dataType: 'string',
            name: 'Duration',
            enumValues: serviceDurationValues,
          }),
          shopLink: buildProperty({
            dataType: 'string',
            name: 'Shop Link',
          }),
          servicePriceImage: buildProperty({
            dataType: 'string',
            name: 'Service Price Image',
            storage: {
              mediaType: 'image',
              storagePath: 'service-price-images',
              acceptedFiles: ['image/*'],
              metadata: {
                cacheControl: 'max-age=1000000',
              },
            },
          }),
        },
      },
    }),
  },
})

export default servicesCollection
