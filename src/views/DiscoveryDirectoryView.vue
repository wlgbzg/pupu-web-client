<template>
    <div class="discovery-directory-main-container">
        <h2>发现</h2>
        <div
                :class="currKey == item.key ? 'directory-box-selected' :  ''"
                class="directory-box" v-for="item in directoryBoxList"
                @click="changeType(`${item.key}`)"
        >
            <span class="dict-icon">
                <component :is="item.icon"></component>
            </span>
            <span class="dict-title">{{ item.title }}</span>
        </div>

    </div>
</template>
<script setup lang="ts">
import IconMainPage from "@/components/icons/IconMainPage.vue";
import {reactive, ref} from "vue";
import IconGame from "@/components/icons/IconGame.vue";
import IconMusic from "@/components/icons/IconMusic.vue";
import IconStudy from "@/components/icons/IconStudy.vue";
import IconTech from "@/components/icons/IconTech.vue";
import IconFun from "@/components/icons/IconFun.vue";
import {useDiscoveryGuildStore} from "@/stores/discoverGuild";

interface DirectoryBox {
    key: string;
    title: string;
    icon: Comment;
}

const discoveryGuildStore = useDiscoveryGuildStore()

const directoryBoxList = reactive<DirectoryBox[]>([])
directoryBoxList.push({key: 'home', title: '主页', icon: IconMainPage})
directoryBoxList.push({key: 'game', title: '游戏', icon: IconGame})
directoryBoxList.push({key: 'music', title: '音乐', icon: IconMusic})
directoryBoxList.push({key: 'study', title: '教育', icon: IconStudy})
directoryBoxList.push({key: 'tech', title: '科学&技术', icon: IconTech})
directoryBoxList.push({key: 'fun', title: '娱乐', icon: IconFun})

const currKey = ref('')

const changeType = (key) => {
    currKey.value = key
    discoveryGuildStore.changeKey(key)
}

changeType(discoveryGuildStore.defaultDiscoveryKey)

</script>
<style scoped lang="less">
@import "@/assets/less/base";

.discovery-directory-main-container {
  width: 240px;
  min-width: 240px;
  height: 100%;
  background-color: @grey-2b;
  user-select: none;

  h2 {
    padding: 16px;
    color: white;
  }

  .directory-box {
    padding: 5px 8px;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    margin: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    color: @grey-95;

    .dict-icon {
      margin-right: 12px;
      width: 32px;
      height: 32px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .dict-title {
    }
  }

  .directory-box:hover {
    color: white;
    background-color: @white-alpha-0A;
  }

  .directory-box-selected {
    background-color: @discovery-directory-btn-active;
    color: white;
  }

  .directory-box-selected:hover {
    background-color: @discovery-directory-btn-active;
  }
}

</style>
