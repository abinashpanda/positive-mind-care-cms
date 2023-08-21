import { AgeGroup, Gender, QuestionCategory } from './question'

export enum Grade {
  GOODc = 'GOOD',
  MILD = 'MILD',
  MODERATE = 'MODERATE',
  SEVERE = 'SEVERE',
}

export type ScoreChartItem = {
  age: AgeGroup
  gender: Gender
  category: QuestionCategory
  gradeCriteria: {
    grade: Grade
    min: number
    max: number
  }[]
}

export type ScoreChart = ScoreChartItem[]

export type ScoreMessage = {
  age: AgeGroup
  gender: Gender
  category: QuestionCategory
  grade: Grade
  message: string
}
