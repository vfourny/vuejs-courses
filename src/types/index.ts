export interface Show {
  id: number
  name: string
  genres: string[]
  summary: string | null
  image: { medium: string } | null
  rating: { average: number | null }
  seen: boolean
}

export interface User {
  id: number
  email: string
  username: string
}
