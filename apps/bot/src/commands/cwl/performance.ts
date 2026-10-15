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
    const tag = interaction.options.getString("clan", true)

    const { data: season, error } = await api
      .season({ date: date })
      .clan({ tag: normalizeTag(tag) })
      .get()

    if (error) {
      return console.error(error)
    }

    const table = [
      "```text",
      ["Stars".padStart(5), "Average".padStart(7), "Name"].join(" | "),
      ...season.statistics.map((stat) =>
        [
          String(stat.stars).padStart(5),
          stat.average.toFixed(2).padStart(7),
          stat.name,
        ].join(" | ")
      ),
      "```",
    ].join("\n")

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle(
        `CWL Performance  •  ${season.date.toLocaleString("en-US", {
          month: "short",
          year: "numeric",
          timeZone: "UTC",
        })}`
      )
      .addFields(
        {
          name: "Clan",
          value: season.clan.name,
          inline: true,
        },
        {
          name: "League",
          value: season.league,
          inline: true,
        },
        {
          name: "Modifier",
          value:
            season.modifier.name === "None" ? "*None*" : season.modifier.name,
          inline: true,
        },
        {
          name: "Performance",
          value: table,
        }
      )

    await interaction.reply({
      embeds: [embed],
    })
  },
}

const normalizeTag = (tag: string) => {
  return tag.toUpperCase().replaceAll("#", "%23")
}
