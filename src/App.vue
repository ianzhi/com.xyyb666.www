<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useSettingStore } from './stores/setting'
import { onMounted } from 'vue';

onMounted(async () => {
  const settingStore = useSettingStore()
  await settingStore.init()

  document.title = settingStore.settings.name
})
</script>

<template>
  <RouterView />
</template>

<style>
html:root {
  --van-cell-vertical-padding: 15px;
  --van-font-size-md: 16px;
}
html,
body,
#app {
  height: 100%;
  background-color: #f1f2f3;
}
main {
  height: calc(100% - var(--van-tabbar-height));
  padding: var(--van-padding-sm);
  box-sizing: border-box;
}
.container {
  margin-top: var(--van-padding-sm);
  background-color: var(--van-background-2);
  padding: var(--van-padding-sm);
}
</style>
