<template>
    <AdminLayout>
        <div class="flex items-center justify-between my-8">
            <div class="text-3xl font-bold">Users</div>
        </div>
        <Table :headers="['Name', 'Role', 'Status', 'Updated At', 'Action']">
            <tr v-for="(user,index) in adminUserStore.list" v-bind:key="user.id">
                <td class=" text-white font-bold">{{ user.adminName }}</td>
                <td>{{ user.role}}</td>
                <td><div class="badge"
                        :class="user.status === 'active' ? 'badge-success' : 'badge-error'">
                        {{ user.status }}
                    </div>          
                </td>
                <td>{{ user.updatedAt }}</td>
                <td>
                    <div class="flex gap-2">
                    <RouterLink :to="{ name: 'admin-users-update', params: { id: index } }" 
                    class="btn btn-ghost btn-circle">
                        <Edit></Edit>
                    </RouterLink>
                    <!-- <button class="btn btn-ghost btn-circle" @click="changeStatus(index)">
                        {{user.status === 'active' ? 'Disable'  : 'Enable'}}
                    </button>   -->
                    
                    <button v-if="user.status === 'active'" class="btn btn-ghost btn-circle" @click="changeStatus(index)">
                        <Lock></Lock>
                    </button>  
                    <button v-else class="btn btn-ghost btn-circle" @click="changeStatus(index)">
                        <Unlock></Unlock>
                    </button>  


                    <!-- <button @click="changeStatus(index)" v-if="!isActive" class="btn btn-ghost btn-circle">
                        <Unlock></Unlock>
                    </button>
                    <button v-else class="btn btn-ghost btn-circle">     
                        <Lock></Lock>
                    </button> -->
                    </div>
                </td>
            </tr>
        </Table>
    </AdminLayout>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'

import Lock from '@/components/icons/Lock.vue'
import Unlock from '@/components/icons/Unlock.vue'
import Table from '@/components/Table.vue'
import Edit from '@/components/icons/Edit.vue'

import { useAdminUserStore } from '@/store/admin/users'

// const isActive = ref(false)

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