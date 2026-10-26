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

    return {
      data: parsedPlayer,
      error: null,
    }
  } catch (error) {
    console.error(error)

    return {
      data: null,
      error:
        error instanceof Error
          ? error
          : new Error(
              "An unknown error occured while fetching the Clash of Clans player."
            ),
    }
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
