import { db } from "./../database"
import { Elysia } from "elysia"

export const clanRouter = new Elysia({
  prefix: "/clans",
}).get("/", async () => {
  const clans = await db
    .selectFrom("clan")
    .select(["clan.name", "clan.tag"])
    .execute()

  return clans
})
