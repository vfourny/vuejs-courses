import { computed, onMounted, ref } from 'vue'
import type { Show } from '@/types'

const BASE_URL = 'https://api.tvmaze.com'

export function useShows() {
  const shows = ref<Show[]>([])
  const isLoading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const seenShows = computed(() => shows.value.filter((m) => m.seen))

  onMounted(async () => {
    isLoading.value = true
    try {
      const res = await fetch(`${BASE_URL}/shows`)
      if (!res.ok) throw new Error(`Erreur ${res.status}`)
      const data: Omit<Show, 'seen'>[] = await res.json()
      shows.value = data.slice(0, 12).map((m) => ({ ...m, seen: false }))
    }
    catch (e) {
      error.value = e instanceof Error ? e.message : 'Erreur inconnue'
    }
    finally {
      isLoading.value = false
    }
  })

  const toggleSeen = (show: Show) => {
    show.seen = !show.seen
  }

  return { shows, seenShows, isLoading, error, toggleSeen }
}
