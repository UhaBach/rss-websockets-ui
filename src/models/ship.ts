import { ShipTypes } from "../enums/ship_types";
import { Position } from "./position";

export class Ship {
    position: Position;
    direction: boolean;
    length: number;
    type: ShipTypes;
}