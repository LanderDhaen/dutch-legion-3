import { Kysely } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const seed = async (db: Kysely<any>) => {
  await db
    .insertInto("league")
    .values([
      {
        id: 48000000,
        name: "Unranked",
      },
      {
        id: 48000001,
        name: "Bronze III",
      },
      {
        id: 48000002,
        name: "Bronze II",
      },
      {
        id: 48000003,
        name: "Bronze I",
      },
      {
        id: 48000004,
        name: "Silver III",
      },
      {
        id: 48000005,
        name: "Silver II",
      },
      {
        id: 48000006,
        name: "Silver I",
      },
      {
        id: 48000007,
        name: "Gold III",
      },
      {
        id: 48000008,
        name: "Gold II",
      },
      {
        id: 48000009,
        name: "Gold I",
      },
      {
        id: 48000010,
        name: "Crystal III",
      },
      {
        id: 48000011,
        name: "Crystal II",
      },
      {
        id: 48000012,
        name: "Crystal I",
      },
      {
        id: 48000013,
        name: "Master III",
      },
      {
        id: 48000014,
        name: "Master II",
      },
      {
        id: 48000015,
        name: "Master I",
      },
      {
        id: 48000016,
        name: "Champion III",
      },
      {
        id: 48000017,
        name: "Champion II",
      },
      {
        id: 48000018,
        name: "Champion I",
      },
      {
        id: 48000019,
        name: "Titan III",
      },
      {
        id: 48000020,
        name: "Titan II",
      },
      {
        id: 48000021,
        name: "Titan I",
      },
      {
        id: 48000022,
        name: "Legend",
      },
    ])
    .execute()
}
