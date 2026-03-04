<template>
  <div>
    <p v-if="isLoading">Chargement...</p>
    <p v-else-if="error">{{ error }}</p>
    <ShowList v-else :shows="shows" @toggle-seen="toggleSeen">
      <NSpace justify="space-between" align="center">
        <NInput v-model:value="search" placeholder="Rechercher une série..." />
        <NTag type="success">{{ seenShows.length }} vu(s) sur {{ shows.length }}</NTag>
      </NSpace>
    </ShowList>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useShows } from '@/composables/useShows'
import ShowList from '../components/ShowList.component.vue'

const search = ref<string>('')
const { shows, seenShows, isLoading, error, toggleSeen } = useShows()

watch(search, (newVal) => {
  console.log('Recherche :', newVal)
})
</script>
