import {
  HttpApi,
  HttpApiBuilder,
  HttpApiEndpoint,
  HttpApiError,
  HttpApiGroup,
} from "effect/http-api"
import { Effect, Schema } from "effect"
import { MemberService } from "@server/services/member"

export const memberApi = HttpApi.make("memberApi").add(
  HttpApiGroup.make("members").add(
    HttpApiEndpoint.get("getMemberById", "/members/:id", {
      params: Schema.Struct({
        id: Schema.String,
      }),
      success: Schema.Struct({
        id: Schema.String,
        username: Schema.String,
        globalName: Schema.NullOr(Schema.String),
      }),
      error: [HttpApiError.NotFound, HttpApiError.InternalServerError],
    })
  )
)

export const memberHandlers = HttpApiBuilder.group(
  memberApi,
  "members",
  (handlers) =>
    handlers.handle("getMemberById", ({ params }) =>
      MemberService.use((service) =>
        service.getMemberById(params.id).pipe(
          Effect.tapError(Effect.logError),
          Effect.catchTags({
            DatabaseError: () =>
              Effect.fail(new HttpApiError.InternalServerError()),
            NoSuchElementError: () => Effect.fail(new HttpApiError.NotFound()),
          })
        )
      )
    )
)
