import { Kysely } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const seed = async (db: Kysely<any>) => {
  await db
    .insertInto("season")
    .values([
      {
        startTime: "2026-10-01T10:00:00Z",
      },
    ])
    .execute()
}
