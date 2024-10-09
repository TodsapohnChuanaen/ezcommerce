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
                    <input v-if="form.type === 'text'" type="text" placeholder="Type here"
                        class="input input-bordered w-1/2" />
                    <select v-if="form.type === 'select'" type="select" class="select select-bordered w-1/4">
                        <option v-for="option in form.dropdownList" v-bind:key="option">
                            {{ option }}
                        </option>
                    </select>
                </label>
            </div>
            <div class="flex mt-4 justify-end gap-2">
                <button class="btn btn-ghost">Back</button>
                <button class="btn btn-neutral" @click="updateUser()">Update</button>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'

const updateUser = () => {

}

const formData = [
    {
        name: 'Name',
        field: 'name',
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