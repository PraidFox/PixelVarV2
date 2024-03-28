import React, {useContext, useEffect, useState} from "react";
import {LocalStatisticsInfo} from "../../tools/Interfaces/OtherInterface";
import {defaultLocalStatistic, styleButton} from "../../tools/storage/const";
import {UtilsLocalStorage} from "../../tools/utilsLocalStorage";
import {Team} from "../../tools/Interfaces/TeamInterface";
import {LocalStatisticsContext} from "../Context/LocalStatistics";

export const LocalStatistics = ({updateLocalStatistic, setUpdateLocalStatistic}: { updateLocalStatistic: boolean, setUpdateLocalStatistic: (bool: boolean) => void }) => {

    const {localStatistics, setDefaultLocalStatistics} = useContext(LocalStatisticsContext)

    // const [localStatistics, setLocalStatistics] = useState<LocalStatisticsInfo>()
    //
    // useEffect(() => {
    //     if (updateLocalStatistic) {
    //         const localStatistics = UtilsLocalStorage.getLocalStatistics()
    //         setLocalStatistics(localStatistics)
    //         setUpdateLocalStatistic(false)
    //     }
    // }, [updateLocalStatistic]);
    //
    // const clearStatistic = () => {
    //     UtilsLocalStorage.setDefaultLocalStatistics()
    //     setLocalStatistics(defaultLocalStatistic)
    // }
    //
    // useEffect(() => {
    //     window.addEventListener('beforeunload', UtilsLocalStorage.updateLocalStorage);
    //     return () => {
    //         window.removeEventListener('beforeunload', UtilsLocalStorage.updateLocalStorage);
    //     };
    // }, [localStatistics]);

    return (
        <div style={{width: "25%"}}>
            <fieldset>
                <legend style={{color: "white"}}>Локальная статистика</legend>
                <span style={{color: "white"}}>Количество игр: {localStatistics?.countGames}</span>
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
                <br/>
                <br/>
                <button style={styleButton} onClick={setDefaultLocalStatistics}>Сбросить статистику</button>
            </fieldset>
        </div>
    )
}