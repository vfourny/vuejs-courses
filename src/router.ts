import { ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import ShowDetailPage from './pages/ShowDetailPage.vue'

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean
  }
}

export const ROUTES = {
  HOME: '/',
  SHOW_DETAIL: '/show/:id',
} as const

const routes = [
  { path: ROUTES.HOME, component: HomePage },
  {
    path: ROUTES.SHOW_DETAIL,
    component: ShowDetailPage,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export const isAuthenticated = ref(false)

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return ROUTES.HOME
  }
  return true
})

export default router
