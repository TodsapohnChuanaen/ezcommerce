<template>
    <UserLayout>
        <h1 class="font-bold m-4">Checkout</h1>

        <div class="flex">
            <section class="flex-auto w-64 bg-neutral-600 p-8">
                <label v-for="form in FormData" class="form-control w-full" v-bind:key="form.id">
                    <div class="label">
                        <span class="label-text">{{form.name}}</span>
                    </div>
                    <input v-model="userFormData[form.field]" type="text" placeholder="Type here" class="input input-bordered w-full" />
                </label>
                <button @click="payment" class="btn btn-neutral w-full  mt-4">Submit</button>
            </section>
            <section class="flex-auto w-32 bg-neutral px-2">
                <div v-for="item in cartStore.items" class="flex bg-neutral-800 m-8 py-4" v-bind:key="item.id">
                    <div class="flex-1">
                        <img class="w-full p-8" :src="item.imageUrl" />
                    </div>
                    <div class="flex-1">
                        <div class="flex flex-col justify-between h-full">
                            <div>
                                <div><b> {{ item.name }} </b></div>
                                <div>จำนวน: {{ item.quantity }}</div>
                            </div>
                            <RouterLink :to="{ name: 'CartView' }" class="btn  btn-outline btn-secondary w-1/4">Edit</RouterLink>
                        </div>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="p-4">
                    <div class="font-bold"><b>Order Summary</b></div>
                    <div class="flex justify-between ">
                        <div class="ml-2">Subtotal</div>
                        <div>{{cartStore.totalPrice}}</div>
                    </div>
                    <div class="flex justify-between ">
                        <div class="ml-2">Shipping</div>
                        <div>0</div>
                    </div>
                </div>
                <div class="divider"></div>
                <div class="flex justify-between p-4 mb-4">
                        <div class="font-bold"><b>Total price</b></div>
                        <div>{{cartStore.totalPrice}}</div>
                    </div>
            </section>
        </div>
    </UserLayout>
</template>
<script setup>
import { reactive } from 'vue';
import { RouterLink,useRouter } from 'vue-router'

import UserLayout from '@/layouts/UserLayout.vue'

import {useCartStore} from '@/store/users/cart'

const cartStore = useCartStore()
const router = useRouter()

const FormData = [
    {
        name: 'Email address',
        field: 'email'
    },
    {
        name: 'Name',
        field: 'name'
    },
    {
        name: 'Address',
        field: 'address'
    },
    {
        name: 'Note',
        field: 'note'
    }
]

const userFormData = reactive({
    email: '',
    name: '',
    address: '',
    note: ''
})

const payment = () => {
    // console.log(userFormData)
    cartStore.placeOrder(userFormData)
    router.push({name: 'SuccessView'})
}
</script>
