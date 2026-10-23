import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js"
import { stats } from "./stats"

export const season = {
  data: new SlashCommandBuilder()
    .setName("season")
    .setDescription("Manage everything related to seasons")
    .addSubcommand(stats.data),
  async autocomplete(interaction: AutocompleteInteraction<"cached">) {
    const subcommand = interaction.options.getSubcommand()

    switch (subcommand) {
      case "stats":
        await stats.autocomplete(interaction)
    }
  },
  async execute(interaction: ChatInputCommandInteraction<"cached">) {
    const subcommand = interaction.options.getSubcommand()

    switch (subcommand) {
      case "stats":
        await stats.execute(interaction)
    }
  },
}
