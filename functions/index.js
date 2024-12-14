const {onRequest} = require("firebase-functions/v2/https");
const express = require("express");
const app = express();

const {db,auth} = require("./firebaseConfig.js")
// const logger = require("firebase-functions/logger");

// console.log(process.env.OMISE_SECRET_KEY)

const omise = require('omise')({
  secretKey: process.env.OMISE_SECRET_KEY,
  omiseVersion: '2019-05-19'
})

const createCharge = (source, amount, orderId) => {
  return new Promise((resolve, reject) => {
    omise.charges.create({
      amount: (amount * 100),
      currency: 'THB',
      return_uri: `http://localhost:5173/SuccessView?order_id=${orderId}`,
      metadata: {
        //เมื่อส่งผ่าน web hook จะสามารถ map order and status order 
        //check ว่า charge and order id ตรงกัน
        orderId   
      },
      source,  //omise source token from frontend เพื่อเอามายืนยันเพื่อสร้าง charge ต่อ
    }, (err, resp) => {
      if (err) {
        return reject(err)
      }
      resolve(resp)
    })
  })
}

app.post('/placeorder', async (req, res) => {
  console.log(req.body)

  try{
    const checkoutData = req.body.checkout
    const sourceOmise = req.body.source
    let checkoutProducts = []
    let totalPrice = 0
    let orderData = {}
    let omiseResponse = {}
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

      omiseResponse = await createCharge(sourceOmise, totalPrice, orderId)

      orderData = {
        ...checkoutData,
        chargeId: omiseResponse.id,   //omise charge
        products: checkoutProducts,
        totalPrice,
        paymentMethod: 'rabbit_lineplay',
        createdAt: new Date(),
        status: 'pending'
      }

      transaction.set(orderRef.doc(orderId), orderData)

      successOrderId = orderId

    })

    res.json({
      message: "Hello World from Firebase",
      redirectUrl: omiseResponse.authorize_uri
    })
  }catch(error){
    res.status(400).json({
      message: error.message
    })
  }

})

app.post('/webhook', async (req, res) => {
  // console.log('webhook body',req.body)

  try{
    if(req.body.key === 'charge.complete'){
      const webhookData = req.body.data
      const orderId = webhookData.metadata.orderId
      const chargeId = webhookData.id
      const statusOrder = webhookData.status
  
      const orderRef = db.collection('orders').doc(orderId)
      const orderSnapshot = await orderRef.get()
  
      const orderData = orderSnapshot.data()
  
      //wrong order
      if(orderData.chargeId !== chargeId){
        throw new Error('chargeId not match')
      }

      if(orderData.status === 'pending'){
        await orderRef.update({
          status: statusOrder
        })

        if(statusOrder !== 'successful'){
          //คืน stock กลับ
          db.runTransaction(async (t)=>{
            for (const product of orderData.products) {
              const productRef = db.collection('products').doc(product.productId)
              const productSnapshot = await productRef.get()
              const productData = productSnapshot.data()
              t.update(productRef,{
                remainQuantity: productData.remainQuantity + product.quantity
              })
            }
          })

        }
      }
  
    }
  }catch(error){
    console.log('eror',error)
  }

  

  // res.json({message: 'hook ok'})

  // try{
  //   if(req.body.type === 'charge.complete'){
  //     const webhookData = req.body.data
  //     const orderId = webhookData.metadata.orderId
  //     const chargeId = webhookData.id
  //     const statusOrder = webhookData.status
  
  //     const orderRef = db.collection('orders').doc(orderId)
  //     const orderSnapshot = await orderRef.get()
  //     const orderData = orderSnapshot.data()
  
  //     //wrong order
  //     if(orderData.chargeId !== chargeId){
  //       throw new Error('chargeId not match')
  //     }

     

  //     if(orderData.status === 'pending'){
  //       await orderRef.update({ status: statusOrder })

  //       if(statusOrder !== 'successful'){
  //         //คืน stock กลับ
  //         db.runTransaction(async (transaction) => {
  //           for (const product of orderData.products) {
  //             const productRef = db.collection('products').doc(product.productId)
  //             const productSnapshot = await productRef.get()  
  //             const productData = productSnapshot.data()
  //             transaction.update(productRef, {
  //               remainQuantity: productData.remainQuantity + product.quantity
  //             })
  //           }
  //         })
  //       }
  //     }
  //   }
  // }catch(error){
  //   console.log('error',error)
  // }
  
})


exports.api = onRequest(app);



