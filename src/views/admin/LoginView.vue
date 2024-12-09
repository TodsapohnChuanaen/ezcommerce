<template>
    <div class="h-screen flex items-center">
        <div class="flex-1 max-w-2xl shadow-xl mx-auto bg-neutral p-8">
            <div class="flex flex-col items-center">
                <h1 class="text-3xl p-8">Login</h1>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Email</span>
                    </div>
                    <input v-model="email" type="text" placeholder="Your email" class="input input-bordered w-full bg-neutral" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Password</span>
                    </div>
                    <input v-model="password" type="password" placeholder="Your password" class="input input-bordered w-full bg-neutral" />
                </label>
                <!-- for testing -->
                <!-- <RouterLink :to="{ name: 'admin-dashboard' }" class="btn  mt-8 w-full ">
                    Login
                </RouterLink> -->
                <button @click="login" class="btn w-full mt-8">
                    Login
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {ref} from 'vue'
import { useAccountStore } from '@/store/account';

const accountStore = useAccountStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const login = async () => {
    console.log(email.value,password.value)
    try{
        await accountStore.signInAdmin(email.value,password.value)
        router.push({ name: 'admin-dashboard' })
    }catch(error){
        console.log('error page =',error.message)
    }
}

</script>
