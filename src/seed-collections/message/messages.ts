import admin from 'firebase-admin'
import chalk from 'chalk'
import serviceAccount from '../service-account.json'
import messageData from './message.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
})
const firestore = admin.firestore()

async function main() {
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
