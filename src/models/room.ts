import { generateId } from "../utils/generateId";
import { User } from "./user";

export class Room {
    roomId: number;
    roomUsers: RoomUser[] = []; // players[0] - host

    constructor(host: User) {
        this.roomId = generateId();
        this.roomUsers.push(new RoomUser(host));
    }

    addUserToRoom(user: User) {
        this.roomUsers.push(new RoomUser(user));
    }
}

export class RoomUser {
    index: number;
    name: string;

    constructor(user: User) {
        this.index = user.id;
        this.name = user.name;
    }
}