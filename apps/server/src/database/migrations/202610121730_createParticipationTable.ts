import { Kysely } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable("participation")
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

    // FK

    .addColumn("modifierId", "integer", (c) =>
      c.defaultTo(null).references("modifier.id").onDelete("restrict")
    )
    .addColumn("leagueId", "integer", (c) =>
      c.notNull().references("league.id").onDelete("restrict")
    )
    .addColumn("clanTag", "text", (c) =>
      c.notNull().references("clan.tag").onDelete("restrict")
    )

    .addColumn("seasonId", "integer", (c) =>
      c.notNull().references("season.id").onDelete("restrict")
    )

    // Constraints

    .addUniqueConstraint("season_clan_unique", ["seasonId", "clanTag"])

    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable("participation").execute()
}
