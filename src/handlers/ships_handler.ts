import { WebSocket } from "ws";
import { IAddShipsData, IStartGameData } from "../interfaces/ships";
import storage from "../models/storage";
import { Player } from "../models/player";
import { Game } from "../models/game";
import { ICommon } from "../interfaces/common";
import { Commands } from "../enums/commands";
import { objToJSON } from "../utils/obj_to_json";
import { firstTurnHandler } from "./game_handler";

export function addShipsHandler(ws: WebSocket, data: string) {
    const parsedData: IAddShipsData = JSON.parse(data);
    const game = storage.games.find(g => g.gameId === parsedData.gameId);
    if (game) {
        let player = game.players.find(p => p.indexPlayer === parsedData.indexPlayer);
        if (player) {
            player.addShips(parsedData.ships);
            if (player.ready) game.ready++;
            if (game.turnId === 0) game.turnId = player.indexPlayer;
            console.log(game.turnId);
            if (game.ready === 2) {
                startGame(game);
            }
        }
    }
}

function startGame(game: Game) {
    let response: ICommon = {
        type: Commands.STARTGAME,
        data: null,
        id: 0
    };
    game.players.forEach(p => {
        const playerData: IStartGameData = {
            ships: p.ships,
            currentPlayerIndex: p.indexPlayer
        };
        response.data = playerData;
        storage.clients.find(cl => cl.id === p.indexPlayer)?.socket.send(objToJSON(response));
    });
    firstTurnHandler(game);
}