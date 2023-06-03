import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'


export const useDialogStore = defineStore('dialog', () => {


  const guildCreate = reactive({
    dialogVisible : false,
  })

  const channelCreate = reactive({
    dialogVisible : false,
    channelGroup: '',
  })

  const channelGroupCreate = reactive({
    dialogVisible : false,
  })

  const openChannelCreate = (channelGroup = '') => {
    channelCreate.dialogVisible = true
    channelCreate.channelGroup = channelGroup
  }

  return { guildCreate, channelCreate, openChannelCreate, channelGroupCreate}
})
