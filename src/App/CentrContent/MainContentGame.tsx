import React, {useEffect, useReducer, useState} from "react";
import {FormSetting} from "../LeftPanel/FormSetting";

import {reducerSettingGame} from "../../tools/reducers/reducerSettingGame";
import {SettingGame} from "../../tools/Interface/SettingGameInterface";
import {ArenaPlatform} from "./Content/ArenaPlatform";
import {reducerTeam} from "../../tools/reducers/reducerTeam";
import {Team} from "../../tools/Interface/TeamInterface";
import {StatisticsCurrentGame} from "./Content/StatisticsCurrentGame";
import {LocalStatisticsInfo, SettingStyleArena} from "../../tools/Interface/OtherInterface";
import {reducerSettingStyleArena} from "../../tools/reducers/reduserSettingStyleArena";
import {LocalStatistics} from "../RightPanel/LocalStatistics";
import {Indicator} from "./Content/Indicator";
import {styleButton} from "../../tools/const";


interface PropsMainContentGame {
    teams: Team[]
    settingGame: SettingGame
    settingStyleArena: SettingStyleArena
    hiddenInformation: boolean
}

const MainContentGame = ({
                             teams,
                             settingGame,
                             settingStyleArena,
                             hiddenInformation
                         }: PropsMainContentGame) => {


    const [currentTeams, setStartingTeams] = useReducer(reducerTeam, teams)

    const [startedGame, setStartedGame] = useState(false)
    const [whoseMove, setWhoseMove] = useState(0)

    const [countSteps, setCountSteps] = useState(0)
    const [time, setTime] = useState(0)
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout>()


    useEffect(() => {
        setStartingTeams({type: "COPY_TEAMS", payload: {teams: teams}})
    }, [teams]);

    useEffect(() => {
        if (startedGame) {
            let newWhoseMove = 0

            if (settingGame.turnOrder == "oneByOne") {
                if (whoseMove < currentTeams.length - 1) {
                    newWhoseMove = whoseMove + 1
                }
            } else if (settingGame.turnOrder == "random") {
                newWhoseMove = Math.floor(Math.random() * currentTeams.length)
            }

            setWhoseMove(newWhoseMove)

            if (currentTeams.length == 1 && countSteps < 1000) {
                setTimeout(() => {
                    setStartingTeams({type: "MOVE_PIXEL", payload: {whoseMove: newWhoseMove, settingGame: settingGame}})
                }, settingGame.speedMove)
            } else {
                if (currentTeams.length > 1 && currentTeams.filter(team => team.pixels.length == 0).length == 0) {
                    setTimeout(() => {
                        setStartingTeams({
                            type: "MOVE_PIXEL",
                            payload: {whoseMove: newWhoseMove, settingGame: settingGame}
                        })
                    }, settingGame.speedMove)
                } else {
                    setStartedGame(false)
                }
            }
            setCountSteps(r => r + 1)
        }
    }, [currentTeams, startedGame]);

    useEffect(() => {
        if (startedGame) {
            const intervalId = setInterval(() => {
                setTime(r => r + 1)
            }, 1000)
            setIntervalId(intervalId)
        } else {

            // localStorage.getItem("localStatisticsInfo") ? JSON.parse(localStorage.getItem("localStatisticsInfo") as string) : {
            //     countGames: 0,
            //     totalTime: 0,
            //     totalSteps: 0,
            //     countWinTeamOne: 0,
            //     countWinTeamTwo: 0
            // }

            localStorage.setItem("localStatisticsInfo", JSON.stringify(settingGame))
            clearInterval(intervalId)
        }
    }, [startedGame]);

    useEffect(() => {
        setStartingTeams({type: "CHECK_MAX_COUNT_PIXELS_TEAM", payload: {settingGame: settingGame}})
    }, [settingGame.height, settingGame.width]);


    const resetGame = () => {
        setStartedGame(false)
        setStartingTeams({type: "RESET_TEAM", payload: {teams: teams}})
        setTime(0)
        setCountSteps(0)
    }

    return (
        <div>
            {hiddenInformation && <StatisticsCurrentGame teams={currentTeams} countSteps={countSteps} time={time}/>}
            <br/><br/>
            <ArenaPlatform settingGame={settingGame} teams={currentTeams} settingStyleArena={settingStyleArena}/>
            {hiddenInformation && <Indicator teams={currentTeams}/>}
            {hiddenInformation &&
                <div style={{textAlign: "center"}}>
                    <button style={styleButton} onClick={() => setStartedGame(true)}>Старт</button>
                    <button style={styleButton} onClick={() => setStartedGame(false)}>Пауза</button>
                    <button style={styleButton} onClick={resetGame}>Заново</button>
                </div>
            }
        </div>
    )

}


export default MainContentGame