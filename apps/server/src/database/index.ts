import { Database } from "@server/types/database"
import { Pool, types } from "pg"
import { CamelCasePlugin, Kysely, PostgresDialect } from "kysely"
import { Array, Context, Effect, Layer, Option, Schema } from "effect"
import "dotenv/config"

types.setTypeParser(types.builtins.DATE, (val) => val)

export const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
})

class DatabaseError extends Schema.TaggedError<
  DatabaseError,
  { readonly brand: unique symbol }
>()("DatabaseError", {
  message: Schema.String,
  cause: Schema.Unknown,
}) {}

export class DatabaseService extends Context.Service<
  DatabaseService,
  Kysely<Database>
>()("DatabaseService") {
  static Live = Layer.effect(
    this,
    Effect.succeed(
      new Kysely<Database>({
        dialect,
        plugins: [new CamelCasePlugin()],
      })
    )
  )
}

export const query = <A>(execute: () => Promise<A>) =>
  Effect.tryPromise({
    try: execute,
    catch: (error) =>
      // TODO: Handle specific error codes

      new DatabaseError({
        message: "Something went wrong while executing query.",
        cause: error,
      }),
  })

export const maybeOne = <A>(execute: () => Promise<A | undefined>) =>
  query(execute).pipe(Effect.map(Option.fromNullishOr))

export const requireOne = <A>(execute: () => Promise<A | undefined>) =>
  maybeOne(execute).pipe(Effect.flatMap(Effect.fromOption))

export const requireSome = <A>(execute: () => Promise<A[]>) =>
  query(execute).pipe(
    Effect.map(Option.liftPredicate(Array.isArrayNonEmpty)),
    Effect.flatMap(Effect.fromOption)
  )
