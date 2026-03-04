import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import ShowDetailPage from './pages/ShowDetailPage.vue'
import { useAuthStore } from './store/auth'

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

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return ROUTES.HOME
  }

  return true
})

export default router
