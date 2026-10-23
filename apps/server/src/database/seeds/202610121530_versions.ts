import { Kysely } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const seed = async (db: Kysely<any>) => {
  await db
    .insertInto("version")
    .values([
      {
        effectiveFrom: "2026-04-27",
        additionalDefendingBuildingDPS: 10,
        additionalDefendingHeroesDPS: 10,
        additionalDefendingHeroesHealth: 10,
        additionalDefendingGuardiansDPS: 5,
        additionalDefendingGuardiansHealth: 5,
        reducedAttackingHeroesDPS: -5,
        reducedAttackingHeroesHealth: -5,
        commonEquipmentCap: 18,
        epicEquipmentCap: 27,
        modifierId: 1,
      },
      {
        effectiveFrom: "2026-04-27",
        additionalDefendingBuildingDPS: 15,
        additionalDefendingHeroesDPS: 15,
        additionalDefendingHeroesHealth: 15,
        additionalDefendingGuardiansDPS: 10,
        additionalDefendingGuardiansHealth: 10,
        reducedAttackingHeroesDPS: -10,
        reducedAttackingHeroesHealth: -10,
        commonEquipmentCap: 18,
        epicEquipmentCap: 27,
        modifierId: 2,
      },
      {
        effectiveFrom: "2026-04-27",
        additionalDefendingBuildingDPS: 20,
        additionalDefendingHeroesDPS: 20,
        additionalDefendingHeroesHealth: 20,
        additionalDefendingGuardiansDPS: 20,
        additionalDefendingGuardiansHealth: 20,
        reducedAttackingHeroesDPS: -20,
        reducedAttackingHeroesHealth: -20,
        commonEquipmentCap: 18,
        epicEquipmentCap: 27,
        modifierId: 3,
      },
      {
        effectiveFrom: "2026-04-27",
        additionalDefendingBuildingDPS: 25,
        additionalDefendingHeroesDPS: 25,
        additionalDefendingHeroesHealth: 25,
        additionalDefendingGuardiansDPS: 20,
        additionalDefendingGuardiansHealth: 20,
        reducedAttackingHeroesDPS: -20,
        reducedAttackingHeroesHealth: -20,
        commonEquipmentCap: 15,
        epicEquipmentCap: 21,
        modifierId: 4,
      },
    ])
    .execute()
}
