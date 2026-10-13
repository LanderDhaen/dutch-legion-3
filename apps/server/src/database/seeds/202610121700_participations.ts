import { Kysely } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const seed = async (db: Kysely<any>) => {
  await db
    .insertInto("participation")
    .values([
      {
        modifierId: 4,
        leagueId: 48000022,
        clanTag: "#28UYR0CVU",
        seasonId: 1,
      },
    ])
    .execute()
}
