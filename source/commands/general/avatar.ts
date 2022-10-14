import { ApplicationCommandOptionType, GuildMember } from "discord.js";
import { createCommand } from "../../command";

export default createCommand({
    name: "avatar",
    description: "Display your or a user avatar in embed",
    options: [
        {
            type: ApplicationCommandOptionType.User,
            name: "member",
            description: "The member to display the avatar",
            required: false
        }
    ]
}, ({ interaction }) => {
    const member = (interaction.options.getMember("member") ?? interaction.member) as GuildMember;

    return interaction.reply({
        embeds: [
            {
                title: `${member.user.tag}'s avatar`,
                image: {
                    url: member.displayAvatarURL({ size: 2048 })
                },
            }
        ]
    });
});