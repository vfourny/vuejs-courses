<template>
  <div>
    <p v-if="isLoading">Chargement...</p>
    <p v-else-if="error">{{ error }}</p>
    <ShowList v-else :shows="shows" @toggle-seen="onToggleSeen">
      <NSpace justify="space-between" align="center">
        <NInput v-model:value="search" placeholder="Rechercher une série..." />
        <NTag type="success">{{ seenShows.length }} vu(s) sur {{ shows.length }}</NTag>
      </NSpace>
    </ShowList>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { Show } from '@/types'
import ShowList from '../components/ShowList.component.vue'

const BASE_URL = 'https://api.tvmaze.com'

const search = ref<string>('')
const shows = ref<Show[]>([])
const isLoading = ref<boolean>(false)
const error = ref<string | null>(null)

const seenShows = computed(() => shows.value.filter((m) => m.seen))

const fetchShows = async () => {
  isLoading.value = true
  try {
    const res = await fetch(`${BASE_URL}/shows`)
    if (!res.ok) throw new Error(`Erreur ${res.status}`)
    const data: Omit<Show, 'seen'>[] = await res.json()
    shows.value = data.slice(0, 12).map((m) => ({ ...m, seen: false }))
  }
  catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur inconnue'
  }
  finally {
    isLoading.value = false
  }
}

watch(search, async (newVal) => {
  if (!newVal.trim()) {
    await fetchShows()
    return
  }
  isLoading.value = true
  try {
    const res = await fetch(`${BASE_URL}/search/shows?q=${encodeURIComponent(newVal)}`)
    if (!res.ok) throw new Error(`Erreur ${res.status}`)
    const results: { show: Omit<Show, 'seen'> }[] = await res.json()
    shows.value = results.map((r) => ({ ...r.show, seen: false }))
  }
  catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur inconnue'
  }
  finally {
    isLoading.value = false
  }
})

onMounted(fetchShows)

const onToggleSeen = (show: Show) => {
  show.seen = !show.seen
}
</script>
