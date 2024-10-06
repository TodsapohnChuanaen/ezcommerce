import { defineStore } from 'pinia'

export const useCartStore = defineStore("cart", {
  state: () => ({
    // items: [{   for testing
    //     name: "test",
    //     imageUrl:"https://fastly.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0",
    //     quantity: 10,
    //     about: "testt",
    //     status: "open",
    //     price: 100,
    //     quantity: 1
    //   }],
    items: [],
    checkout:{}
  }),
  getters:{
    totalQuantity(state){
        return state.items.reduce((total,item)=>total + item.quantity,0)
    },
    totalPrice(state){
        //function reduce ประกอบด้วย 1.ค่าที่ reduce สะสมมา(total แล้วแต่ตั้งชื่อ) ละ 2. item คือค่าที่กำลังวน loop(item)
        //โดยในกรณีนี้จะจิ้มไปที่ array ชื่อ items(อันข้างบน)
        return state.items.reduce((total,item)=>{
        //เอาข้อมูลที่เรากำลัง return จากการวน loop แต่ละตัว
        // กลับเข้าใส่ใน total แล้วบวกเพิ่มไปเรื่อยๆ
        // โดยเรื่มจาก 0(ในกรณีนี้)
            return total + ((item.price * item.quantity))  //เอาค่าที่วน loop แต่ละครั้งมาเก็บไว้ที่ total แล้ว return
        },0)
    }
  },
  actions: {
    loadCart(){
      const cartData = localStorage.getItem('cart-data')
      if(cartData){
        this.items = JSON.parse(cartData)
      }
    },
    addToCart(productData) {
      //หา index ก่อนว่ามี product นี้อยู่ใน cart หรือยัง
      const findProductIndex = this.items.findIndex(item =>{
        return item.name === productData.name
      })
      //ถ้าไม่มี ใส่ quantity เป็น 1
      //ถ้ามี บวก quantity เพิ่ม 1 แล้ว update quantity
      if(findProductIndex < 0){
        productData.quantity = 1
        this.items.push(productData)
      }else{
        const currentItem = this.items[findProductIndex]
        this.updateQuantity(findProductIndex, currentItem.quantity + 1)
      }

      localStorage.setItem('cart-data', JSON.stringify(this.items))
    },
    updateQuantity(index, quantity) {
      this.items[index].quantity = quantity
      localStorage.setItem('cart-data', JSON.stringify(this.items))
    },
    removeItemInCart(index) {
      this.items.splice(index, 1)
      localStorage.setItem('cart-data', JSON.stringify(this.items))
    },
    placeOrder(userData){
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
      localStorage.setItem('order-data', JSON.stringify(orderData))
    },
    loadCheckoutData(){
      const checkoutData = localStorage.getItem('order-data')
      if(checkoutData){
        this.checkout = JSON.parse(checkoutData)
      }
      // return null
    }
  },
})