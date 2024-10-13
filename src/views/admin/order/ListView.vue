<template>
    <AdminLayout>
        <div class="flex items-center justify-between my-8">
            <div class="text-3xl font-bold">Order List</div>
        </div>
        <Table :headers="['Customer Name', 'Price', 'Status', 'Updated At',]">
            <tr v-for="(order, index) in adminOrderStore.list" v-bind:key="order.id">
                <td>{{ order.customerName }}</td>
                <td>{{ order.totalPrice }}</td>
                <td>{{ order.status }}</td>
                <td>{{ order.updatedAt }}</td>
                <td>
                    <RouterLink 
                        :to="{ name: 'admin-orders-detail', params: { id: index } }">
                        <Detail></Detail>
                    </RouterLink>
                </td>
            </tr>
        </Table>
    </AdminLayout>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useAdminOrderStore } from '@/store/admin/order'
import Table from '@/components/Table.vue'

import Detail from '@/components/icons/Detail.vue';

const adminOrderStore = useAdminOrderStore()
</script>