import { Client } from "discord.js";
import glob from "glob";
import path from "path";

export function setCommands(client: Client, cache: Map<any, any>) {
    for(const cmdPath of glob.sync("./dist/commands/**/*.js")) {
        const command = require(path.resolve(cmdPath)).default;
        
        if(command && command.name) {
            command.post(client, process.env.GuildId);
            cache.set(command.name, command);
        }
    }
}