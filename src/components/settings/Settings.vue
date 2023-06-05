<script setup lang='ts'>

  import IconClose from '@/components/icons/setting/IconClose.vue'
  import { defineProps, reactive, ref, toRefs } from 'vue'
  import { useSettingStore } from '@/stores/setting'

  const props = defineProps({
    data: {
      type: Object,
      required: true
    }
  })
  const { data } = toRefs(props)

  const settingStore = useSettingStore()
  settingStore.info.data = data
  const navi = settingStore.info.data.nav

  const nav = settingStore.nav[navi];

  const current = reactive({
    index: 0,
    title: '',
    visible: true
  })

  const currentComponent = ref()

  const changeKey = (index) => {
    if (nav[index].view) {
      current.index = index
      current.title = nav[index].title
      currentComponent.value = nav[index].view
    }
  }
  changeKey(0)


</script>

<template>
  <teleport to='body'>
    <div class='setting-page-container' style='z-index: 999' v-if='current.visible'>
      <div class='setting-page-nav'>
        <div class='nav-main'>
          <div class='nav-title'>
            系统设置
          </div>
          <div class='nav-box' v-for='(item, index) in nav'>
            <div class='nav' :class="index == current.index ? 'nav-selected' :  ''" @click='changeKey(index)'>
              {{ item.title }}
            </div>
            <div class='divider' v-if='item["divider"]'></div>
          </div>
        </div>
      </div>
      <div class='setting-page-main'>
        <div class='main-title'>
          {{ current.title }}
        </div>

        <component :is='currentComponent' />
      </div>

      <div class='setting-page-close' @click='current.visible = false'>
        <icon-close />
      </div>
    </div>
  </teleport>
</template>

<style scoped lang='less'>
  @import "@/assets/less/base";

  .setting-page-container {
    height: 100%;
    width: 100%;
    position: absolute;
    display: flex;
    user-select: none;

    .setting-page-nav {
      width: 243px + 72px;
      height: 100%;
      background-color: @channel-background;
      display: flex;
      justify-content: right;

      .nav-main {
        padding: 60px 6px;
        height: 100%;
        color: white;

        .nav-title {
          color: #949ba4;
          font-size: 12px;
          margin: 10px 10px;
        }

        .divider {
          margin: 10px 15px;
          width: 80%;
          border-bottom: #4e50587A 1px solid;
        }

        .nav-box {

          .nav {
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

          .nav:hover {
            background-color: #4e505899;

          }

          .nav-selected {
            background-color: #4e5058;
            cursor: pointer;
          }

          .nav-selected:hover {
            background-color: #4e5058;
          }


        }
      }

    }

    .setting-page-main {
      flex: 1;
      background-color: #313338;
      padding: 60px 40px;
      box-sizing: border-box;
      width: 1200px;

      .main-title {
        font-size: 20px;
        font-weight: 700;
        color: #F2F3F5;
        margin-bottom: 20px;
      }

    }

    .setting-page-close {
      position: absolute;
      right: 30px;
      top: 30px;
      height: 40px;
      width: 40px;
      border-radius: 50%;
      border: #b5bac1 1px solid;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #b5bac1;
      cursor: pointer;
    }

    .setting-page-close:hover {
      color: white;
      border: white 1px solid;
    }

  }
</style>