import { Elysia } from "elysia"
import { seasonRouter } from "./routes/season"
import { clanRouter } from "./routes/clan"
import { logixlysia } from "logixlysia"
import { playerRouter } from "./routes/player"
import { memberRouter } from "./routes/member"

const app = new Elysia()
  .use(
    logixlysia({
      config: {
        service: "server",
        customLogFormat:
          "{now} {service} {method} {pathname}{query} -> {status} ({duration})",
      },
    })
  )
  .use(clanRouter)
  .use(memberRouter)
  .use(playerRouter)
  .use(seasonRouter)
  .listen(8000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

export type App = typeof app
