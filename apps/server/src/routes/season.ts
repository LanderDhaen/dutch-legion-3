import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres"
import { db } from "./../database"
import { Elysia, t } from "elysia"
import { normalizeTag } from "../lib/util"

export const seasonRouter = new Elysia({
  prefix: "/seasons",
})
  .get("/", async () => {
    const seasons = await db
      .selectFrom("season")
      .select(["season.date"])
      .orderBy("season.date", "desc")
      .execute()

    return seasons
  })
  .get(
    "/:date/clans/:tag",
    async ({ params: { date, tag }, status }) => {
      const normalizedTag = normalizeTag(tag)

      const season = await db
        .selectFrom("participation")
        .innerJoin("season", "season.id", "participation.seasonId")
        .innerJoin("clan", "clan.tag", "participation.clanTag")
        .innerJoin("league", "league.id", "participation.leagueId")
        .select((eb) => [
          "season.date",
          "league.name as league",
          jsonObjectFrom(
            eb
              .selectFrom("clan")
              .innerJoin("participation", "participation.clanTag", "clan.tag")
              .select(["clan.name", "clan.tag"])
              .whereRef("clan.tag", "=", "participation.clanTag")
          )
            .$notNull()
            .as("clan"),
          jsonObjectFrom(
            eb
              .selectFrom("version")
              .innerJoin("modifier", "modifier.id", "version.modifierId")
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
              .whereRef("version.modifierId", "=", "participation.modifierId")
              .whereRef("version.effectiveFrom", "<=", "season.date")
              .orderBy("version.effectiveFrom", "desc")
              .limit(1)
          )
            .$notNull()
            .as("modifier"),
          jsonArrayFrom(
            eb
              .selectFrom("statistic")
              .innerJoin("player", "player.tag", "statistic.playerTag")
              .select((eb) => [
                "player.name",
                "player.tag",
                "statistic.townhall",
                "statistic.wars",
                "statistic.stars",
                "statistic.destruction",
                eb(
                  eb.cast<number>("statistic.stars", "double precision"),
                  "/",
                  eb.cast<number>("statistic.wars", "double precision")
                ).as("average"),
                eb(
                  eb.ref("statistic.wars"),
                  "-",
                  eb.ref("statistic.attacks")
                ).as("missed"),
              ])
              .whereRef("statistic.participationId", "=", "participation.id")
              .orderBy("average", "desc")
          ).as("statistics"),
        ])
        .where("season.date", "=", date)
        .where("participation.clanTag", "=", normalizedTag)
        .executeTakeFirst()

      if (!season) {
        return status(404, {
          code: "NOT_FOUND",
          message: `There's no data for ${normalizedTag} in season ${date}.`,
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
        tag: t.String({
          pattern: "^#?[0289PYLQGRJCUVpylqgrjcuv]{3,10}$",
          error: "Tag must be a valid clan tag.",
        }),
      }),
    }
  )
