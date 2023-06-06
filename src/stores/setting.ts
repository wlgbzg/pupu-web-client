import { reactive } from 'vue'
import { defineStore } from 'pinia'
import ChannelGroupEditOverview from '@/views/setting/ChannelGroupEditOverview.vue'
import ChannelGroupEditPermissions from '@/views/setting/ChannelGroupEditPermissions.vue'
import ChannelEditOverview from '@/views/setting/ChannelEditOverview.vue'
import GuildEditOverview from '@/views/setting/GuildEditOverview.vue'
import GuildRolePermissions from '@/views/setting/GuildRolePermissions.vue'


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
      }
    ],
    guildEdit: [
      {
        title: '概况',
        view: GuildEditOverview
      },
      {
        title: '角色权限',
        view: GuildRolePermissions
      }
    ],
  })

  return { info, nav }
})
