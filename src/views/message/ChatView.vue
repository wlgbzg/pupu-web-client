<template>
    <!-- 聊天界面 -->
    <div class="chat-container ">

        <!-- 头部 -->
        <div class="head-container">
            <span class="channel-info"><IconChannel class="channel-icon-default"/>{{ channel?.name }}</span>
            <span class="head-btn"><IconSubZone class="chat-head-btn"/><IconNotify class="chat-head-btn"/><IconMark class="chat-head-btn"/><IconMember class="chat-head-btn"/><IconHelp
                    class="chat-head-btn"/></span>
        </div>

        <!-- 消息列表 -->
        <MessageListView class="message-container"/>

        <!-- 输入框 -->
        <div class="input-container">
            <IconAdd class="input-btn"/>

            <!-- 文本框 -->
            <div class="input-view">
                <textarea class="input-textarea" ref="textareaRef" v-model="content" :rows="rows" :placeholder="'给 #' + channel?.name + ' 发消息'" @keydown.enter="handleInputEnterKey"/>
            </div>

            <IconGift class="input-btn"/>
            <IconGif class="input-btn"/>
            <IconSticker class="input-btn"/>
            <IconAdd class="input-btn"/>
        </div>
    </div>
</template>
<script setup lang="ts">
import IconChannel from "@/components/icons/IconChannel.vue";
import {nextTick, onMounted, ref, watch, watchEffect} from "vue";
import {useRoute} from "vue-router";
import {useChannelStore} from "@/stores/channel";
import IconHelp from "@/components/icons/IconHelp.vue";
import IconMember from "@/components/icons/IconMember.vue";
import IconMark from "@/components/icons/IconMark.vue";
import IconNotify from "@/components/icons/IconNotify.vue";
import IconSubZone from "@/components/icons/IconSubZone.vue";
import IconAdd from "@/components/icons/IconAdd.vue";
import IconSticker from "@/components/icons/IconSticker.vue";
import IconGif from "@/components/icons/IconGif.vue";
import IconGift from "@/components/icons/IconGift.vue";
import MessageListView from "@/views/message/MessageListView.vue";
import {eventBus} from "@/utils/mitt";
import httpRequest from "@/utils/httpRequest";
import type {Channel} from "@/types/beans";

const route = useRoute();
const channelStore = useChannelStore();
const channelId = route.params.channelId.toString();
const channel = ref<Channel | undefined>(undefined);

watchEffect(() => {
    if (route.params.channelId) {
        channel.value = channelStore.getChannel(channelId);
    }
});
// 文本框
const textareaRef = ref();
// 文本框行数
const rows = ref(1);
// 输入内容
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

const send = () => {
    httpRequest.request({
        url: "/api/v1/message/channel/send",
        method: "post",
        data: {
            channelId: channelId,
            type: 1,
            body: {text: content.value}
        }
    }).then(data => {
        eventBus.emit('sendMessage', data);
        content.value = "";
    }).catch(error => {
        console.error("请求失败1：", error);
    });

}

function handleInputEnterKey(event: KeyboardEvent) {

    // 按下了 Shift 键和 Enter 键
    if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault(); // 阻止默认行为（即换行）
        if (content.value.trim().length == 0) {
            return
        }
        send()
        return;
    }
}


</script>
<style scoped lang="less">
@import "@/assets/less/base.less";

.chat-container {
  color: white;
  display: flex;
  height: 100vh;
  flex-direction: column;
  min-width: 600px;
  cursor: default;

  .head-container {
    height: 48px;
    border-bottom: 1px solid rgba(1, 1, 1, 0.2);
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    font-size: 16px;
    z-index: 999;
    user-select: none;

    .channel-info {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .head-btn {
      display: flex;
      justify-content: center;
      align-items: center;

      .chat-head-btn {
        color: @user-panel-btn-color;
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

  .input-container {
    display: flex;
    flex-direction: row;
    align-items: start;
    background-color: @input-view-background;
    margin: 10px 15px;
    padding: 0 10px;
    border-radius: 10px;

    .input-btn {
      padding: 10px 8px 0 8px;
      color: @input-view-btn-color;
    }

    .input-btn:hover {
      color: white;
      cursor: pointer;
    }

    .input-view {
      flex: 1;
      padding: 8px 0;
      display: flex;

      .input-textarea {
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

      .input-textarea:focus {
        outline: none;
      }
    }
  }
}


</style>
