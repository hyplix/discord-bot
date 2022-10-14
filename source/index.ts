import { Client, GuildMember } from "discord.js";
import { setCommands, setListeners } from "./util";
import dotenv from "dotenv";

dotenv.config({ 
    path: ".env"
});

const client = new Client({
    allowedMentions: {
        parse: ["everyone"]
    },

    intents: [
        "Guilds",
        "GuildMessages",
        "GuildMembers",
        "MessageContent"
    ]
});

const commands = new Map();

client.once("ready", () => {
    setCommands(client, commands);
});

const staffRole = process.env.StaffRoleId as string;

client.on("interactionCreate", interaction => {
    if(!interaction.inGuild()) return;
    if(!interaction.isCommand()) return;

    const command = commands.get(interaction.commandName);
    if(command) {
        if(command.staff === true && !(interaction.member.roles as GuildMember["roles"]).cache.has(staffRole)) return;

        return command.exec({
            client,
            guild: interaction.guild,
            interaction,
            member: interaction.member,
            user: interaction.user
        });
    }
});

process.on("uncaughtException", (error) => {
    return console.error(error);
});

process.on("unhandledRejection", (reason) => {
    return console.error(reason);
});

setListeners(client);
client.login(process.env.DToken);