import { reactive } from 'vue'
import { defineStore } from 'pinia'


export const useSettingStore = defineStore('setting', () => {

  const info = reactive({
    data: {}
  })



  return { info }
})
