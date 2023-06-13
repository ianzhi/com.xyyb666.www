<template>
    <div class="upgrade-view">
        <van-cell-group inset title="个人信息">
            <van-cell title="当前级别" :value="level_text"></van-cell>
            <van-cell title="升级费用" :value="`${money}元`"></van-cell>
        </van-cell-group>

        <van-cell-group v-if="current" title="升级客服" inset>
            <van-cell
                :title="current.parent.user_nicename"
                :value="current.parent.realname">
                <template v-if="current.parent.avatar" #icon>
                    <van-image :src="current.parent.avatar" round width="50" />
                </template>
            </van-cell>
            <van-cell :title="pay_method_map[current.parent.pay_method!]" :value="current.parent.pay_method_value"></van-cell>
        </van-cell-group>

        <div v-if="!current" style="padding: var(--van-padding-md)">
            <van-button :disabled="loading" type="primary" block round @click="handleUpgrade">{{ money }}元 立即升级</van-button>
        </div>

        <div v-else style="padding: var(--van-padding-md)">
            请添加客服微信，转账时备注个人账号即可
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useSettingStore } from '@/stores/setting'
import { computed, onMounted, ref } from 'vue'
import { getCurrentUpgrade, getLevelText, getUpgradeLogs, upgrade } from '@/api/auth'
import { showNotify } from 'vant'
import { isAxiosError } from 'axios'
import 'vant/es/notify/style'

const level = ref(0)
const money = ref<string>('0.00')
const current = ref<{ parent: { user_nicename?: string, pay_method?: 'wechat_id' | 'bank_card' | 'usdt', pay_method_value?: string, realname?: string, avatar?: string } } | undefined>(undefined)
const loading = ref(true)
const pay_method_map = {
    wechat_id: '微信',
    bank_card: '银行卡',
    usdt: 'USDT'
}

const level_text = computed(() => getLevelText(level.value))
onMounted(async () => loadData())

async function loadData() {
    loading.value = true
    const settingStore = useSettingStore()
    const authStore = useAuthStore()
    const profile = await authStore.me()
    if (!profile || !profile.meta || !profile.meta.qianmai_level) {
        level.value = 0
    } else {
        level.value = Number(profile.meta.qianmai_level)
    }

    if (settingStore.settings.level_money[level.value + 1]) {
        money.value = settingStore.settings.level_money[level.value]
    }

    current.value = await getCurrentUpgrade()
    loading.value = false
}
async function handleUpgrade() {
    if (confirm('确定要进行升级嘛？')) {
        try {
            await upgrade()
            await loadData()
            showNotify({ type: 'success', message: '提交升级成功，等待客服审核中' })
        } catch (e) {
            if (isAxiosError(e)) {
                if (e.response && e.response.data && e.response.data.message) {
                    showNotify({ type: 'danger', message: e.response.data.message })
                } else {
                    showNotify({ type: 'danger', message: e.message })
                }
            } else {
                console.error(e)
            }
        }
    }
}
</script>

<style>
.upgrade-view {
    padding: var(--van-padding-md) 0;
    box-sizing: border-box;
}
</style>