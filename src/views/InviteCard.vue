<template>
    <div class="invite-card">
        <div><canvas ref="canvas" width="200" height="200"></canvas></div>
        <div>
            <van-button :disabled="!text" type="primary" block round @click="handleCopy">复制我的邀请信息</van-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import QRCode from 'qrcode'
import { useAuthStore } from '@/stores/auth'
import copy from '@/utils/clipboard'
import { showNotify } from 'vant'
import 'vant/es/notify/style'

// 渲染二维码
const canvas = ref(null)
const text = ref('')
onMounted(async () => {
    const authStore = useAuthStore()
    const profile = await authStore.me()
    if (profile && profile.id) {
        text.value = `http://www.xyyb666.com/register?code=${profile.slug}`
    }
})

watch(text, (val) => {
    if (val) {
        QRCode.toCanvas(canvas.value, text.value)
    }
})

async function handleCopy() {
    const result = await copy(text.value)
    if (result) {
        showNotify({ type: 'success', message: '复制成功' })
    } else {
        showNotify({ type: 'danger', message: '复制失败' })
    }
}
</script>

<style scoped>
.invite-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--van-padding-xs);
}
.invite-card > div {
    margin-top: var(--van-padding-md);
}
</style>