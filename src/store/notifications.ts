import { defineStore } from 'pinia'
import { io, type Socket } from 'socket.io-client'
import { computed, ref } from 'vue'

interface WatchlistNotification {
  username: string
  title: string
  movieId: number
  at: string
}

export const useNotificationsStore = defineStore('notifications', () => {
  const socket = ref<Socket | null>(null)
  const socketId = ref<string | null>(null)
  const notifications = ref<WatchlistNotification[]>([])
  const error = ref<string | null>(null)

  const isConnected = computed(() => !!socketId.value)

  const connect = (token: string): void => {
    if (socket.value?.connected) return

    const s = io(import.meta.env.VITE_SOCKET_URL, {
      auth: { token },
    })
    socket.value = s

    s.on('connect', () => {
      socketId.value = s.id ?? null
      error.value = null
    })

    s.on('disconnect', () => {
      socketId.value = null
    })

    s.on('connect_error', (err: Error) => {
      error.value = err.message
    })

    s.on('watchlistUpdated', (data: WatchlistNotification) => {
      notifications.value.unshift(data)
    })

    s.on('error', (data: { message: string }) => {
      error.value = data.message
    })
  }

  const disconnect = (): void => {
    socket.value?.disconnect()
    socket.value = null
    socketId.value = null
    error.value = null
  }

  const notifyToggleSeen = (movieId: number, title: string): void => {
    socket.value?.emit('toggleSeen', { movieId, title })
  }

  return {
    socketId,
    notifications,
    error,
    isConnected,
    connect,
    disconnect,
    notifyToggleSeen,
  }
})
