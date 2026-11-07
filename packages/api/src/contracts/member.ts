import { Schema } from "effect"
import {
  HttpApi,
  HttpApiEndpoint,
  HttpApiGroup,
  HttpApiSchema,
} from "effect/http-api"

const Member = Schema.Struct({
  id: Schema.String,
  username: Schema.String,
  globalName: Schema.NullOr(Schema.String),
})

const Statistics = Schema.Struct({
  participations: Schema.Finite,
  wars: Schema.Finite,
  stars: Schema.Finite,
  destruction: Schema.Finite,
  average: Schema.Finite,
  missed: Schema.Finite,
})

const Player = Schema.Struct({
  tag: Schema.String,
  name: Schema.String,
  townhall: Schema.Finite,
  isPrimary: Schema.Boolean,
  statistics: Statistics,
})

export class MemberServiceError extends Schema.TaggedError<
  MemberServiceError,
  { readonly brand: unique symbol }
>()("MemberServiceError", {
  message: Schema.String,
}) {}

export class MemberNotFoundError extends Schema.TaggedError<
  MemberNotFoundError,
  { readonly brand: unique symbol }
>()("MemberNotFoundError", {
  message: Schema.String,
}) {}

export const memberApi = HttpApi.make("memberApi").add(
  HttpApiGroup.make("members").add(
    HttpApiEndpoint.get("getMemberStatistics", "/members/:id/statistics", {
      params: Schema.Struct({
        id: Schema.String,
      }),
      success: Schema.Struct({
        ...Member.fields,
        statistics: Statistics,
        players: Schema.Array(Player),
      }),
      error: [
        MemberNotFoundError.pipe(HttpApiSchema.status(404)),
        MemberServiceError.pipe(HttpApiSchema.status(500)),
      ],
    })
  )
)
