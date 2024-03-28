import React, {createContext, ReactNode, useEffect, useLayoutEffect, useState} from "react";
import {LocalStatisticsInfo} from "../../tools/Interfaces/OtherInterface";
import {defaultLocalStatistic} from "../../tools/storage/const";
import {Team} from "../../tools/Interfaces/TeamInterface";
import {copyObject} from "../../tools/utils";
import {ContextInterfaces} from "../../tools/Interfaces/ContextInterfaces";

export const LocalStatisticsContext = createContext<ContextInterfaces>({
        localStatistics: copyObject(defaultLocalStatistic),
        updateLocalStatistics: (totalTime: number, totalSteps: number, lostTeam: boolean, currentTeams: Team[]) => {
        },
        updateLocalStatisticCountGame: () => {
        },
        setDefaultLocalStatistics: () => {
        }
    }
)


export const LocalStatisticsProvider = ({children}: {children: ReactNode}) => {
    const [localStatistics, setLocalStatistics] = useState<LocalStatisticsInfo>(copyObject(defaultLocalStatistic))

    useLayoutEffect(() => {
        const statistics  = localStorage.getItem("localStatisticsInfo")
        if(statistics) {
            setLocalStatistics(JSON.parse(statistics))
        }
    }, []);

    useEffect(() => {
        const updateLocalStorage = () => {
            localStorage.setItem("localStatisticsInfo", JSON.stringify(localStatistics))
        }
        window.addEventListener('beforeunload', updateLocalStorage);
        return () => {
            window.removeEventListener('beforeunload', updateLocalStorage);
        };
    }, [localStatistics]);

    const updateLocalStatistics = (totalTime: number, totalSteps: number, lostTeam: boolean, currentTeams: Team[]) => {
        let newStatistic = copyObject(localStatistics)

        if (lostTeam) {
            currentTeams.find(team => team.pixels.length > 0)!.name == "Team_0" ? newStatistic.countWinTeamOne++ : newStatistic.countWinTeamTwo++
        }
        newStatistic.totalSteps += totalSteps
        newStatistic.totalTime += totalTime

        setLocalStatistics(r => ({...r, ...newStatistic}))
    }

    const updateLocalStatisticCountGame = () => {
        setLocalStatistics(r => ({...r, countGames: r.countGames + 1}))
    }
    const setDefaultLocalStatistics = () => {
        setLocalStatistics(copyObject(defaultLocalStatistic))
    }

    console.log("Вызвал", localStatistics)
    return (
        <LocalStatisticsContext.Provider
            value={{localStatistics, updateLocalStatistics, updateLocalStatisticCountGame, setDefaultLocalStatistics}}>
            {children}
        </LocalStatisticsContext.Provider>
    )
}


