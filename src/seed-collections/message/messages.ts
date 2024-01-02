import chalk from 'chalk'
import messageData from './message.json'
import { getFirestore } from '@/utils/firebase'

async function main() {
  const firestore = getFirestore()
  const messagesCollectionRef = firestore.collection('messages')
  for (const message of messageData) {
    // eslint-disable-next-line no-console
    console.log(chalk.blue(`🕐 Adding message:\t\t\t${message.age}`))
    try {
      await messagesCollectionRef.add(message)
      // eslint-disable-next-line no-console
      console.log(chalk.green(`✅ Successfully added message:\t${message.age}`))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      // eslint-disable-next-line no-console
      console.log(chalk.red(`❌ Error adding message:\t\t${message.age}`))
    }
  }
}

main()
