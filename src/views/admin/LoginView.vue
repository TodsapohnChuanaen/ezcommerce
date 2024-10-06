<template>
    <div class="h-screen flex items-center">
        <div class="flex-1 max-w-2xl shadow-xl mx-auto bg-neutral p-8">
            <div class="flex flex-col items-center">
                <h1 class="text-3xl p-8">Login</h1>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Email</span>
                    </div>
                    <input type="text" placeholder="Your email" class="input input-bordered w-full bg-neutral" />
                </label>
                <label class="form-control w-full">
                    <div class="label">
                        <span class="label-text">Password</span>
                    </div>
                    <input type="password" placeholder="Your password" class="input input-bordered w-full bg-neutral" />
                </label>
                <RouterLink :to="{ name: 'admin-dashboard' }" class="btn  mt-8 w-full ">
                    Login
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
