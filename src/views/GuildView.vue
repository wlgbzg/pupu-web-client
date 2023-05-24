<template>
    <div class="guild-main-container">

        <div class="guild-top-container" v-if="!isMyGuild" >
            <span>您当前正处于预览模式。加入该服务器开始聊天吧！</span>
            <span class="top-btn" @click="joinGuild">加入服务器</span>
            <div class="top-btn top-back-btn" @click="router.push('/discovery');">
                <IconArrowBack/>
                后退</div>
        </div>

        <div class="guild-container">
            <div class="middle-container">
                <div class="middle-main-container">
                    <ChannelView/>
                </div>
                <div class="user-panel-container">
                    <UserPanelView/>
                </div>
            </div>
            <div class="right-container">
                <RouterView :key="useRoute().path"/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import ChannelView from "@/views/ChannelView.vue";
import UserPanelView from "@/views/UserPanelView.vue";
import {useRoute} from "vue-router";
import IconArrowBack from "@/components/icons/IconArrowBack.vue";
import router from "@/router";
import {ref} from "vue";
import {useGuildStore} from "@/stores/guild";
import httpRequest from "@/utils/httpRequest";
import {ElMessage} from "element-plus";

const guildStore = useGuildStore()
const route = useRoute()
const isMyGuild = ref(guildStore.getGuild(route.params.guildId.toString()) != undefined)


const joinGuild = () => {
    httpRequest.request({
        url: `/api/v1/guild/join/${route.params.guildId.toString()}`,
        method: "post",
    }).then(data => {
        ElMessage({
            message: '加入服务器成功',
            type: 'success',
        })
        guildStore.appendGuild(data.userGuild, data.guild)
        isMyGuild.value = true
    }).catch(error => {
        console.error("请求失败1：", error);
    });
}

</script>
<style scoped lang="less">
@import "@/assets/less/base";


.guild-main-container {

    .guild-top-container{
        user-select: none;
        height: 40px;
        width: 100%;
        background-color: @blue-level-color-3c;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: white;
        position: relative;
        //border-radius: 10px 0 0 0;

        .top-btn {
            border: 1px solid white;
            border-radius: 4px;
            padding: 1px 8px;
            cursor: pointer;
            font-weight: bold;
            grid-gap: 8px;
        }
        .top-btn:hover {
            background-color: @blue-level-color-3c-light;
        }

        .top-back-btn {
            position: absolute;
            left: 10px;
            display: flex;
            align-items: center;

        }
    }

  .guild-container {
    display: flex;
    flex-direction: row;
    justify-content: left;

    .middle-container {
      display: flex;
      flex-direction: column;
      height: 100vh;

      .middle-main-container {
        flex: 1;
      }

      .user-panel-container {
        color: white;
        height: 52px;
        width: 100%;
        background-color: @grey-23;
      }
    }

    .right-container {
      flex: 1;
    }
  }
}


</style>
