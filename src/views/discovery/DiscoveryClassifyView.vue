<template>
  <div class='discovery-classify-container '>
    <h2>发现</h2>
    <div v-for='item in list' :class="currKey == item.key ? 'selected' :  ''"
         class='classify' @click='changeType(`${item.key}`)'>
            <span class='icon'>
                <component :is='item.icon'></component>
            </span>
      <span class='dict-title'>{{ item.title }}</span>
    </div>
  </div>
</template>
<script lang='ts' setup>
  import IconMainPage from '@/components/icons/discovery/IconMainPage.vue'
  import { reactive, ref } from 'vue'
  import IconGame from '@/components/icons/discovery/IconGame.vue'
  import IconMusic from '@/components/icons/discovery/IconMusic.vue'
  import IconStudy from '@/components/icons/discovery/IconStudy.vue'
  import IconTech from '@/components/icons/discovery/IconTech.vue'
  import IconFun from '@/components/icons/discovery/IconFun.vue'
  import { useDiscoveryGuildStore } from '@/stores/discoveryGuild'

  const discoveryGuildStore = useDiscoveryGuildStore()

  const list = reactive([])
  list.push({ key: 'home', title: '主页', icon: IconMainPage })
  list.push({ key: 'game', title: '游戏', icon: IconGame })
  list.push({ key: 'music', title: '音乐', icon: IconMusic })
  list.push({ key: 'study', title: '教育', icon: IconStudy })
  list.push({ key: 'tech', title: '科学&技术', icon: IconTech })
  list.push({ key: 'fun', title: '娱乐', icon: IconFun })

  const currKey = ref('')

  const changeType = (key) => {
    currKey.value = key
    discoveryGuildStore.changeKey(key)
  }

  changeType(discoveryGuildStore.defaultDiscoveryKey)

</script>
<style lang='less' scoped>
  @import "@/assets/less/base";

  .discovery-classify-container {
    width: 240px;
    min-width: 240px;
    background-color: @discovery-classify-background;
    user-select: none;

    h2 {
      padding: 16px;
      color: white;
    }

    .classify {
      padding: 5px 8px;
      font-size: 16px;
      font-weight: bold;
      display: flex;
      align-items: center;
      margin: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
      color: @discovery-classify-font-color;

      .icon {
        margin-right: 12px;
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    .classify:hover {
      color: white;
      background-color: @discovery-classify-hover;
    }

    .selected {
      background-color: @discovery-classify-active;
      color: white;
    }

    .selected:hover {
      background-color: @discovery-classify-active;
    }
  }

</style>
