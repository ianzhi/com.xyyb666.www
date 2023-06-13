import { type Settings, getSettings } from "@/api/setting";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useSettingStore = defineStore('setting', () => {
    const settings = reactive<Settings>({
        kefu_phone: '',
        name: '',
        level_count: 0,
        level_money: []
    })

    async function init() {
        if (settings.kefu_phone === '' && settings.name === '' && settings.level_count === 0) {
            const res = await getSettings()
            settings.kefu_phone = res.kefu_phone
            settings.name = res.name
            settings.level_count = Number(res.level_count)
            settings.level_money = res.level_money
        }
    }

    return { settings, init }
})