import { Kysely } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const seed = async (db: Kysely<any>) => {
  await db
    .insertInto("clan")
    .values([
      { tag: "#28UYR0CVU", name: "Dutch Legion 3" },
      { tag: "#29RPVGYU8", name: "Dutch Legion CW" },
      { tag: "#2RV80YRPY", name: "DL Gold" },
      { tag: "#2LQLGRPY9", name: "Avengers" },
      { tag: "#29U8VJP0V", name: "absolute begin2" },
      { tag: "#2JJ22CPUV", name: "DL Azure" },
      { tag: "#2RPQRYRUY", name: "DL Silver" },
      { tag: "#2J0C28R2J", name: "Dutch Legion 4" },
      { tag: "#2JY9C0L0P", name: "DL Mini" },
      { tag: "#2RCQPJGQY", name: "DL Ruby" },
      { tag: "#2J89P09CU", name: "DL Emerald" },
      { tag: "#2R0GUP2Q8", name: "DL eSports" },
      { tag: "#2CYCCVQLL", name: "DL eSports X" },
    ])
    .execute()
}
