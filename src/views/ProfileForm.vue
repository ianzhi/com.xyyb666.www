<template>
    <div class="profile-form">
        <van-form style="padding: var(--van-padding-md) 0" @submit="handleSubmit">
            <div style="display: flex; justify-content: center;">
                <van-uploader
                    v-model="form.avatar"
                    :multiple="false"
                    :max-size="1024 * 1024 * 5"
                    :show-upload="false"
                    result-type="file"/>
            </div>
            <van-cell-group inset style="margin-top: var(--van-padding-md)">
                <van-field
                    v-model="form.user_nicename"
                    type="text"
                    name="昵称"
                    label="昵称"
                    placeholder="昵称"
                    :rules="[{ required: true, message: '请填写昵称' }]"
                    />
            </van-cell-group>

            <div style="margin: var(--van-padding-md)">
                <van-button round block type="primary" native-type="submit">
                保存
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'
import { upload } from '@/api/file'
import { updateProfile } from '@/api/auth';

const form = ref<{ user_nicename: string, avatar: { url: string, isImage: boolean, file?: any }[] }>({
    user_nicename: '',
    avatar: []
})

onMounted(async () => {
    const authStore = useAuthStore()
    const profile = await authStore.me()

    form.value.user_nicename = profile ? profile.name : ''
    form.value.avatar = profile ? [{ url: Object.values(profile.avatar_urls)[0], isImage: true }] : []
})

function isFile(f: any): f is File {
    return typeof(f) === 'object' && f instanceof File
}

function handleSubmit() {
    // 处理文件
    const file: any = form.value.avatar[0].file
    if (file && isFile(file)) {
        const formData = new FormData()
        formData.append('file', file)
        upload(formData, file.type)
    }

    updateProfile({ name: form.value.user_nicename })
        .then(res => console.log(res))

}
</script>