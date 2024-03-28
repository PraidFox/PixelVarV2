import {SettingStyleArena} from "../Interfaces/OtherInterface";
import {checkInterval} from "../utils";

export type ActionSettingStyleArena = {type: "CHANGE_BORDER" | "CHANGE_INFO_INDEX" | "CHANGE_INFO_COUNT_PIXEL" | "CHANGE_INFO_LVL_PIXEL", payload: boolean}
    | {type: "CHANGE_SIZE_CELL", payload: number}
    | {type: "SET_ALL_SETTING", payload: SettingStyleArena}
| {type: "CHANGE_COLOR_ARENA", payload: string}
export const reducerSettingStyleArena = (state: SettingStyleArena, action: ActionSettingStyleArena) : SettingStyleArena => {



    switch (action.type) {
        case "SET_ALL_SETTING":
            return action.payload
        case "CHANGE_BORDER":
            return {...state, border: action.payload}
        case "CHANGE_INFO_INDEX":
            return {...state, infoIndex: action.payload}
        case "CHANGE_INFO_COUNT_PIXEL":
            return {...state, infoCountPixel: action.payload}
        case "CHANGE_SIZE_CELL":
            return {...state, sizeCell: checkInterval(1,40, action.payload)}
        case "CHANGE_INFO_LVL_PIXEL":
            return {...state, infoLvl: action.payload}
        case "CHANGE_COLOR_ARENA":
            return {...state, colorBackgroundArena: action.payload}
    }
}