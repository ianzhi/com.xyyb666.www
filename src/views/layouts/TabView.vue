<template>
    <router-view v-slot="{ Component }">
      <keep-alive :max="3">
          <component :is="Component" />
      </keep-alive>
    </router-view>
    <van-tabbar route safe-area-inset-bottom fixed placeholder>
        <van-tabbar-item icon="home-o" to="/index" replace>首页</van-tabbar-item>
        <van-tabbar-item icon="search" to="/renmai" replace>钱脉</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/mine" replace>我的</van-tabbar-item>
    </van-tabbar>
</template>

<script setup lang="ts">
</script>