<template>
    <AdminLayout>
        <div class="flex items-center justify-between my-8">
            <div class="text-3xl font-bold">Product List</div>
            <div>
                <RouterLink :to="{ name: 'admin-products-create' }" class="btn btn-neutral mr-32">Add
                </RouterLink>
            </div>
        </div>
        <Table
            :headers="['Name', 'Image', 'Price', 'Quantity', 'Status', 'Updated At']">   
            <tr v-for="(product, index) in adminProductStore.list" v-bind:key="product.id">
                <th>{{ product.name }}</th>
                <td>
                    <img :src="product.imageUrl">
                </td>
                <td>{{ product.price }}</td>
                <td>{{ product.remainQuantity }} / {{ product.quantity }}</td>
                <td>
                    <div class="badge"
                        :class="product.status === 'open' ? 'badge-success' : 'badge-error'">
                        {{ product.status }}
                    </div>
                </td>
                <td>{{ product.updatedAt }}</td>
                <td>
                    <div class="flex gap-2"> 
                        <RouterLink :to="{ name: 'admin-products-update', params: { id: product.productId } }"
                            class="btn btn-ghost btn-circle">
                            <Edit></Edit>
                        </RouterLink>
                        <div @click="removeProduct(product.productId)" class="btn btn-ghost btn-circle">
                            <Trash></Trash>
                        </div>
                    </div>
                </td>
            </tr>
        </Table>
    </AdminLayout>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'

import AdminLayout from '@/layouts/AdminLayout.vue'
import { useAdminProductStore } from '@/store/admin/products'

import Trash from '@/components/icons/Trash.vue'
import Edit from '@/components/icons/Edit.vue'
import Table from '@/components/Table.vue'


const adminProductStore = useAdminProductStore()
onMounted(async() => {
    await adminProductStore.loadProducts()
})

const removeProduct = async(index) => {
    try{
        await adminProductStore.removeProduct(index)
        await adminProductStore.loadProducts()
    }catch(error){
        console.log('error', error)
    }
}

</script>

<style scoped>
img {
    width: 120px;
    height: 100px;
}
</style>