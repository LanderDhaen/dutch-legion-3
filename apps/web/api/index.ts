import { treaty } from "@elysia/eden"
import type { App } from "@server"

export const api = treaty<App>("localhost:8000", {
  parseDate: false,
})
