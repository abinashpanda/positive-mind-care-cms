import admin from 'firebase-admin'
import chalk from 'chalk'
import serviceAccount from '../service-account.json'
import questionData from './question.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
})
const firestore = admin.firestore()

async function main() {
  const questionsCollectionRef = firestore.collection('questions')
  for (const question of questionData) {
    // eslint-disable-next-line no-console
    console.log(chalk.blue(`🕐 Adding question:\t\t\t${question.title}`))
    try {
      await questionsCollectionRef.add(question)
      // eslint-disable-next-line no-console
      console.log(chalk.green(`✅ Successfully added question:\t${question.title}`))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      // eslint-disable-next-line no-console
      console.log(chalk.red(`❌ Error adding question:\t\t${question.title}`))
    }
  }
}

main()
