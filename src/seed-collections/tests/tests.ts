import firebase from 'firebase/app'
import 'firebase/firestore'
import * as testData from './tests.json'

const testsCollectionRef = firebase.firestore().collection('tests')

async function seedCollection() {
  for (const data of testData) {
    await testsCollectionRef.add(data)
  }
  console.log('Tests added to the collection.')
}

seedCollection()
  .then(() => {
    console.log('Seed process completed.')
  })
  .catch((error) => {
    console.error('Error seeding data:', error)
  })
