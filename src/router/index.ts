import { createRouter, createWebHistory } from 'vue-router'
import LoginLayout from '@/views/layouts/LoginLayout.vue'
import TabView from '@/views/layouts/TabView.vue'
import HomeView from '@/views/HomeView.vue'
import MineView from '@/views/MineView.vue'
import LoginView from '@/views/LoginView.vue'
import RenmaiView from '@/views/RenmaiView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ForgotView from '@/views/ForgotView.vue'
import ReceiveMoneyMethod from '@/views/ReceiveMoneyMethod.vue'
import ArticleView from '@/views/ArticleView.vue'
import CategoryView from '@/views/CategoryView.vue'
import { useAuthStore } from '@/stores/auth'
import TitleBarLayout from '@/views/layouts/TitleBarLayout.vue'
import MineRenmai from '@/views/renmai/MineRenmai.vue'
import RenmaiPeople from '@/views/renmai/RenmaiPeople.vue'
import UpgradeView from '@/views/UpgradeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'auth',
      component: LoginLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: LoginView
        },
        {
          path: '/register',
          name: 'register',
          component: RegisterView
        },
        {
          path: '/forgot',
          name: 'forgot',
          component: ForgotView
        }
      ]
    },
    {
      path: '/',
      name: 'tabs',
      component: TabView,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'home',
          component: HomeView
        },
        {
          path: '/renmai',
          name: 'renmai',
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: RenmaiView
        },
        {
          path: '/mine',
          name: 'mine',
          component: MineView
        }
      ]
    },
    {
      path: '/categories',
      name: 'category.base',
      component: TitleBarLayout,
      children: [
        {
          path: ':id',
          name: 'category',
          meta: {
            title: '分类列表'
          },
          component: CategoryView
        }
      ]
    },
    {
      path: '/',
      name: 'titlebar',
      component: TitleBarLayout,
      children: [
        {
          path: '/articles/:id',
          name: 'post',
          meta: {
            title: '文章详情'
          },
          component: ArticleView
        },
        {
          path: '/mine/qrcode',
          name: 'invite-card',
          meta: {
            title: '我的邀请码'
          },
          component: () => import('@/views/InviteCard.vue')
        },
        {
          path: '/mine/receive-money-method',
          name: 'receive-money-method',
          meta: {
            title: '收款方式'
          },
          component: ReceiveMoneyMethod
        },
        {
          path: '/mine/renmai',
          name: 'mine.renmai',
          meta: {
            title: '我的人脉'
          },
          component: MineRenmai
        },
        {
          path: '/mine/renmai/:level/people',
          name: 'mine.renmai.people',
          meta: {
            title: '人脉列表'
          },
          component: RenmaiPeople
        },
        {
          path: '/upgrade',
          name: 'upgrade',
          meta: {
            title: '升级'
          },
          component: UpgradeView
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const user = await authStore.getUser()

  if (['login', 'register', 'forgot'].indexOf(String(to.name || '')) < 0) {
    if (user === undefined) {
      return next({ name: 'login' })
    }
  } else {
    if (user !== undefined) {
      return next({ name: 'home' })
    }
  }
  next()
})

export default router
