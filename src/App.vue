<script lang='ts' setup>
  import { RouterView } from 'vue-router'
  import GuildCreateDialog from '@/components/GuildCreateDialog.vue'
</script>

<template>
  <!-- dialog -->
  <guild-create-dialog/>

  <!-- view -->
  <RouterView />
</template>
