<template>
  <div class='flex'>
    <div class='flex-column h-screen-vh'>
      <DiscoveryClassifyView class='flex-1' />
      <UserPanelView />
    </div>
    <RouterView :key='useRoute().path' class='flex-1' />
  </div>
</template>
<script lang='ts' setup>
  import UserPanelView from '@/views/UserPanelView.vue'
  import DiscoveryClassifyView from '@/views/discovery/DiscoveryClassifyView.vue'
  import { useRoute } from 'vue-router'
</script>
<style lang='less' scoped>
  @import "@/assets/less/base";


</style>
