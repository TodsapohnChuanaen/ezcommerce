import { defineStore } from 'pinia'

import { ref,get} from 'firebase/database'
import{realtimeDB} from '@/firebase'

export const useAdminDashboardStore = defineStore('admin-dashboard', {
    state: () => ({
        stats: {
            orders: 0,
            totalAmount: 0,
            products: 0,
            users: 0
        }
    }),
    actions:{
        async loadDashboard(){
            const statRef = ref(realtimeDB, 'stats')
            const statSnapshot = await get(statRef)
            this.stats = statSnapshot.val()
        }
    }
})