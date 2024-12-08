import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/users/HomeView.vue'
import CartView from '@/views/users/CartView.vue'
import ProfileView from '@/views/users/ProfileView.vue'
import SearchView from '@/views/users/SearchView.vue'
import SuccessView from '@/views/users/SuccessView.vue'
import CheckoutView from '@/views/users/CheckoutView.vue'

import AdminLogin from '@/views/admin/LoginView.vue'
import AdminDashboard from '@/views/admin/DashboardView.vue'

import AdminProductList from '@/views/admin/product/ListView.vue'
import AdminProductUpdate from '@/views/admin/product/UpdateView.vue'

import AdminUsersList from '@/views/admin/users/ListView.vue'
import AdminUsersUpdate from '@/views/admin/users/UpdateView.vue'

import AdminOrderList from '@/views/admin/order/ListView.vue'
import AdminOrderDetail from '@/views/admin/order/DetailView.vue'

import {useAccountStore} from '@/store/account'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/CartView',
      name: 'CartView',
      component: CartView 
    },
    {
      path: '/ProfileView',
      name: 'ProfileView',
      component: ProfileView
    },
    {
      path: '/SearchView',
      name: 'SearchView',
      component: SearchView
    },
    {
      path: '/SuccessView',
      name: 'SuccessView',
      component: SuccessView
    },
    {
      path: '/CheckoutView',
      name: 'CheckoutView',
      component: CheckoutView
    },
    // for admin side
    {
      path: '/admin/login',
      name: 'admin-login',
      component: AdminLogin
    },
    {
      path: '/admin/dashboard',
      name: 'admin-dashboard',
      component: AdminDashboard
    },
    {
      path: '/admin/products',
      name: 'admin-products-list',
      component: AdminProductList
    },
    {
      path: '/admin/products/create',
      name: 'admin-products-create',
      component: AdminProductUpdate
    },
    {
      path: '/admin/products/update/:id',
      name: 'admin-products-update',
      component: AdminProductUpdate
    },
    {
      path: '/admin/users',
      name: 'admin-users-list',
      component: AdminUsersList
    },
    {
      path: '/admin/users/update/:id',
      name: 'admin-users-update',
      component: AdminUsersUpdate
    },
    {
      path: '/admin/orders',
      name: 'admin-orders-list',
      component: AdminOrderList
    },
    {
      path: '/admin/orders/detail/:id',
      name: 'admin-orders-detail',
      component: AdminOrderDetail
    }
  ]
})

//beforeEach ทำอะไรก่อนที่จะไปยัง router ต่อไป
//โดยในที่นี้จะทำการ check auth ก่อนที่ไปยัง router
//afterEach ทำอะไรหลังจากไปยัง router
router.beforeEach(async(to, from, next) => {
  // console.log('to',to)
  // console.log('from',from)
  const accountStore = useAccountStore()
  await accountStore.checkAuth()
  next()
})

export default router
