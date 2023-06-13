<template>
    <van-form validate-trigger="onSubmit" action="register-view" @submit="submit">
        <van-cell-group inset>
            <van-field
                v-model="form.username"
                name="用户名"
                placeholder="请输入手机号"
                :rules="[{ required: true, message: '请填写手机号' }]"
                />
        </van-cell-group>
        <van-cell-group inset>
            <van-field
                v-model="form.captcha"
                name="验证码"
                placeholder="请输入验证码"
                :rules="[{ required: true, message: '请输入验证码' }]"
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
                name="密码"
                placeholder="请输入密码"
                :rules="[{ required: true, message: '请填写用户名' }]"
                />
        </van-cell-group>
        <van-cell-group inset>
            <van-field
                v-model="form.password_confirmation"
                name="再次密码"
                placeholder="请再次输入密码"
                :rules="[{ required: true, message: '请填写用户名' }]"
                />
        </van-cell-group>
        <van-cell-group inset>
            <van-field
                v-model="form.code"
                :disabled="codeDisabled"
                name="邀请码"
                placeholder="请输入邀请码"
                :rules="[{ required: true, message: '请输入邀请码' }]"
                />
        </van-cell-group>
        <div class="submit">
            <van-button type="primary" native-type="submit" round block>注册账号</van-button>
        </div>
        <div class="actions">
            <router-link :to="{ name: 'login', replace: true }" back><van-icon name="arrow-left" />直接登录</router-link>
            <router-link :to="{ name: 'forgot', replace: true }" back>忘记密码</router-link>
        </div>
    </van-form>
</template>

<script setup lang="ts">
import { register, sendSMS } from '@/api/auth'
import router from '@/router'
import { showNotify } from 'vant'
import { isAxiosError } from 'axios'
import 'vant/es/notify/style'
import { computed, onMounted, ref } from 'vue'

const loading = ref(false)
const codeDisabled = ref(false)
const form = ref({
    username: '',
    password: '',
    password_confirmation: '',
    code: '',
    captcha: ''
})
const seconds = ref(0)
const canSend = computed(() => {
    return seconds.value === 0 && form.value.username && form.value.username.length === 11
})

// 解析url，如果存在邀请码，直接写入并禁用邀请码输入
onMounted(() => {
    const code = getQueryVariable('code')
    if (code) {
        form.value.code = String(code)
        codeDisabled.value = true
    }
})

function getQueryVariable(key: string)
{
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == key){return pair[1];}
    }
    return(false);
}

async function submit() {
    try {
        loading.value = true
        await register(
            form.value.username,
            form.value.password,
            form.value.password_confirmation,
            form.value.code,
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
</script>