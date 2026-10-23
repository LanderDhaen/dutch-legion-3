import { Kysely } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable("link")
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
    .addColumn("isPrimary", "boolean", (c) => c.notNull().defaultTo(false))

    // FK

    .addColumn("memberId", "text", (c) =>
      c.notNull().references("member.id").onDelete("restrict")
    )
    .addColumn("playerTag", "text", (c) =>
      c.notNull().references("player.tag").onDelete("restrict")
    )

    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable("link").execute()
}
