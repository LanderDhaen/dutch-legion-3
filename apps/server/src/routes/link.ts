import z from "zod"
import { Elysia } from "elysia"
import { createLink } from "../services/link"
import { getClashOfClansPlayer } from "../integrations/clash-of-clans"
import { DISCORD_ID_REGEX, TAG_REGEX } from "../lib/util"
import { getDiscordUser } from "../integrations/discord"

const API_KEY = process.env.API_KEY

export const linkRouter = new Elysia({
  prefix: "/links",
})
  .guard({
    headers: z.object({
      authorization: z.string(
        "You must provide an API key to use this service."
      ),
    }),
  })
  .onBeforeHandle(async ({ headers, status }) => {
    if (headers.authorization !== API_KEY) {
      return status(401, {
        error: "UNAUTHORIZED",
        message: "You must provide a valid API key to use this service.",
      })
    }
  })
  .post(
    "/",
    async ({ body, status }) => {
      const player = await getClashOfClansPlayer(body.playerTag)

      if (!player) {
        return status(502, {
          code: "BAD_GATEWAY",
          message: `The Clash of Clans API has encountered an unexpected error.`,
        })
      }

      const user = await getDiscordUser(body.memberId)

      if (!user) {
        return status(502, {
          code: "BAD_GATEWAY",
          message: `The Discord API has encountered an unexpected error.`,
        })
      }

      const link = await createLink({
        isPrimary: body.isPrimary,
        member: user,
        player: player,
      })

      if (!link) {
        return status(409, {
          code: "CONFLICT",
          message: `${player.name} (${player.tag}) is already linked.`,
        })
      }

      return link
    },
    {
      body: z.object({
        isPrimary: z.stringbool(),
        memberId: z.string().regex(DISCORD_ID_REGEX, {
          error: "This is not a valid member ID.",
        }),
        playerTag: z.string().regex(TAG_REGEX, {
          message: "This is not a valid player tag.",
        }),
      }),
    }
  )
