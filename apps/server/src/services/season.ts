import {
  jsonArrayFrom,
  jsonBuildObject,
  jsonObjectFrom,
} from "kysely/helpers/postgres"
import { db } from "./../database"
import { withCalculatedStatistics } from "./statistics"

export const getSeasons = async () => {
  const seasons = await db
    .selectFrom("season")
    .select(["season.date"])
    .orderBy("season.date", "desc")
    .execute()

  return seasons
}

export const getSeasonPerformance = async (date: string, tag: string) => {
  const season = await db
    .with("calculatedStatistics", withCalculatedStatistics())
    .selectFrom("participation")
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
            .whereRef("version.modifierId", "=", "participation.modifierId")
            .whereRef("version.effectiveFrom", "<=", "season.date")
            .orderBy("version.effectiveFrom", "desc")
            .limit(1)
        ),
      }).as("league"),
      jsonArrayFrom(
        eb
          .selectFrom("calculatedStatistics")
          .innerJoin("player", "player.tag", "calculatedStatistics.playerTag")
          .select([
            "player.name",
            "player.tag",
            "calculatedStatistics.townhall",
            "calculatedStatistics.wars",
            "calculatedStatistics.stars",
            "calculatedStatistics.destruction",
            "calculatedStatistics.average",
            "calculatedStatistics.missed",
          ])
          .whereRef(
            "calculatedStatistics.participationId",
            "=",
            "participation.id"
          )
          .orderBy("average", "desc")
      ).as("statistics"),
    ])
    .where("season.date", "=", date)
    .where("participation.clanTag", "=", tag)
    .executeTakeFirst()

  return season
}
