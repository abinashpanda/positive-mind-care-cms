import chalk from 'chalk'
import scoreData from './score.json'
import { getFirestore } from '@/utils/firebase'

async function main() {
  const firestore = getFirestore()
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
