import axios from "axios"
import z from "zod"

const api = axios.create({
  baseURL: "https://api.clashofclans.com/v1",
  headers: {
    Authorization: `Bearer ${process.env.COC_API_KEY}`,
  },
})

export const getClashOfClansPlayer = async (playerTag: string) => {
  try {
    const { data: rawPlayer } = await api.get(`/players/${playerTag}`)

    const parsedPlayer = playerSchema.parse(rawPlayer)

    return parsedPlayer
  } catch (error) {
    console.error(error)

    return null
  }
}

const playerSchema = z
  .object({
    tag: z.string(),
    name: z.string(),
    townHallLevel: z.number(),
  })
  .transform((data) => ({
    tag: data.tag,
    name: data.name,
    townhall: data.townHallLevel,
  }))
