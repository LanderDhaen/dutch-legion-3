import {
  type ChatInputCommandInteraction,
  codeBlock,
  EmbedBuilder,
  inlineCode,
  MessageFlags,
  SlashCommandSubcommandBuilder,
} from "discord.js"
import { getMemberHistory } from "../../api/member"

export const stats = {
  data: new SlashCommandSubcommandBuilder()
    .setName("stats")
    .setDescription("Display the CWL statistics for a member")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The member to display the statistics for")
        .setRequired(true)
    ),
  async execute(interaction: ChatInputCommandInteraction) {
    const discordMember = interaction.options.getUser("member", true)

    if (discordMember.bot) {
      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("What happened here?")
        .setDescription(
          `${discordMember} can't have statistics since it's a Discord bot.`
        )
      return await interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      })
    }

    const { data: member, error } = await getMemberHistory(discordMember.id)

    if (error) {
      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("What happened here?")
        .setDescription(
          `Something went wrong while executing ${inlineCode(`${interaction.commandName} ${interaction.options.getSubcommand()}`)}!`
        )

      if (error.status === 404) {
        embed.setDescription(`${discordMember} has no statistics available.`)
      }

      if (error.status === 422) {
        embed.setDescription(`${discordMember.id} is not a valid member ID.`)
      }

      return await interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      })
    }

    if (member.players.length > 0) {
      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("What happened here?")
        .setDescription(`${discordMember} has no linked accounts.`)
      return await interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      })
    }

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("CWL Statistics")
      .addFields(
        {
          name: "Member",
          value: discordMember.toString(),
        },
        {
          name: "Participations",
          value: member.statistics.participations.toString(),
        },
        {
          name: "Average",
          value: member.statistics.average.toFixed(1),
        },
        {
          name: "Accounts",
          value: codeBlock(
            "text",
            [
              ["Part.".padStart(7), "Avg.".padStart(4), "Name"].join(" | "),
              ...member.players.map((player) =>
                [
                  String(player.statistics.participations).padStart(7),
                  player.statistics.average.toFixed(1).padStart(4),
                  player.name,
                ].join(" | ")
              ),
            ].join("\n")
          ),
        }
      )

    await interaction.reply({
      embeds: [embed],
    })
  },
}
