import { formatSeasonDate } from "../lib/util"
import { api, getCachedOptions, setCachedOptions } from "./index"

export const getSeasonOptions = async () => {
  const cacheKey = "seasons"
  const cachedOptions = getCachedOptions(cacheKey)

  if (cachedOptions) {
    return cachedOptions
  }

  const { data: seasons, error } = await api.seasons.get()

  if (error) {
    console.error(error)
    return []
  }

  const choices = seasons.map((season) => ({
    name: formatSeasonDate(season.date),
    value: season.date,
  }))

  setCachedOptions(cacheKey, choices)

  return choices
}

export const getSeason = async (date: string, clanTag: string) => {
  return api.seasons({ date }).clans({ tag: clanTag }).get()
}
