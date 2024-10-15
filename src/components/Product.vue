<template>
     <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m-4">
        <div v-for="product in products" class="card w-full bg-base-100 shadow-xl" v-bind:key="product.id">
            <figure>    
                    <img class="w-full h-80" :src="product.imageUrl" />              
                <!-- <img class="w-full" src="https://picsum.photos/id/2/200/300" alt="Shoes" /> -->
            </figure>
            <div class="card-body bg-neutral-800">
                <h2 class="card-title">{{product.name}}</h2>
                <p>{{product.about}}</p>
                <div class="card-actions justify-end ">
                    <button class="btn btn-primary" @click="addToCart(product)">Buy Now</button>
                </div>
            </div>
        </div>
        </section>
</template>

<script setup>

defineProps({
    // รับ products มาจาก HomeView.vue เพื่อนำมาวน loop ใน template
    products: Array,
    addToCart: Function
})
</script>

<!-- <div class="mx-auto"><img class="p-2 w-1/2" :src="product.imageUrl"></div> -->