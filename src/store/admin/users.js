import { defineStore } from 'pinia'

export const useAdminUserStore = defineStore('admin-user', {
    state: () => ({
        list: [{
            adminName: 'Aun',
            role: 'admin',
            status: 'active',
            updatedAt: (new Date()).toISOString()
        }],
    }),
    actions:{
        getUsers(index){
            return this.list[index]
        },
        updateUser(index, userData){
            const fields = ['adminName', 'role', 'status']
            //or fields.forEach(field => {}}
            for (let field of fields) {
                this.list[index][field] = userData[field]
            }
            this.list[index].updatedAt = (new Date()).toISOString()
        },
        removeUser(index){
            this.list.splice(index, 1)
        }
    }
})