import admin from 'firebase-admin'
import chalk from 'chalk'
import serviceAccount from '../service-account.json'
import scoreData from './score.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
})
const firestore = admin.firestore()

async function main() {
  const scoreCollectionRef = firestore.collection('score')
  for (const score of scoreData) {
    // eslint-disable-next-line no-console
    console.log(chalk.blue(`🕐 Adding score:\t\t\t${score.category}`))
    try {
      await scoreCollectionRef.add(score)
      // eslint-disable-next-line no-console
      console.log(chalk.green(`✅ Successfully added score:\t${score.category}`))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      // eslint-disable-next-line no-console
      console.log(chalk.red(`❌ Error adding score:\t\t${score.category}`))
    }
  }
}

main()
