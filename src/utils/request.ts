import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import axios, { AxiosError, type AxiosResponse } from 'axios'

const request = axios.create({
    baseURL: import.meta.env.DEV ? '/wp-json' : 'https://api.xyyb666.com/wp-json',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

request.interceptors.request.use(config => {
    const authStore = useAuthStore()
    const user = authStore.getUser()

    if (user && user.token) {
        config.headers.set('Authorization', `Bearer ${user.token}`)
    }

    return config
})

request.interceptors.response.use(res => res, (err: AxiosError) => {
    if (err.response && err.response.status === 403) {
        const authStore = useAuthStore()
        authStore.logout()
        router.replace({ name: 'login' })
    } else {
        return err
    }
})

export default request
