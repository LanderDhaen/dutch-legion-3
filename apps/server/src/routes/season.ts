import { Elysia } from "elysia"
import { TAG_REGEX, normalizeTag } from "../lib/util"
import { getSeasonPerformance, getSeasons } from "./../services/season"
import z from "zod"

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
      params: z.object({
        date: z.iso.date("This is not a valid season date."),
        tag: z.string().regex(TAG_REGEX, {
          message: "This is not a valid clan tag.",
        }),
      }),
    }
  )
