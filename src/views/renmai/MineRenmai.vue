<template>
    <div class="mine-renmai">
        <van-cell-group inset style="margin-top: var(--van-padding-md)">
            <template v-for="(i, index) in renmai_count">
                <van-cell
                    v-if="profile && profile.meta && (index >= profile.meta.qianmai_level)"
                    :title="`${convertToChinaNum(index + 1)}环人脉`"
                    :key="`disable-${index}`">
                    <template #right-icon>
                        <van-icon name="lock" />
                    </template>
                </van-cell>
                <van-cell
                    v-else
                    :title="`${convertToChinaNum(index + 1)}环人脉`"
                    :key="`normal-${index}`"
                    :to="{ name: 'mine.renmai.people', params: { level: index + 1 } }"
                    is-link>
                    <template #value>
                        {{ i }}人
                    </template>
                </van-cell>
            </template>
        </van-cell-group>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getRenmaiCount } from '@/api/auth'
import { convertToChinaNum } from '@/utils/number'
import { useAuthStore, type UserProfile } from '@/stores/auth'

const renmai_count = ref<number[]>([])
const profile = ref<UserProfile | undefined>(undefined)

onMounted(async () => {
    const authStore = useAuthStore()
    profile.value = await authStore.me()
    renmai_count.value = await getRenmaiCount()
})
</script>