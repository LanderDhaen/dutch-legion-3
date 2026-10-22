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
import { getClans } from "../../api/clan"
import { getSeason, getSeasonOptions } from "../../api/season"
import { formatSeasonDate, getCommandName, normalizeTag } from "../../lib/util"

const WEBSITE_URL = process.env.WEBSITE_URL || "http://localhost:3000"

export const stats = {
  data: new SlashCommandSubcommandBuilder()
    .setName("stats")
    .setDescription("Display the statistics for a CWL season")
    .addStringOption((option) =>
      option
        .setName("season")
        .setDescription("The season to display the statistics for")
        .setRequired(true)
        .setAutocomplete(true)
    )
    .addStringOption((option) =>
      option
        .setName("clan")
        .setDescription("The clan to display the statistics for")
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async autocomplete(interaction: AutocompleteInteraction<"cached">) {
    const focusedOption = interaction.options.getFocused(true)

    if (focusedOption.name === "season") {
      const choices = await getSeasonOptions()

      await interaction.respond(
        choices.filter((choice) =>
          choice.name.toLowerCase().includes(focusedOption.value)
        )
      )
    }

    if (focusedOption.name === "clan") {
      const choices = await getClans()

      await interaction.respond(
        choices.filter((choice) =>
          choice.name.toLowerCase().includes(focusedOption.value.toLowerCase())
        )
      )
    }
  },

  async execute(interaction: ChatInputCommandInteraction<"cached">) {
    const date = interaction.options.getString("season", true)
    const tag = interaction.options.getString("clan", true)

    const { data: season, error } = await getSeason(date, normalizeTag(tag))

    if (error) {
      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("What happened here?")
        .setDescription(
          `Something went wrong while executing ${inlineCode(getCommandName(interaction))}!`
        )

      if (error.status === 404) {
        embed.setDescription(
          `There's no data for ${inlineCode(normalizeTag(tag))} in season ${inlineCode(date)}.`
        )
      }

      if (error.status === 422) {
        if (error.value.property === "tag") {
          embed.setDescription(
            `${inlineCode(normalizeTag(tag))} is not a valid clan tag.`
          )
        }

        if (error.value.property === "date") {
          embed.setDescription(
            `${inlineCode(date)} is not a valid season date.`
          )
        }
      }

      return await interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      })
    }

    if (season.performances.length === 0) {
      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("What happened here?")
        .setDescription(
          `${bold(season.clan.name)} has no statistics available for ${bold(formatSeasonDate(season.date))}.`
        )
      return await interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      })
    }

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle(`CWL Statistics`)
      .addFields(
        {
          name: "Season",
          value: formatSeasonDate(season.date),
        },
        {
          name: "Clan",
          value: season.clan.name,
        },
        {
          name: "League",
          value: season.league.name,
        },
        {
          name: "Modifier",
          value: season.league.modifier?.name ?? "*None*",
        },
        {
          name: "Performances",
          value: codeBlock(
            "text",
            [
              ["Stars".padStart(5), "Avg.".padStart(4), "Name"].join(" | "),
              ...season.performances.map((performance) =>
                [
                  String(performance.statistics.stars).padStart(5),
                  performance.statistics.average.toFixed(1).padStart(4),
                  performance.name,
                ].join(" | ")
              ),
            ].join("\n")
          ),
        }
      )

    const url = `${WEBSITE_URL}/seasons/${season.date}/clans/${normalizeTag(tag)}`

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
