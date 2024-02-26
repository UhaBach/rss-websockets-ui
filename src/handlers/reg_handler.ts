import { IRegInData, IRegOutData } from "../interfaces/player";
import { WebSocket } from "ws";
import storage from "../models/storage";
import { Commands } from "../enums/commands";
import { objToJSON } from "../utils/obj_to_json";
import { updateRooms } from "./room_hanlers";
import { updateWinners } from "./update_winners";
import { ICommon } from "../interfaces/common";

export function regHandler(ws: WebSocket, data: string, id: number) {
    const dataParsed: IRegInData = JSON.parse(data);
    let user = storage.users.find(u => u.name === dataParsed.name);
    const response: ICommon = {
        type: Commands.REGISTR,
        data: null,
        id: 0
    };
    if (user) {
        let regData: IRegOutData = {
            name: user.name,
            index: user.id,
            error: false,
            errorText: ""
        };
        if (dataParsed.password === user.password) {
            response.data = regData;
            storage.addClient(user?.id, ws);
        }
        else {
            regData.error = true;
            regData.errorText = "Invalid password";
            response.data = regData;
        }
    }
    else {
        const userId = storage.addUser(id, dataParsed.name, dataParsed.password);
        user = storage.users.find(u => u.id === userId);
        if (user) {
            storage.addClient(user?.id, ws);
            let regData: IRegOutData = {
                name: user.name,
                index: user.id,
                error: false,
                errorText: ""
            };
            response.data = regData;
        }

    }
    console.log("response:");
    console.log(`{type: \"reg\", \n data: ${JSON.stringify(response.data)}, \n id: 0}`);
    ws.send(objToJSON(response));
    updateRooms();
    updateWinners();
}