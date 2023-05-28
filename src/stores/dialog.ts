import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'


export const useDialogStore = defineStore('dialog', () => {


  const guildCreate = ref({
    dialogVisible : false,
  })

  return { guildCreate }
})
