import { defineStore } from 'pinia'
import { db } from '@/firebase'
import {
    collection, doc, getDoc, getDocs, addDoc,
    setDoc, deleteDoc, query, where, orderBy, limit, limitToLast,
    startAfter,endBefore,getCountFromServer
} from 'firebase/firestore'

export const useAdminProductStore = defineStore('product-admin', {
    state: () => ({
        lists: [],
        docList: [],
        total: 1,
        filter: {
            search: '',
            status: 'all', //for default tab  
            sort: {
                updatedAt: 'desc',
            }
        }
    }),
    getters: {
        list(state) {
            return state.docList.map(doc => {
                if (!doc) {
                    throw new Error('doc is null or undefined')
                }

                const convertedProduct = doc.data()
                if (!convertedProduct) {
                    throw new Error('convertedProduct is null or undefined')
                }

                convertedProduct.productId = doc.id
                if (!convertedProduct.updatedAt) {
                    throw new Error('updatedAt is null or undefined')
                }

                convertedProduct.updatedAt = convertedProduct.updatedAt.toDate()
                return convertedProduct
            })
        },
        totalPage(state) {
            //จำนวนข้อมูล หารด้วยจำนวนที่มีต่อหน้า (ในที่นี้เราต้องการแสดง  2 ข้อมูลต่อหน้า)
            //Math.ceil คือการปัดเศษขึ้น
            return Math.ceil(state.total / 2)
        }
    },
    actions: {
        async loadProducts() {
            let productCol = query(collection(db, "products"),
                orderBy('updatedAt', this.filter.sort.updatedAt)) //desc

            if (this.filter.search) {
                productCol = query(productCol, where("name", "==", this.filter.search))
            }

            if (this.filter.status) {
                productCol = query(productCol, where("status", "==", this.filter.status))
            }
            if (this.filter.status === 'all') {  //for default tab  
                productCol = query(collection(db, "products"),
                    orderBy('updatedAt', this.filter.sort.updatedAt)) //desc
            }

            const rawProductCol = productCol

            productCol = query(productCol, limit(2))

            const productSnapshot = await getDocs(productCol)
            this.docList = productSnapshot.docs

            const allProductSnapshot = await getCountFromServer(rawProductCol)
            this.total = allProductSnapshot.data().count
        },
        async loadNextProduct(mode) {
            let productCol = query(collection(db, "products"),
                orderBy('updatedAt', this.filter.sort.updatedAt))
            if (mode === 'next') {
                //select last document
                const lastDocument = this.docList[this.docList.length - 1]
                //next page
                productCol = query(
                    productCol,
                    startAfter(lastDocument),
                    limit(2)
                )

            } else {
                //previous page
                const firstDocument = this.docList[0]
                productCol = query(
                    productCol,
                    endBefore(firstDocument),
                    limitToLast(2)
                )
            }
            const productSnapshot = await getDocs(productCol)
            this.docList = productSnapshot.docs
        },
        async getProduct(productId) {
            try {
                const productRef = doc(db, "products", productId)
                const productSnapshot = await getDoc(productRef)
                return productSnapshot.data()
            } catch (error) {
                console.log('error', error)
            }
        },
        async addProduct(productData) { 
            try {
                productData.remainQuantity = productData.quantity
                productData.updatedAt = new Date()
                const productCol = collection(db, "products")
                await addDoc(productCol, productData)
            } catch (error) {
                console.log('error', error)
            }
        },
        async updateProduct(productId, productData) {
            try {
                const updateProduct = {}
                updateProduct.imageUrl = productData.imageUrl
                updateProduct.name = productData.name
                updateProduct.about = productData.about
                updateProduct.price = productData.price
                updateProduct.quantity = parseInt(productData.quantity)
                updateProduct.remainQuantity = parseInt(productData.quantity)
                updateProduct.status = productData.status
                updateProduct.updatedAt = new Date()

                const productRef = doc(db, "products", productId)
                await setDoc(productRef, updateProduct)
            } catch (error) {
                console.log('error', error)
            }
        },
        async removeProduct(productId) {
            try {
                const productRef = doc(db, "products", productId)
                await deleteDoc(productRef)
            } catch (error) {
                console.log('error', error)
            }
        }
    }
})