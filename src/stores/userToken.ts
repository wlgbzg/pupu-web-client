import {reactive} from "vue";
import {defineStore} from "pinia";


export const useUserTokenStore = defineStore("user-token", () => {

    const userToken = reactive({
        id: '',
        profileComplete: true,
        token: ''
    })

    const updateUserToken = (_userToken) => {
        Object.assign(userToken, _userToken)
    };

    return {userToken, updateUserToken};
}, {
    persist: true
});
