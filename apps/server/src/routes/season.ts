import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres"
import { db } from "./../database"
import { Elysia, t } from "elysia"
import { $ } from "bun"

export const seasonRouter = new Elysia({
  prefix: "/season",
}).get(
  "/:date",
  async ({ params: { date }, status }) => {
    const season = await db
      .selectFrom("season")
      .select((eb) => [
        "season.date",
        jsonArrayFrom(
          eb
            .selectFrom("participation")
            .innerJoin("league", "participation.leagueId", "league.id")
            .innerJoin("clan", "participation.clanTag", "clan.tag")
            .select((eb) => [
              "clan.name as name",
              "clan.tag as tag",
              "league.name as league",
              jsonObjectFrom(
                eb
                  .selectFrom("modifier")
                  .innerJoin("version", "version.modifierId", "modifier.id")
                  .select([
                    "modifier.name",
                    "version.additionalDefendingBuildingDPS",
                    "version.additionalDefendingBuildingHealth",
                    "version.additionalDefendingHeroesDPS",
                    "version.additionalDefendingHeroesHealth",
                    "version.additionalDefendingGuardiansDPS",
                    "version.additionalDefendingGuardiansHealth",
                    "version.reducedAttackingHeroesDPS",
                    "version.reducedAttackingHeroesHealth",
                    "version.reducedCommonEquipmentLevel",
                    "version.reducedEpicEquipmentLevel",
                  ])
                  .whereRef("modifier.id", "=", "participation.modifierId")
                  .whereRef("version.effectiveFrom", "<=", "season.date")
                  .orderBy("version.effectiveFrom", "desc")
                  .limit(1)
              )
                .$notNull()
                .as("modifier"),
              jsonArrayFrom(
                eb
                  .selectFrom("statistic")
                  .innerJoin("player", "statistic.playerTag", "player.tag")
                  .select((eb) => [
                    "player.name",
                    "player.tag",
                    "statistic.townhall",
                    "statistic.wars",
                    "statistic.stars",
                    "statistic.destruction",
                    eb(
                      eb.cast<number>("statistic.stars", "numeric"),
                      "/",
                      eb.cast<number>("statistic.wars", "numeric")
                    ).as("average"),
                    eb(
                      eb.ref("statistic.wars"),
                      "-",
                      eb.ref("statistic.attacks")
                    ).as("missed"),
                  ])
                  .whereRef(
                    "statistic.participationId",
                    "=",
                    "participation.id"
                  )
                  .orderBy("average", "desc")
              ).as("statistics"),
            ])
            .whereRef("participation.seasonId", "=", "season.id")
        ).as("clans"),
      ])
      .where("season.date", "=", date)
      .executeTakeFirst()

    if (!season) {
      return status(404, {
        code: "NOT_FOUND",
        message: `There's not season with date ${date}.`,
      })
    }

    return season
  },
  {
    params: t.Object({
      date: t.String({
        format: "date",
        pattern: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$",
        error: "Date must be in the YYYY-MM-DD format.",
      }),
    }),
  }
)
