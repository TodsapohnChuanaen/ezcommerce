<template>
    <UserLayout>
        <h1 class="font-bold text-2xl m-4">Shopping Cart</h1>

        <div class="flex">
            <div class="flex-auto w-64  bg-neutral-600 p-4">
                <div v-if="cartStore.items.length === 0">
                    Cart is empty
                </div>
                <div v-else v-for="(item,index) in cartStore.items" class="flex" v-bind:key="index">
                    <div class="flex-1">
                        <img class="w-full p-10"
                        :src="item.imageUrl">
                    </div>
                    <div class="flex-1">
                        <div class="flex flex-col justify-between h-full">
                            <div>
                                <div class="relative grid grid-cols-2">
                                    <div>
                                        <div><b>{{item.name}}</b></div>
                                        <div>{{item.about}}</div>
                                        <div>{{item.price}}</div>
                                    </div>
                                    <div>
                                        <!-- <select v-model="item.quantity" class="select select-bordered"> -->
                                        <select v-model="item.quantity" class="select select-bordered" @change="changeQuantity(index, $event)">
                                            <option v-for="quantity in 10" v-bind:key="quantity">
                                            {{ quantity }}</option>
                                        </select>
                                    </div>
                                    <div @click="cartStore.removeItemInCart(index)" class="absolute top-0 right-0">
                                        <Close></Close>
                                    </div>
                                </div>
                            </div>
                            <div><b>In stock</b></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-auto w-32 bg-neutral p-4">
                <div class="text-xl font-bold">Order Summary</div>
                <div class="my-4 divide-y divide-gray-200">
                    <div class="flex justify-between py-2">
                        <div class="ml-2">Subtotal</div>
                        <div>{{cartStore.totalPrice}}</div>
                    </div>
                    <div class="flex justify-between py-2">
                        <div class="ml-2">Shipping</div>
                        <div>0</div>
                    </div>
                    <div class="flex justify-between py-2">
                        <div class="ml-2">Total price</div>
                        <div>{{cartStore.totalPrice}}</div>
                    </div>
                    <div>
                        <RouterLink
                        :to="{ name: 'CheckoutView' }" 
                        class="btn btn-nuetral w-full mt-4">
                        ชําระเงิน</RouterLink>
                    </div>
                </div>
            </div>
        </div>
    </UserLayout>
</template>
<script setup>
import { RouterLink } from 'vue-router'

import UserLayout from '@/layouts/UserLayout.vue'
import Close from '@/components/icons/Close.vue'
import {useCartStore} from '@/store/users/cart'

const cartStore = useCartStore()

//default เราจะได้จำนวนเป็น string คือ 01,02,03
//แต่ถ้าเราอยากได้ 1,2,3 จะทำได้โดยเปลี่ยน string เป็น int
//โดยปกติแล้ว javascript ฉลาดพอที่จะเปลี่ยนระหว่าง string กับ int ได้
//แต่จะมีปัญหาในการนำไปแสดงผล เพราะ js จะเลือกไม่ถูก(cast)ว่าควรแสดงผลเป็น int หรือ string
const changeQuantity = (index,event) =>{
    const newQuantity = parseInt(event.target.value)
    cartStore.updateQuantity(index,newQuantity)
}
</script>
