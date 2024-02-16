import { WebSocketServer } from "ws";

export const wss = new WebSocketServer({port:3000});

console.log(wss);

wss.on("connection", (ws) => {
    console.log("connected");
    ws.on('message', function message(data) {
        console.log('received: %s', data);
    });
});