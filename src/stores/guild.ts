import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { Guild, UserGuild } from '@/types/beans'

export const useGuildStore = defineStore('guild2', () => {

    const guildInfo = reactive({
      guilds: [],
      userGuilds: []
    })

    const updateGuilds = (guilds: Guild[], userGuilds: UserGuild[]) => {
      guildInfo.guilds = guilds
      guildInfo.userGuilds = userGuilds
    }

    const addGuild = (userGuild: UserGuild, guild: Guild) => {
      guildInfo.guilds.push(guild)
      guildInfo.userGuilds.push(userGuild)
    }

    const getGuild = (guildId: string = ''): Guild | undefined => {
      for (const guild of guildInfo.guilds) {
        if (guild.id === guildId) {
          return guild
        }
      }
      return undefined
    }

    const exist = (guildId: string = '') => {
      for (const guild of guildInfo.guilds) {
        if (guild.id === guildId) {
          return true
        }
      }
      return false
    }

    const deleteGuild = (guildId: string = '') => {
      const index = guildInfo.guilds.findIndex(item => item.id === guildId)
      if (index !== -1) {
        guildInfo.guilds.splice(index, 1) // 从数组中删除该元素
      }
    }
    return { guildInfo, updateGuilds, addGuild, getGuild, exist, deleteGuild }
  }
)

