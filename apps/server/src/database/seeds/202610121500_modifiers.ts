import { Kysely } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const seed = async (db: Kysely<any>) => {
  await db
    .insertInto("modifier")
    .values([
      {
        name: "Legend III",
      },
      {
        name: "Legend II",
      },
      {
        name: "Legend I",
      },
      {
        name: "eSports",
      },
    ])
    .execute()
}
