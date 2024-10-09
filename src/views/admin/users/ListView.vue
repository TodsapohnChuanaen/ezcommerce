<template>
    <AdminLayout>
        <div class="flex items-center justify-between my-8">
            <div class="text-3xl font-bold">Users</div>
        </div>
        <Table :headers="['Name', 'Role', 'Status', 'Updated At', 'Action']">
            <tr v-for="(user,index) in adminUserStore.list" v-bind:key="user.id">
                <td>{{ user.adminName }}</td>
                <td>{{ user.role}}</td>
                <td>{{ user.status }}</td>
                <td>{{ user.updatedAt }}</td>
                <td>
                    <div class="flex gap-2">
                    <RouterLink :to="{ name: 'admin-users-update', params: { id: index } }" 
                    class="btn btn-ghost btn-circle">
                        Edit
                    </RouterLink>
                    <button class="btn btn-ghost btn-circle" @click="changeStatus(index)">
                        {{user.status === 'active' ? 'Disable' : 'Enable'}}
                    </button>
                    </div>
                </td>
            </tr>
        </Table>
    </AdminLayout>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

import Trash from '@/components/icons/Trash.vue'
import Edit from '@/components/icons/Edit.vue'
import Table from '@/components/Table.vue'

import { useAdminUserStore } from '@/store/admin/users'

const adminUserStore = useAdminUserStore()
// onMounted(() => {
//     useAdminUserStore.loadUsers()
// })
const changeStatus = (index) => {
    let selectUser = adminUserStore.list[index]
    selectUser.status = selectUser.status === 'active' ? 'disable' : 'active'
    adminUserStore.updateUser(selectUser)
}
</script>