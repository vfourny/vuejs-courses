<template>
  <NSpace vertical :size="16">
    <slot></slot>
    <p v-if="shows.length === 0">Aucune série pour l'instant.</p>
    <NGrid :cols="3" :x-gap="16" :y-gap="16">
      <NGi v-for="show in shows" :key="show.id">
        <ShowCard :show="show" @toggle-seen="emit('toggle-seen', $event)" />
      </NGi>
    </NGrid>
  </NSpace>
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
