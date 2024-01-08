/* eslint-disable import/first  */
/* eslint-disable no-console */

import dotenv from 'dotenv'
dotenv.config()

import admin from 'firebase-admin'
import chalk from 'chalk'
import ocdTest from './ocd.json'
import anxietyTest from './anxiety.json'
import alcoholTest from './alcohol-addiction.json'
import depressionTest from './depression.json'

const TESTS = [ocdTest, anxietyTest, alcoholTest, depressionTest]

const app = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY
      ? Buffer.from(process.env.FIREBASE_ADMIN_PRIVATE_KEY, 'base64').toString()
      : undefined,
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  } as admin.ServiceAccount),
})

const firestore = app.firestore()

async function main() {
  const quickTestCollection = firestore.collection('quick-tests')

  for (const test of TESTS) {
    console.log(chalk.blue(`🕐 Adding Test:\t\t\t${test.name}`))

    try {
      await quickTestCollection.add({
        id: test.name.toLowerCase().replaceAll(' ', '-'),
        name: test.name,
        questions: test.questions.map((question) => ({
          questionEnglish: question.title,
          questionHindi: question.title,
          answers: question.options.map((option) => ({
            answerEnglish: option.label,
            answerHindi: option.label,
            score: option.weightage,
          })),
        })),
        scores: test.scores,
      })

      console.log(chalk.green(`✅ Successfully added test:\t${test.name}`))
    } catch (error) {
      console.log(error)
      console.log(chalk.red(`❌ Error adding test:\t\t${test.name}`))
    }
  }
}

main()
