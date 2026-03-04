<template>
  <NSpace align="center" :size="8">
    <RouterLink :to="ROUTES.HOME">
      <NButton quaternary :type="route.path === ROUTES.HOME ? 'primary' : 'default'">
        Accueil
      </NButton>
    </RouterLink>
    <NButton v-if="isAuthenticated" @click="authStore.logout()">
      Déconnexion ({{ user?.username }})
    </NButton>
    <NButton v-else type="primary" @click="handleLogin">
      Se connecter
    </NButton>
  </NSpace>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/store/auth'
import { ROUTES } from '@/router'

const route = useRoute()
const authStore = useAuthStore()
const { user, isAuthenticated } = storeToRefs(authStore)

const handleLogin = () => {
  authStore.login('fake-token', { id: 1, email: 'alice@example.com', username: 'Alice' })
}
</script>
