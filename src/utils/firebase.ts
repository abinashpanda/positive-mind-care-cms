import admin from 'firebase-admin'
import serviceAccount from '@/service-account.json'

declare global {
  // eslint-disable-next-line no-var
  var __admin:
    | {
        firestore: admin.firestore.Firestore | null
        auth: admin.auth.Auth | null
      }
    | undefined
}

// Persist admin
if (!global.__admin) {
  global.__admin = {
    firestore: null,
    auth: null,
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

  cache.firestore = admin.firestore()
  cache.auth = admin.auth()

  return cache.firestore
}

export function getAuth() {
  if (cache.auth) {
    return cache.auth
  }

  cache.firestore = admin.firestore()
  cache.auth = admin.auth()

  return cache.auth
}
