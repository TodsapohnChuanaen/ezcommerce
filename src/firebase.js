import { initializeApp } from "firebase/app"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";


//เป็นการรวม config firebase ไว้ใน file นี้ไฟล์เดียว
//แล้ว export ผ่านไฟล์นี้ไฟล์เดียว เพื่อให้ไฟล์อื่นๆ สามารถเรียกใช้ได้โดยไม่ต้อง config อีก
//เช่น import ไปในไฟล์ .env

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkGamlEvrfTijNyBYsUdLIt6h_SK6Kpzs",
    authDomain: "ez-commerce-aun.firebaseapp.com",
    databaseURL: "https://ez-commerce-aun-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ez-commerce-aun",
    storageBucket: "ez-commerce-aun.appspot.com",
    messagingSenderId: "174262184708",
    appId: "1:174262184708:web:cc78ba7b93dc25bc72be51"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)
//use emulator
connectFirestoreEmulator(db, '127.0.0.1', 8080);

export{
    db
}
  
