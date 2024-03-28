import {Team} from "../Interfaces/TeamInterface";
import {SettingGame} from "../Interfaces/SettingGameInterface";
import {LocalStatisticsInfo, SettingStyleArena} from "../Interfaces/OtherInterface";

export const colorTeam = [0, 250, 120]

export const defaultTeams: Team[] = localStorage.getItem("settingTeam") ? JSON.parse(localStorage.getItem("settingTeam") as string) : [
    {
        id: 0,
        name: "Team_0",
        color: 0,
        pixels: [{id: 0, index: 0, color: 0, type: "solder", lvl: 1}],
        //countPixelsStart: 1
    }
]

export const defaultSettingGame: SettingGame = localStorage.getItem("settingGame") ? JSON.parse(localStorage.getItem("settingGame") as string) : {
    width: 10,
    height: 10,
    speedMove: 100,
    contact: "Exterminate",
    moved: "Default",
    turnOrder: "oneByOne"
}

export const defaultSettingStyleArena: SettingStyleArena = localStorage.getItem("settingStyleArena") ? JSON.parse(localStorage.getItem("settingStyleArena") as string) : {
    border: true,
    infoIndex: false,
    infoCountPixel: false,
    sizeCell: 10,
    infoLvl: false,
    colorBackgroundArena: "#252525",
}

export const defaultLocalStatistic: LocalStatisticsInfo = {
    countGames: 0,
    totalTime: 0,
    totalSteps: 0,
    countWinTeamOne: 0,
    countWinTeamTwo: 0
}


export const styleButton = {
    height: "30px",
    backgroundColor: "#252525",
    color: "white",
    padding: "4px",
    borderRadius: "5px"
}




