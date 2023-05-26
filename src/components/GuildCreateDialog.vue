<template>
  <el-dialog
    title="提示"
    center
    v-model="dialogStore.guildCreate.dialogVisible"
    width="30%"
    :before-close="handleClose">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogStore.guildCreate.dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogStore.guildCreate.dialogVisible = false">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script lang='ts' setup>
  import { useDialogStore } from '@/stores/dialog'

  const dialogStore = useDialogStore()
  const handleClose = (done) => {
    done();
  }
</script>
