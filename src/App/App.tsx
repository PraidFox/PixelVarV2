import React, {useEffect, useReducer, useState} from "react";
import {FormSetting} from "./FormSetting";

import {reducerSettingGame} from "../tools/reducers/reducerSettingGame";
import {SettingGame} from "../tools/Interface/SettingGameInterface";
import {ArenaPlatform} from "./Arena/ArenaPlatform";
import {reducerTeam} from "../tools/reducers/reducerTeam";
import {Team} from "../tools/Interface/TeamInterface";
import {Statistics} from "./Statistics";
import {SettingStyleArena} from "../tools/Interface/OtherInterface";
import {reducerSettingStyleArena} from "../tools/reducers/reduserSettingStyleArena";

const defaultTeams: Team[] = [
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
}

const defaultSettingStyleArena: SettingStyleArena = localStorage.getItem("settingStyleArena") ? JSON.parse(localStorage.getItem("settingStyleArena") as string) : {
    border: true,
    infoIndex: true,
    infoCountPixel: true,
    sizeCell: 50,
}


const App = () => {
    const [settingGame, setSettingGame] = useReducer(reducerSettingGame, defaultSettingGame)
    const [teams, setTeams] = useReducer(reducerTeam, defaultTeams)
    const [settingStyleArena, setSettingStyleArena] = useReducer(reducerSettingStyleArena, defaultSettingStyleArena)

    const [countSteps, setCountSteps] = useState(0)
    const [startedGame, setStartedGame] = useState(false)
    const [whoseMove, setWhoseMove] = useState(0)
    const [time, setTime] = useState(0)
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout>()


    console.log("sadasda", teams.map(t => t.id))


    useEffect(() => {
        localStorage.setItem("settingGame", JSON.stringify(settingGame))
    }, [settingGame]);
    useEffect(() => {
        localStorage.setItem("settingStyleArena", JSON.stringify(settingStyleArena))
    }, [settingStyleArena]);

    useEffect(() => {
        if (startedGame) {
            let newWhoseMove = 0
            if (whoseMove < teams.length - 1) {
                newWhoseMove = whoseMove + 1
            }
            setWhoseMove(newWhoseMove)

            if (teams.length == 1 && countSteps < 100) {
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

    const setWidthArena = (value: number) => {
        setSettingGame({type: "CHANGE_WIDTH_ARENA", payload: value})
    }
    const setHeightArena = (value: number) => {
        setSettingGame({type: "CHANGE_HEIGHT_ARENA", payload: value})
    }

    const setSpeedGame = (value: number) => {
        setSettingGame({type: "CHANGE_SPEED", payload: value})
    }
    const setContactValue = (value: string) => {
        setSettingGame({type: "CHANGE_CONTACT_VALUE", payload: value})
    }
    const setMovedValue = (value: string) => {
        setSettingGame({type: "CHANGE_MOVED_VALUE", payload: value})
    }
    const setCountTeam = (value: number) => {
        setTeams({type: "CHANGE_COUNT_TEAM", payload: {countTeam: value, settingGame: settingGame}})
    }
    const setPixelTeam = (teamId: number, countPixel: number) => {
        setTeams({type: "CHANGE_PIXELS_TEAM", payload: {teamId, countPixel, settingGame: settingGame}})
    }

    const setBorderStyle = (value: boolean) => {
        setSettingStyleArena({type: "CHANGE_BORDER", payload: value})
    }
    const setInfoIndex = (value: boolean) => {
        setSettingStyleArena({type: "CHANGE_INFO_INDEX", payload: value})
    }
    const setInfoCountPixel = (value: boolean) => {
        setSettingStyleArena({type: "CHANGE_INFO_COUNT_PIXEL", payload: value})
    }
    const setSizeCell = (value: number) => {
        setSettingStyleArena({type: "CHANGE_SIZE_CELL", payload: value})
    }

    const resetGame = () => {
            setStartedGame(false)
        setTeams({type: "RESET_TEAM", payload: {settingGame: settingGame}})
        setTime(0)
        setCountSteps(0)
    }


    return <>
        <h1 style={{color: "white"}}>PixelWar</h1>
        <div style={{display: 'flex', gap: "2%"}}>
            <FormSetting
                setBorderStyle={setBorderStyle}
                setInfoIndex={setInfoIndex}
                setInfoCountPixel={setInfoCountPixel}
                setSizeCell={setSizeCell}
                setWidthArena={setWidthArena}
                setHeightArena={setHeightArena}
                setCountTeam={setCountTeam}
                setPixelTeam={setPixelTeam}
                setContactValue={setContactValue}
                setMovedValue={setMovedValue}
                setSpeedGame={setSpeedGame}

                teams={teams}
                settingGame={settingGame}
                settingStyleArena={settingStyleArena}

            />

            <div>
                <Statistics teams={teams} countSteps={countSteps} time={time}/>
                <ArenaPlatform settingGame={settingGame} teams={teams} settingStyleArena={settingStyleArena}/>

                <br/>
                <button onClick={() => setStartedGame(true)}>Старт</button>
                <button onClick={() => setStartedGame(false)}>Пауза</button>
                <button onClick={resetGame}>Заново</button>
            </div>
        </div>
    </>


}


export default App
