import {
  type AutocompleteInteraction,
  type ChatInputCommandInteraction,
  Client,
  Collection,
  EmbedBuilder,
  Events,
  GatewayIntentBits,
  inlineCode,
  MessageFlags,
  type SlashCommandBuilder,
  type SlashCommandOptionsOnlyBuilder,
  type SlashCommandSubcommandsOnlyBuilder,
} from "discord.js"
import { member } from "./commands/member"
import { player } from "./commands/player"
import { season } from "./commands/season"
import { getCommandName } from "./lib/util"

interface Command {
  data:
    | SlashCommandBuilder
    | SlashCommandOptionsOnlyBuilder
    | SlashCommandSubcommandsOnlyBuilder
  autocomplete?: (
    interaction: AutocompleteInteraction<"cached">
  ) => Promise<void>
  execute: (interaction: ChatInputCommandInteraction<"cached">) => Promise<void>
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

client.commands.set(member.data.name, member)
client.commands.set(player.data.name, player)
client.commands.set(season.data.name, season)

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (!interaction.inCachedGuild()) {
      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("What happened here?")
        .setDescription(
          `${interaction.client.user.username} can only be used inside a Discord server.`
        )

      return await interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      })
    }

    const command = client.commands.get(interaction.commandName)

    if (!command) {
      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("What happened here?")
        .setDescription(
          `${interaction.client.user.username} does not have a command named ${inlineCode(getCommandName(interaction))}.`
        )
      return await interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      })
    }

    try {
      await command.execute(interaction)
    } catch (error) {
      console.error(error)

      const embed = new EmbedBuilder()
        .setTitle("What happened here?")
        .setDescription(
          `Something went wrong while executing ${inlineCode(getCommandName(interaction))}!`
        )
        .setColor("Red")

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          embeds: [embed],
          flags: MessageFlags.Ephemeral,
        })
      } else {
        await interaction.reply({
          embeds: [embed],
          flags: MessageFlags.Ephemeral,
        })
      }
    }
  }

  if (interaction.isAutocomplete()) {
    if (!interaction.inCachedGuild()) return

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
