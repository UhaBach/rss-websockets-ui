import { WebSocket } from "ws";
import storage from "../models/storage";
import { ICommon } from "../interfaces/common";
import { Commands } from "../enums/commands";
import { objToJSON } from "../utils/obj_to_json";
import { ICreateGameData } from "../interfaces/room";
import { sendAllClients } from "../utils/send_all";

export function createRoomHandler(ws: WebSocket) {
    const id = storage.clients.find((cl) => cl.socket === ws)?.id;
    if (id) {
        const user = storage.users.find(u => u.id === id);
        if (user) {
            storage.createRoom(user);
        }
    }
    updateRooms();
}

export function addUserToRoom(ws: WebSocket, data: string) {
    const roomIndex = JSON.parse(data).indexRoom;
    const id = storage.clients.find((cl) => cl.socket === ws)?.id;
    if (id) {
        const user = storage.users.find(u => u.id === id);
        if (user) {
            const userAdded = storage.addUserToRoom(roomIndex, user);
            if (userAdded) {
                updateRooms();
                createGame(roomIndex);
            }
        }
    }
}

function createGame(roomIndex: number) {
    const room = storage.rooms.find(r => r.roomId === roomIndex);
    if (room) {
        const game = storage.createGame(room?.roomUsers);
        let response: ICommon = {
            type: Commands.CRTGAME,
            data: null,
            id: 0
        };
        game.players.forEach(p => {
            const data: ICreateGameData = {
                idGame: game.gameId,
                idPlayer: p.indexPlayer
            };
            response.data = data;
            const socket = storage.clients.find(ws => ws.id === p.indexPlayer);
            socket?.socket.send(objToJSON(response));
        });
    }
}

export function updateRooms() {
    let rooms: ICommon = {
        type: Commands.UPDROOM,
        data: storage.rooms.filter(r => r.roomUsers.length === 1),
        id: 0
    };
    sendAllClients(rooms);
}