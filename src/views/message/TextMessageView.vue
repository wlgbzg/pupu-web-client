<template>
  <span>
    {{ messageBody?.text }}
  </span>
</template>

<script lang='ts' setup>
  import { defineProps, PropType, toRefs } from 'vue'
  import { TextMessageBean } from '@/types/beans'

  const props = defineProps({
    messageBody: {
      type: Object as PropType<TextMessageBean>,
      required: true
    }
  })
  const { messageBody } = toRefs(props)!

</script>