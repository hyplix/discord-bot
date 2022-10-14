import { createListener } from "../listener";

export default createListener({
    name: "ready",
    once: true
}, (client) => {
    console.log("Client is ready -", client.user.tag);
});