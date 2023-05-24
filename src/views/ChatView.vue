<template>
    <div class="chat-main-container ">

        <div class="head-container">
        <span class="head-left">
          <IconChannel class="channel-icon-default"/>
          {{ channel?.name }}
        </span>
            <span class="head-right">
        <IconSubZone class="chat-head-btn"/>
        <IconNotify class="chat-head-btn"/>
        <IconMark class="chat-head-btn"/>
        <IconMember class="chat-head-btn"/>
        <IconHelp class="chat-head-btn"/>
      </span>
        </div>
        <div class="message-container">
            <MessageListView/>
        </div>
        <div class="chat-input-container">

            <div class="chat-input-top"></div>

            <div class="chat-input-box">
                <div class="chat-input-btn">
                    <IconAdd/>
                </div>
                <div class="chat-input-text">
          <textarea class="msg-input" ref="textareaRef" v-model="content" :rows="rows" :placeholder="inputPlaceHolder"
                    @keydown.enter="handleInputEnterKey"/>
                </div>
                <div class="chat-input-btn">
                    <IconGift/>
                </div>
                <div class="chat-input-btn">
                    <IconGif/>
                </div>
                <div class="chat-input-btn">
                    <IconSticker/>
                </div>
                <div class="chat-input-btn">
                    <IconAdd/>
                </div>
            </div>

        </div>
    </div>
</template>
<script setup lang="ts">
import IconChannel from "@/components/icons/IconChannel.vue";
import {defineProps, nextTick, onMounted, PropType, ref, toRefs, watch, watchEffect} from "vue";
import {useRoute} from "vue-router";
import {useGuildStore} from "@/stores/guild";
import IconHelp from "@/components/icons/IconHelp.vue";
import IconMember from "@/components/icons/IconMember.vue";
import IconMark from "@/components/icons/IconMark.vue";
import IconNotify from "@/components/icons/IconNotify.vue";
import IconSubZone from "@/components/icons/IconSubZone.vue";
import IconAdd from "@/components/icons/IconAdd.vue";
import IconSticker from "@/components/icons/IconSticker.vue";
import IconGif from "@/components/icons/IconGif.vue";
import IconGift from "@/components/icons/IconGift.vue";
import type {Channel, Message} from "@/types/beans";
import MessageListView from "@/views/MessageListView.vue";
import {eventBus} from "@/utils/mitt";
import {useUserStore} from "@/stores/user";
import httpRequest from "@/utils/httpRequest";



const route = useRoute();
const guildStore = useGuildStore();
const userStore = useUserStore();
const channelId = ref("");
const inputPlaceHolder = ref();
const channel = ref<Channel | undefined>(undefined);

watchEffect(() => {
    if (route.params.channelId) {
        channelId.value = route.params.channelId.toString();
        channel.value = guildStore.getChannel(channelId.value);
        inputPlaceHolder.value = "给 #" + channel.value?.name + " 发消息";
    }
});

const textareaRef = ref();
const rows = ref(1);
const content = ref("");
// 当输入框内容变化时，重新计算高度
watch(
    () => content.value, () => {
        nextTick(adjustTextareaSize);
    });
const adjustTextareaSize = () => {
    let textarea = textareaRef.value;
    if (textarea) {
        textarea.style.height = "auto";
        const height = textarea.scrollHeight;
        if (height < 400) { // 改变textarea高度达到自适应
            textarea.style.height = height + "px";
        } else {
            textarea.style.height = "400" + "px";
        }
    }
};
nextTick(adjustTextareaSize);

// 当输入框尺寸变化时, 重新计算高度
onMounted(() => {
    const element = textareaRef.value;
    const resizeObserver = new ResizeObserver(entries => {
        adjustTextareaSize();
    });
    resizeObserver.observe(element);
});

const send = ()=> {

    httpRequest.request({
        url: "/api/v1/message/channel/send",
        method: "post",
        data: {
            channelId: channelId.value,
            type: 1,
            body: { text: content.value }
        }
    }).then(data => {
        eventBus.emit('sendMessage', data);
    }).catch(error => {
        console.error("请求失败1：", error);
    });

}

function handleInputEnterKey(event: KeyboardEvent) {

    // 按下了 Shift 键和 Enter 键
    if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault(); // 阻止默认行为（即换行）
        console.log("发送:", content.value);
        send()
        content.value = "";
        return;
    }
}



</script>
<style scoped lang="less">
@import "@/assets/less/base.less";

.chat-main-container {
  color: white;
  display: flex;
  height: 100vh;
  flex-direction: column;
  min-width: 600px;

  .head-container {
    height: 48px;
    box-shadow: 0 1px rgba(1, 1, 1, 0.2);
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    font-size: 16px;
    background-color: @grey-31;
    z-index: 999;
    cursor: default;
    user-select: none;

    .head-left {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .head-right {
      display: flex;
      justify-content: center;
      align-items: center;

      .chat-head-btn {
        color: @grey-ca;
        margin: 0 10px;
      }

      .chat-head-btn:hover {
        color: white;
        cursor: pointer;
      }
    }
  }

  .message-container {
    flex: 1;
    display: flex;
    overflow: auto;
  }

  .chat-input-container {
    margin: 10px 0;

    .chat-input-box {
      display: flex;
      flex-direction: row;
      align-items: start;
      background-color: @white-alpha-0A;
      margin: 0 15px;
      padding: 0 10px;
      border-radius: 10px;

      .chat-input-btn {
        padding: 10px 8px 0 8px;
        color: @grey-ca;
      }

      .chat-input-btn:hover {
        color: white;
        cursor: pointer;
      }

      .chat-input-text {
        flex: 1;
        padding: 8px 0;
        display: flex;

        .msg-input {
          flex: 1;
          padding: 0 5px;
          line-height: 29px;
          background-color: transparent;
          color: white;
          border: none;
          resize: none;
          font-size: 16px;
          height: auto;
        }

        .msg-input:focus {
          outline: none;
        }
      }

    }
  }
}

.el-textarea {
  color: #606266;
  background-color: #000;
}

</style>
