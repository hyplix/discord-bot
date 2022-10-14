import { createCommand } from "../../command";

export default createCommand({
    name: "henlo",
    description: "sends you a sweet henlo message."
}, ({ interaction }) => {
    return interaction.reply({ content: "Henlo"});
});