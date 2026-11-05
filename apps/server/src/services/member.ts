import { DatabaseService, requireOne } from "@server/database"
import { Context, Effect, Layer } from "effect"

export class MemberService extends Context.Service<MemberService>()(
  "MemberService",
  {
    make: Effect.gen(function* () {
      const db = yield* DatabaseService

      return {
        getMemberById: Effect.fn("MemberService.getMemberById")(function* (
          id: string
        ) {
          return yield* requireOne(() =>
            db
              .selectFrom("member")
              .select(["member.id", "member.username", "member.globalName"])
              .where("id", "=", id)
              .executeTakeFirst()
          )
        }),
      }
    }),
  }
) {
  static readonly layer = Layer.effect(this, this.make)
}
