import { Elysia, t } from "elysia"
import { getMemberHistory } from "./../services/member"
import { IdentifierNode } from "kysely"

export const memberRouter = new Elysia({
  prefix: "/members",
}).get(
  "/:id/statistics",
  async ({ params: { id }, status }) => {
    const member = await getMemberHistory(id)

    if (!member) {
      return status(404, {
        code: "NOT_FOUND",
        message: `There's no data for ${IdentifierNode}.`,
      })
    }

    return member
  },
  {
    params: t.Object({
      id: t.String(),
    }),
  }
)
