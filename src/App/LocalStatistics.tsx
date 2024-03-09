import React, {useEffect, useState} from "react";
import {LocalStatisticsInfo} from "../tools/Interface/OtherInterface";

export const LocalStatistics = () => {
    const [localStatistics, setLocalStatistics] = useState<LocalStatisticsInfo>()

    useEffect(() => {
        const defaultLocalStatistics: LocalStatisticsInfo = localStorage.getItem("localStatisticsInfo") ? JSON.parse(localStorage.getItem("localStatisticsInfo") as string) : {
            countGames: 0,
            totalTime: 0,
            totalSteps: 0,
            countWinTeamOne: 0,
            countWinTeamTwo: 0
        }

        setLocalStatistics(defaultLocalStatistics)
    }, []);

return (
    <div style={{width: "25%"}}>
        <fieldset>
            <legend style={{color: "white"}}>Локальная статистика (в разработке)</legend>
            <span style={{color: "white"}}>Количество игр:</span>
            <br/>
            <br/>
            <span style={{color: "white"}}>Общее время:</span>
            <br/>
            <br/>
            <span style={{color: "white"}}>Общее количество шагов:</span>
            <br/>
            <br/>
            <span style={{color: "white"}}>Побед Красных пикселей:</span>
            <br/>
            <br/>
            <span style={{color: "white"}}>Побед Синих пикселей:</span>
        </fieldset>
    </div>
)
}