import { buildCollection, buildProperty } from 'firecms'
import { AgeGroup, Gender, QuestionCategory, QuestionGroup } from '@/types/question'

const ageGroupValues = Object.values(AgeGroup).map((age, index) => ({
  id: index.toString(),
  value: age,
  label: age,
}))

const genderValues = Object.values(Gender).map((gender, index) => ({
  id: index.toString(),
  value: gender,
  label: gender,
}))

const questionCategoryValues = Object.values(QuestionCategory).map((questionCategory, index) => ({
  id: index.toString(),
  value: questionCategory,
  label: questionCategory,
}))

const questionCollection = buildCollection<QuestionGroup>({
  name: 'Questions',
  singularName: 'Question',
  path: 'questions',
  textSearchEnabled: true,
  permissions: () => ({
    edit: true,
    create: true,
    delete: true,
  }),
  properties: {
    criteria: buildProperty({
      dataType: 'array',
      name: 'Criteria',
      of: {
        dataType: 'map',
        properties: {
          category: buildProperty({
            dataType: 'string',
            name: 'Category',
            enumValues: questionCategoryValues,
          }),
          age: buildProperty({
            dataType: 'string',
            name: 'Age',
            enumValues: ageGroupValues,
          }),
          gender: buildProperty({
            dataType: 'string',
            name: 'Gender',
            enumValues: genderValues,
          }),
        },
      },
    }),
    title: buildProperty({
      dataType: 'string',
      name: 'Title',
      required: true,
    }),
    questions: buildProperty({
      dataType: 'array',
      name: 'Questions',
      of: {
        dataType: 'map',
        properties: {
          question: buildProperty({
            dataType: 'string',
            name: 'Question',
          }),
          options: buildProperty({
            dataType: 'array',
            name: 'Options',
            of: {
              dataType: 'map',
              properties: {
                option: buildProperty({
                  dataType: 'string',
                  name: 'Option',
                }),
                value: buildProperty({
                  dataType: 'number',
                  name: 'Value',
                }),
              },
            },
          }),
        },
      },
      required: true,
    }),
  },
})

export default questionCollection
