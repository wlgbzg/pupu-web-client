<template>
  <div class='guild-flag'>
    <svg aria-hidden='false' aria-label='已验证' color='rgb(35, 165, 89)' height='16' role='img' viewBox='0 0 16 15.2'
         width='16'>
      <path d='m16 7.6c0 .79-1.28 1.38-1.52 2.09s.44 2 0 2.59-1.84.35-2.46.8-.79 1.84-1.54 2.09-1.67-.8-2.47-.8-1.75 1-2.47.8-.92-1.64-1.54-2.09-2-.18-2.46-.8.23-1.84 0-2.59-1.54-1.3-1.54-2.09 1.28-1.38 1.52-2.09-.44-2 0-2.59 1.85-.35 2.48-.8.78-1.84 1.53-2.12 1.67.83 2.47.83 1.75-1 2.47-.8.91 1.64 1.53 2.09 2 .18 2.46.8-.23 1.84 0 2.59 1.54 1.3 1.54 2.09z' fill='currentColor'
            fill-rule='evenodd'></path>
    </svg>
    <svg aria-hidden='true' class='icon-3BYlXK' color='white' height='16' role='img' viewBox='0 0 16 15.2'
         width='16'>
      <path d='M7.4,11.17,4,8.62,5,7.26l2,1.53L10.64,4l1.36,1Z' fill='currentColor'></path>
    </svg>
  </div>
</template>
<style>
    .guild-flag {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 16px; /* 设置容器的宽度和高度，根据实际情况调整 */
        height: 16px;
    }

    .guild-flag svg:first-child {
        position: absolute;
        bottom: 0;
        left: 0;
    }

    .guild-flag svg:last-child {
        position: absolute;
        top: 0;
        left: 0;
    }
</style>
<script setup>
</script>