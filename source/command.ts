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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    exec: (ctk: CommandContext) => any;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createCommand(data: ApplicationCommandDataResolvable & { staff?: boolean }, callback: (ctk: CommandContext) => any): createCommandReturnType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const o: Partial<createCommandReturnType> & { [key: string]: any } = {};

    for(const key of Object.keys(data)) {

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        o[key] = (data as {[key: string]: any})[key];
    }

    o.post = function(client: Client<true>, guildId?: string) {
        return client.application.commands.create(data, guildId);
    };

    o.exec = function(ctk: CommandContext) {
        return callback(ctk);
    };

    return o as createCommandReturnType;
}