import { api, getCachedOptions, setCachedOptions } from "./index"

export const getPlayers = async () => {
  const cacheKey = "players"
  const cachedOptions = getCachedOptions(cacheKey)

  if (cachedOptions) {
    return cachedOptions
  }

  const { data: players, error } = await api.players.get()

  if (error) {
    console.error(error)
    return []
  }

  const choices = players.map((player) => ({
    name: `${player.name}    •    ${player.tag}`,
    value: player.tag,
  }))

  setCachedOptions(cacheKey, choices)

  return choices
}

export const getPlayerHistory = async (tag: string) => {
  return await api.players({ tag }).history.get()
}
