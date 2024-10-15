import { defineStore } from 'pinia'

export const useProductStore = defineStore('product-users', {
  state: () => ({
    list: []
  }),
  actions:{
    filterProducts(searchText){
      return this.list.filter(product =>product.name.includes(searchText))
    },

    loadProducts() {
      const products = localStorage.getItem('admin-products')
      if(products) {
          this.list = JSON.parse(products)
          this.loaded = true
      }
  }
  }
})
