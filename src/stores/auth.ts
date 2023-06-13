import { ref } from 'vue'
import { defineStore } from 'pinia'
import { login as loginApi, getProfile } from '@/api/auth'

export interface User {
    token: string
    user_display_name: string
    user_email: string
    user_nicename: string
}

export interface UserProfile {
  avatar_urls: { [index: number]: string }
  id: number
  name: string
  slug: string
  meta: { [key: string]: any }
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | undefined>()
  const profile = ref<UserProfile | undefined>()

  async function login(u: string, p: string) {
    const res = await loginApi(u, p)
    setUser(res.data)
    return res
  }

  function logout() {
    localStorage.clear()
    profile.value = undefined
    user.value = undefined
  }

  function getUser() {
    if (user.value === undefined) {
        user.value = JSON.parse(String(localStorage.getItem('user'))) || undefined
    }
    return user.value
  }

  function setUser(data: User) {
    user.value = data
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  async function me() {
    if (!profile.value) {
      profile.value = await getProfile()
    }
    return profile.value
  }

  return { user, profile, setUser, getUser, login, logout, me }
})
