import { Commands } from "../enums/commands";

export interface IRegIn {
    type: Commands,
    data: {
        name: string,
        password: string
    },
    id: number
};

export interface IRegOut {
    type: Commands,
    data: {
        name: string,
        index: number,
        error: boolean,
        errorText: string
    },
    id: number
};

export interface IUpdateWinners {
    type: Commands,
    data: [
        {
            name: string,
            wins: number
        }
    ],
    id: number
};