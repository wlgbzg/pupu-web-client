<template>
    <div class="channel-main-container">

        <div class="head-container">
            <span class="head-left">{{ guildStore.channelData.guild.name }}</span>
            <span class="head-right">
        <el-icon size="12"><ArrowDownBold/></el-icon>
      </span>
        </div>
        <div class="promotion-container"></div>
        <div class="channel-container">
            <div class="channel-box">
                <div class="channel-group">
                    <div class="channel-item"
                         :class="item.id === route.params.channelId ? 'channel-item-selected' :  ''"
                         v-for="item in guildStore.getChannels()"
                         @click="changeChannel(item.id)">
          <span class="channel-item-left">
          <IconChannel class="channel-icon-default"/>
          <span class="channel-name">{{ item.name }}</span>
          </span>
                        <span class="channel-item-right">
            <span class="channel-item-btn">
            <IconPlusUser/>
            </span>
            <span class="channel-item-btn">
            <IconSettings/>
            </span>
          </span>
                    </div>
                </div>
                <div class="channel-group" v-for="group in guildStore.channelData.channelGroups">
                    <div class="channel-group-title">
            <span class="channel-group-left">
              <IconArrowDown/>
              <span class="channel-group-name">
              {{ group["name"] }}
              </span>
            </span>
                        <span class="channel-group-right">
            <IconPlus/>
            </span>
                    </div>
                    <div class="channel-item"
                         :class="item.id === route.params.channelId ? 'channel-item-selected' :  ''"
                         v-for="item in guildStore.getChannels(group.id)"
                         @click="changeChannel(item.id)">
          <span class="channel-item-left">
          <IconChannel class="channel-icon-default"/>
          <span>{{ item.name }}</span>
          </span>
                        <span class="channel-item-right">
            <span class="channel-item-btn">
            <IconPlusUser/>
            </span>
            <span class="channel-item-btn">
            <IconSettings/>
            </span>
          </span>
                    </div>
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
import {useGuildStore} from "@/stores/guild";

const route = useRoute();
const guildStore = useGuildStore();
const loadChannelList = () => {
    httpRequest.request({
        url: "/api/v1/channel/list/" + route.params.guildId,
        method: "post"
    }).then(data => {
        guildStore.updateChannels(data.channelGroups, data.channels, data.guild);
        console.log('data.guild', data.guild)
    }).catch(error => {
        console.error("请求失败1：", error);
    });
};
loadChannelList();

const changeChannel = (channelId: string) => {
    let path = "/channels/" + route.params.guildId + "/" + channelId;
    // router.push(path);
    router.replace({ path: path });

};
</script>
<style scoped lang="less">
@import "@/assets/less/base";

.channel-main-container {
  width: 240px;
  min-width: 240px;
  height: 100%;
  background-color: @grey-2b;
  color: #949ba4;

  .head-container {
    height: 48px;
    box-shadow: 0 1px rgba(1, 1, 1, 0.2);
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    font-size: 18px;
  }

  .head-container:hover {
    background-color: @white-alpha-0A;
    cursor: pointer;
  }

  .promotion-container {

  }

  .channel-container {

    .channel-box {
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
          background-color: @white-alpha-0A;
          color: white;
          cursor: pointer;

        }

        .channel-item:hover .channel-item-right .channel-item-btn {
          visibility: visible;
        }

        .channel-item-selected {
          background-color: @white-alpha-14;
          color: white;
          cursor: pointer;
        }

        .channel-item-selected:hover {
          background-color: @white-alpha-14;
        }

      }
    }
  }


}

</style>
