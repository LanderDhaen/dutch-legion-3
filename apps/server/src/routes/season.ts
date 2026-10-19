import {
  jsonArrayFrom,
  jsonBuildObject,
  jsonObjectFrom,
} from "kysely/helpers/postgres"
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
                  eb.fn<number | null>("nullif", [
                    eb.ref("statistic.wars"),
                    eb.val(0),
                  ])
                ).as("average"),
                eb("statistic.wars", "-", eb.ref("statistic.attacks")).as(
                  "missed"
                ),
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
          pattern: "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$",
          message: "Date must be in the YYYY-MM-DD format.",
        }),
        tag: t.String({
          pattern: "^#?[0289PYLQGRJCUVpylqgrjcuv]{3,10}$",
          message: "Tag must be a valid clan tag.",
        }),
      }),
    }
  )
