import { Database } from "@server/types/database"
import { DatabaseError as PostgreSQLError, Pool, types } from "pg"
import { CamelCasePlugin, Executable, Kysely, PostgresDialect } from "kysely"
import { Array, Context, Effect, Layer, Match, Option, Schema } from "effect"
import "dotenv/config"

export class DatabaseError extends Schema.TaggedError<
  DatabaseError,
  { readonly brand: unique symbol }
>()("DatabaseError", {
  cause: Schema.Unknown,
}) {}

export class UnknownDatabaseError extends Schema.TaggedError<
  UnknownDatabaseError,
  { readonly brand: unique symbol }
>()("UnknownDatabaseError", {
  cause: Schema.Unknown,
}) {}

types.setTypeParser(types.builtins.DATE, (val) => val)

export const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
})

class DatabaseClient extends Context.Service<
  DatabaseClient,
  Kysely<Database>
>()("DatabaseClient") {
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

export class DatabaseService extends Context.Service<DatabaseService>()(
  "DatabaseService",
  {
    make: Effect.gen(function* () {
      const db = yield* DatabaseClient

      const execute = <A>(executable: () => Promise<A>) =>
        Effect.tryPromise({
          try: executable,
          catch: Match.type<unknown>().pipe(
            Match.when(
              Match.instanceOf(PostgreSQLError),
              (cause) => new DatabaseError({ cause })
            ),
            Match.orElse((error) => new UnknownDatabaseError({ cause: error }))
          ),
        }).pipe(
          Effect.tapErrorTag("DatabaseError", Effect.logError),
          Effect.tapErrorTag("UnknownDatabaseError", Effect.logFatal),
          Effect.catchTag("UnknownDatabaseError", (error) => Effect.die(error))
        )

      return {
        maybeOne: <A>(query: (db: Kysely<Database>) => Executable<A>) =>
          execute(() => query(db).executeTakeFirst()).pipe(
            Effect.map(Option.fromNullishOr)
          ),

        requireOne: <A>(query: (db: Kysely<Database>) => Executable<A>) =>
          execute(() => query(db).executeTakeFirst()).pipe(
            Effect.map(Option.fromNullishOr),
            Effect.flatMap(Effect.fromOption)
          ),

        requireSome: <A>(query: (db: Kysely<Database>) => Executable<A>) =>
          execute(() => query(db).execute()).pipe(
            Effect.map(Option.liftPredicate(Array.isArrayNonEmpty)),
            Effect.flatMap(Effect.fromOption)
          ),
      }
    }),
  }
) {
  static readonly layer = Layer.effect(this, this.make).pipe(
    Layer.provide(DatabaseClient.Live)
  )
}
