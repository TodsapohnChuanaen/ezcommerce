import { defineStore } from "pinia";

//for toast message
export const useEventStore = defineStore("event", {
  state: () => ({
      alert: false,
      data:{}
  }),
  actions: {
    popupMessage(status,message){
        this.data ={
            status,
            message
        }
        this.alert = true
        setTimeout(this.clearMessage, 3000)
    },
    clearMessage(){
      this.alert = false
      this.data = {}
    }
  }
});