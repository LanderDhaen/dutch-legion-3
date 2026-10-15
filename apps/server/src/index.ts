import { Elysia } from "elysia"
import { seasonRouter } from "./routes/season"
import { clanRouter } from "./routes/clan"
import { logixlysia } from "logixlysia"

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
  .use(seasonRouter)
  .listen(8000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

export type App = typeof app
