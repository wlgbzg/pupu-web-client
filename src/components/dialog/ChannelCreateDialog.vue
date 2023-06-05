<template>
  <el-dialog
    :title='info.title'
    center
    v-model='dialogStore.channelCreate.dialogVisible'
    width='440px'
    :before-close='handleClose'>

    <div class='channel-group-create-dialog-container'>
      <span class='title'>频道类别</span>

      <div class='create-channel-box' :class='{"selected-active": info.selectType === item.type}' @click='selectChannelType(item.type)' v-for='item in channelTypeList'>
        <IconChannel class='channel-icon' />
        <span class='btn-info'>
          <span class='btn-title'>{{ item.name }}</span>
          <span class='btn-desc'>{{ item.desc }}</span>
        </span>
        <span class='btn-selected'>
          <span class='btn-selected-circle' v-if='info.selectType === item.type'></span>
        </span>
      </div>

      <span class='title' style='margin-top: 10px'>频道名称</span>

      <div class='channel-group-name-input'>
        <IconChannel style='margin-right: 5px' />
        <input placeholder='新-频道' type='text' v-model='info.channelGroupName' />
      </div>

      <div class='channel-private' @click='changePrivate'>
        <div class='setting-page-container'>
          <h3 class='setting-name'>
            <IconLock />
            私密频道
          </h3>
          <span>
            <el-switch v-model='info.isPrivate' @click.stop.prevent='' />
          </span>
        </div>
        <div>
          只有所选成员以及身份组才可查看此频道。
        </div>
      </div>

      <span slot='footer' class='dialog-footer channel-group-create-dialog-footer'>
          <el-link type='info' :underline='false' @click='dialogStore.channelCreate.dialogVisible = false'> 取消</el-link>
          <el-button type='primary' style='width: 100px; height: 38px' :disabled='!info.channelGroupName' @click='channelCreate'>创建频道</el-button>
        </span>
    </div>

  </el-dialog>
</template>

<script lang='ts' setup>
  import { useDialogStore } from '@/stores/dialog'
  import { reactive, watchEffect } from 'vue'
  import IconChannel from '@/components/icons/channel/IconChannel.vue'
  import IconLock from '@/components/icons/channel/IconLock.vue'
  import httpRequest from '@/utils/httpRequest'
  import { ElMessage } from 'element-plus'
  import { useRoute } from 'vue-router'
  import { useChannelStore } from '@/stores/channel'
  import router from '@/router'

  const route = useRoute()
  const dialogStore = useDialogStore()
  const channelStore = useChannelStore()
  const handleClose = (done) => {
    done()
    reset()
  }
  const channelTypeList = reactive([{
    name: '文字频道',
    type: 1,
    desc: '发送消息、图片、GIF、表情符号、观点和梗'
  },
    {
      name: '语音频道',
      type: 2,
      desc: '一起来语音、视频和屏幕共享'
    }])

  const info = reactive({
    title: '创建频道',
    selectType: 1,
    channelGroupName: '',
    isPrivate: false,

  })


  const changePrivate = () => {
    info.isPrivate = !info.isPrivate
  }

  const selectChannelType = (type) => {
    info.selectType = type
  }

  const reset = () => {
    info.title = '创建频道'
    info.selectType = 1
    info.channelGroupName = ''
    info.isPrivate = false
    dialogStore.channelCreate.channelGroup = ''
  }

  watchEffect(() => {
    // info.createBtnEnable = !info.guildName
  })

  //
  const channelCreate = () => {
    httpRequest.request({
      url: `/api/v1/channel/create`,
      method: 'post',
      data: {
        guildId: route.params.guildId,
        name: info.channelGroupName,
        isPrivate: info.isPrivate,
        type: info.selectType,
        channelGroupId: dialogStore.channelCreate.channelGroup
      }
    }).then(data => {
      ElMessage({
        message: '频道创建成功',
        type: 'success'
      })

      channelStore.channelInfo.channels.push(data)
      reset()
      // 创建好以后直接切换到这个频道
      router.push({ path: `/channels/${route.params.guildId.toString()}/${data.id}` })
      dialogStore.channelCreate.dialogVisible = false
    }).catch(error => {
      console.error('请求失败1：', error)
    })
  }


</script>

<style lang='less' scoped>
  .channel-group-create-dialog-container {
    user-select: none;
    display: flex;
    flex-direction: column;

    .selected-active {
      background-color: #CCCCCC !important;
    }

    .title {
      color: #33383e;
      font-size: 12px;
      font-weight: 700;
    }

    .create-channel-box {
      background-color: #eeeeee;
      height: 42px;
      display: flex;
      padding: 10px 12px;
      align-items: center;
      border-radius: 4px;
      margin: 4px 0;
      cursor: pointer;
      color: #313338;

      .channel-icon {
        width: 24px;
        height: 24px;
        color: #313338;
        margin-right: 10px;
      }

      .btn-info {
        flex: 1;
        display: flex;
        flex-direction: column;

        .btn-title {
          font-size: 16px;
          font-weight: 700;
        }

        .btn-desc {
          color: #666;
        }
      }

      .btn-selected {
        width: 18px;
        height: 18px;
        margin-right: 10px;
        border-radius: 50%;
        border: #33383e 2px solid;
        display: flex;
        justify-content: center;
        align-items: center;

        .btn-selected-circle {
          width: 14px;
          height: 14px;
          background-color: #33383e;
          border-radius: 50%;
        }
      }


    }

    .create-channel-box:hover {
      background-color: #CCCCCC;
    }

    .channel-group-name-input {
      margin: 5px 0;
      width: 94%;
      height: 2rem;
      border: 0;
      background-color: #e3e5e8;
      border-radius: 4px;
      padding: 4px 12px;

      display: flex;
      justify-content: center;
      align-items: center;

      input {
        height: 1.5rem;
        width: 100%;
        border: none;
        font-size: 16px;
        background-color: #e3e5e8;
      }

      input:focus {
        outline: none;
      }
    }

    .channel-group-create-dialog-footer {
      width: 100%;
      display: flex;
      justify-content: space-around;
      margin-top: 30px;
    }

    .channel-private {
      display: flex;
      flex-direction: column;
      cursor: pointer;

      .setting-page-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px 0 0 0;
        align-items: center;

        .setting-name {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
</style>
