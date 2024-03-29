import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import { store } from '@/store/store'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/book/:id',
    name: 'book',
    component: () => import('@/views/Books/Book.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/views/Books/Cart.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: () => import('@/views/Books/Favorite.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/new',
    name: 'new',
    component: () => import('@/views/Books/New.vue')
  },
  {
    path: '/popular',
    name: 'popular',
    component: () => import('@/views/Books/Popular.vue')
  },
  {
    path: '/genres',
    name: 'genres',
    component: () => import('@/views/Genres/Genres.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Auth/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Auth/Register.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from) => {
  if (to.meta.requiresAuth && !store.getters.checkAuth) {
    return {
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    }
  }
})

export default router
