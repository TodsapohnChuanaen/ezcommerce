<template>
    <UserLayout>
        <div class="max-w-4xl mx-auto border border-base-200 bg-neutral shadow-xl p-8 my-4">
            <div class="text-3xl font-bold">Profile</div>
            <div class="flex flex-col items-center">
                <div class="flex flex-col items-center">
                    <div class="avatar">
                        <div class="w-ful rounded-full">
                            <img :src="profileImageUrl">
                        </div>
                    </div>
                    <input type="file" accept="image/*" @change="handleFileUpload">
                </div>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Email</span>
                    </div>
                    <input :value="email" type="text" placeholder="Type here" class="input input-bordered" disabled />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Name</span>
                    </div>
                    <input v-model="fullname" type="text" placeholder="Type here" class="input input-bordered" />
                </label>
                <button @click="updateProfile" class="btn  btn-outline btn-secondary w-1/4 mt-4">Update Profile</button>
            </div>
        </div>
    </UserLayout>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import UserLayout from '@/layouts/UserLayout.vue'
import defaultImageUrl from '@/assets/pic/cuteCat.jpg'

import { useAccountStore } from '@/store/account'

import { storage } from '@/firebase'
//ref ของ firebase ชนกันกับ ref ของ vue ดังนั้นจึงประกาศ ref as storageRef
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

const accountStore = useAccountStore()

const profileImageUrl = ref()
const email = ref('')
const fullname = ref('')

onMounted(() => {
    const profileData = accountStore.profile
    profileImageUrl.value = (profileData.profileImageUrl || defaultImageUrl)
    fullname.value = profileData.fullname
    email.value = profileData.email

})

const handleFileUpload = async (event) => {
    const file = event.target.files[0]

    if (file) {
        //ระบุ path ไปที่เราต้องการอัพโหลด
        const uploadRef = storageRef(storage,
            `users/${accountStore.user.uid}/${file.name}`)

        //หลังจาก upload เสร็จ เราจะบอกว่า upload ไปที่ไหน พร้อมกับบอกว่า file ไหน ด้วยคำสั่ง uploadBytes
        const snapshot = await uploadBytes(uploadRef, file)
        //เราจะได้ผลลัพธ์จากการ upload คือ downloadUrl
        const downloadUrl = await getDownloadURL(snapshot.ref)
        //นำ downloadUrl แทนเข้าไปใน profileImageUrl
        profileImageUrl.value = downloadUrl
    }
}

const updateProfile = async () => {
    try {
        const profileData = {
            profileImageUrl: profileImageUrl.value,
            fullname: fullname.value,
            email: email.value
        }
        await accountStore.updateProfile(profileData).then(() => {
            alert('Profile Updated')
        })
        window.location.reload()




    } catch (error) {
        console.log('error', error)
    }

}


</script>

<style scoped>
img {
    width: 200px;
    height: 200px;
}
</style>