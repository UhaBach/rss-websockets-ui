export interface IAddUserToRoomData {
    indexRoom: number
};

export interface ICreateGameData {
    idGame: number,
    idPlayer: number
};

export interface IUpdateRoomData {
    roomId: number,
    roomUsers: [
        {
            name: string,
            index: number
        }
    ]
}