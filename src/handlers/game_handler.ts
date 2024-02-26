import { Game } from "../models/game";
import { ICommon } from "../interfaces/common";
import { Commands } from "../enums/commands";
import { IAttackInData, IAttackOutData, IFinishData, IRandomAttackData, ITurnData } from "../interfaces/game";
import storage from "../models/storage";
import { objToJSON } from "../utils/obj_to_json";
import { Position } from "../models/position";
import { AttackStatus } from "../enums/attack_status";
import { sendResponseAllPlayers } from "../utils/send_all";
import { updateWinners } from "./update_winners";
import { Winner } from "../models/winners";
import { GameStatus } from "../enums/game_status";

export function firstTurnHandler(game: Game) {
    const turnData: ITurnData = {
        currentPlayer: game.turnId
    };
    const response: ICommon = {
        type: Commands.TURN,
        data: turnData,
        id: 0
    };
    sendResponseAllPlayers(game, response);
}

function playersTurn(game: Game) {
    const turnData: ITurnData = {
        currentPlayer: game.turnId
    };
    let response: ICommon = {
        type: Commands.TURN,
        data: turnData,
        id: 0
    };
    sendResponseAllPlayers(game, response);
}

export function attackHandler(data: string) {
    const parsedData: IAttackInData = JSON.parse(data);
    const game = storage.games.find(g => g.gameId === parsedData.gameId);
    if (game) {
        if (game?.turnId === parsedData.indexPlayer && game.status === GameStatus.CREATED) {
            const player = game?.players.find(p => p.indexPlayer !== parsedData.indexPlayer);
            if (player) {
                const status = player?.takeDamage(parsedData.x, parsedData.y);
                if (status) {
                    attackFeedback(new Position(parsedData.x, parsedData.y),
                        parsedData.indexPlayer,
                        status, game);
                    if (status === AttackStatus.KILLED) {
                        player.deleteShip(parsedData.indexPlayer,
                            status, game);
                    }
                    if (player.ships.length === 0) {
                        finishGame(game, parsedData.indexPlayer);
                        return;
                    }
                    if (status === AttackStatus.MISS) {
                        game.turnId = player.indexPlayer;
                    }
                    playersTurn(game);
                }
            }
        }
    }
}

export function attackFeedback(pos: Position, currentPlayer: number, status: AttackStatus, game: Game) {
    const attackFeedbackData: IAttackOutData = {
        position: pos,
        currentPlayer: currentPlayer,
        status: status
    };
    let response: ICommon = {
        type: Commands.ATTACK,
        data: attackFeedbackData,
        id: 0
    };
    sendResponseAllPlayers(game, response);
}

export function randomAttack(data: string) {
    const parsedData: IRandomAttackData = JSON.parse(data);
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const attackData: IAttackInData = {
        gameId: parsedData.gameId,
        indexPlayer: parsedData.indexPlayer,
        x: x,
        y: y
    }
    attackHandler(objToJSON(attackData));
}

export function finishGame(game: Game, winner: number) {
    game.status = GameStatus.FINISHED;
    const winData: IFinishData = {
        winPlayer: winner
    };
    let response: ICommon = {
        type: Commands.FINISH,
        data: winData,
        id: 0
    };
    const win = storage.winners.find(w => w.id === winner);
    if (win) {
        win.wins++;
    }
    else {
        const user = storage.users.find(u => u.id === winner);
        if (user) storage.winners.push(new Winner(user?.name, user?.id));
    }
    sendResponseAllPlayers(game, response);
    updateWinners();
}