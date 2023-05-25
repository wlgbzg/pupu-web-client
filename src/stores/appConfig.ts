import {reactive} from "vue";
import {defineStore} from "pinia";

export const useAppConfigStore = defineStore("appConfigStore", () => {

    const appConfig = reactive({
        appName: '',
        welcomeTitle: '',
        welcomeSubTitle: ''
    })

    return {appConfig};
}, {
    persist: true
});

export const useUserTokenStore = defineStore("user-token", () => {

    const userConfig = reactive({
        id: '',
        profileComplete: true,
        token: ''
    })

    return {userConfig};
}, {
    persist: true
});
