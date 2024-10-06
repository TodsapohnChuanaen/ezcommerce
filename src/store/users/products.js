import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
  state: () => ({
    list: [{
      name: 'test',
      imageUrl: 'https://fastly.picsum.photos/id/237/536/354.jpg?hmac=i0yVXW1ORpyCZpQ-CknuyV-jbtU7_x9EBQVhvT5aRr0',
      quantity: 10,
      about: 'testt',
      status: 'open',
      price: 100,
    },{
    name: 'test 123',
    imageUrl: 'https://fastly.picsum.photos/id/685/536/354.jpg?hmac=Hd6dp2Be-rOnk4Iqn2P0JT4dbWx6ZwdihOS9q9KbXvs',
    quantity: 20,
    about: 'recheck this',
    status: 'open',
    price: 100}]
    // loaded: false
  }),
  actions:{
    filterProducts(searchText){
      return this.list.filter(product =>product.name.includes(searchText))
    }
  }
})
