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

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### thing that need to see if has a bug or eror
```sh
export const useProductStore = defineStore('product-users', {} 
'product-users' avoid duplicate names in defineStore to ensure clear and maintainable code.
```
