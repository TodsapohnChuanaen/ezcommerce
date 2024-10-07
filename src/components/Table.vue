<!-- component ต้นแบบสำหรับตารางเพื่อใช้ในหลายๆหน้า -->
<template>
    <table class="table">
        <thead>
            <tr>
                <th v-for="header in headers" v-bind:key="header">{{ header }}</th>
            </tr>
        </thead>
        <tbody>
            <slot></slot>
        </tbody>
    </table>

</template>

<script setup>
import { defineProps} from 'vue'

defineProps({
    headers: Array
})

</script>
