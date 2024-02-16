import { Commands } from "../enums/commands";
import { Ship } from "../models/ship";

export interface IAddShips {
    type: Commands,
    data: {
        gameId: number,
        ships: Ship[],
        indexPlayer: number
    }
}

export interface IStartGame {
    type: Commands,
    data: {
        ships: Ship[],
        currentPlayerIndex: number
    },
    id: number
}