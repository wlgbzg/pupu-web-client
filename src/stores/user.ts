import { reactive } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/beans'

export const useUserProfileStore = defineStore('user-profile', () => {
    const user = reactive<User>({ avatar: '', createTime: 0, id: '', intro: '', name: '' })

    const updateUser = (_user: User) => {
      Object.assign(user, _user)
    }
    return { user, updateUser }
  }, {
    persist: true
  }
)
