import request from "@/utils/request";
import type { Post } from "env";

export interface PostQuery {
    'task-categories'?: number
    post_type?: string
    categories?: (string | number)[]
    limit?: number
}

export async function getPosts(params: PostQuery = { post_type: 'posts' }): Promise<Post[]> {
    const url = `/wp/v2/${params.post_type}`
    delete params.post_type
    return request.get(url, {
        params
    }).then(res => res.data)
}

export async function getPost(id: number, post_type: string = 'posts'): Promise<Post> {
    return request.get(`/wp/v2/${post_type}/${id}`).then(res => res.data)
}