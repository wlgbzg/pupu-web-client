<template>
  <el-dialog
    :title='info.title'
    center
    v-model='dialogStore.guildCreate.dialogVisible'
    width='440px'
    :before-close='handleClose'>

    <div class='guild-create-dialog-container'>
      <!-- 入口引导 -->
      <div class='guild-create-dialog-v1' v-if='info.page == 1'>
        <span class='dialog-title'>您的服务器是您和好友聚首的地方。创建您自己的服务器，开始畅聊吧。</span>
        <div class='create-guild-box' @click='changePage(2)'>
          <component class='btn-icon' :is='IconCreateGuild'/>
          <span class='btn-title'>亲自创建</span>
        </div>
        <span slot='footer' class='dialog-footer guild-create-dialog-footer'>
          <span class='footer-title'>已有了邀请？</span>
          <el-button type='info' style='width: 400px; height: 38px' @click='changePage(3)'>加入服务器</el-button>
        </span>
      </div>




      <!-- 创建服务器 -->
      <div class='guild-create-dialog-v2' v-if='info.page == 2'>
        <span class='dialog-title'>一个名称以及一个图标就能赋予您的服务器个性。之后，您可以随时进行变更。</span>

        <div class='file-input-box'>
          <div v-if='!info.imageSrc'>
            <component :is='IconFileUpload'/>
          </div>

          <div>
            <img class='avatar-preview' v-if='info.imageSrc' alt='Preview Image' :src='info.imageSrc'>
          </div>

          <input class='file-input' type='file' tabindex='0' accept='.jpg,.jpeg,.png,.gif,.webp' aria-label='上传服务器图标' @change='fileSelect'
                 style='position: absolute; top: 0px; left: 0px; width: 100%; height: 100%; opacity: 0; cursor: pointer; font-size: 0px;'>
        </div>

        <div class='guild-name-box'>

          <div class='guild-name-label'>服务器名称</div>

          <input class='guild-name-input' type='text' v-model='info.guildName' />

          <div class='guild-license'>
            <span>您创建服务器即代表您同意了 Discord 的</span>
            <el-link type='primary' style='font-size: 12px'>社区守则</el-link>
          </div>

        </div>

        <span slot='footer' class='dialog-footer guild-create-dialog-footer-v2'>
          <el-link type='info' :underline='false' @click='changePage(1)'> 后退</el-link>
          <el-button type='primary' style='width: 100px; height: 38px' @click='guildCreate()' :disabled='info.createBtnEnable'>创建</el-button>
        </span>
      </div>

      <!-- 加入服务器 -->
      <div class='guild-create-dialog-v3' v-if='info.page == 3'>
        <div class='dialog-title'>在下方输入邀请以加入现有的服务器</div>

        <div class='guild-join-box'>
          <div class='guild-join-label'>邀请链接或邀请码<span style='color: red'> * </span></div>
          <input class='guild-join-input' type='text' v-model='info.joinCode' />
        </div>

        <span slot='footer' class='dialog-footer guild-create-dialog-footer-v3'>
          <el-link type='info' :underline='false' @click='changePage(1)'> 后退</el-link>
          <el-button type='primary' style='width: 100px; height: 38px'  @click='joinGuild()'  :disabled='!info.joinCode'>加入服务器</el-button>
        </span>
      </div>
    </div>

  </el-dialog>
</template>

<script lang='ts' setup>
  import { useDialogStore } from '@/stores/dialog'
  import { reactive, watchEffect } from 'vue'
  import { useUserProfileStore } from '@/stores/user'
  import IconFileUpload from '@/components/icons/guild/IconFileUpload.vue'
  import IconCreateGuild from '@/components/icons/guild/IconCreateGuild.vue'

  const dialogStore = useDialogStore()
  const userProfileStore = useUserProfileStore()
  const handleClose = (done) => {
    done()
    reset()
  }

  const info = reactive({
    title: '创建服务器',
    page: 1,
    guildName: '',
    createBtnEnable: true,
    imagePath: '',
    imageSrc: null,
    joinCode: ''
  })

  const reset = () => {
    info.title = '创建服务器'
    info.page = 1
    info.guildName = ''
    info.createBtnEnable = true
    info.imagePath = ''
    info.imageSrc = null
    info.joinCode = ''
  }

  watchEffect(() => {
    info.createBtnEnable = !info.guildName
  })

  const fileSelect = (event) => {
    const selectedFile = event.target.files[0]
    const reader = new FileReader()
    reader.onload = (e) => {
      info.imageSrc = e.target.result

    }
    reader.readAsDataURL(selectedFile)
  }

  const changePage = (page = 1) => {
    info.page = page

    if (page === 1) {
      info.title = '创建服务器'
    } else if (page === 2) {
      info.title = '创建服务器'
      info.guildName = `${userProfileStore.user.name}的服务器`
    } else if (page === 3) {
      info.title = '加入服务器'
    }
  }

  const guildCreate = () => {

  }

  const joinGuild = () => {

  }

</script>

<style>
    .guild-create-dialog-container {
        user-select: none;

        .dialog-title {
            color: #4e5058;
            font-size: 16px;
            margin-bottom: 30px;
        }

        .create-guild-box {
            height: 66px;
            width: 100%;
            display: flex;
            align-items: center;
            border-radius: 8px;
            border: #b5bac1 solid 1px;
            cursor: pointer;

            .btn-icon {
                padding: 10px;
                border-radius: 50%;
                width: 48px;
                height: 48px;
            }

            .btn-title {
                font-size: 16px;
                color: #313338;
                font-weight: 700;
            }
        }

        .create-guild-box:hover {
            background-color: #f2f3f5;
        }

        .guild-create-dialog-v3 {

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;

            .guild-join-box {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: start;

                .guild-join-label {
                    font-weight: 700;
                    color: #4e5058;
                    font-size: 12px;

                }

                .guild-join-input {
                    margin: 5px 0;
                    width: 94%;
                    height: 2rem;
                    border: 0;
                    background-color: #e3e5e8;
                    border-radius: 4px;
                    padding: 4px 12px;
                    font-size: 16px;
                }


            }
            .guild-create-dialog-footer-v3 {
                width: 100%;
                display: flex;
                justify-content: space-around;
                margin-top: 30px;

                .footer-title {
                    color: #060606;
                    font-size: 20px;
                    font-weight: 700;
                    line-height: 2.5rem;
                }
            }
        }

        .guild-create-dialog-v2 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;

            .file-input-box {
                position: relative;
                height: 80px;
                width: 80px;
                margin-bottom: 30px;

                .avatar-preview {
                    height: 80px;
                    width: 80px;
                    border-radius: 50%;
                }
            }

            .guild-name-box {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: start;

                .guild-name-label {
                    font-weight: 700;
                    color: #4e5058;
                    font-size: 12px;
                }

                .guild-name-input {
                    margin: 5px 0;
                    width: 94%;
                    height: 2rem;
                    border: 0;
                    background-color: #e3e5e8;
                    border-radius: 4px;
                    padding: 4px 12px;
                    font-size: 16px;
                }

                .guild-license {
                    font-size: 8px;
                    margin: 4px 0;
                    display: flex;
                }

            }

            .guild-create-dialog-footer-v2 {
                width: 100%;
                display: flex;
                justify-content: space-around;
                margin-top: 30px;

                .footer-title {
                    color: #060606;
                    font-size: 20px;
                    font-weight: 700;
                    line-height: 2.5rem;
                }
            }
        }

        .guild-create-dialog-v1 {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;




            .guild-create-dialog-footer {
                margin-top: 30px;

                .footer-title {
                    color: #060606;
                    font-size: 20px;
                    font-weight: 700;
                    line-height: 2.5rem;
                }
            }

        }
    }
</style>
