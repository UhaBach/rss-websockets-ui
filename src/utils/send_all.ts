import { ICommon } from "../interfaces/common";
import { Game } from "../models/game";
import storage from "../models/storage";
import { objToJSON } from "./obj_to_json";

export function sendResponseAllPlayers(game: Game, response: ICommon) {
    const responseStr = objToJSON(response);
    game.players.forEach(p => {
        storage.clients.find(cl => cl.id === p.indexPlayer)?.socket.send(responseStr);
    });
}

export function sendAllClients(response: ICommon) {
    const responseStr = objToJSON(response);
    storage.clients.forEach(cl => {
        cl.socket.send(responseStr);
    });
}