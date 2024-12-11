import { defineStore } from 'pinia'

import {GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '@/firebase';
//getDoc ใช้สําหรับดึงข้อมูลอันเดียว getDocs ดึงข้อมูลทั้งหมด
import {doc,getDoc,setDoc,updateDoc} from 'firebase/firestore'

const provider = new GoogleAuthProvider();

export const useAccountStore = defineStore('account', {
    state: () => ({
        isLoggedIn: false,
        isAdmin: false,
        user: {},
        profile:{}
    }),
    actions: {
        async checkAuth() {
            return new Promise((resolve) =>{
                onAuthStateChanged(auth, async (user) => {
                    // console.log('user',user)
                    if (user) {
                        this.user = user

                        const uid = user.uid

                        const docRef = doc(db, "users", uid);
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            this.profile = docSnap.data()
                        }else{
                            const newUser = {
                                fullname: user.displayName,
                                role: 'member',
                                status: 'active',
                                updatedAt: new Date(),
                            }
                            await setDoc(docRef, newUser)
                            this.profile = newUser
                        }

                        // console.log('profile',this.profile)
                        if(this.profile.role == 'admin' ||
                            this.profile.role == 'moderator'

                        ){
                            this.isAdmin = true

                            this.profile.email = user.email
                        }

                        //สำหรับสร้าง user = สร้าง data เข้า collection user ทันที
                        this.isLoggedIn = true
                        resolve(true)
                    }else{
                        resolve(false)
                    }
                })
            })
        },
        async updateProfile(userData) {
            try{
                const updateUserData ={
                    fullname: userData.fullname,
                    profileImageUrl: userData.profileImageUrl
                }
                const userRef = doc(db, `users/${this.user.uid}`)
                await updateDoc(userRef, updateUserData)
            }catch(error){
                console.log('error',error)
            }
        },
        async signInWithGoogle() {
          try{
            const result = await signInWithPopup(auth, provider)
            this.isLoggedIn = true
            this.user = result.user
            console.log(this.user)
          }catch(error){
            console.log('eror',error)
          }
        },
        async signInAdmin(email, password) {
            try{
                const result = await signInWithEmailAndPassword(auth, email, password)
                this.isLoggedIn = true
                this.isAdmin = true
                this.user = result.user
                console.log(this.user)
            }catch(error){
                console.log('eror store =',error.code)
                switch (error.code) {
                    case 'auth/invalid-email':
                        alert('Invalid email address or password')
                        throw new Error('Invalid email address')
                        break
                    case 'auth/user-not-found':
                        alert('User not found')
                        throw new Error('User not found')
                        break
                    case 'auth/wrong-password':
                        alert('Invalid email address or password')
                        throw new Error('Wrong password')
                        break
                    default:
                        alert('Something went wrong')
                        throw new Error('Something went wrong')
                        break
                }
            }
        },
        async signOut() {
            this.isLoggedIn = false
            this.isAdmin = false
            await signOut(auth)
            // this.user = {}
        }
    }
})