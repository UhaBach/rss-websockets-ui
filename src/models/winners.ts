export class Winner {
    id: number;
    name: string;
    wins: number;

    constructor(name: string, id: number) {
        this.id = id;
        this.name = name;
        this.wins = 1;
    }
}