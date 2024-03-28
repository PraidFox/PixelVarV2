import {Team} from "./Interfaces/TeamInterface";
import React from "react";
import {LocalStatisticsInfo} from "./Interfaces/OtherInterface";
import {defaultLocalStatistic} from "./storage/const";
import {copyObject} from "./utils";

export class UtilsLocalStorage {
    private static currentStatistic: LocalStatisticsInfo = localStorage.getItem("localStatisticsInfo") != null ? JSON.parse(localStorage.getItem("localStatisticsInfo")!) : copyObject(defaultLocalStatistic)

    static updateLocalStorage = () => {
        localStorage.setItem("localStatisticsInfo", JSON.stringify(this.currentStatistic))
    }
    static updateLocalStatistics = (totalTime: number, totalSteps: number, checkLostTeam: React.MutableRefObject<boolean>, currentTeams: Team[]) => {
            if (checkLostTeam.current) {
                currentTeams.find(team => team.pixels.length > 0)!.name == "Team_0" ? this.currentStatistic.countWinTeamOne++ : this.currentStatistic.countWinTeamTwo++
            }
            this.currentStatistic.totalSteps += totalSteps
            this.currentStatistic.totalTime += totalTime
            //localStorage.setItem("localStatisticsInfo", JSON.stringify(this.currentStatistic))
    }

    static updateLocalStatisticCountGame = () => {
            this.currentStatistic.countGames++
            //localStorage.setItem("localStatisticsInfo", JSON.stringify(this.currentStatistic))
    }

    static getLocalStatistics = () => {
        return this.currentStatistic
    }

    static setDefaultLocalStatistics = () => {
        this.currentStatistic = copyObject(defaultLocalStatistic)
        //localStorage.setItem("localStatisticsInfo", JSON.stringify(defaultLocalStatistic))
    }
}