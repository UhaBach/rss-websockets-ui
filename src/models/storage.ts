import { Room, RoomUser } from "./room";
import { User } from "./user";
import { Client } from "./client";
import { WebSocket } from "ws";
import { Game } from "./game";
import { Player } from "./player";
import { Winner } from "./winners";

class Storage {
    users: User[] = [];
    winners: Winner[] = [];
    rooms: Room[] = [];
    clients: Client[] = [];
    games: Game[] = [];

    addUser(id: number, name: string, password: string): number {
        this.users.push(new User(id, name, password));
        return id;
    };

    addClient(id: number, ws: WebSocket) {
        this.clients.push(new Client(id, ws));
    }

    createRoom(user: User) {
        this.rooms.push(new Room(user));
    }

    addUserToRoom(index: number, user: User): boolean {
        let room = this.rooms.find(r => r.roomId === index);
        if (room?.roomUsers[0].index === user.id) return false;
        room?.addUserToRoom(user);
        return true;
    }

    createGame(users: RoomUser[]): Game {
        let game = new Game();
        let players: Player[] = [];
        users.forEach(p => {
            players.push(new Player(game.gameId, p.index));
        });
        game.addPlayers(players);
        this.games.push(game);
        return game;
    }
}

let storage = new Storage();

export default storage;