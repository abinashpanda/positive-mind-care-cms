import { buildCollection, buildProperty } from 'firecms'
import { QuickTest } from '@/types/quick-test'

const quickTestCollection = buildCollection<QuickTest>({
  name: 'Quick Tests',
  singularName: 'Quick Test',
  path: 'quick-tests',
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
        storagePath: 'quick-test-images',
        acceptedFiles: ['image/*'],
        metadata: {
          cacheControl: 'max-age=1000000',
        },
      },
    }),
    questionImage: buildProperty({
      dataType: 'string',
      name: 'Question Image',
      storage: {
        mediaType: 'image',
        storagePath: 'quick-test-images',
        acceptedFiles: ['image/*'],
        metadata: {
          cacheControl: 'max-age=1000000',
        },
      },
    }),
    questions: buildProperty({
      dataType: 'array',
      name: 'Questions',
      of: {
        dataType: 'map',
        properties: {
          questionEnglish: buildProperty({
            dataType: 'string',
            name: 'Question English',
          }),
          questionHindi: buildProperty({
            dataType: 'string',
            name: 'Question Hindi',
          }),
          answers: buildProperty({
            dataType: 'array',
            name: 'Answers',
            of: {
              dataType: 'map',
              properties: {
                answerEnglish: buildProperty({
                  dataType: 'string',
                  name: 'Answer English',
                }),
                answerHindi: buildProperty({
                  dataType: 'string',
                  name: 'Answer Hindi',
                }),
                score: buildProperty({
                  dataType: 'number',
                  name: 'Score',
                }),
              },
            },
          }),
        },
      },
    }),
    scores: buildProperty({
      dataType: 'array',
      name: 'Scores',
      of: {
        dataType: 'map',
        properties: {
          min: buildProperty({
            dataType: 'number',
            name: 'Minimum',
          }),
          max: buildProperty({
            dataType: 'number',
            name: 'Maximum',
          }),
          name: buildProperty({
            dataType: 'string',
            name: 'Name',
          }),
          message: buildProperty({
            dataType: 'string',
            name: 'Message',
          }),
          color: buildProperty({
            dataType: 'string',
            name: 'Color',
          }),
        },
      },
    }),
  },
})

export default quickTestCollection
