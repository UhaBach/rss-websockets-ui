import { ShipTypes } from "../enums/ship_types";
import { Position } from "./position";

export class Ship {
    position: Position;
    direction: boolean; //false = horizontal
    length: number;
    type: ShipTypes;

    constructor(ship: Ship) {
        this.direction = ship.direction;
        this.length = ship.length;
        this.position = ship.position;
        this.type = ship.type;
    }
}

export class ShipWithPositions {
    startPosition: Position;
    positions: Position[] = [];

    constructor(ship: Ship) {
        this.startPosition = ship.position;
        this.parseShipsPositions(ship);
    }

    parseShipsPositions(ship: Ship) {
        this.positions.push(ship.position);
        let x = ship.position.x;
        let y = ship.position.y;
        if (ship.direction === true) {
            for (let i = 1; i < ship.length; i++) {
                y += 1;
                this.positions.push(new Position(x, y));
            }
        }
        if (ship.direction === false) {
            for (let i = 1; i < ship.length; i++) {
                x += 1;
                this.positions.push(new Position(x, y));
            }
        }
    }
}