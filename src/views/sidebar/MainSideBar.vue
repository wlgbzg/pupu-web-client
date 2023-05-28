<template>
  <div class='main-sidebar-container'>

    <div class='space' style='padding-top: 10px'></div>

    <div v-for='item in list' class='main-sidebar-box'>
      <div v-if='isActive(item)' class='main-sidebar-active'></div>
      <div class='main-sidebar-hover'></div>
      <div v-if='item.type == -1' class='main-sidebar-divider'></div>

      <el-popover v-if='item.type > -1' :content='item.name' placement='right-start' trigger='hover'>
        <template #reference>
          <div :class="{'main-sidebar-button-active': isActive(item) }" class='main-sidebar-button'
               @click='itemClick(item)'>
            <span v-if='!item.icon' class='main-sidebar-title'>{{ item.name }}</span>
            <component :is='item.icon' v-if='item.icon'></component>
          </div>
        </template>
      </el-popover>

    </div>
  </div>

</template>

<script lang='ts' setup>
  import httpRequest from '@/utils/httpRequest'
  import router from '@/router'
  import { useRoute } from 'vue-router'
  import { reactive, ref, watch, watchEffect } from 'vue'
  import IconHome from '@/components/icons/sidebar/IconHome.vue'
  import IconDownload from '@/components/icons/sidebar/IconDownload.vue'
  import IconDiscovery from '@/components/icons/sidebar/IconDiscovery.vue'
  import IconAdd from '@/components/icons/sidebar/IconAdd.vue'
  import SideBar from '@/views/sidebar/SideBar.vue'
  import { useGuildStore } from '@/stores/guild'
  import { useDialogStore } from '@/stores/dialog'

  const guildStore = useGuildStore()
  const route = useRoute()
  const list = reactive([])

  const buildSidebar = () => {
    list.splice(0)
    list.push({
      name: '主页', type: 0, url: '/home', icon: IconHome
    })
    list.push({
      type: -1
    })
    for (const guild of guildStore.guildInfo.guilds) {
      list.push({
        name: guild.name,
        type: 1,
        url: '/channels/' + guild.id + '/' + guild.defaultChannelId,
        guild: guild
      })
    }
    list.push({
      name: '添加服务器', type: 3, icon: IconAdd
    })
    list.push({
      name: '探索公开服务器', type: 0, url: '/discovery-guild/recommend', icon: IconDiscovery
    })
    list.push({
      type: -1
    })
    list.push({
      name: '下载App客户端', type: 2, icon: IconDownload
    })
  }

  // 当修改了服务器集合后, 要重新更新侧边栏
  watchEffect(() => {
    buildSidebar()
  })

  const dialogStore = useDialogStore()
  const itemClick = (item: SideBar) => {
    if (item.type == 1) {
      let guild = item.guild
      let path = '/channels/' + guild.id + '/' + guild.defaultChannelId
      router.push(path)
    }

    if (item.type == 0) {
      router.push(item.url)
    }
    if (item.type == 3) {
      dialogStore.guildCreate.dialogVisible = true
    }
  }

  const urlPath = ref(route.path)

  watch(() => route.path, (n, o) => {
    urlPath.value = n
  })

  const isActive = (item: SideBar) => {
    if (item.type == 1) {
      let guild = item.guild
      return guild.id == route.params.guildId
    }
    if (item.type == 0) {
      return item.url == urlPath.value
    }
    return false
  }

  const loadGuildList = () => {
    httpRequest.request({
      url: '/api/v1/guild/list',
      method: 'post'
    }).then(data => {
      guildStore.updateGuilds(data.guilds, data.userGuilds)
      buildSidebar()
    }).catch(error => {
      console.error('请求失败1：', error)
    })
  }
  loadGuildList()
</script>

<style lang='less' scoped>
  @import "@/assets/less/base";

  .main-sidebar-divider {
    margin: 4px 0;
    width: 50%;
    height: 2px;
    background-color: @sidebar-btn-background;
    border-radius: 1em;
  }
  ::-webkit-scrollbar {

    display: none; /* Chrome Safari */

  }

  .main-sidebar-container {
    background-color: @sidebar-background;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    height: 100vh;


    .main-sidebar-box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .main-sidebar-active {
        height: 60%;
        width: 4px;
        background-color: white;
        position: absolute;
        left: 0;
        border-radius: 0 8px 8px 0;
      }

      .main-sidebar-hover {
        height: 10%;
        width: 4px;
        background-color: white;
        position: absolute;
        left: 0;
        border-radius: 0 8px 8px 0;
        opacity: 0;
        transition: all .3s ease; /* 添加过渡效果 */
      }

      &:hover .main-sidebar-hover {
        opacity: 1;
        height: 40%; /* 动画结束时高度为30% */
        transition: all .3s ease;
      }

      .main-sidebar-button {
        background-color: @sidebar-btn-background;
        width: 50px;
        height: 50px;
        display: flex;
        margin: 4px 0;
        justify-content: center;
        align-items: center;
        border-radius: 2em;
        transition: all .1s ease-in-out;
        cursor: pointer;
        user-select: none;
        overflow: hidden;

        .main-sidebar-title {
          white-space: nowrap;
          color: white;
          font-weight: bold;
        }
      }

      .main-sidebar-button:hover {
        background-color: @sidebar-btn-active;
        border-radius: 1em;
      }

      .main-sidebar-button:active {
        transform: translateX(2px) translateY(2px);
      }

      .main-sidebar-button-active {
        background-color: @sidebar-btn-active;
        border-radius: 1em;
      }
    }
  }
</style>