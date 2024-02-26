import { Commands } from "../enums/commands";
import { ICommon } from "../interfaces/common";
import { addUserToRoom, createRoomHandler } from "./room_hanlers";
import { regHandler } from "./reg_handler";
import { WebSocket } from "ws";
import { generateId } from "../utils/generateId";
import { addShipsHandler } from "./ships_handler";
import { attackHandler, finishGame, randomAttack } from "./game_handler";
import storage from "../models/storage";

export async function onHandler(ws: WebSocket, cmd: ICommon) {
    switch (cmd.type) {
        case Commands.REGISTR:
            regHandler(ws, cmd.data, generateId());
            break;
        case Commands.CRTROOM:
            createRoomHandler(ws);
            break;
        case Commands.ADDUSERTOROOM:
            addUserToRoom(ws, cmd.data);
            break;
        case Commands.ADDSHIPS:
            addShipsHandler(ws, cmd.data);
            break;
        case Commands.ATTACK:
            attackHandler(cmd.data);
            break;
        case Commands.RNDATTACK:
            randomAttack(cmd.data);
            break;
        default:
            break;
    }
}

export function closeHandler(ws: WebSocket) {
    const client = storage.clients.find(cl => cl.socket === ws);
    const clientIndex = storage.clients.findIndex(cl => cl.socket === ws);
    storage.clients.splice(clientIndex, 1);
    const game = storage.games.find(g => {
        const disconnectedPlayer = g.players.findIndex(p => p.indexPlayer === client?.id);
        if (disconnectedPlayer) {
            return g;
        }
    });
    if (game) {
        const disconnectedIndex = game.players.findIndex(p => p.indexPlayer === client?.id);
        if (disconnectedIndex) {
            game.players.splice(disconnectedIndex, 1);
            finishGame(game, game.players[0].indexPlayer);
        }
    }

    ws.close();
    console.log("closed");
}