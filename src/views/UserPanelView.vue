<template>
    <div class="user-panel-main-container">
        <div class="user-left">

            <div class="user-left-avatar">
                <div class="user-avatar">
                    <img src="@/assets/images/default-head.svg" v-if="!userStore.user.avatar" alt="" width="28"
                         height="28"/>
                    <el-image style="height: 28px; width: 28px" :src="userStore.user.avatar"
                              v-if="userStore.user.avatar"/>
                </div>
            </div>
            {{ userStore.user.name }}

        </div>
        <div class="user-right">
            <div class="user-right-btn">
                <IconMute/>
            </div>
            <div class="user-right-btn">
                <IconHeadSetMute/>
            </div>
            <div class="user-right-btn">
                <IconSettings24/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import httpRequest from "@/utils/httpRequest";
import {useRoute} from "vue-router";
import {useUserStore} from "@/stores/user";
import IconMute from "@/components/icons/IconMute.vue";
import IconHeadSetMute from "@/components/icons/IconHeadSetMute.vue";
import IconSettings24 from "@/components/icons/IconSettings24.vue";

const route = useRoute();
const userStore = useUserStore();

const loadUser = () => {
    httpRequest.request({
        url: "/api/v1/user/profile",
        method: "post"
    }).then(data => {
        userStore.updateUser(data);
    }).catch(error => {
        console.error("请求失败1：", error);
    });
};
loadUser();


</script>
<style scoped lang="less">
@import "@/assets/less/base.less";

.user-panel-main-container {
  color: white;
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 14px;

  .user-left {
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0 10px;
    border-radius: 5px;

    .user-left-avatar {
      position: relative;
      margin: 5px 10px 5px 5px;

      .user-avatar {
        display: flex;
        align-items: center;
        border: 2px solid lime;
        border-radius: 50%;
        padding: 2px;
      }

      .user-avatar:after {
        content: '';
        position: absolute;
        right: -3px;
        bottom: -3px;
        width: 10px;
        height: 10px;
        background-color: #23a55a;
        border-radius: 50%;
        border: 3px solid @grey-23;
      }
    }
  }

  .user-left:hover {
    background-color: @white-alpha-14;
    cursor: pointer;
  }

  .user-right {
    display: flex;
    flex-direction: row;
    margin: 0 10px;

    .user-right-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      border-radius: 5px;
      color: @grey-ca;
    }

    .user-right-btn:hover {
      background-color: @white-alpha-14;
      cursor: pointer;
      color: white;
    }
  }


}

</style>
