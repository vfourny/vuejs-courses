<template>
  <div>
    <p v-if="!show">Film introuvable.</p>
    <NCard v-else :title="show.title">
      <p>{{ show.genre }} — {{ show.year }}</p>
      <NTag :type="show.seen ? 'success' : 'default'">
        {{ show.seen ? '✓ Vu' : 'À voir' }}
      </NTag>
    </NCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Show } from '@/types'

const route = useRoute()

const shows: Show[] = [
  { id: 1, title: 'Inception', genre: 'Sci-Fi', year: 2010, seen: true },
  { id: 2, title: 'The Dark Knight', genre: 'Action', year: 2008, seen: false },
  { id: 3, title: 'Interstellar', genre: 'Sci-Fi', year: 2014, seen: false },
]

const show = computed(() =>
  shows.find((m) => m.id === Number(route.params.id))
)
</script>
