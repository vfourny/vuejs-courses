<template>
  <NCard :title="show.title">
    <template #header-extra>
      <NTag :type="show.seen ? 'success' : 'default'">
        {{ show.seen ? '✓ Vu' : 'À voir' }}
      </NTag>
    </template>
    <p>{{ show.genre }} — {{ show.year }}</p>
    <template #footer>
      <NButton type="primary" @click="emit('toggle-seen', show)">Basculer</NButton>
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
