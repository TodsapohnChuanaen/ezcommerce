<template>
    <AdminLayout>
        <div class="flex items-center justify-between my-8">
            <div class="text-3xl font-bold">Order List</div>
        </div>
        <Table :headers="['Customer Name', 'Price', 'Status', 'Updated At', 'Action']">
        </Table>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import Table from '@/components/Table.vue'
</script>