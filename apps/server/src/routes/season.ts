import { Elysia, t } from "elysia"
import { normalizeTag } from "../lib/util"
import { getSeasonPerformance, getSeasons } from "./../services/season"

export const seasonRouter = new Elysia({
  prefix: "/seasons",
})
  .get("/", async () => {
    return await getSeasons()
  })
  .get(
    "/:date/clans/:tag",
    async ({ params: { date, tag }, status }) => {
      const normalizedTag = normalizeTag(tag)

      const season = await getSeasonPerformance(date, normalizedTag)

      if (!season) {
        return status(404, {
          code: "NOT_FOUND",
          message: `There's no data for ${normalizedTag} in season ${date}.`,
        })
      }

      return season
    },
    {
      params: t.Object({
        date: t.String({
          pattern: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$",
          message: "Date must be in the YYYY-MM-DD format.",
        }),
        tag: t.String({
          pattern: "^#?[0289PYLQGRJCUVpylqgrjcuv]{3,10}$",
          message: "Tag must be a valid clan tag.",
        }),
      }),
    }
  )
