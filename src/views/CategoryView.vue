<template>
    <div class="category-view">
        <van-collapse v-model:model-value="collapsed">
            <van-collapse-item v-for="(category, index) in categories" :title="category.name" :name="category.slug">
                <van-list
                    v-model:loading="category.loading"
                    :finished="category.posts && category.posts.length > 0"
                    @load="loadPost(index)" >
                    <van-cell v-for="item in category.posts" :key="item.id" :title="item.title.rendered" :to="{ name: 'post', params: { id: item.id } }" is-link />
                </van-list>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>

<script setup lang="ts">
import { getCategories, type Category } from '@/api/category'
import { getPosts } from '@/api/post'
import type { Post } from 'env'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

interface CategoryRender extends Category {
    loading?: boolean
    posts?: Post[]
}

const route = useRoute()
const collapsed = ref([])
const categories = ref<CategoryRender[]>([])
onMounted(async () => {
    categories.value = await getCategories({ parent: String(route.params.id) })
})
async function loadPost(index: number) {
    const category = categories.value[index]
    category.loading = true
    category.posts = await getPosts({ post_type: 'posts', categories: [ category.id ] })
    category.loading = false
}
</script>