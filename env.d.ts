/// <reference types="vite/client" />

export interface TaskCategory {
    id: number
    name: string
    slug: string
    tasks: Task[]
}

export interface Task {
    id: number
    title: {
        rendered: string
    },
    avatar?: string
    post_thumbnail: string
    content: {
        rendered: string
    },
    excerpt: {
        rendered: string
    },
    date: string
}

export type Post = Task