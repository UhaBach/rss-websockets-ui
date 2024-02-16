import { AttackStatus } from "../enums/attack_status";
import { Commands } from "../enums/commands";
import { Position } from "../models/position";

export interface IAttackIn {
    type: Commands,
    data: {
        gameId: number,
        x: number,
        y: number,
        indexPlayer: number
    },
    id: number
};

export interface IAttackOut {
    type: Commands,
    data: {
        position: Position,
        currentPlayer: number,
        status: AttackStatus
    },
    id: number
};

export interface IRandomAttack {
    type: Commands,
    data: {
        gameId: number,
        indexPlayer: number
    },
    id: number
};

export interface ITurn {
    type: Commands,
    data: {
        currentPlayer: number
    },
    id: number
};

export interface IFinish {
    type: Commands,
    data: {
        winPlayer: number
    },
    id: number
}