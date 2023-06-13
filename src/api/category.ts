import request from "@/utils/request"

export interface Category {
    id: number
    slug: string
    name: string
}

export interface CategoryQuery {
    parent?: string | number
}

export async function getCategories(params: CategoryQuery): Promise<Category[]> {
    return request.get('/wp/v2/categories', { params })
        .then(res => res.data)
}