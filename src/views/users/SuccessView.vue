<template>
    <UserLayout>
        <div class="max-w-4xl mx-auto border border-base-200 bg-neutral shadow-xl p-8 my-4">
            <div>
                <div class="text-3xl font-bold">Your order is successfully.</div>
                <div>Hi {{ orderData.name }}</div>
                <div>{{ orderData.email }}</div>
            </div>
            <div class="divider"></div>
            <div class="grid grid-cols-4 gap-2">
                <div>
                    <div class="font-bold">Order date</div>
                    <div>{{ orderData.createdDate }}</div>
                </div>
                <div>
                    <div class="font-bold">Order number</div>
                    <div>{{ orderData.orderNumber }}</div>
                </div>
                <div>
                    <div class="font-bold">Payment Method</div>
                    <div>{{ orderData.paymentMethod }}</div>
                </div>
                <div>
                    <div class="font-bold">Address</div>
                    <div>{{ orderData.address }}</div>
                </div>
            </div>
            <div class="divider"></div>
            <div v-for="product in orderData.products" class="grid grid-cols-4 gap-2 mb-4 items-center"
                v-bind:key="product.id">
                <div>
                    <img class="w-full" :src="product.imageUrl">
                </div>
                <div class="ml-2 font-bold">
                    {{ product.name }}
                </div>
                <div>
                    quantity: {{ product.quantity }}
                </div>
                <div>
                    Subtotal: {{ product.price * product.quantity }}
                </div>
            </div>
            <div class="divider"></div>
            <div class="flex justify-between mt-4">
                <div class="font-bold">Shipping cost</div>
                <div>0</div>
            </div>
            <div class="divider"></div>
            <div class="flex justify-between">
                <div class="font-bold">Total price</div>
                <div>{{ orderData.totalPrice }}</div>
            </div>
            <div class="divider"></div>
            <div class="flex justify-center">Thank for purchased</div>
        </div>
    </UserLayout>
</template>
<script setup>
import UserLayout from '@/layouts/UserLayout.vue'
import { useCartStore } from '@/store/users/cart'
import { ref, onMounted } from 'vue'
import {useRoute} from 'vue-router'

const route = useRoute()
const cartStore = useCartStore()
const orderData = ref({})


onMounted(async () => {
    const orderId = route.query.order_id
    if(orderId){
        try{
            orderData.value = await cartStore.loadCheckoutData(orderId)
        }catch(error){
            console.log(error)
        }
    }
})
</script>