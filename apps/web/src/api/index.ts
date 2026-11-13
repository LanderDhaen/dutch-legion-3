import { createServerFn } from "@tanstack/react-start"
import { ApiClient } from "@workspace/api/client"
import { Effect, ManagedRuntime } from "effect"

export const runtime = ManagedRuntime.make(ApiClient.layer)

export const getMemberStatistics = createServerFn({
  method: "GET",
}).handler(() =>
  runtime.runPromise(
    Effect.gen(function* () {
      const client = yield* ApiClient

      return yield* client.members.getMemberStatistics({
        params: { id: "123" },
      })
    })
  )
)
