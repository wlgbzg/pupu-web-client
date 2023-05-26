<script setup lang='ts'>
  import { ref } from 'vue'

  const centerDialogVisible = ref(false)
</script>

<template>
  <el-button @click='centerDialogVisible = true'>点击打开 Dialog</el-button>

  <el-dialog
    title='提示'
    :visible.sync='centerDialogVisible'
    size="tiny" append-to-body
    width='30%'
    center>
    <span>需要注意的是内容是默认不居中的</span>
    <span slot='footer' class='dialog-footer'>
    <el-button @click='centerDialogVisible = false'>取 消</el-button>
    <el-button type='primary' @click='centerDialogVisible = false'>确 定</el-button>
  </span>
  </el-dialog>

</template>

<style scoped lang='less'>

</style>