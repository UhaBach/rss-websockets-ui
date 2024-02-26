import { AttackStatus } from "../enums/attack_status";
import { Position } from "../models/position";

export interface IAttackInData {
    gameId: number,
    x: number,
    y: number,
    indexPlayer: number
};

export interface IAttackOutData {
    position: Position,
    currentPlayer: number,
    status: AttackStatus
};

export interface IRandomAttackData {
    gameId: number,
    indexPlayer: number
};

export interface ITurnData {
    currentPlayer: number
};

export interface IFinishData {
    winPlayer: number
}