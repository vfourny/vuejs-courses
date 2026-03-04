<template>
  <div>
    <ShowList :shows="shows" @toggle-seen="toggleSeen">
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

const search = ref<string>('')
const shows = ref<Show[]>([
  { id: 1, title: 'Inception', genre: 'Sci-Fi', year: 2010, seen: true },
  { id: 2, title: 'The Dark Knight', genre: 'Action', year: 2008, seen: false },
  { id: 3, title: 'Interstellar', genre: 'Sci-Fi', year: 2014, seen: false },
  { id: 4, title: 'Parasite', genre: 'Thriller', year: 2019, seen: true },
  { id: 5, title: 'Dune', genre: 'Sci-Fi', year: 2021, seen: false },
  { id: 6, title: 'Everything Everywhere All at Once', genre: 'Action', year: 2022, seen: true },
])

const seenShows = computed(() => shows.value.filter((m) => m.seen))

watch(search, (newVal) => {
  console.log('Recherche :', newVal)
})

onMounted(() => {
  console.log('Application prête')
})

const toggleSeen = (show: Show) => {
  show.seen = !show.seen
}
</script>
