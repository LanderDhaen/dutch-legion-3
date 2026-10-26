import { Insertable } from "kysely"
import { Player } from "./database"

export type InsertablePlayer = Insertable<Player>
