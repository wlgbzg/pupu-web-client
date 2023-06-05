<template>
  <el-dialog
    title='创建类别'
    center
    v-model='dialogStore.channelGroupCreate.dialogVisible'
    width='440px'
    :before-close='handleClose'>

    <div class='channel-group-create-dialog-container'>
      <span class='title'>类别名称</span>

      <div class='channel-group-name-input'>
        <input placeholder='新类别' type='text' v-model='info.channelGroupName' ref='inputRef'/>
      </div>

      <div class='channel-private' @click='changePrivate'>
        <div class='setting-page-container'>
          <h3 class='setting-name'>
            <IconLock />
            私密类别
          </h3>
          <span>
            <el-switch v-model='info.isPrivate' @click.stop.prevent='' />
          </span>
        </div>
        <div>
          将类别设为私密，则只有所选成员以及身份组将能够查看此类别。此类别下的同步频道将会自动与该设置匹配。
        </div>
      </div>

      <span slot='footer' class='dialog-footer channel-group-create-dialog-footer'>
          <el-link type='info' :underline='false' @click='dialogStore.channelCreate.dialogVisible = false'> 取消</el-link>
          <el-button type='primary' style='width: 100px; height: 38px' :disabled='!info.channelGroupName' @click='channelCreate'>创建类别</el-button>
        </span>
    </div>

  </el-dialog>
</template>

<script lang='ts' setup>
  import { useDialogStore } from '@/stores/dialog'
  import { nextTick, reactive, ref, watchEffect } from 'vue'
  import IconChannel from '@/components/icons/channel/IconChannel.vue'
  import IconLock from '@/components/icons/channel/IconLock.vue'
  import httpRequest from '@/utils/httpRequest'
  import { ElMessage } from 'element-plus'
  import { useRoute } from 'vue-router'
  import { useChannelStore } from '@/stores/channel'

  const route = useRoute()
  const dialogStore = useDialogStore()
  const channelStore = useChannelStore()
  const handleClose = (done) => {
    done()
    reset()
  }

  const info = reactive({
    channelGroupName: '',
    isPrivate: false,
  })


  const changePrivate = () => {
    info.isPrivate = !info.isPrivate
  }

  const reset = () => {
    info.channelGroupName = ''
    info.isPrivate = false
    dialogStore.channelCreate.channelGroup = ''
  }

  const inputRef = ref()

  watchEffect(() => {
    if (dialogStore.channelGroupCreate.dialogVisible) {
      if (inputRef.value) {
        nextTick(() => {
          setTimeout(() => {
            inputRef.value.focus();
          }, 100);
        });
      }
    }
  })

  //
  //
  const channelCreate = () => {
    httpRequest.request({
      url: `/api/v1/channel/channelGroupCreate`,
      method: 'post',
      data: {
        guildId: route.params.guildId,
        name: info.channelGroupName,
        isPrivate: info.isPrivate,
      }
    }).then(data => {
      ElMessage({
        message: '类别创建成功',
        type: 'success'
      })

      channelStore.channelInfo.channelGroups.push(data)
      reset()
      dialogStore.channelGroupCreate.dialogVisible = false
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
