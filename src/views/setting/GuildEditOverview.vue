<script setup lang='ts'>

  import { useSettingStore } from '@/stores/setting'
  import httpRequest from '@/utils/httpRequest'
  import { reactive, watch } from 'vue'
  import { ElMessage } from 'element-plus'
  import { useGuildStore } from '@/stores/guild'

  const settingStore = useSettingStore()
  const guildStore = useGuildStore()
  const guildId = settingStore.info.data['guildId']
  const guild = guildStore.getGuild(guildId)


  const info = reactive({
    name: guild?.name,
    intro: guild?.intro,
    cover: guild?.cover,
    // 临时对象
    imageSrc: null
  })
  const update = () => {
    httpRequest.request({
      url: '/api/v1/guild/updateGuild',
      method: 'post',
      data: {
        id: guild?.id,
        name: info.name,
        intro: info.intro,
        cover: info.cover
      }
    }).then(data => {
      guildStore.updateGuild(data)

      ElMessage({
        showClose: true,
        message: '社区信息修改成功',
        type: 'success'
      })
    }).catch(error => {
      console.error('请求失败1：', error)
    })
  }

  const fileSelect = (event) => {
    const selectedFile = event.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      info.imageSrc = e.target.result

    }
    reader.readAsDataURL(selectedFile)
  }
</script>

<template>
  <div class='guild-setting-overview'>
    <div class='title'>
      社区头像
    </div>
    <div>

      <div class='file-input-box'>
        <div v-if='!info.imageSrc'>
          <div class='no-avatar'><span class='no-avatar-title'>{{ info.name }}</span></div>
        </div>

        <div>
          <img class='avatar-preview' v-if='info.imageSrc' alt='Preview Image' :src='info.imageSrc'>
        </div>

        <input class='file-input' type='file' tabindex='0' accept='.jpg,.jpeg,.png,.gif,.webp' aria-label='上传服务器图标' @change='fileSelect'
               style='position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; opacity: 0; cursor: pointer; font-size: 0px;'>
      </div>

    </div>

    <div class='divider' />

    <div class='title'>
      社区名称
    </div>
    <input type='text' class='input' v-model='info.name'>

    <div class='divider' />

    <div class='title'>
      社区主题
    </div>
    <textarea class='textarea' maxlength='100' placeholder='告诉大家如何使用该社区吧！' v-model='info.intro' />

    <div class='divider' />

    <button class='btn' @click='update'>保存</button>
  </div>
</template>

<style scoped lang='less'>

  .guild-setting-overview {

    .file-input-box {
      margin-top: 30px;
      position: relative;
      height: 80px;
      width: 80px;
      margin-bottom: 30px;

      .no-avatar {
        background-color: green;
        height: 80px;
        width: 80px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        .no-avatar-title {
          font-size: 22px;
          white-space: nowrap;
          color: white;
          font-weight: bold;
        }
      }

      .avatar-preview {
        height: 80px;
        width: 80px;
        border-radius: 50%;
      }
    }

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