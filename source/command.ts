import { 
    ApplicationCommand, 
    ApplicationCommandDataResolvable, 
    Client, 
    CommandInteraction, 
    Guild, 
    GuildMember, 
    User 
} from "discord.js";

export interface CommandContext {
    client: Client;
    guild: Guild;
    interaction: CommandInteraction;
    member: GuildMember;
    user: User;
}

export type createCommandReturnType = ApplicationCommandDataResolvable & {
    post: (client: Client<true>, guildId?: string) => Promise<ApplicationCommand>;
    exec: (ctk: CommandContext) => any;
};

export function createCommand(data: ApplicationCommandDataResolvable & { staff?: boolean }, callback: (ctk: CommandContext) => any): createCommandReturnType {
    const o: Partial<createCommandReturnType> & { [key: string]: any } = {};

    for(const key of Object.keys(data)) {
        o[key] = (data as {[key: string]: any})[key];
    }

    o.post = function(client: Client<true>, guildId?: string) {
        return client.application.commands.create(data, guildId);
    }

    o.exec = function(ctk: CommandContext) {
        return callback(ctk);
    }

    return o as createCommandReturnType;
}