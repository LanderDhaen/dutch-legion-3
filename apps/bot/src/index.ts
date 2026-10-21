import {
  type AutocompleteInteraction,
  type ChatInputCommandInteraction,
  Client,
  Collection,
  EmbedBuilder,
  Events,
  GatewayIntentBits,
  type SlashCommandBuilder,
  type SlashCommandOptionsOnlyBuilder,
  type SlashCommandSubcommandsOnlyBuilder,
} from "discord.js"
import { cwl } from "./commands/cwl"
import { member } from "./commands/member"

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

const client = new BotClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
})

client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`)
})

client.commands.set(cwl.data.name, cwl)
client.commands.set(member.data.name, member)

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = client.commands.get(interaction.commandName)

    if (!command) return

    try {
      await command.execute(interaction)
    } catch (error) {
      console.error(error)

      const embed = new EmbedBuilder()
        .setTitle("What happened here?")
        .setDescription(
          error instanceof Error && error.message
            ? error.message
            : `Something went wrong while executing \`${interaction.commandName}\`!`
        )
        .setColor("Red")

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ embeds: [embed], ephemeral: true })
      } else {
        await interaction.reply({ embeds: [embed], ephemeral: true })
      }
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
