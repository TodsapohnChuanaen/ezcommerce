<template>
    <AdminLayout>   
        <div class="shadow-3xl p-8 mt-4">
            <div class="text-3xl font-bold">Order Detail id: {{ orderIndex }}</div>
            <div class="divider"></div>
        </div>
    </AdminLayout>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { useAdminOrderStore } from '@/store/admin/order'
import AdminLayout from '@/layouts/AdminLayout.vue'

const orderIndex = ref(-1)
const router = useRouter()
const route = useRoute()
const adminOrderStore = useAdminOrderStore()

const orderData = ref({
    //ประกาศเป็น default array ไว้ เพื่อกันการ undefined
    //จังหวะแรกที่โหลดมาจะได้ไม่เกิด eror
    products : []
})


onMounted(() => {
    if(route.params.id){
        orderIndex.value = parseInt(route.params.id)
        const selectedOrder = adminOrderStore.getOrder(orderIndex.value)
        orderData.value = selectedOrder
    }
})
</script>