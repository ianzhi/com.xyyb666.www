<template>
    <div class="renmai-people">
        <van-cell-group inset style="margin-top: var(--van-padding-md)">
            <van-cell
                v-for="user in renmai_list"
                :title="user.user_nicename"
                :label="getLevelText(user.qianmai_level)"
                :value="user.user_registered">
                <template #icon>
                    <van-image :src="user.avatar" width="50" height="50" round style="margin-right: var(--van-padding-base)" />
                </template>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script setup lang="ts">
import { getRenmaiList, getLevelText } from '@/api/auth'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

const renmai_list = ref<{ user_login: string, avatar: string, user_nicename: string, user_registered: string, qianmai_level: number }[]>([])
onMounted(async () => {
    const route = useRoute()
    renmai_list.value = await getRenmaiList(Number(route.params.level))
})
</script>
