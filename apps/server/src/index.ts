import { Elysia } from "elysia"
import { seasonRouter } from "./routes/season"
import { clanRouter } from "./routes/clan"

const app = new Elysia().use(clanRouter).use(seasonRouter).listen(8000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

export type App = typeof app
