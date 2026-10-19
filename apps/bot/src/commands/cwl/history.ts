import {
  type AutocompleteInteraction,
  type ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandSubcommandBuilder,
} from "discord.js"
import { formatSeasonDate, normalizeTag } from "../../lib/util"
import { getPlayerHistory, getPlayers } from "../../api/player"

export const history = {
  data: new SlashCommandSubcommandBuilder()
    .setName("history")
    .setDescription("Display the CWL history for a player")
    .addStringOption((option) =>
      option
        .setName("player")
        .setDescription("The player to display the history for")
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async autocomplete(interaction: AutocompleteInteraction) {
    const focusedOption = interaction.options.getFocused(true)

    if (focusedOption.name === "player") {
      const choices = await getPlayers()

      await interaction.respond(
        choices
          .filter((choice) =>
            choice.name
              .toLowerCase()
              .includes(focusedOption.value.toLowerCase())
          )
          .slice(0, 25)
      )
    }
  },

  async execute(interaction: ChatInputCommandInteraction) {
    const tag = interaction.options.getString("player", true)

    const { data: player, error } = await getPlayerHistory(normalizeTag(tag))

    if (error) {
      throw new Error(error.value.message)
    }

    const hasParticipations = player.seasons.length > 0
    const hasMoreThanTwelveSeasons = player.seasons.length > 12

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle(`CWL History  •  ${player.name}`)
      .addFields(
        {
          name: "Tag",
          value: player.tag,
          inline: true,
        },
        {
          name: "Participations",
          value: hasParticipations ? String(player.seasons.length) : "*None*",
          inline: true,
        },
        {
          name: "Average",
          value: player.average?.toFixed(1) ?? "*No results*",
          inline: true,
        },
        {
          name: "History",
          value: [
            "```text",
            ["Season".padEnd(12), "Avg.".padStart(4), "League".padEnd(12)].join(
              " | "
            ),
            ...player.seasons
              .slice(0, 12)
              .map((season) =>
                [
                  formatSeasonDate(season.date).padEnd(12),
                  season.average.toFixed(1).padStart(4),
                  season.league.name.padEnd(12),
                ].join(" | ")
              ),
            "",
            hasMoreThanTwelveSeasons
              ? `+${player.seasons.length - 12} more ${player.seasons.length - 12 === 1 ? "season" : "seasons"}`
              : "",
            "```",
          ].join("\n"),
        }
      )

    await interaction.reply({
      embeds: [embed],
    })
  },
}
