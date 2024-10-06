<template>
    <AdminLayout>
        <div class="text-3xl font-bold my-4">Dashboard</div>
        <div class="stats shadow w-full mb-4">
            <div class="stat">
                <div class="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        class="inline-block h-8 w-8 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <div class="stat-title">Orders</div>
                <div class="stat-value">31K</div>
                <!-- <div class="stat-desc">Jan 1st - Feb 1st</div> -->
            </div>

            <div class="stat">
                <div class="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        class="inline-block h-8 w-8 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4">
                        </path>
                    </svg>
                </div>
                <div class="stat-title">Products</div>
                <div class="stat-value">4,200</div>
                <!-- <div class="stat-desc">↗︎ 400 (22%)</div> -->
            </div>

            <div class="stat">
                <div class="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        class="inline-block h-8 w-8 stroke-current">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4">
                        </path>
                    </svg>
                </div>
                <div class="stat-title">Users</div>
                <div class="stat-value">1,200</div>
                <!-- <div class="stat-desc">↘︎ 90 (14%)</div> -->
            </div>
        </div>
        <div class="flex">
            <div class="flex-1">
                <apexchart type="bar" :options="priceChart.options" :series="priceChart.series">
                </apexchart>
            </div>
            <div class="flex-1">
                <apexchart type="donut" :options="categoryChart.options" :series="categoryChart.series">
                </apexchart>
            </div>
        </div>

    </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'


const priceChart = {
    options: {
        chart: {
            id: 'vuechart-example',
        },
        xaxis: {
            type: 'category',
            categories: [1, 2, 3, 4, 5, 6, 7, 8,],
            labels: {
                show: true,
                maxHeight: 120,
                style: {
                    colors: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
                    fontSize: '18px',
                    // fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-xaxis-label',
                }
            },
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    colors: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
                    fontSize: '18px',
                    // fontFamily: 'Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-xaxis-label',
                }
            },
        },
        plotOptions: {
            bar: {
                distributed: true
            }
        }
    },
    series: [
        {
            name: 'series-1',
            data: [30, 40, 45, 50, 49, 60, 70, 91],
        },

    ],



}

const categoryChart = {
    options: {
        chart: { id: 'vuechart-pie', },
    },
    series: [44, 55, 41, 17, 15,]
}


</script>

<style setup></style>
