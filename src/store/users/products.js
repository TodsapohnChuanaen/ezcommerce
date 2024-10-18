import { defineStore } from 'pinia'
import { collection, getDocs } from "firebase/firestore";
import { db } from '@/firebase'

export const useProductStore = defineStore('product-users', {
  state: () => ({
    list: []
  }),
  actions:{
    filterProducts(searchText){
      return this.list.filter(product =>product.name.includes(searchText))
    },
    async loadProducts() {
      const productSnapshot = await getDocs(collection(db, "products"));
      const products = productSnapshot.docs.map(doc => doc.data());
      if(products.length > 0) {
          this.list = products
          // this.list = JSON.parse(products)
          this.loaded = true
      }
  }
  }
})
