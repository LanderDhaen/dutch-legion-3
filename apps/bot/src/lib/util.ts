import { ChatInputCommandInteraction } from "discord.js"

export const normalizeTag = (tag: string) => {
  return tag.toUpperCase().replaceAll("#", "%23")
}

export const formatSeasonDate = (dateString: string) => {
  const date = new Date(dateString)

  if (date.getDate() === 1) {
    return date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    })
  }

  return date.toLocaleString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export const formatAverage = (average: number) => {
  return average.toLocaleString("en-US", {
    style: "decimal",
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })
}

export const getCommandName = (
  interaction: ChatInputCommandInteraction<"cached">
) =>
  `/${[
    interaction.commandName,
    interaction.options.getSubcommandGroup(false),
    interaction.options.getSubcommand(false),
  ]
    .filter(Boolean)
    .join(" ")}`
