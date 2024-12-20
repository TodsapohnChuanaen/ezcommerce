import { defineStore } from 'pinia'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'

export const useAdminOrderStore = defineStore('admin-order', {
  state: () => ({
    list: [

    ],
  }),
  actions: {
    async loadOrders() {
      const orderRef = collection(db, 'orders')
      const orderSnapshot = await getDocs(orderRef)
      this.list = orderSnapshot.docs.map(doc => {
        let convertedOrder = doc.data()
        convertedOrder.orderId = doc.id
        convertedOrder.createdAt = convertedOrder.createdAt.toDate()
        return convertedOrder
      })
    },
    async getOrder(orderId) {
      const orderRef = doc(db, 'orders', orderId)
      const orderSnapshot = await getDoc(orderRef)
      let orderData = orderSnapshot.data()
      orderData.orderId = orderSnapshot.id
      orderData.createdAt = orderData.createdAt.toDate()
      return orderData
    }
  }
})