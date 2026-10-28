import { api } from "./index"

const API_KEY = process.env.API_KEY

if (!API_KEY) {
  throw new Error("API_KEY is not defined in the environment variables.")
}

export const createLink = async (
  isPrimary: boolean,
  memberId: string,
  playerTag: string
) => {
  return await api.links.post(
    {
      isPrimary: isPrimary,
      memberId: memberId,
      playerTag: playerTag,
    },
    {
      headers: {
        authorization: API_KEY,
      },
    }
  )
}
