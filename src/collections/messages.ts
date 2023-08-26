import { buildCollection, buildProperty } from 'firecms'
import { AgeGroup, Gender, QuestionCategory } from '@/types/question'
import { Grade } from '@/types/score'
import { Message } from '@/types/message'

const ageGroupValues = Object.values(AgeGroup).map((age) => ({
  id: age,
  value: age,
  label: age,
}))

const genderValues = Object.values(Gender).map((gender) => ({
  id: gender,
  value: gender,
  label: gender,
}))

const gradeValues = Object.values(Grade).map((grade) => ({
  id: grade,
  value: grade,
  label: grade,
}))

const questionCategoryValues = Object.values(QuestionCategory).map((questionCategory) => ({
  id: questionCategory,
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
