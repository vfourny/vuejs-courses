<template>
  <div>
    <p v-if="socketError">Erreur socket : {{ socketError }}</p>

    <NCard v-if="notifications.length" title="Activité récente">
      <NSpace vertical>
        <p v-for="(notif, i) in notifications" :key="i">
          <strong>{{ notif.username }}</strong> vient de marquer
          <em>{{ notif.title }}</em> comme vu
        </p>
      </NSpace>
    </NCard>

    <p v-if="isLoading">Chargement...</p>
    <p v-else-if="error">{{ error }}</p>
    <ShowList v-else :shows="shows" @toggle-seen="handleToggleSeen">
      <NSpace justify="space-between" align="center">
        <NInput v-model:value="search" placeholder="Rechercher une série..." />
        <NTag type="success">{{ seenShows.length }} vu(s) sur {{ shows.length }}</NTag>
      </NSpace>
    </ShowList>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useShows } from '@/composables/useShows'
import { useNotificationsStore } from '@/store/notifications'
import { useAuthStore } from '@/store/auth'
import ShowList from '../components/ShowList.component.vue'
import type { Show } from '@/types'

const search = ref<string>('')
const { shows, seenShows, isLoading, error, toggleSeen } = useShows()

const notificationsStore = useNotificationsStore()
const authStore = useAuthStore()
const { notifications, error: socketError } = storeToRefs(notificationsStore)

watch(search, (newVal) => {
  console.log('Recherche :', newVal)
})

onMounted(() => {
  if (authStore.token) {
    notificationsStore.connect(authStore.token)
  }
})

onUnmounted(() => {
  notificationsStore.disconnect()
})

const handleToggleSeen = (show: Show) => {
  toggleSeen(show)
  notificationsStore.notifyToggleSeen(show.id, show.name)
}
</script>
