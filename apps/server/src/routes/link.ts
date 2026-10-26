import z from "zod"
import { Elysia } from "elysia"
import { createLink } from "../services/link"
import { getClashOfClansPlayer } from "../integrations/clash-of-clans"
import { DISCORD_ID_REGEX, TAG_REGEX } from "../lib/util"
import { getDiscordUser } from "../integrations/discord"
import { isAxiosError } from "axios"

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
      const { data: player, error: playerError } = await getClashOfClansPlayer(
        body.playerTag
      )

      if (playerError) {
        if (playerError instanceof z.ZodError) {
          return status(502, {
            code: "BAD_GATEWAY",
            message: `The Clash of Clans API has returned an invalid response.`,
          })
        }

        if (isAxiosError(playerError) && playerError.response) {
          switch (playerError.response.status) {
            case 400:
              return status(400, {
                code: "BAD_REQUEST",
                message: `The Clash of Clans API has received a malformed request.`,
              })

            case 404:
              return status(404, {
                code: "NOT_FOUND",
                message: `The Clash of Clans API hasn't found a player with tag ${body.playerTag}.`,
              })

            case 429:
              return status(503, {
                code: "SERVICE_UNAVAILABLE",
                message: "The Clash of Clans API has rate limited the request.",
              })
            default:
              return status(502, {
                code: "BAD_GATEWAY",
                message:
                  "The Clash of Clans API has encountered an unexpected error.",
              })
          }
        }

        return status(500, {
          code: "INTERNAL_SERVER_ERROR",
          message:
            "The DL ClashManager API has encountered an unexpected error.",
        })
      }

      const { data: user, error: userError } =
        await getDiscordUser("body.memberId")

      if (userError) {
        if (userError instanceof z.ZodError) {
          return status(502, {
            code: "BAD_GATEWAY",
            message: `The Discord API has returned an invalid response.`,
          })
        }

        if (isAxiosError(userError) && userError.response) {
          switch (userError.response.status) {
            case 400:
              return status(400, {
                code: "BAD_REQUEST",
                message: `The Discord API has received a malformed request.`,
              })

            case 404:
              return status(404, {
                code: "NOT_FOUND",
                message: `The Discord API hasn't found a user with ID ${body.memberId}.`,
              })

            case 429:
              return status(503, {
                code: "SERVICE_UNAVAILABLE",
                message: "The Discord API has rate limited the request.",
              })

            default:
              return status(502, {
                code: "BAD_GATEWAY",
                message: "The Discord API has encountered an unexpected error.",
              })
          }
        }

        return status(500, {
          code: "INTERNAL_SERVER_ERROR",
          message:
            "The DL ClashManager API has encountered an unexpected error.",
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
