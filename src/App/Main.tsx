import React, {useEffect, useReducer, useState} from "react";
import {FormSetting} from "./FormSetting";

import {reducerSettingGame} from "../tools/reducers/reducerSettingGame";
import {SettingGame} from "../tools/Interface/SettingGameInterface";
import {ArenaPlatform} from "./Arena/ArenaPlatform";
import {reducerTeam} from "../tools/reducers/reducerTeam";
import {Team} from "../tools/Interface/TeamInterface";
import {Statistics} from "./Statistics";
import {LocalStatisticsInfo, SettingStyleArena} from "../tools/Interface/OtherInterface";
import {reducerSettingStyleArena} from "../tools/reducers/reduserSettingStyleArena";
import {LocalStatistics} from "./LocalStatistics";
import {Indicator} from "./Indicator";

const defaultTeams: Team[] = localStorage.getItem("settingTeam") ? JSON.parse(localStorage.getItem("settingTeam") as string) : [
    {
        id: 0,
        name: "Team_0",
        color: 0,
        pixels: [{id: 0, index: 0, color: 0, type: "solder", lvl: 1}],
        countPixelsStart: 1
    }
]

const defaultSettingGame: SettingGame = localStorage.getItem("settingGame") ? JSON.parse(localStorage.getItem("settingGame") as string) : {
    width: 10,
    height: 10,
    speedMove: 100,
    contact: "Exterminate",
    moved: "Default",
    turnOrder: "oneByOne"
}

const defaultSettingStyleArena: SettingStyleArena = localStorage.getItem("settingStyleArena") ? JSON.parse(localStorage.getItem("settingStyleArena") as string) : {
    border: true,
    infoIndex: false,
    infoCountPixel: false,
    sizeCell: 10,
    infoLvl: false,
    colorBackgroundArena: "#252525",
}



const styleButton = {
    height: "30px",
    backgroundColor: "#252525",
    color: "white",
    padding: "4px",
    borderRadius: "5px",
    margin: "5px"
}

const Main = () => {
    const [settingGame, setSettingGame] = useReducer(reducerSettingGame, defaultSettingGame)
    const [teams, setTeams] = useReducer(reducerTeam, defaultTeams)
    const [settingStyleArena, setSettingStyleArena] = useReducer(reducerSettingStyleArena, defaultSettingStyleArena)

    const [countSteps, setCountSteps] = useState(0)
    const [startedGame, setStartedGame] = useState(false)
    const [whoseMove, setWhoseMove] = useState(0)
    const [time, setTime] = useState(0)
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout>()
    const [hiddenInformation, setHiddenInformation] = useState(true)


    useEffect(() => {
        localStorage.setItem("settingGame", JSON.stringify(settingGame))
    }, [settingGame]);

    useEffect(() => {
        localStorage.setItem("settingStyleArena", JSON.stringify(settingStyleArena))
    }, [settingStyleArena]);

    useEffect(() => {
        if (!intervalId) {
            //const settingTeam = {countTeam: teams.length, }
            localStorage.setItem("settingTeam", JSON.stringify(teams))
        }
    }, [teams]);

    useEffect(() => {
        if (startedGame) {

            let newWhoseMove = 0

            if (settingGame.turnOrder == "oneByOne") {
                if (whoseMove < teams.length - 1) {
                    newWhoseMove = whoseMove + 1
                }
            } else if (settingGame.turnOrder == "random") {
                newWhoseMove = Math.floor(Math.random() * teams.length)
            }

            setWhoseMove(newWhoseMove)

            if (teams.length == 1 && countSteps < 1000) {
                setTimeout(() => {
                    setTeams({type: "MOVE_PIXEL", payload: {whoseMove: newWhoseMove, settingGame: settingGame}})
                }, settingGame.speedMove)
            } else {
                if (teams.length > 1 && teams.filter(team => team.pixels.length == 0).length == 0) {
                    setTimeout(() => {
                        setTeams({type: "MOVE_PIXEL", payload: {whoseMove: newWhoseMove, settingGame: settingGame}})
                    }, settingGame.speedMove)
                } else {
                    setStartedGame(false)
                }
            }
            setCountSteps(r => r + 1)
        }
    }, [teams, startedGame]);

    useEffect(() => {
        if (startedGame) {
            const intervalId = setInterval(() => {
                setTime(r => r + 1)
            }, 1000)
            setIntervalId(intervalId)
        } else {
            clearInterval(intervalId)
        }
    }, [startedGame]);

    useEffect(() => {
        setTeams({type: "CHECK_MAX_COUNT_PIXELS_TEAM", payload: {settingGame: settingGame}})
    }, [settingGame.height, settingGame.width]);



    const resetGame = () => {
        setStartedGame(false)
        setTeams({type: "RESET_TEAM", payload: {settingGame: settingGame}})
        setTime(0)
        setCountSteps(0)
    }

    return (
        <div>
            <div style={{position: "absolute", left: 10, top: 10}}>
                <span style={{color: "white", fontSize: "30px"}}><b>PixelGame</b></span>
                <br/>
                <button style={styleButton}
                        onClick={() => setHiddenInformation(r => !r)}> {hiddenInformation ? "Скрыть интерфейс" : "Вернуть"}</button>
            </div>
            <div style={{height: "95vh", display: "flex", alignItems: "center"}}>
                <div
                    style={{display: 'flex', gap: "2%", alignItems: "center", width: "100%", justifyContent: "center"}}>
                    {hiddenInformation && <FormSetting
                        teams={teams}
                        settingGame={settingGame}
                        settingStyleArena={settingStyleArena}
                        setTeams={setTeams}
                        setSettingGame={setSettingGame}
                        setSettingStyleArena={setSettingStyleArena}
                    />}

                    <div style={{textAlign: "center", padding: "8px"}}>

                        {hiddenInformation &&
                            <div style={{textAlign: "center", padding: "8px"}}><Statistics teams={teams}
                                                                                           countSteps={countSteps}
                                                                                           time={time}/></div>}

                        <ArenaPlatform settingGame={settingGame} teams={teams} settingStyleArena={settingStyleArena}/>

                        {hiddenInformation && <Indicator teams={teams} countAllPixels={settingGame.width * settingGame.height}/>}

                        {hiddenInformation && <div style={{textAlign: "center"}}>
                            <button style={styleButton} onClick={() => setStartedGame(true)}>Старт</button>
                            <button style={styleButton} onClick={() => setStartedGame(false)}>Пауза</button>
                            <button style={styleButton} onClick={resetGame}>Заново</button>
                        </div>}
                    </div>

                </div>
                <div style={{color: "white", position: "absolute", bottom: 0}}>v.1.0.1</div>
            </div>
        </div>
    )

}


export default Main
