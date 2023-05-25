<template>
    <div class="guild-channel-container">

        <!--   头部   -->
        <div class="head-container">
            <span class="channel-info">{{ channelStore.channelData.guild?.name }}</span>
            <span class="head-btn"><el-icon size="12"><ArrowDownBold/></el-icon></span>
        </div>

        <!--   频道   -->
        <div class="channel-container">

            <!--   未分组频道   -->
            <div class="channel-group">
                <div class="channel-item" :class="item.id === route.params.channelId ? 'channel-item-selected' :  ''"
                     v-for="item in channelStore.getChannels()" @click="router.push({path: `/channels/${route.params.guildId}/${item.id}`})">
                    <span class="channel-item-left"><IconChannel class="channel-icon-default"/><span class="channel-name">{{ item.name }}</span></span>
                    <span class="channel-item-right"><span class="channel-item-btn"><IconPlusUser/></span><span class="channel-item-btn"><IconSettings/></span></span>
                </div>
            </div>

            <!--   分组频道   -->
            <div class="channel-group" v-for="group in channelStore.channelData.channelGroups">
                <div class="channel-group-title">
                    <span class="channel-group-left"><IconArrowDown/><span class="channel-group-name">{{ group["name"] }}</span></span>
                    <span class="channel-group-right"><IconPlus/></span>
                </div>

                <div class="channel-item" :class="item.id === route.params.channelId ? 'channel-item-selected' :  ''"
                     v-for="item in channelStore.getChannels(group.id)" @click="router.push({path: `/channels/${route.params.guildId}/${item.id}`})">
                    <span class="channel-item-left"><IconChannel class="channel-icon-default"/><span>{{ item.name }}</span></span>
                    <span class="channel-item-right"><span class="channel-item-btn"><IconPlusUser/></span><span class="channel-item-btn"><IconSettings/></span></span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import IconArrowDown from "@/components/icons/IconArrowDown.vue";
import IconChannel from "@/components/icons/IconChannel.vue";
import IconSettings from "@/components/icons/IconSettings.vue";
import IconPlusUser from "@/components/icons/IconPlusUser.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import router from "@/router";
import {useRoute} from "vue-router";
import httpRequest from "@/utils/httpRequest";
import {useChannelStore} from "@/stores/channel";

const route = useRoute();
const channelStore = useChannelStore();
const load = () => {
    httpRequest.request({
        url: "/api/v1/channel/list/" + route.params.guildId,
        method: "post"
    }).then(data => {
        channelStore.updateChannels(data.channelGroups, data.channels, data.guild);
    }).catch(error => {
        console.error("请求失败1：", error);
    });
};
load();

</script>
<style scoped lang="less">
@import "@/assets/less/base";

.guild-channel-container {
  width: 240px;
  min-width: 240px;
  height: 100%;
  background-color: @channel-background;
  color: @channel-font-color;

  .head-container {
    height: 48px;
    border-bottom: 1px solid rgba(1, 1, 1, 0.2);
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    font-size: 18px;
  }

  .head-container:hover {
    background-color: @channel-head-hover;
    cursor: pointer;
  }

  .channel-container {
    padding-top: 12px;

    .channel-group {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .channel-group-title {
        width: 240px;
        height: 24px;
        font-size: 12px;
        padding-top: 16px;
        cursor: pointer;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .channel-group-left {
          display: flex;
          align-items: center;
          margin-left: 5px;

          .channel-group-name {
            margin-left: 4px;
          }
        }

        .channel-group-right {
          margin-right: 20px;
        }
      }

      .channel-group-title:hover {
        color: white;
        cursor: pointer;
      }


      .channel-item {
        border-radius: 4px;
        height: 34px;
        font-size: 16px;
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 200px;

        .channel-item-left {
          display: flex;
          align-items: center;
        }

        .channel-item-right {
          display: flex;
          align-items: center;
          justify-content: center;

          .channel-item-btn {
            margin-left: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
            visibility: hidden;
          }

        }

      }

      .channel-item:hover {
        background-color: @channel-item-hover;
        color: white;
        cursor: pointer;

      }

      .channel-item:hover .channel-item-right .channel-item-btn {
        visibility: visible;
      }

      .channel-item-selected {
        background-color: @channel-item-active;
        color: white;
        cursor: pointer;
      }

      .channel-item-selected:hover {
        background-color: @channel-item-active;
      }

    }

  }


}

</style>
