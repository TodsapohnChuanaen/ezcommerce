import { defineStore } from 'pinia'
import axios from 'axios'

import{ doc, getDoc } from 'firebase/firestore'

import { ref, onValue, set } from 'firebase/database'
import { db, realtimeDB } from '@/firebase'

import { useAccountStore } from '@/store/account'

//ไม่ต้อง import เพราะเรา import จาก tag cdn ใน inde.html แล้ว
//เพราะ tag cdn อยู่ tag level บนสุดอยู่แล้ว
Omise.setPublicKey(import.meta.env.VITE_OMISE_PUBLIC_KEY);

// เพื่อ function createSource
//เนื่องจากใน project นี้ส่วนมากใช้ async await ในรูปแบบของ promise 
//เพื่อให้โค้ดเป็นไปในทิศทางเดียวกันจึงแปลงจาก callback ใน doc ของ omise เป็น promise
const createSource = (amount) => {
  return new Promise((resolve, reject) => {
    // ทำการส่ง source ที่ต้องการจ่ายไป omise เพื่อนำ source token กลับมา
    //ในที่นี้เลือก rabbit_linepay
    Omise.createSource('rabbit_linepay', {
      amount: (amount * 100),  //คูณ 100 เพราะ เป็นหน่วยสตางค์
      //เช่น ราคา 400 บาท เอาไปคูณ 100 จะได้ 40000
      currency: 'THB'
    }, (statusCode, response) => {
      if (statusCode !== 200) {
        return reject(response)
      }
      resolve(response)
    })
  })
}

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
        const checkoutData = {
          ...userData,
          products: this.items.map(product => ({
            productId: product.productId,
            quantity: product.quantity
          }))
        }

        const omiseResponse = await createSource(this.totalPrice)

        console.log('omiseResponse', omiseResponse)
        
        const response = await axios.post('/api/placeorder',{
          source: omiseResponse.id,  //omise source token
          checkout: checkoutData
        })
        return response.data

        
        //localStorage.setItem('order-data', JSON.stringify(orderData))

      } catch (error) {
        console.log('error', error)
      }

    },
    async loadCheckoutData(orderId) {
      try{
        const orderRef = doc(db, 'orders', orderId)
        const orderSnapshot = await getDoc(orderRef)
        let orderData = orderSnapshot.data()
        orderData.createdDate  = orderData.createdAt.toDate()
        orderData.orderNumber = orderSnapshot.id
        return orderData
      }catch(error){
        throw new Error(error.message)
      }
    }
  },
})