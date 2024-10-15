<template>
    <AdminLayout>
        <div class="shadow-3xl p-8 mt-4">
            <div class="text-3xl font-bold">{{ mode }}</div>
            <div class="divider"></div>
            <div class="grid grid-cols-2 gap-4">
                <label v-for="form in formData" class="form-control w-full" v-bind:key="form.id">
                    <div class="label">
                        <span class="label-text">{{ form.name }}</span>
                    </div>
                    <input type="text" placeholder="Type here" class="input input-bordered w-full"
                        v-model="productData[form.field]" />
                </label>
            </div>
            <div class="divider"></div>
            <div class="grid grid-cols-2 gap-4">
                <label class="form-control w-full ">
                    <div class="label">
                        <span class="label-text">Status</span>
                    </div>
                    <select v-model="productData.status" class="select select-bordered">
                        <option disabled selected>Status</option>
                        <option value="open">Open</option>
                        <option value="closed">Close</option>
                    </select>
                </label>
            </div>

            <div class="flex mt-4 justify-end gap-2">
                <RouterLink 
                :to="{ name: 'admin-products-list' }" 
                class="btn btn-ghost">BACK</RouterLink>
                <button class="btn btn-neutral" @click="updateProduct()">{{ mode }}</button>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import { reactive, onMounted, ref } from 'vue';
import { useRouter, useRoute, RouterLink } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useAdminProductStore } from '@/store/admin/products'

const adminProductStore = useAdminProductStore()
const router = useRouter()
const route = useRoute()

const productIndex = ref()
const mode = ref('add')

onMounted(() => {
    if (route.params.id) {
        productIndex.value = parseInt(route.params.id)
        mode.value = 'edit'

        const selectedProduct = adminProductStore.getProducts(productIndex.value)
        // console.log('selectedproduct',selectedProduct)

        productData.name = selectedProduct.name
        productData.imageUrl = selectedProduct.imageUrl
        productData.price = selectedProduct.price
        productData.quantity = selectedProduct.quantity
        productData.about = selectedProduct.about
        productData.status = selectedProduct.status
    }
})

const formData = [
    {
        name: 'Name',
        field: 'name'
    },
    {
        name: 'Image',
        field: 'imageUrl',
    },
    {
        name: 'Price',
        field: 'price'
    },
    {
        name: 'Quantity',
        field: 'quantity'
    },
    {
        name: 'About',
        field: 'about'
    }
]

const productData = reactive({
    name: '',
    imageUrl: '',
    price: 0,
    quantity: 0,
    about: '',
    status: ''
})

const updateProduct = () => {
    if (mode.value === 'edit') {
        adminProductStore.updateProduct(productIndex.value, productData)
    } else {
        adminProductStore.addProduct(productData)
    }
    // console.log(productData)

    router.push({ name: 'admin-products-list' })
}
</script>