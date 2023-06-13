import request from "@/utils/request"

export interface Settings {
    kefu_phone: string
    name: string
    level_count: number
    level_money: string[]
}

export async function getSettings() {
    return request.get('/qianmai/v1/settings').then<Settings>(res => res.data)
}