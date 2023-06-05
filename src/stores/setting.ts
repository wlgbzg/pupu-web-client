import { reactive } from 'vue'
import { defineStore } from 'pinia'
import ChannelGroupEditOverview from '@/views/setting/ChannelGroupEditOverview.vue'
import ChannelGroupEditPermissions from '@/views/setting/ChannelGroupEditPermissions.vue'
import ChannelEditOverview from '@/views/setting/ChannelEditOverview.vue'


export const useSettingStore = defineStore('setting', () => {

  const info = reactive({
    data: {}
  })

  const nav = reactive({
    channelGroupEdit: [
      {
        title: '概况',
        view: ChannelGroupEditOverview
      },
      {
        title: '权限',
        view: ChannelGroupEditPermissions
      }
    ],
    channelEdit: [
      {
        title: '概况',
        view: ChannelEditOverview
      },
      {
        title: '权限',
        view: ChannelGroupEditPermissions
      },
      {
        title: '邀请',
        view: ChannelGroupEditPermissions
      }
    ]
  })

  return { info, nav }
})
