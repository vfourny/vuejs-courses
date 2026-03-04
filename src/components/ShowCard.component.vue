<template>
  <NCard :title="show.name">
    <template #header-extra>
      <NTag :type="show.seen ? 'success' : 'default'">
        {{ show.seen ? '✓ Vu' : 'À voir' }}
      </NTag>
    </template>
    <img
      v-if="show.image"
      :src="show.image.medium"
      :alt="show.name"
      style="width: 100%; border-radius: 4px; margin-bottom: 8px;"
    />
    <p>{{ show.genres.join(', ') || 'Non classé' }}</p>
    <p v-if="show.rating.average">⭐ {{ show.rating.average }}/10</p>
    <template #footer>
      <NSpace>
        <NButton type="primary" @click="emit('toggle-seen', show)">Basculer</NButton>
        <RouterLink :to="`/show/${show.id}`">
          <NButton>Détail</NButton>
        </RouterLink>
      </NSpace>
    </template>
  </NCard>
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
