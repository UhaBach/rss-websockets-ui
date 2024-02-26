import { Commands } from "../enums/commands";

export interface IRegInData {
    name: string,
    password: string
};

export interface IRegOutData {
    name?: string,
    index?: number,
    error: boolean,
    errorText?: string
};