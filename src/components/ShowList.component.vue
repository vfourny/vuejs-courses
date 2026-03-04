<template>
  <div>
    <slot></slot>
    <p v-if="shows.length === 0">Aucune série pour l'instant.</p>
    <ul>
      <ShowCard
        v-for="show in shows"
        :key="show.id"
        :show="show"
        @toggle-seen="emit('toggle-seen', $event)"
      />
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Show } from '@/types'
import ShowCard from './ShowCard.component.vue'

interface ShowListProps {
  shows: Show[]
}

defineProps<ShowListProps>()

const emit = defineEmits<{
  'toggle-seen': [show: Show]
}>()
</script>
