import { Elysia } from "elysia"
import { getMemberHistory } from "./../services/member"
import z from "zod"
import { DISCORD_ID_REGEX } from "../lib/util"

export const memberRouter = new Elysia({
  prefix: "/members",
}).get(
  "/:id/statistics",
  async ({ params: { id }, status }) => {
    const member = await getMemberHistory(id)

    if (!member) {
      return status(404, {
        code: "NOT_FOUND",
        message: `${id} has no statistics available.`,
      })
    }

    return member
  },
  {
    params: z.object({
      id: z.string().regex(DISCORD_ID_REGEX, {
        error: "This is not a valid member ID.",
      }),
    }),
  }
)
