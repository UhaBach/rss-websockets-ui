import { Ship } from "../models/ship";

export interface IAddShipsData {
    gameId: number,
    ships: Ship[],
    indexPlayer: number
}

export interface IStartGameData {
    ships: Ship[],
    currentPlayerIndex: number
}