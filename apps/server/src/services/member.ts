import { jsonArrayFrom, jsonBuildObject } from "kysely/helpers/postgres"
import { db } from "./../database"
import {
  withMemberOverallCalculatedStatistics,
  withOverallCalculatedStatistics,
} from "./statistics"

export const getMemberHistory = async (id: string) => {
  const player = await db
    .with("calculatedOverallStatistics", withOverallCalculatedStatistics())
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
      jsonBuildObject({
        participations: eb.ref(
          "memberOverallCalculatedStatistics.participations"
        ),
        wars: eb.ref("memberOverallCalculatedStatistics.wars"),
        stars: eb.ref("memberOverallCalculatedStatistics.stars"),
        destruction: eb.ref("memberOverallCalculatedStatistics.destruction"),
        average: eb.ref("memberOverallCalculatedStatistics.average"),
        missed: eb.ref("memberOverallCalculatedStatistics.missed"),
      }).as("statistics"),
      jsonArrayFrom(
        eb
          .selectFrom("calculatedOverallStatistics")
          .innerJoin(
            "player",
            "player.tag",
            "calculatedOverallStatistics.playerTag"
          )
          .select((eb) => [
            "player.name",
            "player.tag",
            "player.townhall",
            jsonBuildObject({
              participations: eb.ref(
                "calculatedOverallStatistics.participations"
              ),
              wars: eb.ref("calculatedOverallStatistics.wars"),
              stars: eb.ref("calculatedOverallStatistics.stars"),
              destruction: eb.ref("calculatedOverallStatistics.destruction"),
              average: eb.ref("calculatedOverallStatistics.average"),
              missed: eb.ref("calculatedOverallStatistics.missed"),
            }).as("statistics"),
          ])
          .orderBy("player.townhall", "desc")
          .orderBy("calculatedOverallStatistics.average", "desc")
          .orderBy("calculatedOverallStatistics.participations", "desc")
          .whereRef("player.memberId", "=", "member.id")
      ).as("players"),
    ])
    .where("member.id", "=", id)
    .executeTakeFirst()

  return player
}
