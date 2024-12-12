<template>
    <AdminLayout>
        <div class="shadow-3xl p-8 mt-4">
            <div class="text-3xl font-bold">{{ mode }}</div>
            <div class="divider"></div>

            <div class="grid grid-cols-2 gap-4">
                <div class="avatar justify-end">
                    <div class="w-ful rounded-full">
                        <img :src="productData.imageUrl">
                    </div>
                </div>
                
                <div class="avatar items-center">
                <input type="file" accept="image/*" @change="handleFileUpload">
            </div>
            </div>



            <div class="grid grid-cols-2 gap-4">
                <label v-for="form in formData" class="form-control w-full" v-bind:key="form.id">
                    <div class="label">
                        <span class="label-text">{{ form.name }}</span>
                    </div>
                    <input v-if="form.type === 'text'" v-model="productData[form.field]" type="text"
                        placeholder="Type here" class="input input-bordered w-full" />
                    <input v-else v-model="productData[form.field]" type="number" class="input input-bordered w-full" />
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
                <RouterLink :to="{ name: 'admin-products-list' }" class="btn btn-ghost">BACK</RouterLink>
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

import { storage } from '@/firebase'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

const adminProductStore = useAdminProductStore()
const router = useRouter()
const route = useRoute()

const productIndex = ref()
const mode = ref('Add')

onMounted(async () => {
    if (route.params.id) {
        productIndex.value = route.params.id
        mode.value = 'edit'

        const selectedProduct = await adminProductStore.getProduct(productIndex.value)

        productData.imageUrl = selectedProduct.imageUrl
        productData.name = selectedProduct.name
        productData.about = selectedProduct.about
        productData.price = selectedProduct.price
        productData.quantity = selectedProduct.quantity
        productData.status = selectedProduct.status
    }
})


const formData = [
    {
        name: 'Name',
        field: 'name',
        type: 'text'
    },
    {
        name: 'About',
        field: 'about',
        type: 'text'
    },
    {
        name: 'Price',
        field: 'price',
        type: 'number'
    },
    {
        name: 'Quantity',
        field: 'quantity',
        type: 'number'
    }
]


const productData = reactive({
    imageUrl: '',
    name: '',
    about: '',
    price: 0,
    quantity: 0,
    status: ''
})

const updateProduct = async () => {
    try {
        if (mode.value === 'edit') {
            await adminProductStore.updateProduct(productIndex.value, productData)
        } else {
            await adminProductStore.addProduct(productData)
        }
        router.push({ name: 'admin-products-list' })
    } catch (error) {
        console.log('error', error)
    }
}

const handleFileUpload = async (event) => {
    const file = event.target.files[0]

    let mainPath = ''

    if (productIndex.value !== -1) {
        mainPath = productIndex.value + '-'
    }

    if (file) {
        //ระบุ path ไปที่เราต้องการอัพโหลด
        const uploadRef = storageRef(storage,
            `products/${mainPath}${file.name}`)

        //หลังจาก upload เสร็จ เราจะบอกว่า upload ไปที่ไหน พร้อมกับบอกว่า file ไหน ด้วยคำสั่ง uploadBytes
        const snapshot = await uploadBytes(uploadRef, file)
        //เราจะได้ผลลัพธ์จากการ upload คือ downloadUrl
        const downloadUrl = await getDownloadURL(snapshot.ref)
        //นำ downloadUrl แทนเข้าไปใน profileImageUrl
        productData.imageUrl = downloadUrl
    }
}

</script>