import { AgeGroup, Gender, QuestionCategory } from './question'
import { Grade } from './score'

export type Message = {
  age: AgeGroup
  gender: Gender
  grade: Grade
  questionCategory: QuestionCategory
  message: string
}
