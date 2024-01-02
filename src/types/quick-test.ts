export type QuickTest = {
  id: string
  name: string
  image: string
  questions: Question[]
  scores: Score[]
}

type Question = {
  questionEnglish: string
  questionHindi: string
  answers: Answer[]
}

type Answer = {
  answerEnglish: string
  answerHindi: string
  score: number
  image: string
}

type Score = {
  min: number
  max: number
  name: string
  message: string
  color: string
}
