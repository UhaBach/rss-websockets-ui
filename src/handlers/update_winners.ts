import { Commands } from "../enums/commands";
import { ICommon } from "../interfaces/common";
import storage from "../models/storage";
import { objToJSON } from "../utils/obj_to_json";
import { sendAllClients } from "../utils/send_all";

export function updateWinners() {

    const winners: ICommon = {
        type: Commands.UPDWIN,
        data: [],
        id: 0
    };
    storage.winners.forEach(w => {
        winners.data.push({ name: w.name, wins: w.wins });
    });
    sendAllClients(winners);
}