import { initializeApp } from 'firebase/app'
//import connectFirestoreEmulator เพื่อใช้ emulator ของ firestore
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const API_KEY = import.meta.env.VITE_API_KEY
const AUTH_DOMAIN  = import.meta.env.VITE_AUTH_DOMAIN
const DATABASE_URL  = import.meta.env.VITE_DATABASE_URL
const PROJECT_ID  = import.meta.env.VITE_PROJECT_ID
const STORAGE_BUCKET  = import.meta.env.VITE_STORAGE_BUCKET
const MESSAGINGSENDER_ID  = import.meta.env.VITE_MESSAGINGSENDER_ID
const APP_ID  = import.meta.env.VITE_APP_ID
//เป็นการรวม config firebase ไว้ใน file นี้ไฟล์เดียว
//แล้ว export ผ่านไฟล์นี้ไฟล์เดียว เพื่อให้ไฟล์อื่นๆ สามารถเรียกใช้ได้โดยไม่ต้อง config อีก
//เช่น import ไปในไฟล์ .env

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    databaseURL: DATABASE_URL,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGINGSENDER_ID,
    appId: APP_ID
  }
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
//use emulator, default emulator port is 8080  
connectFirestoreEmulator(db, '127.0.0.1', 8080);

const auth = getAuth(app)
connectAuthEmulator(auth, 'http://127.0.0.1:9099')

export{
    db,
    auth
} 

//test on server
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app)
// export{
//   db
// }
