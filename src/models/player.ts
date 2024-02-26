import { WebSocket } from "ws";
import { AttackStatus } from "../enums/attack_status";
import { Ship, ShipWithPositions } from "./ship";
import { Position } from "./position";
import { Game } from "./game";
import { attackFeedback } from "../handlers/game_handler";

export class Player {
    gameId: number;
    indexPlayer: number;
    ships: Ship[] = [];
    ready: boolean = false;
    shipPositions: ShipWithPositions[] = [];
    shipForDelete: ShipWithPositions | null = null;

    constructor(gameId: number, userId: number) {
        this.gameId = gameId;
        this.indexPlayer = userId;
    }

    addShips(ships: Ship[]) {
        this.ships = ships;
        this.ships.forEach(s => {
            this.shipPositions.push(new ShipWithPositions(s));
        });

        if (this.ships.length === 10) this.ready = true;
    }

    takeDamage(x: number, y: number): AttackStatus {
        let status = AttackStatus.MISS;
        this.shipPositions.forEach(sp => {
            const position = sp.positions.findIndex(p => p.x === x && p.y === y);
            if (position !== -1) {
                console.log("position", position);
                sp.positions.splice(position, 1);
                if (sp.positions.length > 0) {
                    status = AttackStatus.SHOT;
                }
                else {
                    status = AttackStatus.KILLED;
                    this.shipForDelete = sp;
                }
            }
        });
        return status;
    }

    deleteShip(currentPlayer: number, status: AttackStatus, game: Game) {
        if (this.shipForDelete) {
            let ship = this.ships.find(s => s.position.y === this.shipForDelete?.startPosition.y
                && s.position.x === this.shipForDelete?.startPosition.x);
            if (ship) {
                this.sendArea(ship, currentPlayer, status, game);
            }

            let delIndex = this.ships.findIndex(s => s.position.y === this.shipForDelete?.startPosition.y
                && s.position.x === this.shipForDelete?.startPosition.x);
            this.ships.splice(delIndex, 1);
            delIndex = this.shipPositions.findIndex(s => s.startPosition.y === this.shipForDelete?.startPosition.y
                && s.startPosition.x === this.shipForDelete?.startPosition.x);
            this.shipPositions.splice(delIndex, 1);
            this.shipForDelete = null;
        }

    }

    sendArea(ship: Ship, currentPlayer: number, status: AttackStatus, game: Game) {
        let area: Position[] = [];
        let x = ship.position.x;
        let y = ship.position.y;
        if (ship.direction === true) {
            for (let i = 0; i < ship.length; i++) {
                y = ship.position.y + i;
                if (i === 0) {
                    area.push(new Position(x - 1, y - 1));
                    area.push(new Position(x, y - 1));
                    area.push(new Position(x + 1, y - 1));
                }
                area.push(new Position(x - 1, y));
                area.push(new Position(x + 1, y));
                if (i === ship.length - 1) {
                    area.push(new Position(x - 1, y + 1));
                    area.push(new Position(x, y + 1));
                    area.push(new Position(x + 1, y + 1));
                }
            }
        }
        if (ship.direction === false) {
            for (let i = 0; i < ship.length; i++) {
                x = ship.position.x + i;
                if (i === 0) {
                    area.push(new Position(x - 1, y - 1));
                    area.push(new Position(x - 1, y));
                    area.push(new Position(x - 1, y + 1));
                }
                area.push(new Position(x, y - 1));
                area.push(new Position(x, y + 1));
                if (i === ship.length - 1) {
                    area.push(new Position(x + 1, y - 1));
                    area.push(new Position(x + 1, y));
                    area.push(new Position(x + 1, y + 1));
                }
            }
        }
        area.forEach(p => {
            if (p.x > -1 && p.x < 10 && p.y > -1 && p.y < 10) {
                attackFeedback(p, currentPlayer, status, game);
            }
        });
    }
}