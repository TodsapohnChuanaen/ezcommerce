import { defineStore } from 'pinia'
import { collection, getDocs, query, where, onSnapshot } from "firebase/firestore";
import { db } from '@/firebase'

export const useProductStore = defineStore('product-users', {
  state: () => ({
    list: []
  }),
  actions: {
    filterProducts(searchText) {
      return this.list.filter(product => product.name.includes(searchText))
    },
    async loadProducts() {
      const productCol = query(collection(db, "products"), where("status", "==", "open"));
      // const productSnapshot = await getDocs(productCol);
      // const products = productSnapshot.docs.map(doc => {
      //   let convertedData = doc.data()
      //   convertedData.productId = doc.id
      //   return convertedData
      // });
      // if(products.length > 0) {
      //     this.list = products
      //     // this.list = JSON.parse(products)
      //     this.loaded = true
      // }

      //for firestore realtime
      onSnapshot(productCol, (productSnapshot) => {
        const products = productSnapshot.docs.map(doc => {
          const convertedData = doc.data()
          convertedData.productId = doc.id
          return convertedData
        })
        this.list = products
      })
    }
  }
})
