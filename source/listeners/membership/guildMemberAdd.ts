import { TextChannel } from "discord.js";
import { createListener } from "../../listener";
import { ordinalNumber } from "../../util";

export default createListener({
    name: "guildMemberAdd"
}, (member) => {
    const channel = member.guild.channels.cache.get("1029789076410347541") as TextChannel;

    if(channel) {
        return channel.send({
            content: `<@${member.id}> Welcome to Hyplix!\nYou are our ${ordinalNumber(member.guild.memberCount)} member! <:man:1028553580300472432>\nCheck out <#1029789024581337149> to gain access to other channels! <:forreal:1029799729309167626>`
        }).catch(() => {});
    }
});