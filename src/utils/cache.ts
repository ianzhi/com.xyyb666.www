interface CacheItem<T> {
    expires_at: number
    value: T
}

export function get<T>(key: string): T | undefined {
    let original = localStorage.getItem(key)
    if (original === null) {
        return undefined
    }

    // 判断是否过期
    const cache_item: CacheItem<T> = JSON.parse(original)
    if (cache_item.expires_at !== 0 && new Date().getTime() > cache_item.expires_at) {
        rm(key)
        return undefined
    }

    return cache_item.value
}

export function rm(key: string) {
    localStorage.removeItem(key)
}

export function set(key: string, value: any, ttl: number = 0) {
    const now = new Date().getTime()
    const cache_item: CacheItem<any> = {
        value,
        expires_at: ttl === 0 ? 0 : now + ttl * 1000
    }

    localStorage.setItem(key, JSON.stringify(cache_item))
}

export default { get, set, rm }