<template>
    <AdminLayout>   
        <div class="shadow-3xl p-8 mt-4">
            <div class="text-3xl font-bold">Order Detail id: {{ orderIndex}}</div>
            <div class="divider"></div>
            <div class="grid grid-cols-2 gap-2">
                <div>
                    <div class="font-bold">Order date</div>
                    <div>{{ orderData.createdAt }}</div>
                </div>
                <div>
                    <div class="font-bold">Order number</div>
                    <div>{{ orderData.orderId }}</div>
                </div>
                <div>
                    <div class="font-bold">Payment method</div>
                    <div>{{ orderData.paymentMethod }}</div>
                </div>
                <div>
                    <div class="font-bold">Adress</div>
                    <div>{{ orderData.address}}</div>
                </div>
            </div>
            <div class="divider"></div>
                <div v-for="product in orderData.products" class="grid grid-cols-4 items-center" v-bind:key="product.id">
                    <div class="mx-auto"><img class="p-2 w-1/2" :src="product.imageUrl"></div>
                    <div>
                        <div class="font-bold">{{ product.name }}</div>
                        <div>{{ product.description }}</div>
                    </div>
                    <div>quantity: {{ product.quantity }}</div>
                    <div>{{ product.price }} THB</div>
                </div>
            <div class="divider"></div>
            <div class="flex justify-between">
                <div class="font-bold pl-20">Total price:</div>
                <div class="pr-44">{{ orderData.totalPrice }} THB</div>
            </div>
            <div class="flex justify-end mt-4 pr-40">
                <RouterLink 
                :to="{ name: 'admin-orders-list'}" 
                class="btn btn-neutral btn-ghost btn-lg">BACK</RouterLink>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { useRoute,useRouter,RouterLink } from 'vue-router'
import { useAdminOrderStore  } from '@/store/admin/order'
import AdminLayout from '@/layouts/AdminLayout.vue'

const orderIndex = ref(-1) // Store the current order index in the URL param

const orderData = ref({
    products : []
})
const route = useRoute()
const adminOrderStore = useAdminOrderStore()


onMounted( async () => {
    if(route.params.id){
        orderIndex.value = route.params.id
        const selectedOrder = await adminOrderStore.getOrder(orderIndex.value)
        orderData.value = selectedOrder
        // console.log('orderdata',orderData.value)
    }
})
</script>