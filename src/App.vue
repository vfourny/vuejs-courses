<template>
  <div>
    <input v-model="search" placeholder="Rechercher une série..." />
    <p v-if="seenShows.length === 0">Aucune série vue pour l'instant.</p>
    <ul>
      <li
        v-for="show in shows"
        :key="show.id"
        :class="{ seen: show.seen }"
      >
        {{ show.title }} ({{ show.year }}) — {{ show.genre }}
        <span v-if="show.seen">✓ Vu</span>
        <span v-else>À voir</span>
        <button @click="show.seen = !show.seen">Basculer</button>
      </li>
    </ul>
    <p>{{ seenShows.length }} série(s) vue(s) sur {{ shows.length }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, watch } from 'vue'

interface Show {
  id: number
  title: string
  genre: string
  year: number
  seen: boolean
}

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

onUpdated(() => {
  console.log('DOM mis à jour, séries vues :', seenShows.value.length)
})
</script>

<style>
.seen {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>
