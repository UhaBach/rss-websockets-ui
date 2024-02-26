import { WebSocketServer } from "ws";

export const wss = new WebSocketServer({ port: 3000 });

console.log(wss);

//  When declaring a connection listener in this file,
//  an error occurs when connecting to a web socket server;
//  when declaring a connection listener in index.ts, everything works

// wss.on("connection", (ws) => {
//     console.log("connected");
//     ws.on('message', (msg) => {
//         console.log('received: %s', msg);
//         const cmd = JSON.parse(msg.toString());
//         onHandler(ws, cmd);
//     });
// });