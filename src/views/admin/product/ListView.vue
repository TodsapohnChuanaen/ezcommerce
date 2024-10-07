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
            :headers="['Name', 'Image', 'Price', 'Quantity', 'Status', 'Updated At', 'Action']">   
            <tr v-for="(product, index) in adminProductStore.list" v-bind:key="product.id">
                <th>{{ product.name }}</th>
                <td>
                    <img :src="product.image">
                </td>
                <td>{{ product.price }}</td>
                <td>{{ product.remainQuantity }} / {{ product.quantity }}</td>
                <td>
                    <div class="badge"
                        :class="product.status === 'open' ? 'badge-success font-bold' : 'badge-error font-bold'">
                        {{ product.status }}
                    </div>
                </td>
                <td>{{ product.updatedAt }}</td>
                <td>
                    <div class="flex gap-2">
                        <RouterLink :to="{ name: 'admin-products-update', params: { id: index } }"
                            class="btn btn-ghost btn-circle">
                            <Edit></Edit>
                        </RouterLink>
                        <div @click="removeProduct(index)" class="btn btn-ghost btn-circle">
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
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useAdminProductStore } from '@/store/admin/products'
import Trash from '@/components/icons/Trash.vue'
import Edit from '@/components/icons/Edit.vue'
import Table from '@/components/Table.vue'
import { onMounted } from 'vue'

const adminProductStore = useAdminProductStore()
onMounted(() => {
    adminProductStore.loadProducts()
})

const removeProduct = (index) => {
    adminProductStore.removeProduct(index)
}

</script>

<style scoped>
img {
    width: 120px;
    height: 100px;
}
</style>