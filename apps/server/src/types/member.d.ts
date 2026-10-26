import { Insertable } from "kysely"
import { Member } from "./database"

export type InsertableMember = Insertable<Member>
