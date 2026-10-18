import { api, getCachedOptions, setCachedOptions } from "./index"

export const getClans = async () => {
  const cacheKey = "clans"
  const cachedOptions = getCachedOptions(cacheKey)

  if (cachedOptions) {
    return cachedOptions
  }

  const { data: clans, error } = await api.clans.get()

  if (error) {
    console.error(error)
    return []
  }

  const choices = clans.map((clan) => ({
    name: clan.name,
    value: clan.tag,
  }))

  setCachedOptions(cacheKey, choices)

  return choices
}
