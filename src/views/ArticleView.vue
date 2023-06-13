<template>
  <div class="article-view">
    <div v-if="post.content.rendered" v-html="post.content.rendered"></div>
    <div v-else>暂未添加内容</div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getPost } from "@/api/post";
import { ref } from "vue";
import { type Post } from "env";

const post = ref<Post>({
  id: 0,
  title: { rendered: "" },
  post_thumbnail: "",
  content: { rendered: "" },
  excerpt: {
    rendered: "",
  },
  date: "",
});
const useTitle = inject<(value: string) => void>('useTitle', () => {})
onMounted(async () => {
  const route = useRoute();
  const id = Number(route.params.id);
  post.value = await getPost(id, String(route.query.post_type || 'posts'));
  useTitle(post.value.title.rendered)
});
</script>

<style scoped>
.article-view {
  padding: var(--van-padding-sm);
  box-sizing: border-box;
  background-color: var(--van-background-2);
  margin: var(--van-padding-sm);
}
</style>
