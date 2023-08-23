import firebase from 'firebase/compat/app'
import 'firebase/firestore'
import * as questionData from './question.json'

const questionCollectionRef = firebase.firestore().collection('questions')

async function seedCollection() {
  for (const data of questionData) {
    await questionCollectionRef.add(data)
  }
  console.log('Question added to the collection.')
}

seedCollection()
  .then(() => {
    console.log('Seed process completed.')
  })
  .catch((error) => {
    console.error('Error seeding data:', error)
  })
