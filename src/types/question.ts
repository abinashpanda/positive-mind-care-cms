export enum QuestionCategory {
  PERSONAL_SOCIAL_FAMILY_RELATIONSHIP = 'PERSONAL_SOCIAL_FAMILY_RELATIONSHIP',
  PROFESSION_CAREER_PURPOSE = 'PROFESSION_CAREER_PURPOSE',
  SURROUNDING_SECURITY_COMMUNITY = 'SURROUNDING_SECURITY_COMMUNITY',
  HEALTH_RELATED = 'HEALTH_RELATED',
  ETHICS_AND_SPIRITUALITY = 'ETHICS_AND_SPIRITUALITY',
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
