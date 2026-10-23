import {
  jsonArrayFrom,
  jsonBuildObject,
  jsonObjectFrom,
} from "kysely/helpers/postgres"
import { db } from "./../database"
import {
  withCalculatedStatistics,
  withOverallCalculatedStatistics,
} from "./statistics"

export const getPlayers = async () => {
  const players = await db
    .selectFrom("player")
    .select(["player.name", "player.tag"])
    .orderBy("player.name", "asc")
    .execute()

  return players
}

export const getPlayerHistory = async (tag: string) => {
  const player = await db
    .with("calculatedStatistics", withCalculatedStatistics())
    .with("calculatedOverallStatistics", withOverallCalculatedStatistics())
    .selectFrom("player")
    .innerJoin(
      "calculatedOverallStatistics",
      "calculatedOverallStatistics.playerTag",
      "player.tag"
    )
    .select((eb) => [
      "player.name",
      "player.tag",
      "player.townhall",
      jsonBuildObject({
        participations: eb.ref("calculatedOverallStatistics.participations"),
        wars: eb.ref("calculatedOverallStatistics.wars"),
        stars: eb.ref("calculatedOverallStatistics.stars"),
        destruction: eb.ref("calculatedOverallStatistics.destruction"),
        average: eb.ref("calculatedOverallStatistics.average"),
        missed: eb.ref("calculatedOverallStatistics.missed"),
      }).as("statistics"),
      jsonArrayFrom(
        eb
          .selectFrom("calculatedStatistics")
          .innerJoin(
            "participation",
            "participation.id",
            "calculatedStatistics.participationId"
          )
          .innerJoin("season", "season.id", "participation.seasonId")
          .innerJoin("clan", "clan.tag", "participation.clanTag")
          .innerJoin("league", "league.id", "participation.leagueId")
          .select((eb) => [
            "season.date",
            jsonBuildObject({
              name: eb.ref("clan.name"),
              tag: eb.ref("clan.tag"),
            }).as("clan"),
            jsonBuildObject({
              name: eb.ref("league.name"),
              modifier: jsonObjectFrom(
                eb
                  .selectFrom("version")
                  .innerJoin("modifier", "modifier.id", "version.modifierId")
                  .select([
                    "modifier.name",
                    "version.additionalDefendingBuildingDps",
                    "version.additionalDefendingHeroesDps",
                    "version.additionalDefendingHeroesHealth",
                    "version.additionalDefendingGuardiansDps",
                    "version.additionalDefendingGuardiansHealth",
                    "version.reducedAttackingHeroesDps",
                    "version.reducedAttackingHeroesHealth",
                    "version.commonEquipmentCap",
                    "version.epicEquipmentCap",
                  ])
                  .whereRef(
                    "version.modifierId",
                    "=",
                    "participation.modifierId"
                  )
                  .whereRef("version.effectiveFrom", "<=", "season.date")
                  .orderBy("version.effectiveFrom", "desc")
                  .limit(1)
              ),
            }).as("league"),
            "calculatedStatistics.townhall",
            "calculatedStatistics.wars",
            "calculatedStatistics.stars",
            "calculatedStatistics.destruction",
            "calculatedStatistics.average",
            "calculatedStatistics.missed",
          ])
          .where("calculatedStatistics.playerTag", "=", tag)
          .orderBy("season.date", "desc")
      ).as("seasons"),
    ])
    .where("player.tag", "=", tag)
    .executeTakeFirst()

  return player
}
