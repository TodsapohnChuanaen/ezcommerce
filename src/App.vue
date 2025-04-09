<script setup>
import { onMounted } from 'vue';
import {RouterView} from 'vue-router'
import {useCartStore} from '@/store/users/cart'
import {useProductStore} from '@/store/users/products'
import {useEventStore} from '@/store/event'

const cartStore = useCartStore()
const productStore = useProductStore()
const eventStore = useEventStore()


onMounted(() => {
  productStore.loadProducts()
})
</script>

<!-- ถ้าต้องการใช้ toast ก็แค่เรียกใช้ eventStore.popupMessage (ได้ทั้ง project เพราะ ประกาศป็น pinia แล้ว)
ตามด้วย class etc. info,success แล้วตามด้วย message
eventStore.popupMessage('info','Welcome') -->


<template>
  <div v-if="eventStore.alert" class="toast">
    <div class="alert" :class="`alert-${eventStore.data.status}`">
      <span>{{ eventStore.data.message }}</span>
    </div>
  </div>
  <RouterView />
</template>


