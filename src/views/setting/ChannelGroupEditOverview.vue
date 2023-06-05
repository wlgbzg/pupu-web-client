<script setup lang='ts'>

  import { useSettingStore } from '@/stores/setting'
  import { useChannelStore } from '@/stores/channel'
  import httpRequest from '@/utils/httpRequest'
  import { reactive } from 'vue'
  import { ElMessage } from 'element-plus'

  const settingStore = useSettingStore()
  const channelStore = useChannelStore()
  const channelGroup = channelStore.getChannelGroup(settingStore.info.data['channelGroupId'])
  const info = reactive({
    name: channelGroup?.name
  })
  const update = () => {
    httpRequest.request({
      url: '/api/v1/channel/updateChannelGroup',
      method: 'post',
      data: {
        id: channelGroup?.id,
        name: info.name
      }
    }).then(data => {
      channelStore.updateChannelGroup(settingStore.info.data['channelGroupId'], data.name)
      ElMessage({
        showClose: true,
        message: '类别信息修改成功',
        type: 'success'
      })
    }).catch(error => {
      console.error('请求失败1：', error)
    })
  }
</script>

<template>
  <div class='guild-setting-overview'>
    <div class='title'>
      类别名称
    </div>
    <input type='text' class='input' v-model='info.name'>

    <div class='divider' />

    <button class='btn' @click='update'>保存</button>
  </div>
</template>

<style scoped lang='less'>

  .guild-setting-overview {
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