<template>
    <UserLayout>
        <div class="text-3xl m-4">Search: <b>{{searchText}}</b></div>
        <Product
         :products="filterProducts"
         :addToCart="addToCart">
        </Product>
    </UserLayout>
</template>
<script setup>
import { onMounted,ref,computed,watch } from 'vue'
import {useRoute, useRouter} from 'vue-router'

import UserLayout from '@/layouts/UserLayout.vue'
import Product from '@/components/Product.vue'

import {useProductStore} from '@/store/users/products'
import {useCartStore} from '@/store/users/cart'

const route = useRoute()
const router = useRouter()

const productStore = useProductStore()
const cartStore = useCartStore()

const searchText = ref('')
// onMounted(() =>{
//     // console.log(route.query.q)
//     if(route.query.q){
//         searchText.value = route.query.q
//     }
// })

const addToCart = (product) => {
    cartStore.addToCart(product)
    router.push({name: 'CartView'})
}

watch(()=> route.query.q,(newSearchText) =>{
    searchText.value = newSearchText
},{immediate : true})

const filterProducts = computed(() =>{
    return productStore.filterProducts(searchText.value)
})
</script>