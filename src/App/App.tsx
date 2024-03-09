import MainContentGame from "./CentrContent/MainContentGame";
import {LocalStatistics} from "./RightPanel/LocalStatistics";
import React, {useEffect, useReducer, useState} from "react";
import {reducerSettingGame} from "../tools/reducers/reducerSettingGame";
import {reducerTeam} from "../tools/reducers/reducerTeam";
import {reducerSettingStyleArena} from "../tools/reducers/reduserSettingStyleArena";
import {defaultSettingGame, defaultSettingStyleArena, defaultTeams, styleButton} from "../tools/const";
import {FormSetting} from "./LeftPanel/FormSetting";

export const App = () => {

    const [settingGame, setSettingGame] = useReducer(reducerSettingGame, defaultSettingGame)
    const [startingTeams, setStartingTeams] = useReducer(reducerTeam, defaultTeams)
    const [settingStyleArena, setSettingStyleArena] = useReducer(reducerSettingStyleArena, defaultSettingStyleArena)
    const [hiddenInformation, setHiddenInformation] = useState(true)

    useEffect(() => {
        localStorage.setItem("settingGame", JSON.stringify(settingGame))
    }, [settingGame]);

    useEffect(() => {
        localStorage.setItem("settingStyleArena", JSON.stringify(settingStyleArena))
    }, [settingStyleArena]);

    useEffect(() => {
        localStorage.setItem("settingTeam", JSON.stringify(startingTeams))
    }, [startingTeams]);

    return (
        <div style={{height: "100vh", display: "flex", justifyContent: "center", gap: "40px", alignItems: "center"}}>

            <div style={{position: "absolute", left: 10, top: 10}} >
                <span style={{color: "white", fontSize: "30px"}}><b>PixelGame</b></span>
                <br/>
                <button
                    style={styleButton}
                    onClick={() => setHiddenInformation(r => !r)}> {hiddenInformation ? "Скрыть интерфейс" : "Вернуть"}
                </button>
            </div>

                {hiddenInformation &&
                    <FormSetting
                        teams={startingTeams}
                        settingGame={settingGame}
                        settingStyleArena={settingStyleArena}

                        setTeams={setStartingTeams}
                        setSettingGame={setSettingGame}
                        setSettingStyleArena={setSettingStyleArena}
                    />
                }

                <MainContentGame
                    teams={startingTeams}
                    settingGame={settingGame}
                    settingStyleArena={settingStyleArena}
                    hiddenInformation={hiddenInformation}
                />

                {hiddenInformation &&
                    <LocalStatistics/>
                }

        </div>
    )
}