<template>
    <div class="discovery-main-container">

        <div class="discovery-container">
            <div class="middle-container">
                <div class="middle-main-container">
                    <DiscoveryDirectoryView/>
                </div>
                <div class="user-panel-container">
                    <UserPanelView/>
                </div>
            </div>
            <div class="right-container">
                <discovery-search-view/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import UserPanelView from "@/views/UserPanelView.vue";
import {useRoute} from "vue-router";
import {useGuildStore} from "@/stores/guild";
import DiscoveryDirectoryView from "@/views/DiscoveryDirectoryView.vue";
import DiscoverySearchView from "@/views/DiscoverySearchView.vue";

const guildStore = useGuildStore()
const route = useRoute()

</script>
<style scoped lang="less">
@import "@/assets/less/base";


.discovery-main-container {


    .discovery-container {
        display: flex;
        flex-direction: row;
        justify-content: left;

        .middle-container {
            display: flex;
            flex-direction: column;
            height: 100vh;

            .middle-main-container {
                flex: 1;
            }

            .user-panel-container {
                color: white;
                height: 52px;
                width: 100%;
                background-color: @grey-23;
            }
        }

        .right-container {
            flex: 1;

        }
    }
}


</style>
