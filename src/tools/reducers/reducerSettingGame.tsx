import {SettingGame} from "../Interfaces/SettingGameInterface";
import {checkInterval} from "../utils";

export type ActionSettingGame =
    { type: "CHANGE_WIDTH_ARENA" | "CHANGE_HEIGHT_ARENA" | "CHANGE_SPEED", payload: number }
    | { type: "CHANGE_CONTACT_VALUE" | "CHANGE_MOVED_VALUE", payload: string }
    | {type: "SET_ALL_SETTING", payload: SettingGame}
    | {type: "CHANGE_TURN_ORDER", payload: "oneByOne" | "random"}

export const reducerSettingGame = (state: SettingGame, action: ActionSettingGame): SettingGame => {



    switch (action.type) {
        case "SET_ALL_SETTING":
            return action.payload
        case "CHANGE_WIDTH_ARENA":
            return {...state, width: checkInterval(1, 20, action.payload)}
        case "CHANGE_HEIGHT_ARENA":
            return {...state, height: checkInterval(1, 20, action.payload)}
        case "CHANGE_CONTACT_VALUE":
            return {...state, contact: action.payload}
        case "CHANGE_MOVED_VALUE":
            return {...state, moved: action.payload}
        case "CHANGE_SPEED":
            return {...state, speedMove: checkInterval(0, 1000, action.payload) }
        case "CHANGE_TURN_ORDER":
            return {...state, turnOrder: action.payload}
    }
}

