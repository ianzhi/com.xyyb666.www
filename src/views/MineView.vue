<template>
    <div class="mine">
        <div class="bg"></div>

        <div class="info">
            <div class="left">
                <van-image
                    :src="profile && profile.avatar_urls ? profile.avatar_urls[96] : ''"
                    width="50"
                    height="50"
                    round />
                <div class="nickname">{{ profile?.name }}</div>
            </div>
            <div class="right">
                <router-link to="/">设置</router-link>
            </div>
        </div>

        <van-cell-group inset>
            <van-cell :to="{ name: 'invite-card' }" title="我的邀请码" is-link />
            <van-cell :to="{ name: 'mine.renmai' }" title="我的人脉" is-link />
        </van-cell-group>

        <van-cell-group inset>
            <!-- <van-cell title="实名认证" value="" /> -->
            <van-cell title="收款方式" is-link :to="{ name: 'receive-money-method' }" />
        </van-cell-group>

        <van-cell-group inset>
            <van-cell :to="{ name: 'category', params: { id: 5 } }" title="帮助中心" is-link />
            <van-cell title="客服电话" :value="settingStore.settings.kefu_phone" @click="handleCall(String(settingStore.settings.kefu_phone))"/>
        </van-cell-group>

        <div class="exit">
            <van-button round @click="handleLogout">退出登陆</van-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { RouterLink } from 'vue-router'
import { useAuthStore, type UserProfile,  } from '@/stores/auth'
import { onMounted, ref } from 'vue'
import { useSettingStore } from '@/stores/setting';

const settingStore = useSettingStore()

const authStore = useAuthStore()
const profile = ref<UserProfile | undefined>(undefined)
onMounted(async () => {
    profile.value = await authStore.me()
})

function handleLogout() {
    if (confirm('确定要退出登录吗？')) {
        authStore.logout()
        router.replace({ name: 'login' })
    }
}

function handleCall(phone: string) {
    window.location.href = `tel:${phone}`
}
</script>

<style scoped>
.mine {
    position: relative;
    padding: var(--van-padding-sm);
}
.mine .bg {
    background-color: var(--van-primary-color);
    height: 200px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}

.info {
    height: 100px;
    color: white;

    display: flex;
    justify-content: space-between;
    align-items: center;
}
.info .left {
    display: flex;
    z-index: 10;
}
.info .right {
    z-index: 10;
}
.info .right a {
    color: white;
}
.info .nickname {
    display: flex;
    align-items: center;
    margin-left: .5rem;
}

.mine :deep(.van-cell-group) {
    margin: var(--van-padding-sm) 0 0 0;
    z-index: 100 !important;
}
.mine :deep(.van-cell) {
    z-index: 100 !important;
}

.exit {
  margin-top: var(--van-padding-sm);
  display: flex;
  justify-content: center;
}
</style>