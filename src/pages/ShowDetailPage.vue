<template>
  <div>
    <p v-if="isLoading">Chargement...</p>
    <p v-else-if="error">{{ error }}</p>
    <NCard v-else-if="show" :title="show.name">
      <img
        v-if="show.image"
        :src="show.image.medium"
        :alt="show.name"
        style="width: 200px; border-radius: 4px; margin-bottom: 12px;"
      />
      <p>{{ show.genres.join(', ') || 'Non classé' }}</p>
      <p v-if="show.rating.average">⭐ {{ show.rating.average }}/10</p>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="show.summary"></div>
    </NCard>
    <p v-else>Film introuvable.</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { Show } from '@/types'

const route = useRoute()

const show = ref<Show | null>(null)
const isLoading = ref<boolean>(false)
const error = ref<string | null>(null)

onMounted(async () => {
  isLoading.value = true
  try {
    const res = await fetch(`https://api.tvmaze.com/shows/${route.params.id}`)
    if (!res.ok) throw new Error(`Erreur ${res.status}`)
    const data: Omit<Show, 'seen'> = await res.json()
    show.value = { ...data, seen: false }
  }
  catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur inconnue'
  }
  finally {
    isLoading.value = false
  }
})
</script>
