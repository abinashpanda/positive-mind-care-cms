'use client'

import { useCallback } from 'react'
import { User as FirebaseUser } from 'firebase/auth'
import { Authenticator, FirebaseCMSApp } from 'firecms'
import 'typeface-rubik'
import '@fontsource/ibm-plex-mono'
import { env } from '@/env.mjs'
import servicesCollection from '@/collections/service'
import messageCollection from '@/collections/messages'
import testsCollection from '@/collections/tests'
import questionCollection from '@/collections/question'
import scoreCollection from '@/collections/score'
import doctorsCollection from '@/collections/doctors'
import doctorCategoriesCollection from '@/collections/doctor-categories'
import blogCollection from '@/collections/blog'
import pmcTestCollection from '@/collections/pmc-test'

const firebaseConfig = {
  apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export default function CMS() {
  const appAuthenticator: Authenticator<FirebaseUser> = useCallback(async () => {
    // TODO: Add list of users that can access the CMS
    return true
  }, [])

  return (
    <FirebaseCMSApp
      name={'Positive Mind Care'}
      basePath={'/cms'}
      authentication={appAuthenticator}
      collections={[
        servicesCollection,
        messageCollection,
        testsCollection,
        questionCollection,
        scoreCollection,
        doctorsCollection,
        doctorCategoriesCollection,
        blogCollection,
        pmcTestCollection
      ]}
      firebaseConfig={firebaseConfig}
    />
  )
}
