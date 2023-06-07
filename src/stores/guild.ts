import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { Guild, GuildRole, UserGuild } from '@/types/beans'

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

    const updateGuild = (guild: Guild) => {
      const index = guildInfo.guilds.findIndex(item => item.id === guild.id)
      guildInfo.guilds.splice(index, 1, guild)
    }

    const guildRoleInfo: GuildRole[] = reactive([])
    const updateGuildRoleInfo = (list) => {
      guildRoleInfo.splice(0)
      guildRoleInfo.push(...list)
    }

    const addGuildRoleInfo = (guildRole: GuildRole) => {
      const index = guildRoleInfo.findIndex(item => item.id === guildRole.id)
      if (index === -1) {
        guildRoleInfo.push(guildRole)
      }
    }

    const updateGuildRole = (guildRole: GuildRole) => {
      const index = guildRoleInfo.findIndex(item => item.id === guildRole.id)
      guildRoleInfo.splice(index, 1, guildRole)
    }

    return { guildInfo, updateGuilds, addGuild, getGuild, exist, deleteGuild, updateGuild, guildRoleInfo, updateGuildRoleInfo, addGuildRoleInfo, updateGuildRole }
  }
)

