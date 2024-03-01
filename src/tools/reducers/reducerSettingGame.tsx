import {SettingGame} from "../Interface/SettingGameInterface";
import {SettingStyleArena} from "../Interface/OtherInterface";


type Action =
    { type: "CHANGE_WIDTH_ARENA" | "CHANGE_HEIGHT_ARENA" | "CHANGE_SPEED", payload: number }
    | { type: "CHANGE_CONTACT_VALUE" | "CHANGE_MOVED_VALUE", payload: string }
    | {type: "SET_ALL_SETTING", payload: SettingGame}
    | {type: "CHANGE_TURN_ORDER", payload: "oneByOne" | "random"}



export const reducerSettingGame = (state: SettingGame, action: Action): SettingGame => {
    //const maxCell = state.width * state.height

    switch (action.type) {
        case "SET_ALL_SETTING":
            return action.payload
        case "CHANGE_WIDTH_ARENA":
            return {...state, width: action.payload}
        case "CHANGE_HEIGHT_ARENA":
            return {...state, height: action.payload}
        case "CHANGE_CONTACT_VALUE":
            return {...state, contact: action.payload}
        case "CHANGE_MOVED_VALUE":
            return {...state, moved: action.payload}
        case "CHANGE_SPEED":
            return {...state, speedMove: action.payload}
        case "CHANGE_TURN_ORDER":
            return {...state, turnOrder: action.payload}
    }
}