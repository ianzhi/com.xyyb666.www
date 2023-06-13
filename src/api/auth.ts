import { convertToChinaNum } from "@/utils/number"
import request from "@/utils/request"

export interface PayData {
    realname: string
    bank_card: string
    usdt: string
    wechat_id: string
    pay_method: string
}

export interface UpgradeLog {
    id: number
    user_id: number
    avatar: string
    user_nicename: string
    create_time: string
    qianmai_level: string
}

export function getLevelText(level: number | string) {
    level = Number(level)
    if (level === 0) {
        return '普通用户'
    }
    return `${convertToChinaNum(level)}级用户`
}

export async function login(username: string, password: string) {
    return request.post('/jwt-auth/v1/token', {
        username, password
    })
}

export async function getProfile() {
    return request.get('/wp/v2/users/me').then(res => res.data)
}

export async function register(
    username: string, 
    password: string, 
    password_confirmation: string, 
    code: string,
    captcha: string
) {
    return request.post('/qianmai/v1/register', { username, password, password_confirmation, code, captcha })
}

export async function getRenmaiCount() {
    return request.get('/qianmai/v1/profile/renmai').then(res => res.data)
}

export async function getRenmaiList(level: number) {
    return request.get(`/qianmai/v1/profile/renmai/${level}`).then(res => res.data)
}

export async function setProfilePay(data: PayData) {
    return request.post(`/qianmai/v1/profile/pay`, data)
}

export async function getProfilePayInfo(): Promise<PayData> {
    return request.get('/qianmai/v1/profile/pay').then(res => res.data)
}

export async function upgrade() {
    return request.post('/qianmai/v1/profile/upgrade').then(res => res.data)
}

export async function approval(id: number) {
    return request.post(`/qianmai/v1/profile/upgrade/${id}/approval`).then(res => res.data)
}

export async function getCurrentUpgrade() {
    return request.get('/qianmai/v1/profile/upgrade/current').then(res => res.data)
}

export interface UpgradeLogQuery {
    keywords: string
}
export async function getUpgradeLogs(params: UpgradeLogQuery) {
    return request.get('/qianmai/v1/profile/upgrade/logs', { params }).then<UpgradeLog[]>(res => res.data)
}

export async function sendSMS(phone: string) {
    return request.post('/qianmai/v1/sms', { phone }).then(res => res.data)
}

export async function reset(
    username: string, 
    password: string, 
    password_confirmation: string, 
    captcha: string
) {
    return request.post('/qianmai/v1/reset', { username, password, password_confirmation, captcha })
}