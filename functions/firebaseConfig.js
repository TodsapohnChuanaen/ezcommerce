const {initializeApp, applicationDefault} = require('firebase-admin/app')
const {getFirestore} = require('firebase-admin/firestore')
const {getAuth} = require('firebase-admin/auth')
const {getDatabase} = require('firebase-admin/database')

initializeApp({
    credential: applicationDefault(),
    projectId: "ez-commerce-aun",
    databaseURL: 'http://127.0.0.1:9000/?ns=ez-commerce-aun-default-rtdb'  //for realtime database on emulator
})

const db = getFirestore()
const auth = getAuth()
const realtimeDB = getDatabase()

module.exports = {
    db,
    auth,
    realtimeDB
}