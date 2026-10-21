import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js"
import { stats } from "./stats"

export const player = {
  data: new SlashCommandBuilder()
    .setName("player")
    .setDescription("Manage everything related to players")
    .addSubcommand(stats.data),
  async autocomplete(interaction: AutocompleteInteraction) {
    const subcommand = interaction.options.getSubcommand()

    switch (subcommand) {
      case "stats":
        await stats.autocomplete(interaction)
    }
  },

  async execute(interaction: ChatInputCommandInteraction) {
    const subcommand = interaction.options.getSubcommand()

    switch (subcommand) {
      case "stats":
        await stats.execute(interaction)
    }
  },
}
