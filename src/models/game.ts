import { GameStatus } from "../enums/game_status";
import { generateId } from "../utils/generateId";
import { Player } from "./player";

export class Game {
    gameId: number;
    players: Player[] = [];
    ready: 0 | 1 | 2 = 0;
    turnId: number = 0;
    status: GameStatus;

    constructor() {
        this.gameId = generateId();
        this.status = GameStatus.CREATED;
    }

    addPlayers(players: Player[]) {
        this.players = players;
    }
}