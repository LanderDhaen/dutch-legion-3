import { treaty } from "@elysia/eden"
import type { App } from "@server"

export const TTL = 30 * 1000

export const api = treaty<App>("localhost:8000", {
  parseDate: false,
})

const optionsCache = new Map<
  string,
  {
    data: {
      name: string
      value: string
    }[]
    ttl: number
  }
>()

export const getCachedOptions = (key: string) => {
  const cached = optionsCache.get(key)

  if (cached && cached.ttl > Date.now()) {
    return cached.data
  }

  return null
}

export const setCachedOptions = (
  key: string,
  data: { name: string; value: string }[]
) => {
  optionsCache.set(key, {
    data,
    ttl: Date.now() + TTL,
  })
}
