<template>
    <div class="renmai">
        <div class="container">
            <van-button block round type="primary" @click="handleUpgrade">立即升级，人脉变钱脉</van-button>
        </div>

        <div style="margin-top: var(--van-padding-md)">
            <van-search v-model="query.keywords" placeholder="请输入搜索关键词" @search="loadData" />

            <van-cell-group v-if="upgrade_logs.length > 0">
                <van-cell
                    v-for="log in upgrade_logs"
                    :key="log.id"
                    :title="log.user_nicename"
                    :label="`升${Number(log.qianmai_level) + 1}级 ${log.create_time}`">
                    <template v-if="log.avatar" #icon>
                        <van-image :src="log.avatar" round width="50" style="margin-right: var(--van-padding-md)" />
                    </template>
                    <template #extra>
                        <div style="height: 50px; display: flex; align-items: center">
                            <van-button type="primary" size="mini" @click="handleApproval(log.id)">通过</van-button>
                        </div>
                    </template>
                </van-cell>
            </van-cell-group>

            <van-empty v-else description="暂无数据，升级转换钱脉" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { getUpgradeLogs, approval, type UpgradeLog, type UpgradeLogQuery } from '@/api/auth'
import router from '@/router'
import { onMounted, ref } from 'vue'

const query = ref<UpgradeLogQuery>({
    keywords: ''
})
const upgrade_logs = ref<UpgradeLog[]>([])

function handleUpgrade() {
    router.push({ name: 'upgrade' })
}


onMounted(() => loadData())
async function loadData() {
    upgrade_logs.value = await getUpgradeLogs(query.value)
}

async function handleApproval(id: number) {
    if (confirm('确定要通过该用户的升级申请嘛？')) {
        await approval(id)
        await loadData()
    }
}

</script>

<style scoped>
.renmai {
    height: calc(100% - 50px);

    display: flex;
    flex-direction: column;
}
.container:nth-child(2) {
    flex-grow: 1;
    overflow: auto;
}

:deep(.container .van-cell-group) {
    flex-grow: 1;
    overflow: auto;
}
</style>