import { Kysely } from "kysely"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const seed = async (db: Kysely<any>) => {
  await db
    .insertInto("version")
    .values([
      {
        effectiveFrom: "2026-04-27",
        additionalDefendingBuildingDPS: 10,
        additionalDefendingBuildingHealth: 10,
        additionalDefendingHeroesDPS: 10,
        additionalDefendingHeroesHealth: 10,
        additionalDefendingGuardiansDPS: 5,
        additionalDefendingGuardiansHealth: 5,
        reducedAttackingHeroesDPS: -5,
        reducedAttackingHeroesHealth: -5,
        reducedCommonEquipmentLevel: 0,
        reducedEpicEquipmentLevel: 0,
        modifierId: 2,
      },
      {
        effectiveFrom: "2026-04-27",
        additionalDefendingBuildingDPS: 15,
        additionalDefendingBuildingHealth: 15,
        additionalDefendingHeroesDPS: 15,
        additionalDefendingHeroesHealth: 15,
        additionalDefendingGuardiansDPS: 10,
        additionalDefendingGuardiansHealth: 10,
        reducedAttackingHeroesDPS: -10,
        reducedAttackingHeroesHealth: -10,
        reducedCommonEquipmentLevel: 0,
        reducedEpicEquipmentLevel: 0,
        modifierId: 3,
      },
      {
        effectiveFrom: "2026-04-27",
        additionalDefendingBuildingDPS: 20,
        additionalDefendingBuildingHealth: 20,
        additionalDefendingHeroesDPS: 20,
        additionalDefendingHeroesHealth: 20,
        additionalDefendingGuardiansDPS: 20,
        additionalDefendingGuardiansHealth: 20,
        reducedAttackingHeroesDPS: -20,
        reducedAttackingHeroesHealth: -20,
        reducedCommonEquipmentLevel: 0,
        reducedEpicEquipmentLevel: 0,
        modifierId: 4,
      },
      {
        effectiveFrom: "2026-04-27",
        additionalDefendingBuildingDPS: 25,
        additionalDefendingBuildingHealth: 25,
        additionalDefendingHeroesDPS: 25,
        additionalDefendingHeroesHealth: 25,
        additionalDefendingGuardiansDPS: 20,
        additionalDefendingGuardiansHealth: 20,
        reducedAttackingHeroesDPS: -20,
        reducedAttackingHeroesHealth: -20,
        reducedCommonEquipmentLevel: -3,
        reducedEpicEquipmentLevel: 6,
        modifierId: 5,
      },
    ])
    .execute()
}
