<template>
  <div class='msg-container'>
    <!-- 发消息人头像 -->
    <div class='from-avatar'>
      <el-image v-if='!msg?.user.avatar' class='avatar'
                src='https://gss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=e58ae9feb1003af34defd464001aea6a/8601a18b87d6277f4d763bcf2f381f30e824fce5.jpg' />
      <el-image v-if='msg?.user.avatar' :src='msg?.user.avatar' class='avatar' />
    </div>

    <div class='msg-body'>

      <!-- 消息头部 -->
      <div class='header'>
        <div class='from-name'>{{ msg?.user.name }}</div>
        <div class='from-time'>{{ formatTimestamp(msg?.time) }}</div>
      </div>

      <!-- 消息内容 -->
      <TextMessageView v-if='msg?.type === 1' :messageBody='msg?.body as TextMessageBean' class='msg-content' />
    </div>

    <!-- 右侧控制按钮 -->
    <div class='msg-ctrl'>
      <el-icon>
        <MoreFilled />
      </el-icon>
    </div>
  </div>

</template>
<script lang='ts' setup>
  import TextMessageView from '@/views/message/TextMessageView.vue'
  import { defineProps, PropType, toRefs } from 'vue'
  import type { Message, TextMessageBean } from '@/types/beans'
  import { formatTimestamp } from '@/utils/time'

  const props = defineProps({
    msg: {
      type: Object as PropType<Message>,
      required: true
    }
  })
  const { msg } = toRefs(props)

</script>
<style lang='less' scoped>
  @import "@/assets/less/base";

  .msg-container {
    position: relative;
    display: flex;
    flex-direction: row;
    margin-top: 5px;
    margin-bottom: 10px;

    .from-avatar {
      margin-left: 15px;
      margin-top: 2px;
      height: 40px;
      width: 40px;

      .avatar {
        border-radius: 50%;
        height: 40px;
        width: 40px;
        cursor: pointer;
      }
    }

    .msg-body {
      width: 100%;
      margin-left: 10px;

      .header {
        display: flex;
        flex-direction: row;
        align-items: center;

        .from-name {
          font-size: 0.95em;
          color: @message-from-name-color;
        }

        .from-time {
          margin-left: 10px;
          font-size: 0.75em;
          color: @message-from-time-color;
        }
      }

      .msg-content {
        color: @message-content-color;
        font-size: 0.95em;
        line-height: 1.4em;
        width: 95%;
      }
    }

    .msg-ctrl {
      position: absolute;
      height: 30px;
      width: 30px;
      right: 20px;
      top: -20px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      border: @message-ctrl-border 1px solid;
      background-color: #313338;
      cursor: pointer;
      visibility: hidden;
    }
  }

  .msg-container:hover {
    background-color: @message-hover;

    .msg-ctrl {
      visibility: visible;
    }
  }
</style>
