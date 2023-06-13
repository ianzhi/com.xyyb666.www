<template>
    <van-nav-bar :title="title" left-arrow fixed placeholder @click-left="handleClickBack" />

    <router-view />
</template>

<script setup lang="ts">
import router from '@/router'
import { provide, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const title = ref<string>(String(route.meta.title || ''))
provide('useTitle', (value: string) => {
    title.value = value
})

function handleClickBack() {
    router.back()
}
</script>