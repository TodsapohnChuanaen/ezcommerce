<template>
    <AdminLayout>
        <div class="overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Update At</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" v-bind:key="product.name">
                        <td>{{ product.name }}</td>
                        <td>
                            <img :src="product.image">
                        </td>
                        <td>{{ product.price }}</td>
                        <td>{{ product.remainQuantity }} / {{ product.quantity }}</td>
                        <td>{{ product.status }}</td>
                        <td>{{ product.updatedAt }}</td>
                        <td>action</td>
                    </tr>

                </tbody>
            </table>
        </div>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import { ref } from 'vue'

const products = ref([{
    name: 'test',
    image: 'https://fastly.picsum.photos/id/1/200/300.jpg?hmac=jH5bDkLr6Tgy3oAg5khKCHeunZMHq0ehBZr6vGifPLY',
    price: 100,
    quantity: 20,
    remainQuantity: 10,
    status: 'open',
    updatedAt: (new Date()).toISOString()
}])
</script>

<style scoped>
    img {
        width: 120px;
        height: 100px;
    }
</style>