import React, {useEffect, useState} from "react";
import {LocalStatisticsInfo} from "../../tools/Interfaces/OtherInterface";

export const LocalStatistics = ({updateLocalStatistic, setUpdateLocalStatistic}: {updateLocalStatistic: boolean, setUpdateLocalStatistic: (bool: boolean) => void}) => {

    const [localStatistics, setLocalStatistics] = useState<LocalStatisticsInfo>()

    useEffect(() => {
        if(updateLocalStatistic){
            const defaultLocalStatistics: LocalStatisticsInfo = localStorage.getItem("localStatisticsInfo") ? JSON.parse(localStorage.getItem("localStatisticsInfo") as string) : {
                countGames: 0,
                totalTime: 0,
                totalSteps: 0,
                countWinTeamOne: 0,
                countWinTeamTwo: 0
            }

            setLocalStatistics(defaultLocalStatistics)
            setUpdateLocalStatistic(false)
        }
    }, [updateLocalStatistic]);

return (
    <div style={{width: "25%"}}>
        <fieldset>
            <legend style={{color: "white"}}>Локальная статистика (в разработке)</legend>
            <span style={{color: "white"}}>Количество игр:  {localStatistics?.countGames}</span>
            <br/>
            <br/>
            <span style={{color: "white"}}>Общее время: {localStatistics?.totalTime}</span>
            <br/>
            <br/>
            <span style={{color: "white"}}>Общее количество шагов: {localStatistics?.totalSteps}</span>
            <br/>
            <br/>
            <span style={{color: "white"}}>Побед Красных пикселей: {localStatistics?.countWinTeamOne}</span>
            <br/>
            <br/>
            <span style={{color: "white"}}>Побед Синих пикселей: {localStatistics?.countWinTeamTwo}</span>
        </fieldset>
    </div>
)
}