import { Elysia } from "elysia"
import { normalizeTag, TAG_REGEX } from "../lib/util"
import { getPlayerHistory, getPlayers } from "./../services/player"
import z from "zod"

export const playerRouter = new Elysia({
  prefix: "/players",
})
  .get("/", async () => {
    return getPlayers()
  })
  .get(
    "/:tag/history",
    async ({ params: { tag }, status }) => {
      const normalizedTag = normalizeTag(tag)

      const player = await getPlayerHistory(normalizedTag)

      if (!player) {
        return status(404, {
          code: "NOT_FOUND",
          message: `${normalizedTag} has no statistics available.`,
        })
      }

      return player
    },
    {
      params: z.object({
        tag: z.string().regex(TAG_REGEX, {
          message: "This is not a valid player tag.",
        }),
      }),
    }
  )
