import { Database } from "@server/types/database"
import { Pool, types } from "pg"
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely"

types.setTypeParser(types.builtins.DATE, (val) => val)

export const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
})

export const db = new Kysely<Database>({
  dialect,
  plugins: [new CamelCasePlugin()],
})
