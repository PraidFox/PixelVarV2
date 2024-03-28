import {Team} from "./TeamInterface";

export interface SettingGame {
    width: number
    height: number
    speedMove: number,
    contact: string,
    moved: string,
    turnOrder: "oneByOne" | "random"
}
