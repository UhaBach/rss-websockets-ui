import { Commands } from "../enums/commands";
// TODO: попробовать запихать интерфейсы в интерфейс
export interface ICommon {
    type: Commands,
    data: any,
    id: number
}