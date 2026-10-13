import { Kysely } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const seed = async (db: Kysely<any>) => {
  await db
    .insertInto("season")
    .values([
      {
        date: "2026-10-01",
      },
    ])
    .execute()
}
