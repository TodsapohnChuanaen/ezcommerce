<template>
    <AdminLayout>
        <div class="shadow-3xl p-8 mt-4">
            <div class="text-3xl font-bold">Update User</div>
            <div class="divider"></div>
            <div class="grid grid-cols-1 gap-2">
                <label v-for="form in formData" class="form-control w-full" v-bind:key="form.id">
                    <div class="label">
                        <span class="label-text">{{ form.name }}</span>
                    </div>
                    <input v-if="form.type === 'text'" 
                    v-model="userData[form.field]"
                    type="text" placeholder="Type here"
                        class="input input-bordered w-1/2" />
                    <select v-if="form.type === 'select'" 
                    v-model="userData[form.field]"
                    type="select" class="select select-bordered w-1/4">
                        <option v-for="option in form.dropdownList" v-bind:key="option">
                            {{ option }}
                        </option>
                    </select>
                </label>
            </div>
            <div class="flex mt-4 justify-end gap-2">
                <RouterLink :to="{ name: 'admin-users-list'}" class="btn btn-ghost">back</RouterLink>
                <button class="btn btn-neutral" @click="updateUser()">Update</button>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import { ref,reactive,onMounted } from 'vue';
import { useRoute,useRouter,RouterLink } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useAdminUserStore } from '@/store/admin/users';
import {useEventStore} from '@/store/event'

const adminUserStore = useAdminUserStore()
const route = useRoute()
const userIndex = ref(-1)
const router = useRouter()
const eventStore = useEventStore()

onMounted(() => {
    if(route.params.id){
        userIndex.value = parseInt(route.params.id)
        const selectedUser = adminUserStore.getUsers(userIndex.value)

        userData.adminName = selectedUser.adminName
        userData.role = selectedUser.role
        userData.status = selectedUser.status   
    }
})

const userData = reactive({
    adminName: '',
    role: '',
    status: '' 
})

const updateUser = () => {
    adminUserStore.updateUser(userIndex.value, userData)
    eventStore.popupMessage('info','update user success')
    router.push({name: 'admin-users-list'})
}

const formData = [
    {
        name: 'Name',
        field: 'adminName',
        type: 'text'
    },
    {
        name: 'Role',
        field: 'role',
        type: 'select',
        dropdownList: ['admin', 'moderator', 'user']
    },
    {
        name: 'Status',
        field: 'status',
        type: 'select',
        dropdownList: ['active', 'disable']
    }]
</script>