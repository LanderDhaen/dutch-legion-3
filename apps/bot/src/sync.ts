import { REST, Routes } from "discord.js"
import { cwl } from "./commands/cwl"
import { member } from "./commands/member"

const TOKEN = process.env.DISCORD_TOKEN
const CLIENT_ID = process.env.CLIENT_ID
const GUILD_ID = process.env.GUILD_ID

if (!TOKEN || !CLIENT_ID || !GUILD_ID) {
  throw new Error("Missing required environment variables.")
}

const rest = new REST().setToken(TOKEN)

const commands = [cwl.data.toJSON(), member.data.toJSON()]

try {
  console.log(`Refreshing ${commands.length} application commands...`)

  await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
    body: commands,
  })

  console.log(`Successfully registered ${commands.length} commands.`)
} catch (error) {
  console.error("Failed to register commands:", error)
}
