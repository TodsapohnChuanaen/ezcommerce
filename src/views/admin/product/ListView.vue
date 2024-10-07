<template>
    <AdminLayout>
        <div class="flex items-center justify-between my-8">
            <div class="text-3xl font-bold">Product List</div>
            <div>
                <RouterLink 
                :to="{ name: 'admin-products-create' }"
                class="btn btn-neutral mr-32">Add
                </RouterLink>
            </div>
        </div>
        <div class="overflow-x-auto">
            <table class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Update At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in adminProductStore.list" v-bind:key="product.id">
                        <th>{{ product.name }}</th>
                        <td>
                            <img :src="product.image">
                        </td>
                        <td>{{ product.price }}</td>
                        <td>{{ product.remainQuantity }} / {{ product.quantity }}</td>
                        <td>
                            <div class="badge badge-success">{{ product.status }}</div>
                        </td>
                        <td>{{ product.updatedAt }}</td>
                        <td>
                            <div class="flex gap-2">
                                <div class="btn btn-ghost btn-circle">
                                    <Edit></Edit>
                                </div>
                                <div class="btn btn-ghost btn-circle">
                                    <Trash></Trash>
                                </div>
                            </div>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </AdminLayout>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import {useAdminProductStore} from '@/store/admin/products'
import Trash from '@/components/icons/Trash.vue'
import Edit from '@/components/icons/Edit.vue'
import { onMounted } from 'vue'

const adminProductStore = useAdminProductStore()
onMounted(() => {
    adminProductStore.loadProducts()
})

</script>

<style scoped>
img {
    width: 120px;
    height: 100px;
}
</style>