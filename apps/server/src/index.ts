import { Elysia } from "elysia"
import { seasonRouter } from "./routes/season"

const app = new Elysia().use(seasonRouter).listen(8000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

export type App = typeof app
