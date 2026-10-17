import { Kysely } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const up = async (db: Kysely<any>) => {
  await db.schema
    .createTable("version")
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
    .addColumn("effectiveFrom", "date", (c) => c.notNull())
    .addColumn("additionalDefendingBuildingDPS", "smallint", (c) => c.notNull())
    .addColumn("additionalDefendingHeroesDPS", "smallint", (c) => c.notNull())
    .addColumn("additionalDefendingHeroesHealth", "smallint", (c) =>
      c.notNull()
    )
    .addColumn("additionalDefendingGuardiansDPS", "smallint", (c) =>
      c.notNull()
    )
    .addColumn("additionalDefendingGuardiansHealth", "smallint", (c) =>
      c.notNull()
    )
    .addColumn("reducedAttackingHeroesDPS", "smallint", (c) => c.notNull())
    .addColumn("reducedAttackingHeroesHealth", "smallint", (c) => c.notNull())
    .addColumn("commonEquipmentCap", "smallint", (c) => c.notNull())
    .addColumn("epicEquipmentLevel", "smallint", (c) => c.notNull())

    // FK

    .addColumn("modifierId", "integer", (c) =>
      c.notNull().references("modifier.id").onDelete("cascade")
    )

    .execute()
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const down = async (db: Kysely<any>) => {
  await db.schema.dropTable("version").execute()
}
