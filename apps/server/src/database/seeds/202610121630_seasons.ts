import { Kysely } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const seed = async (db: Kysely<any>) => {
  await db
    .insertInto("season")
    .values([
      { date: "2025-01-01" },
      { date: "2025-02-01" },
      { date: "2025-03-01" },
      { date: "2025-04-01" },
      { date: "2025-05-01" },
      { date: "2025-06-01" },
      { date: "2025-07-01" },
      { date: "2025-08-01" },
      { date: "2025-09-01" },
      { date: "2025-10-01" },
      { date: "2025-11-01" },
      { date: "2025-12-01" },
      { date: "2026-01-01" },
      { date: "2026-02-01" },
      { date: "2026-03-01" },
      { date: "2026-04-01" },
      { date: "2026-05-01" },
      { date: "2026-06-01" },
      { date: "2026-06-16" },
      { date: "2026-07-01" },
      { date: "2026-08-01" },
      { date: "2026-09-01" },
      { date: "2026-10-01" },
    ])
    .execute()
}
