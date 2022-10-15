import { ApplicationCommandOptionType } from "discord.js";
import { createCommand } from "../../command";

export default createCommand({
    name: "emit",
    description: "Emit a listener for testing purpose",
    staff: true,
    options: [
        {
            type: ApplicationCommandOptionType.String,
            name: "listener",
            description: "The name of the listener.",
            required: true
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "parameter",
            description: "The code for the parameter",
            required: true
        }
    ]
}, (ctk) => {
    const { client, interaction, user } = ctk;

    if(!["1025982046394396722", "290545409481244672"].includes(user.id)) return;

    const name = interaction.options.get("listener");
    const code = interaction.options.get("parameter");

    try {
        const run = eval(`client.emit("${name?.value}", ${code?.value})`);

        if(run) {
            return interaction.reply({ content: `'${name}' listener was successfully emitted.`, ephemeral: true });
        }
    } catch(e) {
        interaction.reply({ content: `Operation has failed - ${e}`, ephemeral: true });
    }
});