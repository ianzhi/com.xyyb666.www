<template>
    <div class="mine-renmai">
        <van-cell-group inset style="margin-top: var(--van-padding-md)">
            <van-cell
                v-for="(i, index) in renmai_count"
                :title="`${convertToChinaNum(index + 1)}环人脉`"
                :key="index"
                :value="`${i}人`"
                :to="{ name: 'mine.renmai.people', params: { level: index + 1 } }"
                is-link />
        </van-cell-group>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getRenmaiCount } from '@/api/auth'
import { convertToChinaNum } from '@/utils/number'

const renmai_count = ref<number[]>([])
onMounted(async () => {
    renmai_count.value = await getRenmaiCount()
})
</script>