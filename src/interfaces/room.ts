import { Commands } from "../enums/commands";

export interface ICreateRoom {
    type: Commands,
    data: string,
    id: number
};

export interface IAddUserToRoom {
    type: Commands,
    data: {
        indexRoom: number
    },
    id: number
};

export interface ICreateGame {
    type: Commands,
    data: {
        idGame: number,
        idPlayer: number
    },
    id: number
};

export interface IUpdateRoom {
    type: Commands,
    data: [
        {
            roomId: number,
            roomUsers: [
                {
                    name: string,
                    index: number
                }
            ]
        }
    ],
    id: number
}