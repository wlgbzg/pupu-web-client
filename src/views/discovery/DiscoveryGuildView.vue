<template>
    <div class="flex">
        <div class="flex-column h-screen-vh">
            <DiscoveryClassifyView class="flex-1"/>
            <UserPanelView/>
        </div>
        <RouterView class="flex-1" :key="useRoute().path"/>
    </div>
</template>
<script setup lang="ts">
import UserPanelView from "@/views/UserPanelView.vue";
import DiscoveryClassifyView from "@/views/discovery/DiscoveryClassifyView.vue";
import {useRoute} from "vue-router";
</script>
<style scoped lang="less">
@import "@/assets/less/base";


</style>
