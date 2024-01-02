import chalk from 'chalk'
import serviceData from './service.json'
import { getFirestore } from '@/utils/firebase'

async function main() {
  const firestore = getFirestore()
  const servicesCollectionRef = firestore.collection('services')
  for (const service of serviceData) {
    // eslint-disable-next-line no-console
    console.log(chalk.blue(`🕐 Adding service:\t\t\t${service.name}`))
    try {
      await servicesCollectionRef.add(service)
      // eslint-disable-next-line no-console
      console.log(chalk.green(`✅ Successfully added service:\t${service.name}`))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      // eslint-disable-next-line no-console
      console.log(chalk.red(`❌ Error adding service:\t\t${service.name}`))
    }
  }
}

main()
