import { Kysely } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const seed = async (db: Kysely<any>) => {
  await db
    .insertInto("modifier")
    .values([
      {
        name: "None",
      },
      {
        name: "Legend League III",
      },
      {
        name: "Legend League II",
      },
      {
        name: "Legend League I",
      },
      {
        name: "eSports",
      },
    ])
    .execute()
}
