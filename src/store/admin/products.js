import { defineStore } from 'pinia'
import { list } from 'postcss'

export const useAdminProductStore = defineStore('product', {
    state: () => ({
        list: [],
        loaded: false
    }),
    actions: {
        // filterProducts(searchText) {
        //     return this.list.filter(product => product.name.includes(searchText))
        // }
        loadProducts() {
            const products = localStorage.getItem('admin-products')
            if(products) {
                this.list = JSON.parse(products)
                this.loaded = true
            }
        },
        getProducts(index) {
            if (!this.loaded) {
                this.loadProducts()
            }
            return this.list[index]
        },
        addProduct(productData) {
            productData.remainQuantity = productData.quantity
            productData.updatedAt = (new Date()).toISOString()
            this.list.push(productData)
            localStorage.setItem('admin-products', JSON.stringify(this.list))
        },
        updateProduct(index, productData) {
            this.list[index].name = productData.name
            this.list[index].image = productData.image
            this.list[index].price = productData.price
            this.list[index].quantity = productData.quantity
            this.list[index].remainQuantity = productData.quantity
            this.list[index].status = productData.status
            this.list[index].updatedAt = (new Date()).toISOString()
            localStorage.setItem('admin-products', JSON.stringify(this.list))
        },
        removeProduct(index) {
            this.list.splice(index, 1)
            localStorage.setItem('admin-products', JSON.stringify(this.list))
        }
    }
})