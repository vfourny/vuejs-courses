<template>
  <div>
    <input v-model="search" placeholder="Rechercher un film..." />
    <p>{{ seenMovies.length }} film(s) vu(s) sur {{ movies.length }}</p>
    <ul>
      <li
        v-for="movie in movies"
        :key="movie.id"
        :class="{ seen: movie.seen }"
      >
        {{ movie.title }} — {{ movie.genre }} ({{ movie.year }})
        <button @click="toggleSeen(movie)">Basculer</button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'

interface Movie {
  id: number
  title: string
  genre: string
  year: number
  seen: boolean
}

const search = ref<string>('')
const movies = ref<Movie[]>([
  { id: 1, title: 'Inception', genre: 'Sci-Fi', year: 2010, seen: true },
  { id: 2, title: 'The Dark Knight', genre: 'Action', year: 2008, seen: false },
  { id: 3, title: 'Interstellar', genre: 'Sci-Fi', year: 2014, seen: false },
  { id: 4, title: 'Parasite', genre: 'Thriller', year: 2019, seen: true },
  { id: 5, title: 'Dune', genre: 'Sci-Fi', year: 2021, seen: false },
  { id: 6, title: 'Everything Everywhere All at Once', genre: 'Action', year: 2022, seen: true },
])

const seenMovies = computed(() => movies.value.filter((m) => m.seen))

watch(search, (newVal) => {
  console.log('Recherche :', newVal)
})

onMounted(() => {
  console.log('Application prête')
})

const toggleSeen = (movie: Movie) => {
  movie.seen = !movie.seen
}
</script>

<style>
.seen {
  text-decoration: line-through;
  opacity: 0.5;
}
</style>
