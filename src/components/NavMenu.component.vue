<template>
  <NSpace align="center" :size="8">
    <RouterLink :to="ROUTES.HOME">
      <NButton quaternary :type="route.path === ROUTES.HOME ? 'primary' : 'default'">
        Accueil
      </NButton>
    </RouterLink>
    <NButton v-if="isAuthenticated" type="default" @click="isAuthenticated = false">
      Déconnexion
    </NButton>
    <NButton v-else type="primary" @click="isAuthenticated = true">
      Se connecter
    </NButton>
  </NSpace>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { isAuthenticated, ROUTES } from '@/router'

const route = useRoute()
</script>
