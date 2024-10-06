<template>
    <UserLayout>
        <div class="hero bg-base-200 h-96">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <h1 class="text-5xl font-bold">Welcome Idiot</h1>
                    <p class="py-6">
                        Chills Bro
                    </p>
                </div>
            </div>
        </div>

        <!-- นำ productStore.list ที่ดึงมาจาก store/users/product
        ส่งไปยัง property ซึ่งก็คือ attribute products -->
        <Product
        :products="productStore.list"
        :addToCart="addToCart">
        </Product>
    </UserLayout>
</template>
<script setup>
import { useRouter } from 'vue-router'

import UserLayout from '@/layouts/UserLayout.vue'
import Product from '@/components/Product.vue'

import {useProductStore} from '@/store/users/products'
import {useCartStore} from '@/store/users/cart'

const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()

const addToCart = (product) => {
    cartStore.addToCart(product)
    router.push({name: 'CartView'})
}
</script>