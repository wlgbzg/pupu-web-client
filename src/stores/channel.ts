import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { Channel, ChannelGroup, Guild, GuildChannelsDTO } from '@/types/beans'

export const useChannelStore = defineStore('channel', () => {

    // 当前服务器、当前频道
    const channelInfo = reactive<GuildChannelsDTO>({ channelGroups: [], channels: [], guild: null })

    const updateChannels = (channelGroups: ChannelGroup[], channels: Channel[], guild: Guild) => {
      channelInfo.channels = channels

      channelInfo.channelGroups = channelGroups
      channelInfo.channelGroups.unshift( {id: '', guildId: '', name: '未分组'})
      channelInfo.guild = guild
    }

    const getChannels = (channelGroupId: string = ''): Channel[] => {
      const res: Channel[] = []
      channelInfo.channels.forEach(channel => {
        if (channel.channelGroupId === channelGroupId) {
          res.push(channel)
        }
        if (channelGroupId === '' && channel.channelGroupId === undefined) {
          res.push(channel)
        }
      })
      res.sort = (a,b) => {
        return a.name.localeCompare(b.name)
      }
      return res
    }

    const getChannel = (channelId: string): Channel | undefined => {
      for (const channel of channelInfo.channels) {
        if (channel.id === channelId) {
          return channel
        }
      }
      return undefined
    }

    const deleteChannelGroup = (groupId) => {
      const index = channelInfo.channelGroups.findIndex(item => item.id === groupId)
      if (index !== -1) {
        channelInfo.channelGroups.splice(index, 1) // 从数组中删除该元素
      }
      channelInfo.channels.forEach(channel => {
        if (channel.channelGroupId === groupId) {
          channel.channelGroupId = ''
        }
      })

    }

    return {  channelInfo, updateChannels, getChannels, getChannel, deleteChannelGroup }
  }
)

