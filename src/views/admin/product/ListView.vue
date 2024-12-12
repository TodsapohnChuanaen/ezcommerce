<template>
    <AdminLayout>
        <div class="flex items-center justify-between my-8">
            <div class="text-3xl font-bold">Product List</div>
        </div>
        <div class="flex gap-2 items-center">
            <div class="flex-1">
                <input v-model="adminProductStore.filter.search" type="text" placeholder="Type here"
                    class="input input-bordered w-full max-w-xs" />
            </div>
            <div class="flex-1">
                <button @click="searchProduct()" class="btn">Search</button>
            </div>
            <div class="flex-1 mb-5">
                <div class="ml-2">Status</div>
                <div class="join ">
                    <button @click="changeStatusFilter('all')" class="btn join-item"
                        :class="adminProductStore.filter.status === 'all' ? 'btn-active' : ''">ALL</button>
                    <button @click="changeStatusFilter('open')" class="btn join-item"
                        :class="adminProductStore.filter.status === 'open' ? 'btn-active' : ''">OPEN</button>
                    <button @click="changeStatusFilter('closed')" class="btn join-item"
                        :class="adminProductStore.filter.status === 'closed' ? 'btn-active' : ''">CLOSE</button>
                </div>
            </div>
            <div class="flex-1 mb-5">
                <div class="ml-9">Updated At</div>
                <div class="join">
                    <button class="btn join-item ml-8" @click="changeSortUpdatedAt('asc')"
                        :class="adminProductStore.filter.sort.updatedAt === 'asc' ? 'btn-active' : ''">ASC</button>
                    <button class="btn join-item" @click="changeSortUpdatedAt('desc')"
                        :class="adminProductStore.filter.sort.updatedAt === 'desc' ? 'btn-active' : ''">DESC</button>
                </div>
            </div>
            <div class="flex-1">
                <RouterLink :to="{ name: 'admin-products-create' }" class="btn">Add
                </RouterLink>
            </div>
        </div>
        <div class="overflow-x-auto text-center">
            <Table class="table" :headers="['Name', 'Image', 'Price', 'Quantity', 'Status', 'Updated At']">
                <tr class="hover" v-for="(product) in adminProductStore.list" v-bind:key="product.id">
                    <th>{{ product.name }}</th>
                    <td>
                        <img :src="product.imageUrl">
                    </td>
                    <td>
                        {{ product.price }}</td>
                    <td>{{ product.remainQuantity }} / {{ product.quantity }}</td>
                    <td>
                        <div class="badge" :class="product.status === 'open' ? 'badge-success' : 'badge-error'">
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
        </div>
        <Pagination :activePage="currentPage" :maxPage="adminProductStore.totalPage" :changePage="changePage">
        </Pagination>
    </AdminLayout>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'

import AdminLayout from '@/layouts/AdminLayout.vue'
import { useAdminProductStore } from '@/store/admin/products'

import Trash from '@/components/icons/Trash.vue'
import Edit from '@/components/icons/Edit.vue'
import Table from '@/components/Table.vue'
import Pagination from '@/components/Pagination.vue'

const currentPage = ref(1)

const adminProductStore = useAdminProductStore()
onMounted(async () => {
    await adminProductStore.loadProducts()
})

const searchProduct = async () => {
    await adminProductStore.loadProducts()
}

const changeStatusFilter = async (newStatus) => {
    adminProductStore.filter.status = newStatus
    await adminProductStore.loadProducts()
}

const changeSortUpdatedAt = async (newSort) => {
    adminProductStore.filter.sort.updatedAt = newSort
    await adminProductStore.loadProducts()
}

const changePage = async (newPage) => {
    if (newPage < currentPage.value) {
        //previous
        await adminProductStore.loadNextProduct('previous')
    } else if (newPage > currentPage.value) {
        //forward
        await adminProductStore.loadNextProduct('next')
    }
    currentPage.value = newPage
}

const removeProduct = async (index) => {
    try {
        await adminProductStore.removeProduct(index)
        await adminProductStore.loadProducts()
    } catch (error) {
        console.log('error', error)
    }
}

</script>

<style scoped>
img {
    width: 150px;
    height: 150px;
}
th {
    padding: 10px;
  justify-content: start;
    border-bottom: 1px solid rgb(224, 242, 237);
}

td {
    padding: 20px;
    border-bottom: 1px solid rgb(224, 242, 237);
}
</style>