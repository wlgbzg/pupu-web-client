<script lang='ts' setup>
  import { RouterView } from 'vue-router'
  import GuildCreateDialog from '@/components/dialog/GuildCreateDialog.vue'
  import ChannelCreateDialog from '@/components/dialog/ChannelCreateDialog.vue'
  import ChannelGroupCreateDialog from '@/components/dialog/ChannelGroupCreateDialog.vue'
</script>

<template>
  <!-- dialog -->
  <guild-create-dialog/>
  <channel-create-dialog/>
  <channel-group-create-dialog/>

  <!-- view -->
  <RouterView />
</template>
