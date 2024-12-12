import { defineStore } from 'pinia'
import {
  updateDoc,
  increment,
  doc, writeBatch
} from 'firebase/firestore'

import { ref, onValue, set } from 'firebase/database'
import { db, realtimeDB } from '@/firebase'

import { useAccountStore } from '@/store/account'

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    checkout: {}
  }),
  getters: {
    totalQuantity(state) {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    totalPrice(state) {
      //function reduce ประกอบด้วย 1.ค่าที่ reduce สะสมมา(total แล้วแต่ตั้งชื่อ) ละ 2. item คือค่าที่กำลังวน loop(item)
      //โดยในกรณีนี้จะจิ้มไปที่ array ชื่อ items(อันข้างบน)
      return state.items.reduce((total, item) => {
        //เอาข้อมูลที่เรากำลัง return จากการวน loop แต่ละตัว
        // กลับเข้าใส่ใน total แล้วบวกเพิ่มไปเรื่อยๆ
        // โดยเรื่มจาก 0(ในกรณีนี้)
        return total + ((item.price * item.quantity))  //เอาค่าที่วน loop แต่ละครั้งมาเก็บไว้ที่ total แล้ว return
      }, 0)
    },
    user(state) {
      const accountStore = useAccountStore()
      return accountStore.user
    },
    cartRef(state) {
      return ref(realtimeDB, `carts/${this.user.uid}`)
    }
  },
  actions: {
    async loadCart() {
      // console.log('loadCart user',this.user)

      //ถ้า user ยังไม่ได้ log in จะเก็บข้อมูลตะกร้าสินค้าไว้ใน localStorage
      //แต่ถ้า login จะเก็บไว้ใน firebase user.id
      if (this.user.uid) {
        onValue(this.cartRef, (snapshot) => {
          const data = snapshot.val()
          if (data) {
            this.items = data
          }
        }, (err) => {
          console.log('error', err)
        })
      } else {
        const cartData = localStorage.getItem('cart-data')
        if (cartData) {
          this.items = JSON.parse(cartData)
        }
      }
    },
    async addToCart(productData) {
      //หา index ก่อนว่ามี product นี้อยู่ใน cart หรือยัง
      const findProductIndex = this.items.findIndex(item => {
        return item.name === productData.name
      })
      //ถ้าไม่มี ใส่ quantity เป็น 1
      //ถ้ามี บวก quantity เพิ่ม 1 แล้ว update quantity
      if (findProductIndex < 0) {
        productData.quantity = 1
        this.items.push(productData)
      } else {
        const currentItem = this.items[findProductIndex]
        this.updateQuantity(findProductIndex, currentItem.quantity + 1)
      }
      //ใน add, remove, update ใช้ set เนื่องจากในนี้ข้อมูลยังไม่ใหญ่มาก
      //แต่ถ้าข้อมูลขนาดใหญ่ขึ้น อาจจะแยกกรณีไปใช้คำสั่ง update,delete ได้ตาม doccument
      await set(this.cartRef, this.items)
      //ในกรณีนี้เมื่อ user logout ออก ตะกร้าสินค้าจะยังคงอยู่โดยเก็บใน localStorage(ขึ้นอยู่กับ requirement ของเรา) 
      localStorage.setItem('cart-data', JSON.stringify(this.items))
    },
    async updateQuantity(index, quantity) {
      this.items[index].quantity = quantity
      await set(this.cartRef, this.items)
      localStorage.setItem('cart-data', JSON.stringify(this.items))
    },
    async removeItemInCart(index) {
      this.items.splice(index, 1)
      await set(this.cartRef, this.items)
      localStorage.setItem('cart-data', JSON.stringify(this.items))
    },
    async placeOrder(userData) {
      try {
        //function ... คือ กระจายข้อมูลออกมา แล้วเพิ่มข้อมูลใหม่ลงไป เช่น
        //let  test={name:'123',quantity:1}
        //test2 = {...test,price:100}
        //or use new Date() โดย new Date().toLocaleString() จะไม่ได้ time zone     
        const orderData = {
          ...userData,
          totalPrice: this.totalPrice,
          paymentMethod: 'Credit Card',
          createdDate: (new Date()).toLocaleString(),
          orderNumber: `AA${Math.floor(Math.random() * 10000000)}`,
          products: this.items
        }

        const batch = writeBatch(db)

        for (const product of orderData.products) {
          const productRef = doc(db, "products", product.productId)
          batch.update(productRef, { remainQuantity: increment(-1) })
        }

        await batch.commit()
        localStorage.setItem('order-data', JSON.stringify(orderData))

      } catch (error) {
        console.log('error', error)
      }

    },
    loadCheckoutData() {
      const checkoutData = localStorage.getItem('order-data')
      if (checkoutData) {
        this.checkout = JSON.parse(checkoutData)
      }
      // return null
    }
  },
})