import { buildCollection, buildProperty } from 'firecms'
import { PmcTest } from '@/types/pmc-test'

const pmcTestCollection = buildCollection<PmcTest>({
  name: 'Pmc Test',
  singularName: 'pmcTest',
  path: 'pmcTest',
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

    url: buildProperty({
      dataType: 'string',
      name: 'url',
    }),
    image: buildProperty({
      dataType: 'string',
      name: 'Image',
      storage: {
        mediaType: 'image',
        storagePath: 'pmc-test-images',
        acceptedFiles: ['image/*'],
        metadata: {
          cacheControl: 'max-age=1000000',
        },
      },
    }),
  },
})
export default pmcTestCollection
