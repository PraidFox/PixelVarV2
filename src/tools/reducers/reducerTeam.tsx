import {Pixel, Team} from "../Interface/TeamInterface";
import {SettingGame} from "../Interface/SettingGameInterface";
import {colorTeam} from "../const";
import {getExterminateCloneNoWar, getExterminateCloneYesWar} from "../actionsGame";


export type ActionTeams =
    { type: "CHANGE_COUNT_TEAM", payload: { countTeam: number, settingGame: SettingGame } }
    | { type: "CHANGE_COUNT_PIXELS_TEAM", payload: { teamId: number, countPixel: number, settingGame: SettingGame } }
    | { type: "MOVE_PIXEL", payload: { whoseMove: number, settingGame: SettingGame } }
    | { type: "RESET_TEAM", payload: { settingGame: SettingGame } }
    | { type: "CHECK_MAX_COUNT_PIXELS_TEAM", payload: { settingGame: SettingGame } }

export const reducerTeam = (state: Team[], action: ActionTeams): Team[] => {
    let maxMaxId = Math.max(...state.map(team => team.pixels.map(pixel => pixel.id)).flat())
    let newTeams: Team[] = []

    switch (action.type) {
        case "CHECK_MAX_COUNT_PIXELS_TEAM":
            const maxCountPixels = action.payload.settingGame.height * action.payload.settingGame.width / state.length

            newTeams = []

            state.forEach(team => {
                    let newTeam: Team = {...team}
                    newTeam.pixels = addPixels(state.length, team.pixels.length >= maxCountPixels ? maxCountPixels : team.pixels.length, team.id, action.payload.settingGame, team.color, maxMaxId)
                    newTeam.countPixelsStart = team.pixels.length >= maxCountPixels ? maxCountPixels : team.pixels.length
                    newTeams.push(newTeam)
                }
            )

            return newTeams
        case "RESET_TEAM":
            //const defaultTeams = addPixels(state.length, action.payload.countPixel, action.payload.teamId, action.payload.settingGame, state[action.payload.teamId].color, maxMaxId)
            newTeams = []

            state.forEach(team => {
                    let newTeam: Team = {...team}
                    newTeam.pixels = addPixels(state.length, team.countPixelsStart, team.id, action.payload.settingGame, team.color, maxMaxId)
                    newTeams.push(newTeam)
                }
            )

            return newTeams
        case "CHANGE_COUNT_TEAM":
            let teams: Team[] = JSON.parse(JSON.stringify([...state]))

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
        case "CHANGE_COUNT_PIXELS_TEAM":
            const newPixels = addPixels(state.length, action.payload.countPixel, action.payload.teamId, action.payload.settingGame, state[action.payload.teamId].color, maxMaxId)

            return state.map(team => team.id == action.payload.teamId ? {
                ...team,
                pixels: newPixels,
                countPixelsStart: action.payload.countPixel
            } : team)
        case "MOVE_PIXEL":
            let settingGame = action.payload.settingGame

            let defencedTeams: Team[] = JSON.parse(JSON.stringify([...state.filter(team => team.id != action.payload.whoseMove)]))

            let teamWalks: Team = {...state.find(team => team.id == action.payload.whoseMove)!}

            const indexPixel = Math.floor(Math.random() * teamWalks.pixels.length)
            const movedPixel = teamWalks.pixels[indexPixel]

            const newIndex = getMovement(movedPixel.index + 1, settingGame.height, settingGame.width)

            if (newIndex > settingGame.width * settingGame.height) {
                debugger
            }


            if (state.length == 1) {
                teamWalks.pixels[indexPixel].index = newIndex
            } else {
                defencedTeams.forEach(warTeam => {

                    const defencedPixels = warTeam.pixels.filter(pixel => pixel.index == newIndex) //Получаем пиксели другой команды по тому же индексу, куда переместился пиксель

                    switch (settingGame.contact) {
                        case "Exterminate":
                            if (defencedPixels.length == 0) {
                                //Если пошел на клетку где нет другого чужого пикселя
                                if (settingGame.moved == "Default") {
                                    teamWalks.pixels[indexPixel].index = newIndex
                                } else if (settingGame.moved == "Clone") {
                                    getExterminateCloneNoWar(teamWalks, newIndex, indexPixel, movedPixel, maxMaxId)
                                }
                            } else if (defencedPixels.length == 1) {
                                //Если пошел на клетку где есть один другой пиксель
                                if (settingGame.moved == "Default") {
                                    movedPixel.index = newIndex
                                    warTeam.pixels = warTeam.pixels.filter(pixel => pixel.index != newIndex)
                                } else if (settingGame.moved == "Clone") {
                                    getExterminateCloneYesWar(defencedPixels, movedPixel, warTeam, newIndex, teamWalks, maxMaxId)
                                }
                            } else if (defencedPixels.length > 1) {
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
    let row = Math.ceil(index / arenaWidth)
    let column = Math.ceil(arenaWidth - (row * arenaWidth - index))

    if (column !== 1) {
        options.push("left")
    }
    if (row !== 1) {
        options.push("up")
    }
    if (column !== arenaWidth) {
        options.push("right")
    }
    if (row !== arenaHeight) {
        options.push("down")
    }


    const who = options[Math.floor(Math.random() * options.length)]
    switch (who) {
        case 'left':
            column--
            break
        case 'right':
            column++
            break
        case 'up':
            row--
            break
        case 'down':
            row++
            break
    }

    return row * arenaWidth - (arenaWidth - column) - 1
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

const howManyCount = () => {
    return 123
}