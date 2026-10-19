import { Database } from "@server/types/database"
import { expressionBuilder } from "kysely"

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
