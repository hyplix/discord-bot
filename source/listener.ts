import { Client, ClientEvents } from "discord.js";

export function createListener<K extends keyof ClientEvents>(data: {
    name: K;
    once?: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}, callback: (...args: ClientEvents[K]) => any) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const o: any = {};

    o.add = function(client: Client) {
        return client[data.once ? "once" : "on"](data.name, callback);
    };

    return o;
}