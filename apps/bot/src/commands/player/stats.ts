import {
  ActionRowBuilder,
  type AutocompleteInteraction,
  bold,
  ButtonBuilder,
  ButtonStyle,
  type ChatInputCommandInteraction,
  codeBlock,
  EmbedBuilder,
  inlineCode,
  MessageFlags,
  SlashCommandSubcommandBuilder,
} from "discord.js"
import { formatSeasonDate, getCommandName, normalizeTag } from "../../lib/util"
import { getPlayerHistory, getPlayers } from "../../api/player"

const WEBSITE_URL = process.env.WEBSITE_URL || "http://localhost:3000"

export const stats = {
  data: new SlashCommandSubcommandBuilder()
    .setName("stats")
    .setDescription("Display the CWL statistics for a player")
    .addStringOption((option) =>
      option
        .setName("player")
        .setDescription("The player to display the statistics for")
        .setRequired(true)
        .setAutocomplete(true)
    ),
  async autocomplete(interaction: AutocompleteInteraction<"cached">) {
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
  async execute(interaction: ChatInputCommandInteraction<"cached">) {
    const tag = interaction.options.getString("player", true)
    const normalizedTag = normalizeTag(tag)

    const { data: player, error } = await getPlayerHistory(normalizedTag)

    if (error) {
      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("What happened here?")
        .setDescription(
          `Something went wrong while executing ${getCommandName(interaction)}!`
        )

      if (error.status === 404) {
        embed.setDescription(
          `${inlineCode(normalizedTag)} has no statistics available.`
        )
      }

      if (error.status === 422) {
        embed.setDescription(
          `${inlineCode(normalizedTag)} is not a valid player tag.`
        )
      }

      return await interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      })
    }

    if (player.seasons.length === 0) {
      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("What happened here?")
        .setDescription(`${bold(player.name)} has no seasons available.`)
      return await interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      })
    }

    const leftoverSeasons = player.statistics.participations - 12

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("CWL Statistics")
      .addFields(
        {
          name: "Account",
          value: player.name,
        },
        {
          name: "Tag",
          value: player.tag,
        },
        {
          name: "Participations",
          value: player.statistics.participations.toString(),
        },
        {
          name: "Average",
          value: player.statistics.average.toFixed(1),
        },
        {
          name: "Seasons",
          value: codeBlock(
            "text",
            [
              [
                "Season".padEnd(12),
                "Avg.".padStart(4),
                "League".padEnd(12),
              ].join(" | "),
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
              leftoverSeasons > 0
                ? `+${leftoverSeasons} more ${leftoverSeasons === 1 ? "season" : "seasons"}`
                : "",
            ].join("\n")
          ),
        }
      )

    const url = `${WEBSITE_URL}/players/${normalizedTag}/history`

    const button = new ButtonBuilder()
      .setLabel("Website")
      .setStyle(ButtonStyle.Link)
      .setURL(url)

    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(button)

    await interaction.reply({
      embeds: [embed],
      components: [row],
    })
  },
}
