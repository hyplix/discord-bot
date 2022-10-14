import { Client, ClientEvents } from "discord.js";

export function createListener<K extends keyof ClientEvents>(data: {
    name: K;
    once?: boolean;
}, callback: (...args: ClientEvents[K]) => any) {
    const o: any = {};

    o.add = function(client: Client) {
        return client[data.once ? "once" : "on"](data.name, callback);
    }

    return o;
}