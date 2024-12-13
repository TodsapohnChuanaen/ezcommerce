import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': { // เพิ่มตรงนี้เข้ามา  
        // ถ้าเรายิงไปที่ /api/placeorder ที่ target:
        // จากนั้นจะแทนที่ค่า api เป็นค่าว่างโดขจะเหลือแค่ /placeorder
        target: 'http://127.0.0.1:5001/ez-commerce-aun/us-central1/api', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  plugins: [
    vue(),
    nodePolyfills(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      process: "process/browser",
      stream: "stream-browserify",
      zlib: "browserify-zlib",
      util: 'util'
    }
  }
})
