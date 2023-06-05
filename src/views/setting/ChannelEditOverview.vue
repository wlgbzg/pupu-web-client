<script setup lang='ts'>

  import { useSettingStore } from '@/stores/setting'
  import { useChannelStore } from '@/stores/channel'
  import httpRequest from '@/utils/httpRequest'
  import { reactive } from 'vue'
  import { ElMessage } from 'element-plus'

  const settingStore = useSettingStore()
  const channelStore = useChannelStore()
  const channelId = settingStore.info.data['channelId']
  const channel = channelStore.getChannel(channelId)
  const info = reactive({
    name: channel?.name,
    intro: channel?.intro
  })
  const update = () => {
    httpRequest.request({
      url: '/api/v1/channel/updateChannel',
      method: 'post',
      data: {
        id: channel?.id,
        name: info.name,
        intro: info.intro
      }
    }).then(data => {
      channelStore.updateChannel(channelId, data.name, data.intro)
      ElMessage({
        showClose: true,
        message: '频道信息修改成功',
        type: 'success'
      })
    }).catch(error => {
      console.error('请求失败1：', error)
    })
  }
</script>

<template>
  <div class='channel-setting-overview'>
    <div class='title'>
      频道名称
    </div>
    <input type='text' class='input' v-model='info.name'>

    <div class='divider' />

    <div class='title'>
      频道主题
    </div>
    <textarea class='textarea' maxlength='100' v-model='info.intro' placeholder='告诉大家如何使用该频道吧！' />

    <div class='divider' />

    <button class='btn' @click='update'>保存</button>
  </div>
</template>

<style scoped lang='less'>

  .channel-setting-overview {
    .title {
      color: #b5bac1;
      font-size: 12px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    .input {
      width: 660px;
      height: 40px;
      padding: 10px;
      background-color: #1E1F22;
      border-radius: 4px;
      outline: none;
      border: none;
      color: white;
      box-sizing: border-box;
      font-size: 16px;
    }

    .textarea {
      width: 660px;
      height: 100px;
      padding: 10px;
      background-color: #1E1F22;
      border-radius: 4px;
      outline: none;
      border: none;
      color: white;
      box-sizing: border-box;
      font-size: 16px;
      resize: none;
    }

    .divider {
      margin: 30px 0;
      width: 660px;
      border-bottom: #4e50587A 1px solid;
    }

    .btn {
      cursor: pointer;
      padding: 10px 30px;
      background-color: #23a55a;
      border: none;
      color: white;
      border-radius: 4px;
    }
    .btn {
      cursor: pointer;
      padding: 10px 30px;
      background-color: #23a55a;
      border: none;
      color: white;
      border-radius: 4px;
    }
  }


</style>