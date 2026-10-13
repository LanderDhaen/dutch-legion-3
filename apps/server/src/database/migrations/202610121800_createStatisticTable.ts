import { Kysely } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable("statistic")
    .addColumn("id", "integer", (c) =>
      c.generatedByDefaultAsIdentity().primaryKey()
    )
    .addColumn("createdAt", "timestamptz", (c) =>
      c.notNull().defaultTo("now()")
    )
    .addColumn("updatedAt", "timestamptz", (c) =>
      c.notNull().defaultTo("now()")
    )
    .addColumn("isActive", "boolean", (c) => c.notNull().defaultTo(true))
    .addColumn("townhall", "integer", (c) => c.notNull())
    .addColumn("wars", "integer", (c) => c.notNull())
    .addColumn("attacks", "integer", (c) => c.notNull())
    .addColumn("stars", "integer", (c) => c.notNull())
    .addColumn("destruction", "integer", (c) => c.notNull())

    // FK

    .addColumn("playerTag", "text", (c) =>
      c.notNull().references("player.tag").onDelete("restrict")
    )
    .addColumn("participationId", "integer", (c) =>
      c.notNull().references("participation.id").onDelete("restrict")
    )

    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable("statistic").execute()
}
