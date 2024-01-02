import chalk from 'chalk'
import testData from './tests.json'
import { getFirestore } from '@/utils/firebase'

async function main() {
  const firestore = getFirestore()
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
