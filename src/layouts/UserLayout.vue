<template>
    <div class="container mx-auto">
        <div class="navbar bg-base-100">
            <div class="flex-1">
                <RouterLink :to="{ name: 'home' }" class="btn btn-ghost text-3xl font-bold">Easy Commerce</RouterLink>
            </div>
            <div class="flex-none gap-2">
                <div class="form-control">
                    <input type="text" 
                    placeholder="Search" 
                    class="input input-bordered w-24 md:w-auto" 
                    v-model="searchText"
                    @keyup="handleSearch" />
                </div>

                <!-- cart -->
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                        <div class="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span class="badge badge-sm indicator-item">{{cartStore.totalQuantity}}</span>
                        </div>
                    </div>
                    <div tabindex="0" class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
                        <div class="card-body">
                            <span class="text-lg font-bold">{{cartStore.totalQuantity}} Items</span>
                            <span class="text-info">Subtotal: {{cartStore.totalPrice}} Bath</span>
                            <div class="card-actions">
                                <RouterLink :to="{ name: 'CartView' }" class="btn btn-primary btn-block">View cart</RouterLink>
                            </div>
                        </div>
                    </div>
                </div>

                <button @click="login" v-if="!accountStore.isLoggedIn" class="btn btn-ghost">
                    Login
                </button>
                <!-- profile -->
                <div v-else class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" :src="accountStore.profile.profileImageUrl || '@/assets/pic/cuteCat.jpg'" />
                        </div>
                    </div>
                    <ul tabindex="0"
                        class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <RouterLink :to="{name:'ProfileView'}"  class="justify-between">
                                Profile
                                <!-- <span class="badge">New</span> -->
                            </RouterLink>
                        </li>
                        <li><a @click="logout">Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- for banner to display(we can control in firebase realtime database console) -->
        <div v-if="eventStore.banner.display">
            <a :href="eventStore.banner.link" class="banner" target="_blank">
                <img class="w-full" :src="eventStore.banner.imageUrl">
            </a>
        </div>
        <!-- main content -->
        <slot></slot>

        <footer class="footer footer-center bg-base-300 text-base-content p-4">
            <aside>
                <p>Copyright © 2024 - All right reserved by AUN Ltd</p>
            </aside>
        </footer>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {RouterLink,useRouter} from 'vue-router'

import {useCartStore} from '@/store/users/cart'
import {useAccountStore} from '@/store/account'
import {useEventStore} from '@/store/event'


const cartStore = useCartStore()
const accountStore = useAccountStore()
const eventStore = useEventStore()

const router = useRouter()

onMounted(() => {
    eventStore.loadBanner()
})

//for local test
// const isLoggedIn = ref(false)

const searchText = ref('')

// onMounted(async() => {
//     await accountStore.checkAuth()
// })

//for local test
// onMounted(() =>{
//     if(localStorage.getItem('isLoggedIn')){
//         isLoggedIn.value = true
//     }
// })

const handleSearch= (event) =>{
    // console.log(event.key)
    if(event.key === 'Enter'){
        router.push({
            name: 'SearchView',
            query:{
                q: searchText.value
            }
        })
    }
}

const login = async () =>{
    //for local test
    // isLoggedIn.value = true
    // localStorage.setItem('isLoggedIn', true)
    
    try{
        await accountStore.signInWithGoogle()
        location.reload()
    }catch(error){
        console.log('error',error)
    }
}
const logout = async () =>{
    //for local test
    // isLoggedIn.value = false
    // localStorage.removeItem('isLoggedIn')
    // localStorage.removeItem('cart-data')
    // localStorage.removeItem('order-data')
    
    try{
        await accountStore.signOut()
        window.location.reload() //just refresh page
    }catch(error){
        console.log('error',error)
    }
    
}
</script>
