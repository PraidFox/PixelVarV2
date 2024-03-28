import MainContentGame from "./CentrContent/MainContentGame";
import {LocalStatistics} from "./RightPanel/LocalStatistics";
import React, {useEffect, useReducer, useState} from "react";
import {reducerSettingGame} from "../tools/reducers/reducerSettingGame";
import {reducerTeam} from "../tools/reducers/reducerTeam";
import {reducerSettingStyleArena} from "../tools/reducers/reduserSettingStyleArena";
import {defaultSettingGame, defaultSettingStyleArena, defaultTeams, styleButton} from "../tools/storage/const";
import {FormSetting} from "./LeftPanel/FormSetting";
import {LocalStatisticsProvider} from "./Context/LocalStatistics";

export const App = () => {

    const [settingGame, setSettingGame] = useReducer(reducerSettingGame, defaultSettingGame)
    const [settingTeams, setSettingTeams] = useReducer(reducerTeam, defaultTeams)
    const [settingStyleArena, setSettingStyleArena] = useReducer(reducerSettingStyleArena, defaultSettingStyleArena)
    const [hiddenInformation, setHiddenInformation] = useState(true)
    const [updateLocalStatistic, setUpdateLocalStatistic] = useState(true)

    useEffect(() => {
        setSettingTeams({type: "CHECK_MAX_COUNT_PIXELS_TEAM", payload: {settingGame: settingGame}})
    }, [settingGame.height, settingGame.width, settingTeams.length]);

    useEffect(() => {
        localStorage.setItem("settingGame", JSON.stringify(settingGame))
    }, [settingGame]);
    useEffect(() => {
        localStorage.setItem("settingTeam", JSON.stringify(settingTeams))
    }, [settingTeams]);
    useEffect(() => {
        localStorage.setItem("settingStyleArena", JSON.stringify(settingStyleArena))
    }, [settingStyleArena]);

    return (
        <div style={{height: "100vh", display: "flex", justifyContent: "center", gap: "40px", alignItems: "center"}}>
            <div style={{position: "absolute", left: 10, top: 10}}>
                <span style={{color: "white", fontSize: "30px"}}><b>PixelGame</b></span>
                <br/>
                <button
                    style={styleButton}
                    onClick={() => setHiddenInformation(r => !r)}> {hiddenInformation ? "Скрыть интерфейс" : "Вернуть"}
                </button>
            </div>

            {hiddenInformation &&
                <FormSetting
                    teams={settingTeams}
                    settingGame={settingGame}
                    settingStyleArena={settingStyleArena}

                    setTeams={setSettingTeams}
                    setSettingGame={setSettingGame}
                    setSettingStyleArena={setSettingStyleArena}
                />
            }
            <LocalStatisticsProvider>
                <>
                    <MainContentGame
                        teams={settingTeams}
                        settingGame={settingGame}
                        settingStyleArena={settingStyleArena}
                        hiddenInformation={hiddenInformation}
                        setUpdateLocalStatistic={setUpdateLocalStatistic}
                    />

                    {hiddenInformation && <LocalStatistics updateLocalStatistic={updateLocalStatistic}
                                                           setUpdateLocalStatistic={setUpdateLocalStatistic}/>}
                </>
            </LocalStatisticsProvider>
        </div>
    )
}