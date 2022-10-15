import { TextChannel } from "discord.js";
import { createListener } from "../../listener";
import { ordinalNumber } from "../../util";
import settings from "../../settings";

export default createListener({
    name: "guildMemberAdd"
}, (member) => {
    const channel = member.guild.channels.cache.get(settings.channels.welcome) as TextChannel;

    if(channel) {
        return channel.send({
            content: `<@${member.id}> Welcome to ${member.guild.name}!\nYou are our ${ordinalNumber(member.guild.memberCount)} member! ${settings.emojis.man}\nCheck out <#${settings.channels.verify}> to gain access to other channels! ${settings.emojis.forreal}`
        }).catch(() => {});
    }
});