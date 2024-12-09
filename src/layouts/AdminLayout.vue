<template>
    <div class="drawer drawer-open">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content mx-4">
            <slot></slot>
        </div>
        <div class="drawer-side">
            <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                <!-- Sidebar content here -->
                <li class="text-3xl font-bold mb-8">
                    <RouterLink :to="{ name: 'admin-dashboard' }">EasyCommerce BackOffice</RouterLink>
                </li>
                <li class="mb-1" v-for="menu in menus" :key="menu.name">
                    <RouterLink class="text-xl" :to="{ name: menu.routeName }"
                        :class="menu.routeName === activeMenu ? 'active' : ''">
                        {{ menu.name }}
                    </RouterLink>
                </li>
                <li>
                   <a class="text-xl" @click="logout">Logout</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAccountStore } from '@/store/account'

const accountStore = useAccountStore()
const router = useRouter()
const activeMenu = ref('')
const route = useRoute()

onMounted(() => {
    //แสดงแถบ active ให้กับเมนูที่เลือก
    activeMenu.value = route.name
    // console.log(activeMenu.value)
})

const menus = [
    {
        name: 'Dashboard',
        routeName: 'admin-dashboard'
    },
    {
        name: 'Users',
        routeName: 'admin-users-list'
    },
    {
        name: 'Product',
        routeName: 'admin-products-list'
    },
    {
        name: 'Order',
        routeName: 'admin-orders-list'
    }
]

const logout = async () => {
    try{
        await accountStore.signOut()
        router.push({ name: 'login' })
    }catch(error){
        console.log('error',error)
    }
   
}

</script>