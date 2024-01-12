import { getFirestore } from '@/utils/firebase'

export async function isOrderPurchased(userId: string, doctorId: string) {
  const firestore = getFirestore()

  const purchasedOrderCollectionRef = firestore.collection('purchasedOrders')
  const result = await purchasedOrderCollectionRef.where('userId', '==', userId).where('entityId', '==', doctorId).get()
  if (result.empty) {
    return null
  }

  return result.docs[0].data()
}
