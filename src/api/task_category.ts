import request from "@/utils/request"

export async function getCategories() {
    return request.get('/wp/v2/task-categories')
        .then(res => res.data)
}