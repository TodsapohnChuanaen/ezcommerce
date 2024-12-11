# easy-commerce

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm create vue@latest
npm install
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
npm i -D daisyui@latest
# APEXCHARTS  
npm install --save apexcharts
npm install --save vue3-apexcharts  
```
### Install firebase for backend
```sh
npm install -g firebase-tools   (install firebase cli for using firebase command) and firebase --version for check if cli is installed.
firebase login
    go to firebase console and create firestore database and create Storage  
firebase init
    (choose realtime database,firestore,functions,hosting:config,storage,emulators)
    Emulator Setup
    (choose authentication,functions,firestore,database,storage)
How to use firebase emulator(can skip it if don't worry about firebase pricing)
    firebase emulators:start
    or use this command to remember setting by import and export setting
    this command will create new folder call firebase-export in this project >>
    
    firebase emulators:start --import ./firebase-export --export-on-exit ./firebase-export
npm install firebase

create file firebase.js in src folder for firebase config.
by go to project Overview and choose add app
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Things to look out for when encountering bugs and errors.
```sh
export const useProductStore = defineStore('product-users', {} 
'product-users' avoid duplicate names in defineStore to ensure clear and maintainable code.
```

### P.S.
```sh
Can use specific Node.js version to prevent warning. So use node v20.18.0 (npm v10.8.2) with command nvm i 20.18.0 for install and nvm use 20.18.0 --save 
>>[DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
or follow https://www.npmjs.com/package/punycode
```

### BUG
```sh
still have bug about pagination in  http://localhost:5173/admin/products
need to look at store-admin-products
and views-admin-product  ,  component-Pagination.vue
```

### Need improve
```sh
views-admin-product
in updateProduct function
when add product button need to add loading scren and prevent user to do anything when waiting for loading 

helper function

การ convert image ในกรณีที่ user upload ภาพเดิม ซ้ำๆ แต่เป็นชื่อใหม่
เพื่อไม่ให้เกิดการใช้งาน storage มากเกินไป อาจจะแก้ โดยการแปลงชื่อภาพเป็น uid ของ user และทำการแปลงเป็น type ตามที่เราต้องการ และอาจจะอนุญาตให้ upload มาแค่ png หรือ jpg หรือเมื่อ user upload มาเป็น format ไหน ให้แปลง format ไปเป็นตามที่เราต้องการ 
```

