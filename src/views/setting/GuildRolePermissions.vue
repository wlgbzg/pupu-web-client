<script setup lang='ts'>

  import { useSettingStore } from '@/stores/setting'
  import { reactive } from 'vue'
  import { useGuildStore } from '@/stores/guild'
  import httpRequest from '@/utils/httpRequest'
  import { ElMessage } from 'element-plus'
  import type { GuildRole } from '@/types/beans'

  const settingStore = useSettingStore()
  const guildStore = useGuildStore()
  const guildId = settingStore.info.data['guildId']
  const guild = guildStore.getGuild(guildId)

  const permissions = [
    {
      title: '高级管理员',
      desc: '除了解散社区、删除频道之外的一切权限'
    },
    {
      title: '普通管理员',
      desc: '可以创建频道、删除、置顶其他成员发送的消息'
    },
    {
      title: '消息管理',
      desc: '可以删除其他成员发送的消息'
    },
  ]

  const getSwitchStatus = (bitPosition) => {
    return (info.permissionValue & (1 << bitPosition)) !== 0;
  }

  const setSwitchStatus = (bitPosition, value) => {
    if (value) {
      // 将指定位设置为1
      info.permissionValue |= (1 << bitPosition);
    } else {
      // 将指定位设置为0
      info.permissionValue &= ~(1 << bitPosition);
    }
  }

  const current = reactive({
    index: 0,
    guildRole: {} as GuildRole,
    permission: [],
  })

  const changeKey = (index) => {
    current.index = index
    current.guildRole = guildStore.guildRoleInfo[index]
    info.id = current.guildRole.id
    info.name = current.guildRole.name
    info.permissionValue = current.guildRole.permissions
  }

  const info = reactive({
    id: '',
    name: '',
    permissionValue: 0
  })

  changeKey(0)

  const addGuildRole = () => {
    httpRequest.request({
      url: `/api/v1/guild/createGuildRole/${guildId}`,
      method: 'post'
    }).then(data => {
      guildStore.addGuildRoleInfo(data)
      changeKey(guildStore.guildRoleInfo.length - 1)
    }).catch(error => {
      console.error('请求失败1：', error)
    })
  }

  const updateGuildRole = () => {
    httpRequest.request({
      url: '/api/v1/guild/updateGuildRole',
      method: 'post',
      data: {
        id: info.id,
        name: info.name,
        permissions: info.permissionValue
      }
    }).then(data => {
      guildStore.updateGuildRole(data)

      ElMessage({
        showClose: true,
        message: '角色信息修改成功',
        type: 'success'
      })
    }).catch(error => {
      console.error('请求失败1：', error)
    })
  }

  const switchPermission = (index) => {
    let v = getSwitchStatus(index)
    setSwitchStatus(index, !v)
  }

</script>

<template>
  <div class='guild-role-permissions'>

    <div class='guild-role-container'>

      <div class='r-setting-page-nav'>
        <div class='r-nav-main'>
          <div class='r-nav-title el-link add' @click='addGuildRole'>
            新建角色 +
          </div>
          <div class='r-nav-box' v-for='(item, index) in guildStore.guildRoleInfo'>
            <div class='r-nav' :class="index == current.index ? 'r-nav-selected' :  ''" @click='changeKey(index)'>
              {{ item.name }}
            </div>
            <div class='r-divider' v-if='item["divider"]'></div>
          </div>
        </div>
      </div>

    </div>

    <div class='guild-role-setting-container'>


      <div class='r-nav-title'>
        角色名称
      </div>
      <input type='text' class='input' v-model='info.name'>

      <div class='r-guild-role-permissions-container'>

        <div class='r-guild-role-permissions-box' v-for='(item, index) in permissions'>

          <div class='info'>

            <div class='title'>{{ item.title }}</div>
            <div class='desc'> {{ item.desc}}</div>

          </div>

          <div class='switch-box' @click='switchPermission(index)'>

            <div class='switch'>
              <div class='switch-on' v-if='getSwitchStatus(index)'></div>
              <div class='switch-off' v-if='!getSwitchStatus(index)'></div>
            </div>

          </div>


        </div>

      </div>


      <button class='r-btn' @click='updateGuildRole'>保存</button>

    </div>


  </div>
</template>

<style scoped lang='less'>
  @import "@/assets/less/base";

  .guild-role-permissions {
    display: flex;
    min-width: 660px;

    .r-divider {
      margin: 30px 0;
      width: 100%;
      border-bottom: #4e50587A 1px solid;
    }

    .r-btn {
      margin-top: 30px;
      cursor: pointer;
      padding: 10px 30px;
      background-color: #23a55a;
      border: none;
      color: white;
      border-radius: 4px;
    }

    .r-nav-title {
      color: #949ba4;
      font-size: 12px;
      margin: 30px 10px 10px 10px;
    }

    .input {
      min-width: 260px;
      width: 100%;
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

    .guild-role-container {
      width: 232px;
      height: 600px;
      color: white;
      border-right: #b5bac122 1px solid;

      .r-setting-page-nav {
        width: 100%;
        height: 100%;
        background-color: @channel-background;
        display: flex;
        justify-content: center;
        border-radius: 10px 0 0 10px;

        .r-nav-main {
          padding: 0px 0px;
          height: 100%;
          color: white;

          .add:hover {
            color: white;
          }

          .r-nav-box {

            .r-nav {
              width: 180px;
              height: 32px;
              box-sizing: border-box;
              border-radius: 4px;
              font-size: 16px;
              font-weight: 700;
              padding: 6px 10px;
              margin: 2px 10px;
              cursor: pointer;
              display: flex;
              align-items: center;
            }

            .r-nav:hover {
              background-color: #4e505899;

            }

            .r-nav-selected {
              background-color: #4e5058;
              cursor: pointer;
            }

            .r-nav-selected:hover {
              background-color: #4e5058;
            }
          }
        }

      }

    }

    .guild-role-setting-container {
      flex: 1;
      background-color: @channel-background;
      border-radius: 0 10px 10px 0;
      padding: 0 30px;

      .r-guild-role-permissions-container {

        .r-guild-role-permissions-box {
          height: 44px;
          padding: 20px 0;
          border-bottom: #4e50587A 1px solid;
          display: flex;

          .info {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 14px;


            .title {
              color: #e6eaf0;
              font-weight: 700;
            }
            .desc {
              margin-top: 6px;
              color: #e6eaf066;
            }
          }

          .switch-box {
            height: 40px;
            width: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 10px;
            cursor: pointer;
            //background-color: red;


            .switch {
              height: 20px;
              background-color: #E6EAF066;
              width: 40px;
              border-radius: 14px;
              overflow: hidden;
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;


              .switch-on {
                border-radius: 50%;
                position: absolute;
                right: 3px;
                width: 16px;
                height: 16px;
                background-color: #6cbf00;
              }

              .switch-off {
                border-radius: 50%;
                position: absolute;
                left: 3px;
                width: 16px;
                height: 16px;
                background-color: #ccc;
              }

            }

          }

        }
      }
    }
  }


</style>