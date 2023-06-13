<template>
    <van-form action="forgot-view" @submit="submit">
        <van-cell-group inset>
            <van-field
                v-model="form.username"
                :rules="[{ required: true, message: '请填写用户名' }]"
                :disabled="loading"
                name="用户名"
                placeholder="请输入用户名"
                />
        </van-cell-group>
        <van-cell-group inset>
            <van-field
                v-model="form.captcha"
                :disabled="loading"
                :rules="[{ required: true, message: '请填写验证码' }]"
                name="验证码"
                placeholder="请输入验证码"
                clearable
                center
                >
                <template #button>
                    <van-button :disabled="!canSend" size="mini" type="primary" @click="sms">发送验证码<span v-if="seconds > 0">({{ seconds }})</span></van-button>
                </template>
            </van-field>
        </van-cell-group>
        <van-cell-group inset>
            <van-field
                v-model="form.password"
                :disabled="loading"
                :rules="[{ required: true, message: '请填写密码' }]"
                name="密码"
                placeholder="请输入密码"
                />
        </van-cell-group>
        <van-cell-group inset>
            <van-field
                v-model="form.password_confirmation"
                :disabled="loading"
                :rules="[{ required: true, message: '请再次输入密码' }]"
                name="重复密码"
                placeholder="请再次输入密码"
                />
        </van-cell-group>
        <div class="submit">
            <van-button :disabled="loading" type="primary" native-type="submit" round block>重置密码</van-button>
        </div>
        <div class="actions">
            <router-link :to="{ name: 'register' }">注册账号</router-link>
            <router-link :to="{ name: 'login' }">直接登录</router-link>
        </div>
    </van-form>
</template>

<script setup lang="ts">
import { reset, sendSMS } from '@/api/auth'
import router from '@/router'
import { isAxiosError } from 'axios'
import { computed, ref } from 'vue'
import { showNotify } from 'vant'
import 'vant/es/notify/style'

const form = ref({
    username: '',
    password: '',
    password_confirmation: '',
    captcha: ''
})
const loading = ref(false)
const seconds = ref(0)
const canSend = computed(() => {
    return seconds.value === 0 && form.value.username && form.value.username.length === 11
})


async function countdown() {
    const timer = setTimeout(() => {
        clearTimeout(timer)
        if (seconds.value > 0) {
            seconds.value -= 1
            countdown()
        }
    }, 1000)
}

async function sms() {
    if (form.value.username === '') {
        showNotify({ type: 'danger', message: '请先输入手机号！' })
    }

    seconds.value = 60
    await sendSMS(form.value.username)
    countdown()
}
async function submit() {
    try {
        loading.value = true
        await reset(
            form.value.username,
            form.value.password,
            form.value.password_confirmation,
            form.value.captcha
        )
        router.push({ name: 'login' })
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
    } finally {
        loading.value = false
    }
}
</script>