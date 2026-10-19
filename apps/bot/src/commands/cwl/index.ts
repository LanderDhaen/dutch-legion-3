import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js"
import { performance } from "./performance"
import { history } from "./history"

export const cwl = {
  data: new SlashCommandBuilder()
    .setName("cwl")
    .setDescription("Manage everything related to CWL")
    .addSubcommand(performance.data)
    .addSubcommand(history.data),
  async autocomplete(interaction: AutocompleteInteraction) {
    const subcommand = interaction.options.getSubcommand()

    switch (subcommand) {
      case "performance":
        await performance.autocomplete(interaction)
        break
      case "history":
        await history.autocomplete(interaction)
        break
    }
  },
  async execute(interaction: ChatInputCommandInteraction) {
    const subcommand = interaction.options.getSubcommand()

    switch (subcommand) {
      case "performance":
        await performance.execute(interaction)
        break
      case "history":
        await history.execute(interaction)
        break
    }
  },
}
