<template>
    <van-form class="receive-money-method" style="padding: var(--van-padding-sm) 0" @submit="handleSubmit">
        <van-cell-group inset>
            <van-cell
                :value="columns[pickerIndex].text"
                title="当前使用"
                label="您邀请的用户升级时可以看到您当前选择的收款方式"
                placeholder="当前使用"
                is-link
                @click="showPicker = true" />
            <van-popup v-model:show="showPicker" round position="bottom">
                <van-picker
                    :columns="columns"
                    @cancel="showPicker = false"
                    @confirm="handlePickerConfirm"
                />
            </van-popup>

        </van-cell-group>

        <van-cell-group inset style="margin-top: var(--van-padding-sm)">
            <van-field
                v-model="form.realname"
                :disabled="loading"
                name="姓名"
                label="姓名"
                placeholder="陌生人转账可能需要输入您的真实姓名"
                :rules="[{ required: true, message: '请填写您的真实姓名' }]" />

            <van-field
                v-model="form.wechat_id"
                :disabled="loading"
                name="微信号"
                label="微信号"
                placeholder="微信号" />
            <van-field
                v-model="form.bank_card"
                :disabled="loading"
                name="银行卡"
                label="银行卡"
                placeholder="银行卡" />
            <van-field
                v-model="form.usdt"
                :disabled="loading"
                name="USDT"
                label="USDT"
                placeholder="USDT" />
        </van-cell-group>

        <div style="margin: var(--van-padding-md)">
            <van-button :disabled="loading" native-type="submit" type="primary" round block>保存</van-button>
        </div>
    </van-form>
</template>

<script setup lang="ts">
import { getProfilePayInfo, setProfilePay, type PayData } from '@/api/auth';
import { onMounted } from 'vue';
import { computed } from 'vue';
import { ref } from 'vue'

const showPicker = ref(false)
const pickerIndex = computed<number>((): number => {
    for (let i in columns) {
        if (columns[i].value === form.value.pay_method) {
            return Number(i)
        }
    }
    return 0
})
const columns = [
    { text: '微信', value: 'wechat_id'},
    { text: '银行卡', value: 'bank_card' },
    { text: 'USDT', value: 'usdt' }
]

const form = ref<PayData>({
    pay_method: 'wechat_id',
    realname: '',
    wechat_id: '',
    bank_card: '',
    usdt: ''
})

onMounted(async () => {
    form.value = await getProfilePayInfo()
    console.log(form.value)
})

function handlePickerConfirm (values: { selectedValues: string[], selectedIndexes: number[] }) {
    form.value.pay_method = values.selectedValues[0]
    showPicker.value = false
}

const loading = ref(false)
async function handleSubmit() {
    loading.value = true
    await setProfilePay(form.value)
    loading.value = false
}
</script>