<template>

  <div class='discovery-search-container'>

    <div class='discovery-search-box'>

      <!-- 头部 -->
      <div class='result-description'>

        <IconArrow class='left-arrow' @click="router.push({ path: '/discovery-guild/recommend' })" />
        <h2> {{ result.totalElements }} 个社区符合搜索“{{ lastSearchKey }}”</h2>
      </div>

      <!-- 搜索框 -->
      <div class='search-input-box'>
        <input v-model='discoveryGuildStore.searchParams.key' class='search-input' placeholder='探索社区' type='text' @keydown.enter='handleInputEnterKey'>
        <div class='input-icon'>
          <IconSearch v-if='!discoveryGuildStore.searchParams.key' class='icon' style='color: #888' />
          <IconClose v-if='discoveryGuildStore.searchParams.key' class='icon' style='color: #b6bac0' @click='clearInput' />
        </div>
      </div>

      <!-- 搜索结果 -->
      <div v-for='item in result.content' class='discovery-guild'
           @click='router.push(`/channels/${item.id}/${item.defaultChannelId}`)'>

        <div class='icon'>
          <img v-if='item.cover' :src='item.cover' alt=''>
          <img v-if='!item.cover'
               alt=''
               src='https://cdn.discordapp.com/discovery-splashes/884849473329692723/352def4f57f5ec5f2ce03c5c0dd52374.jpg?size=600'>
        </div>

        <div class='info'>

          <div class='avatar'>
            <img v-if='item.avatar' :src='item.avatar' alt=''>
            <img v-if='!item.avatar'
                 alt=''
                 src='https://cdn.discordapp.com/icons/662267976984297473/e75033be72087a87fa09e91727dac2a4.webp?size=64'>
          </div>

          <div class='name'>
            <IconGuildFlag class='IconGuildFlag' />
            {{ item.name }}
          </div>

          <div class='intro'>
            {{ item.intro ? item.intro : '暂无介绍' }}
          </div>
          <div class='foot'>
            <span class='circle'></span>
            <span>{{ item.memberCount ? item.memberCount : 0 }} 位成员</span>
          </div>
        </div>

      </div>

    </div>
  </div>

</template>
<script lang='ts' setup>
  import IconArrow from '@/components/icons/discovery/IconLeft.vue'

  import IconClose from '@/components/icons/discovery/IconClose.vue'
  import IconSearch from '@/components/icons/discovery/IconSearch.vue'
  import { reactive, ref } from 'vue'
  import router from '@/router'
  import IconGuildFlag from '@/components/icons/discovery/IconGuildFlag.vue'
  import httpRequest from '@/utils/httpRequest'
  import { useDiscoveryGuildStore } from '@/stores/discoveryGuild'

  const discoveryGuildStore = useDiscoveryGuildStore()

  const clearInput = () => {
    discoveryGuildStore.searchParams.key = ''
  }

  const lastSearchKey = ref('')

  const result = reactive({
    content: [],
    totalElements: 0
  })

  const search = () => {

    if (!discoveryGuildStore.searchParams.key) {
      router.push({ path: '/discovery-guild/recommend' })
      return
    }

    httpRequest.request({
      url: `/api/v1/guild/search`,
      method: 'post',
      data: discoveryGuildStore.searchParams
    }).then(data => {
      Object.assign(result, data)
      lastSearchKey.value = discoveryGuildStore.searchParams.key
    }).catch(error => {
      console.error('请求失败1：', error)
    })
  }

  search()

  function handleInputEnterKey(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      search()
      return
    }
  }


</script>
<style lang='less' scoped>
  @import "@/assets/less/base";

  .discovery-search-container {

    .discovery-search-box {
      cursor: default;
      display: flex;
      flex-direction: column;
      padding-top: 16px;
      padding-left: 32px;
      width: 70%;
      min-width: 800px;

      .result-description {
        display: flex;
        color: #b5bac1;
        align-items: center;
        font-weight: bold;

        .left-arrow {
          transform: rotate(-90deg);
          margin-right: 16px;
          cursor: pointer;
        }

        .left-arrow:hover {
          color: white;
        }
      }


      .search-input-box {
        margin-top: 20px;
        overflow: hidden;
        background-color: #4e5057;
        display: flex;
        border-radius: 4px;
        align-items: center;
        padding: 10px 15px;
        //width: 50%;
        height: 35px;

        .search-input {
          flex: 1;
          border: 0;
          height: 1.5rem;
          font-size: 1.4rem;
          font-weight: 500;
          background: none;
          color: white;
        }

        .search-input::placeholder {
          color: #82868a; /* 设置占位符的颜色 */
        }

        .search-input:focus {
          outline: none;
        }

        .input-icon {
          width: 1.8em;
          height: 1.8em;
          cursor: pointer;

          .icon {
            width: 100%;
            height: 100%;
          }
        }
      }

      .discovery-guild:hover {
        transform: scale(1.004);
      }

      .discovery-guild {
        cursor: pointer;
        border-bottom: 1px solid #3f4147;
        position: relative;
        padding: 20px 0;
        transition: all .1s ease-in-out;
        width: 100%;
        height: 135px;

        overflow: hidden;
        display: flex;
        color: white;

        .icon img {
          width: 240px;
          height: 135px;
          object-fit: cover;
          border-radius: 8px;
        }

        .info {
          padding: 0 20px;
          display: flex;
          flex-direction: column;

          .avatar {
            width: 32px;
            height: 32px;
            overflow: hidden;
            margin-bottom: 10px;

            img {
              width: 32px;
              height: 32px;
              object-fit: cover;
              border-radius: 8px;

            }
          }

          .name {
            display: flex;
            align-items: center;
            font-weight: bold;
            font-size: 16px;

            .IconGuildFlag {
              margin-right: 5px;
            }

          }

          .intro {
            flex: 1;
            margin: 5px 0;
            color: #b5bac1;
            font-size: 14px;
          }

          .foot {
            height: 1rem;
            font-size: 12px;
            color: #b5bac1;
            display: flex;
            align-items: center;

            .circle {
              height: 8px;
              width: 8px;
              background-color: #b5bac1;
              border-radius: 50%;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
</style>