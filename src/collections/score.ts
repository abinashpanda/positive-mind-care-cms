import { buildCollection, buildProperty } from 'firecms'
import { AgeGroup, Gender, QuestionCategory } from '@/types/question'
import { Grade, ScoreChartItem } from '@/types/score'

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

const gradeValues = Object.values(Grade).map((grade, index) => ({
  id: index.toString(),
  value: grade,
  label: grade,
}))

const scoreCollection = buildCollection<ScoreChartItem>({
  name: 'Score',
  singularName: 'Score',
  path: 'score',
  textSearchEnabled: true,
  permissions: () => ({
    edit: true,
    create: true,
    delete: true,
  }),
  properties: {
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
    category: buildProperty({
      dataType: 'string',
      name: 'Question Category',
      enumValues: questionCategoryValues,
    }),
    gradeCriteria: buildProperty({
      dataType: 'map',
      name: 'Grade Criteria',
      properties: {
        grade: buildProperty({
          dataType: 'string',
          name: 'Grade',
          enumValues: gradeValues,
        }),
        min: buildProperty({
          dataType: 'number',
          name: 'Min',
        }),
        max: buildProperty({
          dataType: 'number',
          name: 'Max',
        }),
      },
    }),
  },
})

export default scoreCollection
