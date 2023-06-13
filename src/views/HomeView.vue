<template>
  <div class="home">
    <div class="page-header">
      <h2>钱脉</h2>
      <div>人脉就是钱脉</div>
    </div>

    <van-tabs v-model:active="activeCategory">
      <van-tab v-for="category in categories" :key="category.id" :title="category.name">
        <div class="apps">
          <div v-for="post in category.tasks" :key="post.id" class="app" @click="handleClickTask(post.id)">
            <van-image
              :src="post.post_thumbnail"
              width="40"
              height="40"
            />
            <div style="margin-top: var(--van-padding-base)">{{ post.title.rendered }}</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <van-image :src="kexuecesuan" width="100%" @click="handleClickPost(40)"></van-image>

    <div>
      <div class="card-title">
          <div class="left">站内用户实况</div>
        </div>
        <div class="marquee-area">
          <van-swipe :autoplay="2000" :height="60" :show-indicators="false" class="marquee-container" vertical>
            <van-swipe-item v-for="message in messages" :key="message.id">
              <div :key="message.id" class="message-item">
                <div class="left">
                  <div class="avatar">
                    <van-image :src="message.avatar" style="width: 40px; border: 1px solid var(--van-gray-4); margin-right: var(--van-padding-base)" round></van-image>
                  </div>
                  <div class="meta">
                    <div class="title">{{ message.title }}</div>
                    <div class="content">{{ message.content }}</div>
                  </div>
                </div>
                <div class="right">
                  {{ message.date }}
                </div>
              </div>
            </van-swipe-item>
          </van-swipe>
        </div>
    </div>

    <div>
      <div class="card-title">
          <div class="left">客户服务中心</div>
        </div>
      <div class="service" @click="handleClickCategory(5)">
        <van-row>
          <van-col :span="12">
            <div class="title">操作流程</div>
            <div class="desc">简单两步注册账号</div>
          </van-col>
          <van-col :span="12">
            <div class="title">功能介绍</div>
            <!-- <div class="desc">简单两步注册账号</div> -->
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPosts } from '@/api/post'
import { getCategories } from '@/api/task_category'
import router from '@/router'
import type { TaskCategory } from 'env'
import { onMounted } from 'vue'
import { ref } from 'vue'
import kexuecesuan from '@/assets/kexuecesuan.jpg'

// 拉取任务分类
const activeCategory = ref(0)
const categories = ref<TaskCategory[]>([])
onMounted(() => loadData())
async function loadData() {
  categories.value = await getCategories()
  for (let category of categories.value) {
    category.tasks = await getPosts({ 'task-categories': category.id, limit: 50, post_type: 'task' })
  }
}

// 点击任务
function handleClickTask(id: number) {
  handleClickPost(id, 'task')
}

/**
 * 点击文章
 * @param id
 */
function handleClickPost(id: number, post_type = 'posts') {
  router.push({ name: 'post', params: { id }, query: { post_type } })
}

/**
 * 点击分类
 * @param id
 */
function handleClickCategory(id: number) {
  router.push({ name: 'category', params: { id } })
}

// 消息滚框
const messages = ref<{id: number, avatar?: string, title: string, content: string, date: string}[]>([])
onMounted(async () => {
  const res = await getPosts({ post_type: 'message' })
  messages.value = res.map(item => {
    return {
      id: item.id,
      avatar: item.avatar,
      title: item.title.rendered,
      content: item.excerpt.rendered.replace(/<p>|<\/p>/gi, ''),
      date: item.date
    }
  })
})
</script>

<style scoped>
.home {
  padding: var(--van-padding-sm);
  box-sizing: border-box;
}
.home > *:not(:first-child) {
  margin-top: var(--van-padding-sm);
}
h2 {
  margin-top: 0;
  margin-bottom: var(--van-padding-base);
}
:deep(.van-tab__panel) {
  background-color: var(--van-background-2);
  padding: var(--van-padding-sm);
}
.apps {
  display: flex;
  flex-wrap: wrap;
}
.apps .app {
  width: 20%;
  font-size: var(--van-font-size-sm);
  margin-top: var(--van-padding-md);

  flex-shrink: 0;
  flex-grow: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
}
.explain {
  height: 70px;
  margin-top: var(--van-padding-sm);
  background-color: var(--van-background-2);
  display:flex;
  justify-content: center;
  align-items: center;
}

.card-title {
  margin-top: var(--van-padding-md);
  margin-bottom: var(--van-padding-base);
}
.marquee-area {
  height: 400px;
  overflow: hidden;
  background-color: var(--van-background-2);
}
.marquee-container .message-item {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--van-padding-base);
  box-sizing: border-box;

  border-bottom: 0.5px dashed var(--van-gray-4);
}
.marquee-container .message-item .left {
  display: flex;
  align-items: center;
  color: var(--van-text-color);
  font-size: var(--van-font-size-md);
}
.marquee-container .message-item .right {
  display: flex;
  align-items: center;
  color: var(--van-text-color-3);
  font-size: var(--van-font-size-sm);
}

.service :deep(.van-col) {
  background-color: var(--van-background-3);
  padding: var(--van-padding-sm);
}
.service .title {
  font-size: var(--van-font-size-md);
}
.service .desc {
  color: var(--van-text-color-2);
  font-size: var(--van-font-size-sm);
}
</style>