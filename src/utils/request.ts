import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

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

export default request
