import admin from 'firebase-admin'
import chalk from 'chalk'
import serviceAccount from '../service-account.json'
import testData from './tests.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
})
const firestore = admin.firestore()

async function main() {
  const testsCollectionRef = firestore.collection('tests')
  for (const test of testData) {
    // eslint-disable-next-line no-console
    console.log(chalk.blue(`🕐 Adding test:\t\t\t${test.title}`))
    try {
      await testsCollectionRef.add(test)
      // eslint-disable-next-line no-console
      console.log(chalk.green(`✅ Successfully added test:\t${test.title}`))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      // eslint-disable-next-line no-console
      console.log(chalk.red(`❌ Error adding test:\t\t${test.title}`))
    }
  }
}

main()
