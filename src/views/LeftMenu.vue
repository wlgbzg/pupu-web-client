<template>
    <div class="left-menu-box h-screen">

        <el-popover
                placement="right-start"
                trigger="hover"
                content="主页"
        >
            <template #reference>
                <div :class="{ 'left-menu': true, 'menu-active': isActive('/home') }"
                     @click="routerPush('/home')">
                    <el-icon :size="24">
                        <HomeFilled color="white"/>
                    </el-icon>
                </div>
            </template>
        </el-popover>
        <div class="left-menu-divider"></div>

        <div :class="{ 'left-menu': true, 'menu-active': isActiveServer(`${item.id}`) }"
             v-for="item in guildStore.guildData.guilds" @click="changeChannel(item)">
            <span class="guild-menu">{{ item.name }}</span>
        </div>

        <el-popover
                placement="right-start"
                trigger="hover"
                content="添加服务器"
        >
            <template #reference>
                <div class="left-menu">
                    <el-icon :size="24">
                        <Plus color="white"/>
                    </el-icon>
                </div>
            </template>
        </el-popover>

        <el-popover
                placement="right-start"
                trigger="hover"
                content="探索公开服务器"
        >
            <template #reference>
                <div :class="{ 'left-menu': true, 'menu-active': isActive('/discovery') }"
                     @click="routerPush('/discovery')">
                    <el-icon :size="24">
                        <Search color="white"/>
                    </el-icon>
                </div>
            </template>
        </el-popover>

        <div class="left-menu-divider"></div>
        <el-popover
                placement="right-start"
                trigger="hover"
                content="下载App客户端"
        >
            <template #reference>
                <div class="left-menu">
                    <el-icon :size="24">
                        <Download color="white"/>
                    </el-icon>
                </div>
            </template>
        </el-popover>
    </div>

</template>

<script setup lang="ts">
import httpRequest from "@/utils/httpRequest";
import {Guild} from "@/types/beans";
import router from "@/router";
import {useGuildStore} from "@/stores/guild";
import {useRoute} from "vue-router";
import {ref, watch} from "vue";

const guildStore = useGuildStore();
const route = useRoute();
const urlPath = ref(route.path)

watch(() => route.path, (n, o) => {
    urlPath.value = n
})

const isActive = (path) => {
    return path === urlPath.value
}

const isActiveServer = (guildId) => {
    return guildId == route.params.guildId
}

const loadGuildList = () => {
    httpRequest.request({
        url: "/api/v1/guild/list",
        method: "post"
    }).then(data => {
        guildStore.updateGuilds(data.userGuilds, data.guilds);
    }).catch(error => {
        console.error("请求失败1：", error);
    });
};

const changeChannel = (item: Guild) => {
    let path = "/channels/" + item.id + "/" + item.defaultChannelId;
    router.push(path);
};

const routerPush = (path: string) => {
    console.log('导航方法')
    router.push(path);
};

loadGuildList();
</script>

<style scoped lang="less">
@import "@/assets/less/base";

.left-menu-divider {
  width: 50%;
  height: 2px;
  background-color: @grey-33;
  border-radius: 1em;
}

.left-menu-box {
  padding-top: 10px;
  background-color: @grey-17;
  display: flex;
  flex-direction: column;
  align-items: center;

  .left-menu {
    background-color: @grey-33;
    width: 50px;
    height: 50px;
    display: flex;
    margin: 8px 0;
    justify-content: center;
    align-items: center;
    border-radius: 2em;
    transition: all .1s ease-in-out;
    cursor: pointer;
    user-select: none;

    .guild-menu {
      width: 40px;
      white-space: nowrap;
      overflow: hidden;
      color: white;
    }
  }

  .left-menu:hover {
    background-color: #23a559;
    border-radius: 1em;
  }

  .left-menu:active {
    transform: translateX(2px) translateY(2px);
  }

  .menu-active {
    background-color: #23a559;
    border-radius: 1em;
  }
}

</style>