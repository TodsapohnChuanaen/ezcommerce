import { defineStore } from 'pinia'

import {GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase';

const provider = new GoogleAuthProvider();

export const useAccountStore = defineStore('account', {
    state: () => ({
        isLoggedIn: false,
        isAdmin: false,
        user: {}
    }),
    actions: {
        async checkAuth() {
            return new Promise((resolve) =>{
                onAuthStateChanged(auth, (user) => {
                    // console.log('user',user)
                    if (user) {
                        const uid = user.uid

                        //for testing purpose
                        if(user.email == 'admin@test.com'){
                            this.isAdmin = true
                        }

                        this.user = user
                        this.isLoggedIn = true
                        resolve(true)
                    }else{
                        resolve(false)
                    }
                })
            })
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