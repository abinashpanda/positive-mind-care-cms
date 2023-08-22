import { buildCollection, buildProperty } from 'firecms'
import { QuestionCategory } from '@/types/question'
import { Tests } from '@/types/tests'

const questionCategoryValues = Object.values(QuestionCategory).map((questionCategory, index) => ({
  id: index.toString(),
  value: questionCategory,
  label: questionCategory,
}))

const testsCollection = buildCollection<Tests>({
  name: 'Tests',
  singularName: 'Tests',
  path: 'tests',
  textSearchEnabled: true,
  permissions: () => ({
    edit: true,
    create: true,
    delete: true,
  }),
  properties: {
    title: buildProperty({
      dataType: 'string',
      name: 'Title',
    }),
    description: buildProperty({
      dataType: 'string',
      name: 'Description',
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
    questionCategory: buildProperty({
      dataType: 'string',
      name: 'Question Category',
      enumValues: questionCategoryValues,
    }),
    animation: buildProperty({
      dataType: 'string',
      name: 'Animation',
      storage: {
        mediaType: 'application/json',
        storagePath: 'service-animations',
        acceptedFiles: ['application/json'],
        metadata: {
          cacheControl: 'max-age=1000000',
        },
      },
    }),
  },
})

export default testsCollection
