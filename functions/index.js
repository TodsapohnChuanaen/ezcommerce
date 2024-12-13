const {onRequest} = require("firebase-functions/v2/https");
const express = require("express");
const app = express();

const {db,auth} = require("./firebaseConfig.js")
// const logger = require("firebase-functions/logger");

app.post('/placeorder', async (req, res) => {
  console.log(req.body)

  try{
    const checkoutData = req.body.checkout
    let checkoutProducts = []
    let totalPrice = 0
    let orderData = {}
    let successOrderId = ''
  
    const products = checkoutData.products

    //transaction เป็นของ firebase transaction
    //เมื่อ run transaction เสร็จ ข้อมูลถึงจะถูก stamp เป็น order
    //แต่ถ้าไม่ข้อมูลจะถูก rollback เพื่อไม่ให้ข้อมูลที่เกิด eror ถูกเขียนลงไปใน database
    await db.runTransaction(async (transaction) => {    
      for (const product of products) {
        const productRef = db.collection("products").doc(product.productId)
        const productSnapshot = await productRef.get()  
        const productData = productSnapshot.data()
  
        let checkoutProduct = product
        checkoutProduct.name = productData.name
        checkoutProduct.imageUrl = productData.imageUrl
        checkoutProduct.price = productData.price
        checkoutProduct.totalPrice = productData.price * product.quantity
        totalPrice += (productData.price * product.quantity)
        checkoutProducts.push(checkoutProduct)

        if (productData.remainQuantity - product.quantity < 0) {
        throw new Error(`Product ${productData.name} out of stock`)
        }

      //ลดจำนวนสินค้าใน stock เมื่อ user ทำการซื้อสินค้า
      transaction.update(productRef, {
        remainQuantity: productData.remainQuantity - product.quantity
      })
    }

      const orderRef = db.collection("orders")
      // .doc()  firestore จะสร้าง id ให้เอง เพื่อเป็นตัวแทนของ id reference
      const orderId = orderRef.doc().id

      orderData = {
        ...checkoutData,
        chargeId: `charge_${orderId}`,   //mock ไว้ก่อน ค่อยรวมกันตอนใช้ omise
        products: checkoutProducts,
        totalPrice,
        paymentMethod: 'rabbit_lineplay',
        createdAt: new Date(),
        status: 'successful'
      }

      transaction.set(orderRef.doc(orderId), orderData)
      successOrderId = orderId

    })
    res.json({
      message: "Hello World from Firebase",
      redirectUrl: `http://localhost:5173/SuccessView?order_id=${successOrderId}`
    })
  }catch(error){
    res.status(400).json({
      message: error.message
    })
  }

})

exports.api = onRequest(app);


// method post body raw json http://127.0.0.1:5001/ez-commerce-aun/us-central1/api/placeorder
   
// json body for test

// {
// "source": "test_src", // จะปรับกันตอน omise รับอะไรมาก่อนก็ได้
// "checkout": { // จำลองการส่งข้อมูลหน้าบ้าน
//  "email": "1",
//  "name": "2",
//  "address": "3",
//  "note": "4",
//  "products": [
//    {
//      "productId": "EtuytjyEpj0Kd1GOKBRK",
//      "quantity": 1
//    }
//  ]
// }