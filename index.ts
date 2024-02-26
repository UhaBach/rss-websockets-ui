import { closeHandler, onHandler } from "./src/handlers/ws_handler";
import { httpServer } from "./src/http_server/index";
import { wss } from "./src/ws_server/server";

wss.on("connection", (ws) => {
    console.log("connected");
    ws.on('message', (msg) => {
        console.log('received: %s', msg);
        const cmd = JSON.parse(msg.toString());
        onHandler(ws, cmd);
    });

    ws.on("close", () => {
        closeHandler(ws);
    });
});

const HTTP_PORT = 8181;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);