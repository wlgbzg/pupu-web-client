<template>
  <div class='guild-channel-container' @contextmenu.stop.prevent='freeContextMenu'>

    <!--   头部   -->
    <div class='head-container' @contextmenu.stop.prevent='headContextMenu'>
      <span class='channel-info'>{{ channelStore.channelInfo.guild?.name }}</span>
      <span class='head-btn'><el-icon size='12'><ArrowDownBold /></el-icon></span>
    </div>

    <!--   频道   -->
    <div class='channel-container'>

      <!--   分组频道   -->
      <div v-for='group in channelStore.channelInfo.channelGroups' class='channel-group'>
        <div class='channel-group-title' v-if='group.id' @click='expand(`${group.id}`)' @contextmenu.stop.prevent='groupContextMenu($event, `${group.id}`)'>
          <span class='channel-group-left'><IconArrowDown :class="expandHide[group.id] ? 'expandHide' :  ''" /><span class='channel-group-name'>{{ group['name'] }}</span></span>
          <span class='channel-group-right'><IconPlus @click.stop.prevent='openChannelCreateDialog(group.id)' /></span>
        </div>

        <div v-for='item in channelStore.getChannels(group.id)' :class="item.id === route.params.channelId ? 'channel-item-selected' :  ''" v-if='!expandHide[group.id]'
             @contextmenu.stop.prevent='channelContextMenu($event, `${item.id}`)'
             class='channel-item' @click='router.push({path: `/channels/${route.params.guildId}/${item.id}`})'>
          <span class='channel-item-left'><IconChannel class='channel-icon-default' /><span>{{ item.name }}</span></span>
          <span class='channel-item-right'><span class='channel-item-btn'><IconPlusUser /></span><span class='channel-item-btn'><IconSettings /></span></span>
        </div>
      </div>
    </div>

    <div class='free-container'>
    </div>


  </div>
</template>
<script lang='ts' setup>

  import IconArrowDown from '@/components/icons/channel/IconArrowDown.vue'
  import IconChannel from '@/components/icons/channel/IconChannel.vue'
  import IconSettings from '@/components/icons/channel/IconSettings.vue'
  import IconPlusUser from '@/components/icons/channel/IconPlusUser.vue'
  import IconPlus from '@/components/icons/channel/IconPlus.vue'
  import router from '@/router'
  import { useRoute } from 'vue-router'
  import httpRequest from '@/utils/httpRequest'
  import { useChannelStore } from '@/stores/channel'
  import ContextMenu from '@imengyu/vue3-context-menu'
  import { useDialogStore } from '@/stores/dialog'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import { reactive, watch } from 'vue'
  import { useGuildStore } from '@/stores/guild'
  import Settings from '@/components/settings/settings'

  const route = useRoute()
  const channelStore = useChannelStore()
  const dialogStore = useDialogStore()
  const guildStore = useGuildStore()

  const load = () => {
    httpRequest.request({
      url: '/api/v1/channel/list/' + route.params.guildId,
      method: 'post'
    }).then(data => {
      channelStore.updateChannels(data.channelGroups, data.channels, data.guild)
    }).catch(error => {
      console.error('请求失败1：', error)
    })
  }
  load()

  const expandHide = reactive({})

  const expand = (groupId) => {
    expandHide[groupId] = !expandHide[groupId]
  }

  const openChannelCreateDialog = (channelGroup = '') => {
    dialogStore.openChannelCreate(channelGroup)
  }
  const openChannelGroupCreateDialog = () => {
    dialogStore.channelGroupCreate.dialogVisible = true
  }

  watch(() => channelStore.channelInfo.channels, () => {
    if (route.params.channelId) {
      if (channelStore.channelInfo.channels.length > 0) {
        // if (!channelStore.getChannel(route.params.channelId.toString())) {
          router.replace({ path: `/channels/${route.params.guildId.toString()}/${channelStore.channelInfo.channels[0].id}` })
        // }
      } else {
        router.replace({ path: `/channels/${route.params.guildId.toString()}` })
      }
    }
  })

  const deleteChannelGroup = (groupId) => {

    httpRequest.request({
      url: `/api/v1/channel/deleteChannelGroup/${groupId}`,
      method: 'post'
    }).then(data => {
      channelStore.deleteChannelGroup(groupId)
    }).catch(error => {
      console.error('请求失败1：', error)

    })
  }

  const groupContextMenu = (e, groupId) => {
    ContextMenu.showContextMenu({
      theme: 'default',
      x: e.x,
      y: e.y,
      items: [
        {
          label: '编辑类别',
          onClick: () => {
            Settings({ channelGroupId: groupId, nav: 'channelGroupEdit' })
          },
          divided: true
        },
        {
          label: '删除类别',
          onClick: () => {

            ElMessageBox.confirm(
              '你确认删除这个类别吗？这个操作是不能撤销的！',
              '删除类别',
              {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'error',
                center: true
              }
            )
              .then(() => {
                deleteChannelGroup(groupId)
              }).catch(error => {

            })

          }
        }
      ]
    })
  }

  const changeChannelGroup = (channelGroupId, channelId) => {

    httpRequest.request({
      url: '/api/v1/channel/setChannelGroup',
      method: 'post',
      data: {
        channelId: channelId,
        channelGroupId: channelGroupId
      }
    }).then(data => {
      channelStore.getChannel(channelId)!.channelGroupId = channelGroupId
    }).catch(error => {
      console.error('请求失败1：', error)
    })
  }

  const setDefaultChannel = (channelId) => {
    httpRequest.request({
      url: `/api/v1/guild/setDefaultChannel/${route.params.guildId}/${channelId}`,
      method: 'post'
    }).then(data => {
      const g = guildStore.getGuild(route.params.guildId.toString())
      if (g) {
        g.defaultChannelId = data.defaultChannelId
      }
      ElMessage({
        type: 'success',
        message: '设置默认频道成功'
      })
    }).catch(error => {
      console.error('请求失败1：', error)
    })
  }
  const deleteChannel = (channelId) => {

    ElMessageBox.confirm(
      '你确认删除这个频道吗？这个操作是不能撤销的！',
      '删除频道',
      {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'error',
        center: true
      }
    )
      .then(() => {
        httpRequest.request({
          url: `/api/v1/channel/delete/${channelId}`,
          method: 'post'
        }).then(data => {
          const index = channelStore.channelInfo.channels.findIndex(item => item.id === channelId) // 查找具有id为1的元素的索引
          if (index !== -1) {
            channelStore.channelInfo.channels.splice(index, 1) // 从数组中删除该元素
          }
          ElMessage({
            type: 'success',
            message: '频道删除成功'
          })
          // 如果删除的是当前频道, 那么随便找个频道切换一下
          if (route.params.channelId === channelId) {
            if (channelStore.channelInfo.channels.length > 0) {
              router.replace({ path: `/channels/${route.params.guildId}/${channelStore.channelInfo.channels[0].id}` })
            } else {
              router.replace({ path: `/channels/${route.params.guildId}` })
            }
          }
        }).catch(error => {
          console.error('请求失败1：', error)
        })
      })
      .catch(() => {
      })

  }

  // 空白区域右键菜单
  const freeContextMenu = (e) => {
    ContextMenu.showContextMenu({
      theme: 'default',
      x: e.x,
      y: e.y,
      items: [
        {
          label: '创建频道',
          onClick: () => {
            openChannelCreateDialog()
          }
        },
        {
          label: '创建类别',
          onClick: () => {
            openChannelGroupCreateDialog()
          }
        }
      ]
    })
  }

  // 频道区域右键菜单
  const channelContextMenu = (e, channelId) => {
    ContextMenu.showContextMenu({
      theme: 'default',
      x: e.x,
      y: e.y,
      items: [
        {
          label: '移动分类',
          children: channelStore.channelInfo.channelGroups.map((item) => {
            return {
              label: item.name,
              onClick: () => {
                changeChannelGroup(item.id, channelId)
              }
            }
          })
        },
        {
          label: '设为默认频道',
          onClick: () => {
            setDefaultChannel(channelId)
          }
        },
        {
          label: '编辑频道',
          onClick: () => {
            Settings({ channelId: channelId, nav: 'channelEdit' })
          }
        },
        {
          label: '复制链接',
          onClick: () => {
          },
          divided: true
        },
        {
          label: '删除频道',
          onClick: () => {
            deleteChannel(channelId)
          }
        }


      ]
    })
  }

  const headContextMenu = (e) => {
    ContextMenu.showContextMenu({
      x: e.x,
      y: e.y,
      items: [
        {
          label: '创建1频道',
          onClick: () => {
          }
        },
        {
          label: 'A submenu',
          children: [
            { label: 'Item1' },
            { label: 'Item2' },
            { label: 'Item3' }
          ]
        }
      ]
    })
  }

</script>
<style lang='less' scoped>
  @import "@/assets/less/base";


  .expandHide {
    transform: rotate(-90deg);
  }

  ::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }

  .guild-channel-container {
    user-select: none;
    width: 240px;
    min-width: 240px;
    height: 100%;
    background-color: @channel-background;
    color: @channel-font-color;
    display: flex;
    flex-direction: column;

    .head-container {
      width: 200px;
      height: 48px;
      border-bottom: 1px solid rgba(1, 1, 1, 0.2);
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
      font-size: 18px;
    }

    .head-container:hover {
      background-color: @channel-head-hover;
      cursor: pointer;
      z-index: 2;
    }

    .channel-container {
      overflow-y: auto;
      padding-top: 12px;

      .channel-group {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 16px;

        .channel-group-title {
          width: 240px;
          height: 24px;
          font-size: 12px;
          cursor: pointer;
          font-weight: bold;
          display: flex;
          justify-content: space-between;
          align-items: center;

          .channel-group-left {
            flex: 1;
            display: flex;
            align-items: center;
            margin-left: 5px;

            .channel-group-name {
              margin-left: 4px;
            }
          }

          .channel-group-right {
            margin-right: 20px;
          }
        }

        .channel-group-title:hover {
          color: white;
          cursor: pointer;
        }


        .channel-item {
          border-radius: 4px;
          height: 34px;
          font-size: 16px;
          padding: 0 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 200px;

          .channel-item-left {
            display: flex;
            align-items: center;
          }

          .channel-item-right {
            display: flex;
            align-items: center;
            justify-content: center;

            .channel-item-btn {
              margin-left: 5px;
              display: flex;
              align-items: center;
              justify-content: center;
              visibility: hidden;
            }

          }

        }

        .channel-item:hover {
          background-color: @channel-item-hover;
          color: white;
          cursor: pointer;

        }

        .channel-item:hover .channel-item-right .channel-item-btn {
          visibility: visible;
        }

        .channel-item-selected {
          background-color: @channel-item-active;
          color: white;
          cursor: pointer;
        }

        .channel-item-selected:hover {
          background-color: @channel-item-active;
        }

      }

    }

    .free-container {
      flex: 1;
    }


  }

</style>
