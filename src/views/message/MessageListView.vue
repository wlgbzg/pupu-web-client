<template>
    <div class="message-list-container">

        <!-- 消息记录 -->
        <div class="message-list" ref="messageListRef">
            <MessageView :msg="message" class="message-box" v-for="message in messageList"/>
        </div>

        <!-- 浮窗 -->
        <div class="floating-window" v-if="!isAtBottom" @click="scrollBottom(true)">
            <el-icon>
                <ArrowDownBold/>
            </el-icon>
        </div>
    </div>
</template>
<script setup lang="ts">
import httpRequest from "@/utils/httpRequest";
import {nextTick, onMounted, reactive, ref} from "vue";
import {onBeforeRouteLeave, onBeforeRouteUpdate, useRoute} from "vue-router";
import {useChannelStore} from "@/stores/channel";
import type {Channel, Message} from "@/types/beans";
import MessageView from "@/views/message/MessageView.vue";
import {eventBus} from "@/utils/mitt";
import MqttManager from "@/utils/mqtt";

const route = useRoute();
const channelStore = useChannelStore();

// 频道id
const channelId = ref("");
// 频道对象
const channel = ref<Channel | undefined>(undefined);
// 聊天消息列表
const messageList = reactive<Message[]>([]);
// 最外层的DOM对象引用
const messageListRef = ref();
// 滚动条是否在底部
const isAtBottom = ref(true)

// 获取历史聊天消息列表数据
const load = (channelId: string, time: number = 9999999999999) => {
    httpRequest.request({
        url: "/api/v1/message/channel/messageList",
        method: "post",
        data: {
            time: time,
            channelId: channelId,
        }
    }).then(data => {
        for (const m of data) {
            add(m)
        }
        nextTick().then(() => {
            scrollBottom()
        });
    }).catch(error => {
        console.error("请求失败1：", error);
    });
};


// 添加消息到聊天消息列表
function add(message: Message) {
    const index = messageList.findIndex((m) => m.id === message.id);
    if (index !== -1) {
        // 替换已存在的相同 id 的 Message
        messageList.splice(index, 1, message);
    } else {
        // 按照时间插入到合适的位置
        const insertIndex = messageList.findIndex((m) => m.time > message.time);
        if (insertIndex !== -1) {
            messageList.splice(insertIndex, 0, message);
        } else {
            messageList.push(message);
        }
    }
}

// 监听订阅到的消息
const receiveMessage = (message: Message) => {
    add(message)
    nextTick().then(() => {
        scrollBottom(false,  'rece')
    });
}

// 监听总线过来的发消息事件
const sendMessage = (message: Message) => {
    add(message)
    nextTick().then(() => {
        scrollBottom(true, 'send')
    });
}

// 在离开路由时触发取消订阅
onBeforeRouteLeave((to, from, next) => {
    const lastChannelId = from.params.channelId.toString();
    MqttManager.unsubscribeTopic('channel-' + lastChannelId);
    eventBus.off('sendMessage', sendMessage);
    next();
})

// 在变更路由时触发取消订阅
onBeforeRouteUpdate((to, from, next) => {
    const lastChannelId = from.params.channelId.toString();
    MqttManager.unsubscribeTopic('channel-' + lastChannelId);
    eventBus.off('sendMessage', sendMessage);
    next();
})

// 页面渲染后初始化任务
onMounted(() => {
    // 获取channelId
    channelId.value = route.params.channelId.toString();
    // 获取channel对象
    channel.value = channelStore.getChannel(channelId.value);
    // 获取消息记录
    load(channelId.value);
    // 在进入组件时触发订阅
    MqttManager.subscribeTopic('channel-' + channelId.value, (topic, message) => {
        // 处理接收到的消息
        receiveMessage(JSON.parse(message))
    });
    // 进入页面触发
    eventBus.on('sendMessage', sendMessage);
    // 监听滚动条滚动事件
    messageListRef.value.addEventListener('scroll', handleScroll);
})

// 滚动到底部
const scrollBottom = (force: boolean = false, num:string = '') => {
    if (force || isAtBottom.value) {
        if (messageListRef.value.scrollHeight > messageListRef.value.clientHeight) {
            messageListRef.value.scrollTo(0, messageListRef.value.scrollHeight);
        }
    }
}

// 判断滚动条是否在底部
const handleScroll = () => {
    const scrollThreshold = 50; // 定义接近底部的像素阈值
    isAtBottom.value = messageListRef.value.scrollTop + messageListRef.value.clientHeight >= messageListRef.value.scrollHeight - scrollThreshold;
}


</script>
<style scoped lang="less">
@import "@/assets/less/base.less";

.message-list-container {
  overflow: hidden;
  position: relative;

  .message-list {
    flex: 1;
    color: white;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .floating-window {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border-radius: 50%;
    font-size: 14px;
    background-color: @message-floating-background;
    border: 1px solid @message-floating-border;
    bottom: 5%;
    right: 10%;
    cursor: pointer;
  }
}
</style>
