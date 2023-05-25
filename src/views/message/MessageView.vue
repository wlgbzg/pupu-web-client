<template>
    <div class="msg-container">
        <div class="msg-left">
            <el-image class="avatar"
                      src="https://gss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/zhidao/wh%3D450%2C600/sign=e58ae9feb1003af34defd464001aea6a/8601a18b87d6277f4d763bcf2f381f30e824fce5.jpg"/>
        </div>
        <div class="msg-right">
            <div class="msg-top">
                <div class="sender-name">{{ msg?.user.name }}</div>
                <div class="sender-time">{{ formatTimestamp(msg?.time) }}</div>
            </div>
            <div class="msg-content">
                <TextMessageView v-if="msg?.type === 1" :messageBody="msg?.body as TextMessageBean"/>
            </div>
        </div>
        <div class="msg-ctrl">
            <el-icon>
                <MoreFilled/>
            </el-icon>
        </div>
    </div>

</template>
<script setup lang="ts">
import TextMessageView from "@/views/message/TextMessageView.vue";
import {defineProps, PropType, toRefs} from "vue";
import type {Message, TextMessageBean} from "@/types/beans";
import {formatTimestamp} from "@/utils/time";

const props = defineProps({
    msg: Object as PropType<Message>,
})
const {msg} = toRefs(props)

</script>
<style scoped lang="less">
@import "@/assets/less/base";

.msg-container {
  position: relative;
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  margin-bottom: 10px;
  //overflow: auto;

  .msg-left {
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

  .msg-right {
    width: 100%;
    margin-left: 10px;

    .msg-top {
      display: flex;
      flex-direction: row;
      align-items: center;

      .sender-name {
        font-size: 0.95em;
        color: @blue-level-color-34;
      }

      .sender-time {
        margin-left: 10px;
        font-size: 0.75em;
        color: @grey-95;
      }
    }

    .msg-content {
      color: @grey-db;
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
    border: @grey-17 1px solid;
    background-color: #313338;
    cursor: pointer;
    visibility: hidden;
  }
}

.msg-container:hover {
  background-color: @grey-23-50;

  .msg-ctrl {
    visibility: visible;
    //background-color: red;
  }
}
</style>
