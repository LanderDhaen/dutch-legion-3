import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { stats } from "./stats"

export const member = {
  data: new SlashCommandBuilder()
    .setName("member")
    .setDescription("Manage everything related to members")
    .addSubcommand(stats.data),
  async execute(interaction: ChatInputCommandInteraction<"cached">) {
    const subcommand = interaction.options.getSubcommand()

    switch (subcommand) {
      case "stats":
        await stats.execute(interaction)
    }
  },
}
