import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"
import { add } from "./add"

export const link = {
  data: new SlashCommandBuilder()
    .setName("link")
    .setDescription("Manage everything related to links")
    .addSubcommand(add.data),
  async execute(interaction: ChatInputCommandInteraction<"cached">) {
    const subcommand = interaction.options.getSubcommand()

    switch (subcommand) {
      case "add":
        await add.execute(interaction)
    }
  },
}
