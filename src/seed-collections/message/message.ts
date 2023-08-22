import firebase from 'firebase/compat/app'
import 'firebase/firestore'
import * as messageData from './message.json'

const messageCollectionRef = firebase.firestore().collection('messages')

async function seedCollection() {
  for (const data of messageData) {
    await messageCollectionRef.add(data)
  }
  console.log('Message added to the collection.')
}

seedCollection()
  .then(() => {
    console.log('Seed process completed.')
  })
  .catch((error) => {
    console.error('Error seeding data:', error)
  })
