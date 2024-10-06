<template>
    <UserLayout>
        <div class="max-w-4xl mx-auto border border-base-200 bg-neutral shadow-xl p-8 my-4">
            <div class="text-3xl font-bold">Profile</div>
            <div class="flex flex-col items-center">
            <div class="flex flex-col items-center">
                <div class="avatar">
                    <div class="w-ful rounded-full">
                        <!-- <img src="@/assets/pic/cuteCat.jpg"> -->
                        <img :src="profileImageUrl">
                    </div>
                </div>
                <input type="file" accept="image/*" @change="handleFileUpload">
            </div>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Name</span>
                    </div>
                    <input v-model="name" type="text" placeholder="Type here" class="input input-bordered" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Email</span>
                    </div>
                    <input v-model="email" type="text" placeholder="Type here" class="input input-bordered" />
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

const profileImageUrl = ref(defaultImageUrl)
const email = ref('')
const name = ref('')

onMounted(() => {
    let profileData = localStorage.getItem('profile-data')
    if (profileData) {
        profileData = JSON.parse(profileData)
        profileImageUrl.value = profileData.profileImageUrl
        name.value = profileData.name
        email.value = profileData.email
    }
})

const handleFileUpload = (event) => {
    const  file = event.target.files[0]

    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            // console.log(reader.result)
            profileImageUrl.value = e.target.result
        }
        reader.readAsDataURL(file)
    }
}

const updateProfile = () => {
   const profileData = {
    profileImageUrl: profileImageUrl.value,
    name: name.value,
    email: email.value 
   }   
   localStorage.setItem('profile-data', JSON.stringify(profileData))
   alert('Profile Updated')  
}

    
</script>

<style scoped>
    img {
        width: 200px;
        height: 200px;
    }
</style>