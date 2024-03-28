import {LocalStatisticsInfo} from "./OtherInterface";
import {Team} from "./TeamInterface";

export interface ContextInterfaces {
    localStatistics: LocalStatisticsInfo
    updateLocalStatistics: (totalTime: number, totalSteps: number, lostTeam: boolean, currentTeams: Team[]) => void
    updateLocalStatisticCountGame: () => void
    setDefaultLocalStatistics: () => void
}