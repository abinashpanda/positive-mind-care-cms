import { buildCollection, buildProperty } from 'firecms'
import { AgeGroup, Gender, QuestionCategory } from '@/types/question'
import { Grade } from '@/types/score'
import { Message } from '@/types/message'

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

const gradeValues = Object.values(Grade).map((grade, index) => ({
  id: index.toString(),
  value: grade,
  label: grade,
}))

const questionCategoryValues = Object.values(QuestionCategory).map((questionCategory, index) => ({
  id: index.toString(),
  value: questionCategory,
  label: questionCategory,
}))

const messageCollection = buildCollection<Message>({
  name: 'Messages',
  singularName: 'Message',
  path: 'messages',
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
    grade: buildProperty({
      dataType: 'string',
      name: 'Grade',
      enumValues: gradeValues,
    }),
    questionCategory: buildProperty({
      dataType: 'string',
      name: 'Question Category',
      enumValues: questionCategoryValues,
    }),
    message: buildProperty({
      dataType: 'string',
      name: 'Message',
    }),
  },
})

export default messageCollection
