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
