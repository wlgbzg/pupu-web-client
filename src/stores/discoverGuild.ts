import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Guild } from '@/types/beans'

export const useDiscoveryGuildStore = defineStore('discoveryGuild', () => {
    const defaultDiscoveryKey = 'home'
    // 我的推荐
    const discoveryGuild = reactive({})

    const discoveryKey = ref(defaultDiscoveryKey)

    const currentDiscoveryGuild = reactive<Guild[]>([])
    const changeKey = (key: string) => {
      discoveryKey.value = key
      currentDiscoveryGuild.splice(0)
      discoveryGuild[key]?.forEach((g) => {
        currentDiscoveryGuild.push(g)
      })
    }

    const updateDiscoveryGuild = (data) => {
      Object.keys(data).forEach((key) => {
        discoveryGuild[key] = data[key]
      })
      changeKey(discoveryKey.value)
    }

    return { defaultDiscoveryKey, discoveryGuild, discoveryKey, currentDiscoveryGuild, changeKey, updateDiscoveryGuild }
  }
)

