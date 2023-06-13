<template>
    <van-form validate-trigger="onSubmit" action="login-view" @submit="submit">
        <van-cell-group inset>
            <van-field
                v-model="form.username"
                name="手机号"
                placeholder="请输入手机号"
                type="tel"
                :rules="[{ required: true, message: '请输入手机号' }]"
                />
        </van-cell-group>
        <van-cell-group inset>
            <van-field
                v-model="form.password"
                name="密码"
                placeholder="请输入密码"
                type="password"
                :rules="[{ required: true, message: '请输入密码' }]" >
            </van-field>
        </van-cell-group>
        <div class="submit">
            <van-button :disabled="loading" type="primary" native-type="submit" round block>登录</van-button>
        </div>
        <div class="actions right">
            <router-link :to="{ name: 'forgot' }">忘记密码</router-link>
            <router-link :to="{ name: 'register' }">注册账号<van-icon name="arrow" /></router-link>
        </div>
    </van-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import router from '@/router'
import { showNotify } from 'vant'
import { isAxiosError } from 'axios'
import 'vant/es/notify/style'

const loading = ref(false)

const form = ref({
    username: '',
    password: ''
})

async function submit() {
    try {
        loading.value = true
        const authStore = useAuthStore()
        await authStore.login(form.value.username, form.value.password)
        router.push({ name: 'home' })
    } catch (e) {
        if (isAxiosError(e)) {
            if (e.response && e.response.status === 403) {
                showNotify({ type: 'danger', message: '登录失败，用户名或者密码有误！' })
            } else if (e.response && e.response.data && e.response.data.message) {
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