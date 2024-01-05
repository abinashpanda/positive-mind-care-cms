import admin from 'firebase-admin'
import { env } from '@/env.mjs'

declare global {
  // eslint-disable-next-line no-var
  var __firebaseAdmin: admin.app.App | undefined
}

const firebaseAdmin =
  global.__firebaseAdmin ||
  admin.initializeApp({
    credential: admin.credential.cert({
      clientEmail: env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: env.FIREBASE_ADMIN_PRIVATE_KEY,
      projectId: env.FIREBASE_ADMIN_PROJECT_ID,
    } as admin.ServiceAccount),
  })

if (process.env.NODE_ENV === 'development') {
  global.__firebaseAdmin = firebaseAdmin
}

/**
 * Gets the firestore instance
 */
export function getFirestore() {
  return firebaseAdmin.firestore()
}

export function getAuth() {
  return firebaseAdmin.auth()
}
