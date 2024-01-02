import { buildCollection, buildProperty } from 'firecms'
import { ComprehensiveTest } from '@/types/comprehensive-test'

const comprehensiveTestCollection = buildCollection<ComprehensiveTest>({
  name: 'Comprehensive Tests',
  singularName: 'Comprehensive Test',
  path: 'comprehensive-tests',
  permissions: () => ({
    edit: true,
    create: true,
    delete: true,
  }),
  properties: {
    id: buildProperty({
      dataType: 'string',
      name: 'ID',
      isGenerated: false,
    }),
    name: buildProperty({
      dataType: 'string',
      name: 'Name',
    }),
    description: buildProperty({
      dataType: 'string',
      name: 'Description',
    }),
    price: buildProperty({
      dataType: 'number',
      name: 'Price',
    }),
  },
})

export default comprehensiveTestCollection
