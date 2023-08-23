export enum QuestionCategory {
  PERSONAL_SOCIAL_FAMILY_RELATIONSHIP = 'PERSONAL SOCIAL FAMILY RELATIONSHIP',
  PROFESSION_CAREER_PURPOSE = 'PROFESSION CAREER PURPOSE',
  SURROUNDING_SECURITY_COMMUNITY = 'SURROUNDING SECURITY COMMUNITY',
  HEALTH_RELATED = 'HEALTH RELATED',
  ETHICS_AND_SPIRITUALITY = 'ETHICS AND SPIRITUALITY',
}

export enum AgeGroup {
  UNDER_17 = 'UNDER 17',
  YOUNG_ADULTS = 'YOUNG ADULTS',
  ADULTS = 'ADULTS',
  MIDDLE_AGE = 'MIDDLE AGE',
  OLD_AGE = 'OLD AGE',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export type Question = {
  question: string
  options: { option: string; value: number }[]
}

export type Criteria = {
  category: QuestionCategory
  age: AgeGroup
  gender: Gender
}

export type QuestionGroup = {
  criteria: Criteria[]
  title: string
  questions: Question[]
}
