import admin from 'firebase-admin'
import serviceAccount from '@/service-account.json'

declare global {
  // eslint-disable-next-line no-var
  var __admin:
    | {
        firestore: admin.firestore.Firestore | null
      }
    | undefined
}

// Persist admin
if (!global.__admin) {
  global.__admin = {
    firestore: null,
  }
}

const cache = global.__admin

/**
 * Gets the firestore instance
 */
export function getFirestore() {
  // Return cached firestore if it exists
  if (cache.firestore) {
    return cache.firestore
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  })

  // Wait for client to be initialized
  cache.firestore = admin.firestore()
  return cache.firestore
}
