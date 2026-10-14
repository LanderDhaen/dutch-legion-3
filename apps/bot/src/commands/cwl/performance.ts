import {
  type ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandSubcommandBuilder,
} from "discord.js"
import { api } from "../../api"

export const performance = {
  data: new SlashCommandSubcommandBuilder()
    .setName("performance")
    .setDescription("Display the performance for a CWL season")
    .addStringOption((option) =>
      option
        .setName("season")
        .setDescription("The season to display the performance for")
        .setRequired(true)
    ),

  async execute(interaction: ChatInputCommandInteraction) {
    const date = interaction.options.getString("season", true)

    const { data: season, error } = await api.season({ date }).get()

    if (error) {
      return console.error(error)
    }

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("CWL Performance")
      .setDescription(
        `The following statistics were collected for ${season.date.toLocaleString(
          "en-US",
          {
            month: "short",
            year: "numeric",
            timeZone: "UTC",
          }
        )}`
      )

    for (const clan of season.clans) {
      const table = [
        "```text",
        [
          "Wars".padStart(5),
          "Stars".padStart(5),
          "Average".padStart(7),
          "Name",
        ].join(" | "),
        ...clan.statistics.map((stat) =>
          [
            String(stat.wars).padStart(5),
            String(stat.stars).padStart(5),
            stat.average.toFixed(2).padStart(7),
            `${stat.name} (TH${stat.townhall})`,
          ].join("   ")
        ),
        "```",
      ].join("\n")

      console.log(table.length)

      embed.addFields({
        name: `${clan.name}  •  ${clan.league}${clan.modifier.name !== "None" && `  •  ${clan.modifier.name}`}`,
        value: table,
      })
    }

    await interaction.reply({
      embeds: [embed],
    })
  },
}
