import {
  jsonArrayFrom,
  jsonBuildObject,
  jsonObjectFrom,
} from "kysely/helpers/postgres"
import { db } from "./../database"
import { Elysia, t } from "elysia"
import { normalizeTag } from "../lib/util"

export const playerRouter = new Elysia({
  prefix: "/players",
})
  .get("/", async () => {
    const players = await db
      .selectFrom("player")
      .select(["player.name", "player.tag"])
      .orderBy("player.name", "asc")
      .execute()

    return players
  })
  .get(
    "/:tag/history",
    async ({ params: { tag }, status }) => {
      const normalizedTag = normalizeTag(tag)

      const player = await db
        .selectFrom("player")
        .select((eb) => [
          "player.name",
          "player.tag",
          eb
            .selectFrom("statistic")
            .select((eb) =>
              eb.cast<number>(eb.fn.sum("statistic.wars"), "integer").as("wars")
            )
            .whereRef("statistic.playerTag", "=", "player.tag")
            .as("wars"),
          eb
            .selectFrom("statistic")
            .select((eb) =>
              eb
                .cast<number>(eb.fn.sum("statistic.stars"), "integer")
                .as("stars")
            )
            .whereRef("statistic.playerTag", "=", "player.tag")
            .as("stars"),
          eb
            .selectFrom("statistic")
            .select((eb) =>
              eb
                .cast<number>(eb.fn.sum("statistic.destruction"), "integer")
                .as("destruction")
            )
            .whereRef("statistic.playerTag", "=", "player.tag")
            .as("destruction"),
          eb
            .selectFrom("statistic")
            .select((eb) =>
              eb(
                eb.cast<number>(
                  eb.fn.sum("statistic.stars"),
                  "double precision"
                ),
                "/",
                eb.fn<number | null>("nullif", [
                  eb.fn.sum("statistic.wars"),
                  eb.val(0),
                ])
              ).as("average")
            )
            .whereRef("statistic.playerTag", "=", "player.tag")
            .as("average"),
          jsonArrayFrom(
            eb
              .selectFrom("statistic")
              .innerJoin(
                "participation",
                "participation.id",
                "statistic.participationId"
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
                      .innerJoin(
                        "modifier",
                        "modifier.id",
                        "version.modifierId"
                      )
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
              .where("statistic.playerTag", "=", normalizedTag)
              .orderBy("season.date", "desc")
          ).as("seasons"),
        ])
        .where("player.tag", "=", normalizedTag)
        .executeTakeFirst()

      if (!player) {
        return status(404, {
          code: "NOT_FOUND",
          message: `There's no data for ${normalizedTag}.`,
        })
      }

      return player
    },
    {
      params: t.Object({
        tag: t.String({
          pattern: "^#?[0289PYLQGRJCUVpylqgrjcuv]{3,10}$",
          message: "Tag must be a valid clan tag.",
        }),
      }),
    }
  )
