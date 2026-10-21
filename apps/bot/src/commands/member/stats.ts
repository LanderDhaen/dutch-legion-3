import {
  type ChatInputCommandInteraction,
  codeBlock,
  EmbedBuilder,
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

    const { data: member, error } = await getMemberHistory(discordMember.id)

    if (error) {
      throw new Error(error.value.message)
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
