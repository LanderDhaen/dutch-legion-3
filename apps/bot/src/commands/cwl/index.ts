import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js"
import { performance } from "./performance"

export const cwl = {
  data: new SlashCommandBuilder()
    .setName("cwl")
    .setDescription("Manage everything related to CWL")
    .addSubcommand(performance.data),
  async autocomplete(interaction: AutocompleteInteraction) {
    const subcommand = interaction.options.getSubcommand()

    switch (subcommand) {
      case "performance":
        await performance.autocomplete(interaction)
    }
  },
  async execute(interaction: ChatInputCommandInteraction) {
    const subcommand = interaction.options.getSubcommand()

    switch (subcommand) {
      case "performance":
        await performance.execute(interaction)
    }
  },
}
