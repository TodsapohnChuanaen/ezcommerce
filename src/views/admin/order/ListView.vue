<template>
    <AdminLayout>
        <div class="flex items-center justify-between my-8">
            <div class="text-3xl font-bold">Order List</div>
        </div>
        <Table :headers="['Customer Name', 'Price', 'Status', 'Updated At',]">
            <tr class="hover" v-for=" order in adminOrderStore.list" v-bind:key="order.id">
                <td>{{ order.name }}</td>
                <td>{{ order.totalPrice }}</td>
                <td>{{ order.status }}</td>
                <td>{{ order.createdAt }}</td>
                <td>
                    <RouterLink 
                        :to="{ name: 'admin-orders-detail', params: { id: order.orderId } }">
                        <Detail></Detail>
                    </RouterLink>
                </td>
            </tr>
        </Table>
    </AdminLayout>
</template>

<script setup>
import { onMounted } from 'vue'    
import { RouterLink } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useAdminOrderStore } from '@/store/admin/order'
import Table from '@/components/Table.vue'

import Detail from '@/components/icons/Detail.vue';

const adminOrderStore = useAdminOrderStore()

onMounted(async () => {
    await adminOrderStore.loadOrders()
})

</script>