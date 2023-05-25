<template>
  <div class='user-panel-container'>
    <div class='user-info-container'>
      <div class='avatar'>
        <img v-if='!userStore.user.avatar' alt='' height='28' src='@/assets/images/default-head.svg' width='28' />
        <el-image v-if='userStore.user.avatar' :src='userStore.user.avatar' style='height: 28px; width: 28px' />
      </div>
      {{ userStore.user.name }}
    </div>
    <div class='panel-btn-container'>
      <IconMute class='panel-btn' />
      <IconHeadSetMute class='panel-btn' />
      <IconSettings24 class='panel-btn' />
    </div>
  </div>
</template>
<script lang='ts' setup>
  import httpRequest from '@/utils/httpRequest'
  import { useUserProfileStore } from '@/stores/user'
  import IconMute from '@/components/icons/user/IconMute.vue'
  import IconHeadSetMute from '@/components/icons/user/IconHeadSetMute.vue'
  import IconSettings24 from '@/components/icons/user/IconSettings24.vue'

  const userStore = useUserProfileStore()
  const loadUser = () => {
    httpRequest.request({
      url: '/api/v1/user/profile',
      method: 'post'
    }).then(data => {
      userStore.updateUser(data)
    }).catch(error => {
      console.error('请求失败1：', error)
    })
  }
  loadUser()


</script>
<style lang='less' scoped>
  @import "@/assets/less/base.less";

  .user-panel-container {
    color: white;
    height: 52px;
    width: 100%;
    background-color: @user-panel-background;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 14px;

    .user-info-container {
      flex: 1;
      display: flex;
      align-items: center;
      margin: 0 10px;
      border-radius: 5px;

      .avatar {
        position: relative;
        margin: 5px 10px 5px 5px;
        display: flex;
        align-items: center;
        border: 2px solid lime;
        border-radius: 50%;
        padding: 2px;
      }

      .avatar:after {
        content: '';
        position: absolute;
        right: -5px;
        bottom: -5px;
        width: 10px;
        height: 10px;
        background-color: #23a55a;
        border-radius: 50%;
        border: 3px solid @user-panel-background;
      }

    }

    .user-info-container:hover {
      background-color: @user-panel-hover;
      cursor: pointer;
    }

    .panel-btn-container {
      display: flex;
      flex-direction: row;
      margin: 0 10px;

      .panel-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        border-radius: 5px;
        color: @user-panel-btn-color;
      }

      .panel-btn:hover {
        background-color: @user-panel-hover;
        cursor: pointer;
        color: white;
      }
    }


  }

</style>
