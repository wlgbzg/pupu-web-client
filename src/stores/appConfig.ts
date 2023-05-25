import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useAppConfigStore = defineStore('appConfigStore', () => {

  const appConfig = reactive({
    appName: '',
    welcomeTitle: '',
    welcomeSubTitle: ''
  })

  const updateAppConfig = (_appConfig) => {
    Object.assign(appConfig, _appConfig)
  }

  return { appConfig, updateAppConfig }
})
