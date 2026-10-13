import { jsonArrayFrom } from "kysely/helpers/postgres"
import { db } from "./../database"
import { Elysia, t } from "elysia"

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
            .leftJoin("modifier", "participation.modifierId", "modifier.id")
            .innerJoin("league", "participation.leagueId", "league.id")
            .innerJoin("clan", "participation.clanTag", "clan.tag")
            .select((eb) => [
              "clan.name as name",
              "clan.tag as tag",
              "league.name as league",
              "modifier.name as modifier",

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
