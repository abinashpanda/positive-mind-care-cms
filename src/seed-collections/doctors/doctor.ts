import admin from 'firebase-admin'
import chalk from 'chalk'
// @ts-expect-error
import serviceAccount from '../service-account.json'
import doctorsData from './doctor.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
})
const firestore = admin.firestore()

async function main() {
  const servicesCollectionRef = firestore.collection('doctors')
  for (const doctor of doctorsData) {
    // @ts-expect-error
    // eslint-disable-next-line no-console
    console.log(chalk.blue(`🕐 Adding doctor:\t\t\t${doctor.doctor.name}`))
    try {
      await servicesCollectionRef.add(doctor)
      // @ts-expect-error
      // eslint-disable-next-line no-console
      console.log(chalk.green(`✅ Successfully added doctor:\t${doctor.doctor.name}`))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      // @ts-expect-error
      // eslint-disable-next-line no-console
      console.log(chalk.red(`❌ Error adding doctor:\t\t${doctor.doctor.name}`))
    }
  }
}

main()
