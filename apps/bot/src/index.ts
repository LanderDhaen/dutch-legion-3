import {
  type AutocompleteInteraction,
  type ChatInputCommandInteraction,
  Client,
  Collection,
  Events,
  GatewayIntentBits,
  type SlashCommandBuilder,
  type SlashCommandOptionsOnlyBuilder,
  type SlashCommandSubcommandsOnlyBuilder,
} from "discord.js"
import { cwl } from "./commands/cwl"

interface Command {
  data:
    | SlashCommandBuilder
    | SlashCommandOptionsOnlyBuilder
    | SlashCommandSubcommandsOnlyBuilder
  autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>
}

export class BotClient extends Client {
  commands = new Collection<string, Command>()
}

const token = process.env.DISCORD_TOKEN

const client = new BotClient({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})

client.commands.set(cwl.data.name, cwl)

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName)

    if (!command) return

    try {
      await command.execute(interaction)
    } catch (error) {
      console.error(error)
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      })
    }
  }

  if (interaction.isAutocomplete()) {
    const command = client.commands.get(interaction.commandName)

    if (!command || !command.autocomplete) return

    try {
      await command.autocomplete(interaction)
    } catch (error) {
      console.error(error)
    }
  }
})

client.login(token)
