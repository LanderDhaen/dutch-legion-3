import { Elysia, t } from "elysia"
import { normalizeTag } from "../lib/util"
import { getPlayerHistory, getPlayers } from "./../services/player"

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
          message: `There's no data for ${normalizedTag}.`,
        })
      }

      return player
    },
    {
      params: t.Object({
        tag: t.String({
          pattern: "^#?[0289PYLQGRJCUVpylqgrjcuv]{3,10}$",
          message: "Tag must be a valid clan tag.",
        }),
      }),
    }
  )
