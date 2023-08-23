import firebase from 'firebase/compat/app'
import 'firebase/firestore'
import * as serviceData from './service.json'

const serviceCollectionRef = firebase.firestore().collection('services')

async function seedCollection() {
  for (const data of serviceData) {
    await serviceCollectionRef.add(data)
  }
  console.log('Service added to the collection.')
}

seedCollection()
  .then(() => {
    console.log('Seed process completed.')
  })
  .catch((error) => {
    console.error('Error seeding data:', error)
  })
