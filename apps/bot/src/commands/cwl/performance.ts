import {
  ActionRowBuilder,
  type AutocompleteInteraction,
  ButtonBuilder,
  ButtonStyle,
  type ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandSubcommandBuilder,
} from "discord.js"
import { api } from "../../api"

const WEBSITE_URL = process.env.WEBSITE_URL || "http://localhost:3000"

export const performance = {
  data: new SlashCommandSubcommandBuilder()
    .setName("performance")
    .setDescription("Display the performance for a CWL season")
    .addStringOption((option) =>
      option
        .setName("season")
        .setDescription("The season to display the performance for")
        .setRequired(true)
        .setAutocomplete(true)
    )
    .addStringOption((option) =>
      option
        .setName("clan")
        .setDescription("The clan to display the performance for")
        .setRequired(true)
        .setAutocomplete(true)
    ),

  async autocomplete(interaction: AutocompleteInteraction) {
    const focusedOption = interaction.options.getFocused(true)

    if (focusedOption.name === "season") {
      const { data: seasons, error } = await api.seasons.get()

      if (error) {
        return console.error(error)
      }

      const choices = seasons.map((season) => ({
        name: formatDate(season.date),
        value: season.date,
      }))

      await interaction.respond(
        choices.filter((choice) =>
          choice.name.toLowerCase().includes(focusedOption.value)
        )
      )
    }

    if (focusedOption.name === "clan") {
      const { data: clans, error } = await api.clans.get()

      if (error) {
        return console.error(error)
      }

      const choices = clans.map((clan) => ({
        name: clan.name,
        value: clan.tag,
      }))

      await interaction.respond(
        choices.filter((choice) =>
          choice.name.toLowerCase().includes(focusedOption.value.toLowerCase())
        )
      )
    }
  },

  async execute(interaction: ChatInputCommandInteraction) {
    const date = interaction.options.getString("season", true)
    const tag = interaction.options.getString("clan", true)

    const { data: season, error } = await api
      .seasons({ date: date })
      .clans({ tag: normalizeTag(tag) })
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
      .setTitle(`CWL Performance  •  ${formatDate(season.date)}`)
      .addFields(
        {
          name: "Clan",
          value: season.clan.name,
          inline: true,
        },
        {
          name: "League",
          value: season.league.name,
          inline: true,
        },
        {
          name: "Modifier",
          value: season.league.modifier?.name ?? "*None*",
          inline: true,
        },
        {
          name: "Performance",
          value: table,
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

const normalizeTag = (tag: string) => {
  return tag.toUpperCase().replaceAll("#", "%23")
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleString("en-US", {
    month: "short",
    year: "numeric",
  })
}
