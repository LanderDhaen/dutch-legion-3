import {
  type ChatInputCommandInteraction,
  EmbedBuilder,
  inlineCode,
  MessageFlags,
  SlashCommandSubcommandBuilder,
} from "discord.js"
import { getCommandName, normalizeTag } from "../../lib/util"
import { createLink } from "../../api/link"

export const add = {
  data: new SlashCommandSubcommandBuilder()
    .setName("add")
    .setDescription("Add a Clash of Clans account to a member")
    .addUserOption((option) =>
      option
        .setName("member")
        .setDescription("The member to link the account to")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("tag")
        .setDescription("The account to link to the member")
        .setRequired(true)
    )
    .addBooleanOption((option) =>
      option
        .setName("primary")
        .setDescription(
          "Whether this account should be the primary account for the member"
        )
        .setRequired(false)
    ),
  async execute(interaction: ChatInputCommandInteraction<"cached">) {
    const member = interaction.options.getMember("member")
    const tag = interaction.options.getString("tag", true)
    const isPrimary = interaction.options.getBoolean("primary") || false

    if (!member) {
      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("What happened here?")
        .setDescription("This user is no longer a member of this server.")
      return await interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      })
    }

    if (member.user.bot) {
      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("What happened here?")
        .setDescription(
          `${member} can't have statistics since it's a Discord bot.`
        )
      return await interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      })
    }

    const normalizedTag = normalizeTag(tag)

    const { data: link, error } = await createLink(
      isPrimary,
      member.id,
      normalizedTag
    )

    if (error) {
      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("What happened here?")
        .setDescription(
          `Something went wrong while executing ${inlineCode(getCommandName(interaction))}!`
        )

      if (error.status === 409) {
        embed.setDescription(error.value.message)
      }

      if (error.status === 422) {
        embed.setDescription(error.value.message || "The request was invalid.")
      }

      return await interaction.reply({
        embeds: [embed],
        flags: MessageFlags.Ephemeral,
      })
    }

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("Added Link")
      .setDescription("The following link has been added:")
      .addFields(
        {
          name: "Member",
          value: member.toString(),
        },
        {
          name: "Account",
          value: `${link.player.name} (${link.player.tag})`,
        },
        {
          name: "Primary",
          value: link.isPrimary ? "Yes" : "No",
        }
      )

    await interaction.reply({
      embeds: [embed],
    })
  },
}
