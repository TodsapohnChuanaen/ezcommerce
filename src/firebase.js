import { initializeApp } from "firebase/app"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const API_KEY = import.meta.env.API_KEY
const auth_Domain  = import.meta.env.auth_Domain
const database_URL  = import.meta.env.database_URL
const project_Id  = import.meta.env.project_Id
const storage_Bucket  = import.meta.env.storage_Bucket
const messagingSender_Id  = import.meta.env.messagingSender_Id
const app_Id  = import.meta.env.app_Id
//เป็นการรวม config firebase ไว้ใน file นี้ไฟล์เดียว
//แล้ว export ผ่านไฟล์นี้ไฟล์เดียว เพื่อให้ไฟล์อื่นๆ สามารถเรียกใช้ได้โดยไม่ต้อง config อีก
//เช่น import ไปในไฟล์ .env

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: API_KEY,
    authDomain: auth_Domain ,
    databaseURL: database_URL,
    projectId: project_Id,
    storageBucket: storage_Bucket,
    messagingSenderId: messagingSender_Id,
    appId: app_Id
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
//use emulator
connectFirestoreEmulator(db, '127.0.0.1', 8080);

export{
    db
}
  
