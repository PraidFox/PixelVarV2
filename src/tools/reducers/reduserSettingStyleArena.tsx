import {SettingStyleArena} from "../Interface/OtherInterface";

type Action = {type: "CHANGE_BORDER" | "CHANGE_INFO_INDEX" | "CHANGE_INFO_COUNT_PIXEL", payload: boolean}
    | {type: "CHANGE_SIZE_CELL", payload: number}
    | {type: "SET_ALL_SETTING", payload: SettingStyleArena}
export const reducerSettingStyleArena = (state: SettingStyleArena, action: Action) : SettingStyleArena => {
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
            return {...state, sizeCell: action.payload}
    }
}