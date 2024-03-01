import {Team} from "./TeamInterface";

export interface SettingGame {
    width: number
    height: number
    speedMove: number,
    contact: string,
    moved: string,
    turnOrder: "oneByOne" | "random"
}

// export interface Arena extends SettingArena{
//     teams: Team[];
// }

export interface ActionArena {
    type: 'createArea'
    // payload?: {
    //     pixels: { pixelsTeamOne: Pixel[], pixelsTeamTwo: Pixel[] }
    //     pixel: Pixel
    // }
}

//    1   2   3
// 1[[1,1], [1,2], [1,3]]
// 2[[2,1], [2,2], [2,3]]
// 3[[3,1], [3,2], [3,3]]
//
//      1   2   3       4
// 1    [1],  [2],  [3],  [4]
// 2    [5],  [6],  [7],  [8]
// 3    [9],  [10], [11], [12]
//4     [13], [14], [15], [16]