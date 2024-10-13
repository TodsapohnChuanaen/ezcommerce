<!-- component ต้นแบบสำหรับตารางเพื่อใช้ในหลายๆหน้า -->
<template>
    <!-- overflow-x-auto use when table is too wide -->
    <div class="overflow-x-auto">
    <table class="table">
        <thead>
            <tr>
                <th v-for="header in headers" v-bind:key="header" class="font-bold text-lg text-white">{{ header }}</th>
            </tr>
        </thead>
        <tbody>
            <slot></slot>
        </tbody>
    </table>
</div>
</template>

<script setup>


defineProps({
    headers: Array
})

</script>
