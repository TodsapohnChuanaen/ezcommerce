import { defineStore } from 'pinia'

import {GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';

const provider = new GoogleAuthProvider();

export const useAccountStore = defineStore('account', {
    state: () => ({
        isLoggedIn: false,
        user: {}
    }),
    actions: {
        async checkAuth() {
            return new Promise((resolve) =>{
                onAuthStateChanged(auth, (user) => {
                    // console.log('user',user)
                    if (user) {
                        const uid = user.uid
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
        async signOut() {
            this.isLoggedIn = false
            await signOut(auth)
            // this.user = {}
        }
    }
})