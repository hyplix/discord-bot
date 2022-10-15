import { Client } from "discord.js";
import settings from "./settings";
import glob from "glob";
import path from "path";

export function setCommands(client: Client, cache: Map<any, any>) {
    for(const cmdPath of glob.sync(settings.paths.command)) {
        const command = require(path.resolve(cmdPath)).default;
        
        if(command && command.name) {
            command.post(client, settings.guildId);
            cache.set(command.name, command);
        }
    }
}

export function setListeners(client: Client) {
    for(const listenerPath of glob.sync(settings.paths.listener)) {
        const listener = require(path.resolve(listenerPath)).default;

        if(listener) listener.add(client);
    }
}

export function ordinalNumber(number: number) {
    const str = number.toString();
    
    if(str.endsWith("1")) return str + "st";
    if(str.endsWith("2")) return str + "nd";
    if(str.endsWith("3")) return str + "rd";

    return str + "th";
}