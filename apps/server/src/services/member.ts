import { Context, Effect, Layer } from "effect"
import { Database } from "@/types/database"
import { expressionBuilder } from "kysely"
import { jsonArrayFrom, jsonBuildObject } from "kysely/helpers/postgres"
import { DatabaseService } from "@/database"
import {
  MemberNotFoundError,
  MemberServiceError,
} from "@workspace/api/contracts"

export class MemberService extends Context.Service<MemberService>()(
  "MemberService",
  {
    make: Effect.gen(function* () {
      const database = yield* DatabaseService

      return {
        getMemberStatistics: Effect.fn("MemberService.getMemberStatistics")(
          function* (id: string) {
            return yield* database
              .requireOne((db) =>
                db
                  .with(
                    "calculatedOverallStatistics",
                    withOverallCalculatedStatistics()
                  )
                  .with(
                    "memberOverallCalculatedStatistics",
                    withMemberOverallCalculatedStatistics()
                  )
                  .selectFrom("member")
                  .innerJoin(
                    "memberOverallCalculatedStatistics",
                    "memberOverallCalculatedStatistics.memberId",
                    "member.id"
                  )
                  .select((eb) => [
                    "member.id",
                    "member.username",
                    "member.globalName",
                    jsonBuildObject({
                      participations: eb.ref(
                        "memberOverallCalculatedStatistics.participations"
                      ),
                      wars: eb.ref("memberOverallCalculatedStatistics.wars"),
                      stars: eb.ref("memberOverallCalculatedStatistics.stars"),
                      destruction: eb.ref(
                        "memberOverallCalculatedStatistics.destruction"
                      ),
                      average: eb.ref(
                        "memberOverallCalculatedStatistics.average"
                      ),
                      missed: eb.ref(
                        "memberOverallCalculatedStatistics.missed"
                      ),
                    }).as("statistics"),
                    jsonArrayFrom(
                      eb
                        .selectFrom("calculatedOverallStatistics")
                        .innerJoin(
                          "player",
                          "player.tag",
                          "calculatedOverallStatistics.playerTag"
                        )
                        .innerJoin("link", "link.playerTag", "player.tag")
                        .select((eb) => [
                          "player.name",
                          "player.tag",
                          "player.townhall",
                          "link.isPrimary",
                          jsonBuildObject({
                            participations: eb.ref(
                              "calculatedOverallStatistics.participations"
                            ),
                            wars: eb.ref("calculatedOverallStatistics.wars"),
                            stars: eb.ref("calculatedOverallStatistics.stars"),
                            destruction: eb.ref(
                              "calculatedOverallStatistics.destruction"
                            ),
                            average: eb.ref(
                              "calculatedOverallStatistics.average"
                            ),
                            missed: eb.ref(
                              "calculatedOverallStatistics.missed"
                            ),
                          }).as("statistics"),
                        ])
                        .orderBy("player.townhall", "desc")
                        .orderBy("calculatedOverallStatistics.average", "desc")
                        .orderBy(
                          "calculatedOverallStatistics.participations",
                          "desc"
                        )
                        .whereRef("link.memberId", "=", "member.id")
                    ).as("players"),
                  ])
                  .where("member.id", "=", id)
              )
              .pipe(
                Effect.catchTags({
                  DatabaseError: () =>
                    Effect.fail(
                      new MemberServiceError({
                        message:
                          "Something went wrong while retrieving this member",
                      })
                    ),
                  NoSuchElementError: () =>
                    Effect.fail(
                      new MemberNotFoundError({
                        message: `Member with id ${id} could not be found`,
                      })
                    ),
                })
              )
          }
        ),
      }
    }),
  }
) {
  static readonly layer = Layer.effect(this, this.make)
}

export const withCalculatedStatistics = () => {
  const eb = expressionBuilder<Database>()

  return eb
    .selectFrom("statistic")
    .select((eb) => [
      "statistic.id",
      "statistic.townhall",
      "statistic.wars",
      "statistic.stars",
      "statistic.destruction",
      eb(
        eb.cast<number>("statistic.stars", "double precision"),
        "/",
        eb.fn<number | null>("nullif", [eb.ref("statistic.wars"), eb.val(0)])
      ).as("average"),
      eb("statistic.wars", "-", eb.ref("statistic.attacks")).as("missed"),
      "statistic.playerTag",
      "statistic.participationId",
    ])
}

export const withOverallCalculatedStatistics = () => {
  const eb = expressionBuilder<Database>()

  return eb
    .selectFrom("statistic")
    .select((eb) => [
      "statistic.playerTag",
      eb.fn.count<number>("statistic.id").as("participations"),
      eb.fn.coalesce(eb.fn.sum<number>("statistic.wars"), eb.val(0)).as("wars"),
      eb.fn
        .coalesce(eb.fn.sum<number>("statistic.stars"), eb.val(0))
        .as("stars"),
      eb.fn
        .coalesce(eb.fn.sum<number>("statistic.destruction"), eb.val(0))
        .as("destruction"),
      eb(
        eb.cast<number>(
          eb.fn.coalesce(eb.fn.sum("statistic.stars"), eb.val(0)),
          "double precision"
        ),
        "/",
        eb.fn<number | null>("nullif", [
          eb.fn.sum<number>("statistic.wars"),
          eb.val(0),
        ])
      ).as("average"),
      eb.fn
        .coalesce(
          eb(
            eb.fn.sum<number>("statistic.wars"),
            "-",
            eb.fn.sum<number>("statistic.attacks")
          ),
          eb.val(0)
        )
        .as("missed"),
    ])
    .groupBy("statistic.playerTag")
}

export const withMemberOverallCalculatedStatistics = () => {
  const eb = expressionBuilder<Database>()

  return eb
    .selectFrom("statistic")
    .innerJoin("player", "player.tag", "statistic.playerTag")
    .innerJoin("link", "link.playerTag", "player.tag")
    .select((eb) => [
      "link.memberId",
      eb.fn.count<number>("statistic.id").as("participations"),
      eb.fn.coalesce(eb.fn.sum<number>("statistic.wars"), eb.val(0)).as("wars"),
      eb.fn
        .coalesce(eb.fn.sum<number>("statistic.stars"), eb.val(0))
        .as("stars"),
      eb.fn
        .coalesce(eb.fn.sum<number>("statistic.destruction"), eb.val(0))
        .as("destruction"),
      eb(
        eb.cast<number>(
          eb.fn.coalesce(eb.fn.sum("statistic.stars"), eb.val(0)),
          "double precision"
        ),
        "/",
        eb.fn<number | null>("nullif", [
          eb.fn.sum<number>("statistic.wars"),
          eb.val(0),
        ])
      ).as("average"),
      eb.fn
        .coalesce(
          eb(
            eb.fn.sum<number>("statistic.wars"),
            "-",
            eb.fn.sum<number>("statistic.attacks")
          ),
          eb.val(0)
        )
        .as("missed"),
    ])
    .groupBy("link.memberId")
}
