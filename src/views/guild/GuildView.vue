<template>
  <div class='guild-container'>
    <div v-if='!isInGuild' class='header'>
      <span>您当前正处于预览模式。加入该服务器开始聊天吧！</span>
      <span class='header-btn' @click='joinGuild'>加入服务器</span>
      <div class='header-btn back-btn' @click="router.push('/discovery-guild/recommend');">
        <IconArrowBack />
        后退
      </div>
    </div>

    <div class='flex'>
      <div class='flex-column h-screen-vh'>
        <ChannelView class='flex-1' />
        <UserPanelView />
      </div>
      <div  class='flex-1'>
        <RouterView :key='useRoute().path' v-if='route.params.channelId'/>
        <NoChannelView v-if='!route.params.channelId'/>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
  import ChannelView from '@/views/guild/ChannelView.vue'
  import UserPanelView from '@/views/user/UserPanelView.vue'
  import { useRoute } from 'vue-router'
  import IconArrowBack from '@/components/icons/guild/IconArrowBack.vue'
  import router from '@/router'
  import { ref, watchEffect } from 'vue'
  import httpRequest from '@/utils/httpRequest'
  import { ElMessage } from 'element-plus'
  import { useGuildStore } from '@/stores/guild'
  import NoChannelView from '@/views/guild/NoChannelView.vue'

  const guildStore = useGuildStore()
  const route = useRoute()
  const isInGuild = ref(true)
  watchEffect(() => {
    if (route.params.guildId) {
      isInGuild.value = guildStore.exist(route.params.guildId.toString())
    }
  })

  const joinGuild = () => {
    httpRequest.request({
      url: `/api/v1/guild/join/${route.params.guildId.toString()}`,
      method: 'post'
    }).then(data => {
      ElMessage({
        message: '加入服务器成功',
        type: 'success'
      })
      guildStore.addGuild(data.userGuild, data.guild)
    }).catch(error => {
      console.error('请求失败1：', error)
    })
  }

</script>
<style lang='less' scoped>
  @import "@/assets/less/base";

  .guild-container {

    .header {
      user-select: none;
      height: 40px;
      width: 100%;
      background-color: @guild-header-background;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: white;
      position: relative;

      .header-btn {
        border: 1px solid white;
        border-radius: 4px;
        padding: 1px 8px;
        cursor: pointer;
        font-weight: bold;
        grid-gap: 8px;
      }

      .header-btn:hover {
        background-color: @guild-header-btn-hover;
      }

      .back-btn {
        position: absolute;
        left: 10px;
        display: flex;
        align-items: center;

      }
    }
  }


</style>
