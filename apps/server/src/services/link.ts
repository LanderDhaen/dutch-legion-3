import { InsertableMember } from "../types/member"
import { db } from "../database"
import { InsertablePlayer } from "../types/player"
import { jsonBuildObject } from "kysely/helpers/postgres"

export const createLink = async ({
  isPrimary,
  member,
  player,
}: {
  isPrimary: boolean
  member: InsertableMember
  player: InsertablePlayer
}) => {
  const link = await db
    .with("inserted_member", (eb) =>
      eb
        .insertInto("member")
        .values({
          id: member.id,
          username: member.username,
          globalName: member.globalName,
        })
        .onConflict((eb) =>
          eb.column("id").doUpdateSet({
            username: member.username,
            globalName: member.globalName,
          })
        )
        .returning(["member.id", "member.username", "member.globalName"])
    )
    .with("inserted_player", (eb) =>
      eb
        .insertInto("player")
        .values({
          tag: player.tag,
          name: player.name,
          townhall: player.townhall,
        })
        .onConflict((eb) =>
          eb.column("tag").doUpdateSet({
            name: player.name,
            townhall: player.townhall,
          })
        )
        .returning(["player.tag", "player.name", "player.townhall"])
    )
    .with("inserted_link", (eb) =>
      eb
        .insertInto("link")
        .values({
          isPrimary,
          memberId: member.id,
          playerTag: player.tag,
        })
        .onConflict((eb) => eb.column("playerTag").doNothing())
        .returning(["link.isPrimary", "link.memberId", "link.playerTag"])
    )
    .selectFrom(["inserted_member", "inserted_player", "inserted_link"])
    .select((eb) => [
      "inserted_link.isPrimary",
      jsonBuildObject({
        id: eb.ref("inserted_member.id"),
        username: eb.ref("inserted_member.username"),
        globalName: eb.ref("inserted_member.globalName"),
      }).as("member"),
      jsonBuildObject({
        tag: eb.ref("inserted_player.tag"),
        name: eb.ref("inserted_player.name"),
        townhall: eb.ref("inserted_player.townhall"),
      }).as("player"),
    ])
    .executeTakeFirst()

  return link
}
