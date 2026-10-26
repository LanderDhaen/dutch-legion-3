import axios from "axios"
import z from "zod"

const api = axios.create({
  baseURL: "https://discord.com/api/v10",
  headers: {
    Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
  },
})

export const getDiscordUser = async (memberId: string) => {
  try {
    const { data: rawUser } = await api.get(`/users/${memberId}`)

    const parsedUser = userSchema.parse(rawUser)

    return {
      data: parsedUser,
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
              "An unknown error occured while fetching the Discord user."
            ),
    }
  }
}

const userSchema = z
  .object({
    id: z.string(),
    username: z.string(),
    global_name: z.string().nullable(),
  })
  .transform((data) => ({
    id: data.id,
    username: data.username,
    globalName: data.global_name,
  }))
