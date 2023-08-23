import { AgeGroup, Gender, QuestionCategory } from './question'

export enum Grade {
  GOOD = 'GOOD',
  MILD = 'MILD',
  MODERATE = 'MODERATE',
  SEVERE = 'SEVERE',
}

export type GradeCriteria = {
  grade: Grade
  min: number
  max: number
}

export type ScoreChartItem = {
  age: AgeGroup
  gender: Gender
  category: QuestionCategory
  gradeCriteria: GradeCriteria[]
}

export type ScoreChart = ScoreChartItem[]

export type ScoreMessage = {
  age: AgeGroup
  gender: Gender
  category: QuestionCategory
  grade: Grade
  message: string
}
