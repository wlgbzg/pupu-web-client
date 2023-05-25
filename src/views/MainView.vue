<template>
  <div class='main-view-container w-screen'>
    <div class='container'>
      <div class='left-container'>
        <SideBar />
      </div>
      <div class='right-container'>
        <router-view :key='useRoute().path' />
      </div>
    </div>
  </div>
</template>


<script lang='ts' setup>
  import SideBar from '@/views/sidebar/SideBar.vue'
  import MqttManager from '@/utils/mqtt'
  import { onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  onMounted(() => {
    // 启动消息通道
    MqttManager.connect()
  })
</script>

<style lang='less' scoped>
  @import "@/assets/less/base";

  .main-view-container {
    position: fixed;
  }

  .container {
    display: flex;
    flex-wrap: nowrap; /* 防止子元素换行 */
    justify-content: space-between; /* 平均分配父容器中的空间 */
    align-items: center; /* 垂直居中 */
  }

  .left-container {
    width: 72px;
    min-width: 72px;
    height: 100vh;
  }

  .right-container {
    flex: 1; /* 自适应宽度 */
    height: 100vh;
    background-color: #313338;
  }
</style>
