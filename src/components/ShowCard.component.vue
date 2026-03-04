<template>
  <li :class="{ seen: show.seen }">
    {{ show.title }} — {{ show.genre }} ({{ show.year }})
    <button @click="emit('toggle-seen', show)">Basculer</button>
  </li>
</template>

<script setup lang="ts">
import type { Show } from '@/types'

interface ShowCardProps {
  show: Show
}

defineProps<ShowCardProps>()

const emit = defineEmits<{
  'toggle-seen': [show: Show]
}>()
</script>
