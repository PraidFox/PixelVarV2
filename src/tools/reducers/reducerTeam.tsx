import {Pixel, Team} from "../Interface/TeamInterface";
import {SettingGame} from "../Interface/SettingGameInterface";
import {colorTeam} from "../const";


type Action =
    { type: "CHANGE_COUNT_TEAM", payload: { countTeam: number, settingGame: SettingGame } }
    | { type: "CHANGE_PIXELS_TEAM", payload: { teamId: number, countPixel: number, settingGame: SettingGame } }
    | { type: "MOVE_PIXEL", payload: { whoseMove: number, settingGame: SettingGame } }
    | { type: "RESET_TEAM", payload: { settingGame: SettingGame } }

export const reducerTeam = (state: Team[], action: Action): Team[] => {
    let maxMaxId = Math.max(...state.map(team => team.pixels.map(pixel => pixel.id)).flat())

    switch (action.type) {
        case "RESET_TEAM":
            //const defaultTeams = addPixels(state.length, action.payload.countPixel, action.payload.teamId, action.payload.settingGame, state[action.payload.teamId].color, maxMaxId)
            console.log("teams", state)

            let newTeams: Team[] = []

            state.forEach(team => {
                    let newTeam: Team = {...team}
                    newTeam.pixels = addPixels(state.length, team.countPixelsStart, team.id, action.payload.settingGame, team.color, maxMaxId)
                    newTeams.push(newTeam)
                }
            )

            return newTeams
        case "CHANGE_COUNT_TEAM":
            let teams: Team[] = [...state]

            if (state.length > action.payload.countTeam) {
                teams = state.filter(team => team.id < action.payload.countTeam)
            } else {
                for (let i = 0; i < action.payload.countTeam; i++) {
                    if (teams.filter(team => team.id == i).length == 0) {
                        //const colorTeam = Math.floor(Math.random() * 16777215).toString(16)
                        const color = colorTeam[i]

                        teams.push({
                            id: i,
                            name: `Team_${i}`,
                            color: color,
                            pixels: [{
                                id: i,
                                index: i == 0 ? 0 : action.payload.settingGame.width * action.payload.settingGame.height - 1,
                                color: color,
                                type: "solder",
                                lvl: 1
                            }],
                            countPixelsStart: 1,
                        })
                    }
                }
            }

            return teams
        case "CHANGE_PIXELS_TEAM":
            const newPixels = addPixels(state.length, action.payload.countPixel, action.payload.teamId, action.payload.settingGame, state[action.payload.teamId].color, maxMaxId)

            return state.map(team => team.id == action.payload.teamId ? {
                ...team,
                pixels: newPixels,
                countPixelsStart: action.payload.countPixel
            } : team)
        case "MOVE_PIXEL":
            let settingGame = action.payload.settingGame

            let defencedTeams = [...state.filter(team => team.id != action.payload.whoseMove)]
            let teamWalks: Team = {...state.find(team => team.id == action.payload.whoseMove)!}

            const indexPixel = Math.floor(Math.random() * teamWalks.pixels.length)
            const movedPixel = teamWalks.pixels[indexPixel]
            const newIndex = getMovement(movedPixel.index, settingGame.height, settingGame.width)

            if (state.length == 1) {
                teamWalks.pixels[indexPixel].index = newIndex
            } else {
                defencedTeams.forEach(warTeam => {

                    const defencedPixel = warTeam.pixels.filter(pixel => pixel.index == newIndex) //Получаем пиксели другой команды по тому же индексу, куда переместился пиксель

                    switch (settingGame.contact) {
                        case "Exterminate":
                            if (defencedPixel.length == 0) {
                                if (settingGame.moved == "Default") {
                                    teamWalks.pixels[indexPixel].index = newIndex
                                } else if (settingGame.moved == "Clone") {

                                    let pixelUpLvl = checkNeedUpLvl(teamWalks, newIndex)

                                    if (pixelUpLvl) {
                                        pixelUpLvl.lvl = pixelUpLvl.lvl + teamWalks.pixels[indexPixel].lvl
                                        movedPixel.lvl = 1
                                    } else {
                                        teamWalks.pixels.push({
                                            id: maxMaxId + 1,
                                            index: newIndex,
                                            color: movedPixel.color,
                                            type: movedPixel.type,
                                            lvl: movedPixel.lvl
                                        })
                                        if (movedPixel.lvl < 100) {
                                            movedPixel.lvl = 1
                                        }
                                    }
                                }
                            } else if (defencedPixel.length == 1) {
                                if (settingGame.moved == "Default") {
                                    movedPixel.index = newIndex
                                    warTeam.pixels = warTeam.pixels.filter(pixel => pixel.index != newIndex)
                                } else if (settingGame.moved == "Clone") {
                                    if (defencedPixel[0].lvl > movedPixel.lvl) {
                                        defencedPixel[0].lvl = defencedPixel[0].lvl + movedPixel.lvl
                                        movedPixel.lvl = 1
                                    } else {
                                        warTeam.pixels = warTeam.pixels.filter(pixel => pixel.index != newIndex)

                                        teamWalks.pixels.push({
                                            id: maxMaxId + 1,
                                            index: newIndex,
                                            color: movedPixel.color,
                                            type: movedPixel.type,
                                            lvl: defencedPixel[0].lvl + movedPixel.lvl
                                        })
                                        if (movedPixel.lvl < 100) {
                                            movedPixel.lvl = 1
                                        }
                                    }

                                }
                            } else if (defencedPixel.length > 1) {
                                console.log("Я тут")

                                teamWalks.pixels = teamWalks.pixels.filter(pixel => pixel.index != indexPixel)
                            }

                            break;
                        case "Take":
                            const takePixels = warTeam.pixels.filter(pixel => pixel.index == movedPixel.index)

                            console.log("Типо забрал")
                            break
                    }

                })
            }


            return [teamWalks, ...defencedTeams].sort((a, b) => a.id > b.id ? 1 : -1)
    }
}

const locationDetermination = (numberTeam: number, settingGame: SettingGame, index: number, countTeam: number) => {
    switch (countTeam) {
        case 1:
            return index
        case 2:
            if (numberTeam == 0) {
                return index
            } else {
                return settingGame.width * settingGame.height - index - 1
            }
        default:
            return 0
    }
}

const getMovement = (index: number, arenaHeight: number, arenaWidth: number) => {
    let options: string[] = []
    let column = index % arenaHeight
    let row = Math.floor(index / arenaHeight)

    if (column !== 0) {
        options.push("up")
    }
    if (row !== 0) {
        options.push("left")
    }
    if (column !== arenaHeight - 1) {
        options.push("down")
    }
    if (row !== arenaWidth - 1) {
        options.push("right")
    }


    switch (options[Math.floor(Math.random() * options.length)]) {
        case 'left':
            row--
            break
        case 'right':
            row++
            break
        case 'up':
            column--
            break
        case 'down':
            column++
            break
    }

    return row * arenaWidth + column
}

const addPixels = (countTeam: number, countPixel: number, teamId: number, settingGame: SettingGame, color: number, maxMaxId: number) => {
    let newPixels: Pixel[] = []


    for (let i = 0; i < countPixel; i++) {
        newPixels.push({
            id: maxMaxId + i,
            index: locationDetermination(teamId, settingGame, i, countTeam),
            color: color,
            type: "solder",
            lvl: 1
        })
    }

    return newPixels
}

const checkNeedUpLvl = (team: Team, index: number): Pixel | undefined => {
    const findPixel = team.pixels.find(pixel => pixel.index == index)
    if (findPixel) {
        return findPixel
    } else {
        return undefined
    }
}