import {Pixel, Team} from "./Interfaces/TeamInterface";


export const getExterminateCloneNoWar = (teamWalks: Team, newIndex: number, indexPixel: number, movedPixel: Pixel, maxMaxId: number) => {

    let pixelUpLvl = checkNeedUpLvl(teamWalks, newIndex)

    if(!pixelUpLvl){
        teamWalks.pixels.push({
            id: maxMaxId + 1,
            index: newIndex,
            color: movedPixel.color,
            type: movedPixel.type,
            lvl: movedPixel.lvl
        })
    }
}

export const getExterminateCloneYesWar = (defencedPixels: Pixel[], movedPixel: Pixel, warTeam: Team, newIndex: number, teamWalks: Team, maxMaxId:number) => {
        warTeam.pixels = warTeam.pixels.filter(pixel => pixel.index != newIndex)
        teamWalks.pixels.push({
            id: maxMaxId + 1,
            index: newIndex,
            color: movedPixel.color,
            type: movedPixel.type,
            lvl: movedPixel.lvl
        })
}

//ЗДЕСЬ С ПОВЫШЕНИЕМ УРОВНЯ
// export const getExterminateCloneNoWar = (teamWalks: Team, newIndex: number, indexPixel: number, movedPixel: Pixel, maxMaxId: number) => {
//     let pixelUpLvl = checkNeedUpLvl(teamWalks, newIndex)
//
//     if (pixelUpLvl) {
//         pixelUpLvl.lvl = pixelUpLvl.lvl + teamWalks.pixels[indexPixel].lvl
//         movedPixel.lvl = 1
//     } else {
//         teamWalks.pixels.push({
//             id: maxMaxId + 1,
//             index: newIndex,
//             color: movedPixel.color,
//             type: movedPixel.type,
//             lvl: movedPixel.lvl
//         })
//         movedPixel.lvl = 1
//         // if (movedPixel.lvl < 100) {
//         //     movedPixel.lvl = 1
//         // }
//     }
// }
//
// export const getExterminateCloneYesWar = (defencedPixels: Pixel[], movedPixel: Pixel, warTeam: Team, newIndex: number, teamWalks: Team, maxMaxId:number) => {
//     if (defencedPixels[0].lvl > movedPixel.lvl) {
//         defencedPixels[0].lvl = defencedPixels[0].lvl - movedPixel.lvl
//         movedPixel.lvl = 1
//     } else {
//         warTeam.pixels = warTeam.pixels.filter(pixel => pixel.index != newIndex)
//         teamWalks.pixels.push({
//             id: maxMaxId + 1,
//             index: newIndex,
//             color: movedPixel.color,
//             type: movedPixel.type,
//             lvl: defencedPixels[0].lvl === movedPixel.lvl ? movedPixel.lvl : movedPixel.lvl - defencedPixels[0].lvl
//         })
//         movedPixel.lvl = 1
//
//     }
// }


const checkNeedUpLvl = (team: Team, index: number): Pixel | undefined => {
    const findPixel = team.pixels.find(pixel => pixel.index == index)
    if (findPixel) {
        return findPixel
    } else {
        return undefined
    }
}