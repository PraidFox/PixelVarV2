import React, {useContext, useEffect, useReducer, useRef, useState} from "react";
import {SettingGame} from "../../tools/Interfaces/SettingGameInterface";
import {ArenaPlatform} from "./Content/ArenaPlatform";
import {reducerTeam} from "../../tools/reducers/reducerTeam";
import {Team} from "../../tools/Interfaces/TeamInterface";
import {StatisticsCurrentGame} from "./Content/StatisticsCurrentGame";
import {LocalStatisticsInfo, SettingStyleArena} from "../../tools/Interfaces/OtherInterface";
import {Indicator} from "./Content/Indicator";
import {styleButton} from "../../tools/storage/const";
import {UtilsLocalStorage} from "../../tools/utilsLocalStorage";
import {LocalStatisticsContext} from "../Context/LocalStatistics";



interface PropsMainContentGame {
    teams: Team[]
    settingGame: SettingGame
    settingStyleArena: SettingStyleArena
    hiddenInformation: boolean
    setUpdateLocalStatistic: (bool: boolean) => void
}



const MainContentGame = ({
                             teams,
                             settingGame,
                             settingStyleArena,
                             hiddenInformation,
                             setUpdateLocalStatistic
                         }: PropsMainContentGame) => {
    const [currentTeams, setCurrentTeams] = useReducer(reducerTeam, teams)
    const [time, setTime] = useState(0)
    const [countSteps, setCountSteps] = useState(0)
    const [startedGame, setStartedGame] = useState(false)

    const whoseMove = useRef(0);
    const intervalId = useRef<NodeJS.Timeout>();
    const checkLostTeam = useRef(false);

    const {updateLocalStatistics, updateLocalStatisticCountGame} = useContext(LocalStatisticsContext)

    useEffect(() => {
        setCurrentTeams({type: "COPY_TEAMS", payload: {teams: teams}})
        checkLostTeam.current = false
    }, [teams]);

    useEffect(() => {
        if (startedGame) {
            if (currentTeams.length == 1) {
                setTimeout(() => {
                    setCurrentTeams({type: "MOVE_PIXEL", payload: {whoseMove: 0, settingGame: settingGame}})
                }, settingGame.speedMove)
            } else {
                if (currentTeams.length > 1 && currentTeams.filter(team => team.pixels.length == 0).length == 0) {


                    let newWhoseMove = 0

                    if (settingGame.turnOrder == "oneByOne") {
                        if (whoseMove.current < currentTeams.length - 1) {
                            newWhoseMove = whoseMove.current + 1
                        }
                    } else if (settingGame.turnOrder == "random") {
                        newWhoseMove = Math.floor(Math.random() * currentTeams.length)
                    }

                    whoseMove.current = newWhoseMove

                    setTimeout(() => {
                        setCurrentTeams({
                            type: "MOVE_PIXEL",
                            payload: {whoseMove: newWhoseMove, settingGame: settingGame}
                        })
                    }, settingGame.speedMove)

                } else {
                    checkLostTeam.current = true
                    setStartedGame(false)
                }
            }
            setCountSteps(r => r + 1)
        }
    }, [currentTeams, startedGame]);

    useEffect(() => {
        if (startedGame) {
            intervalId.current = setInterval(() => {
                setTime(r => r + 1)
            }, 1000)

            //UtilsLocalStorage.updateLocalStatisticCountGame()
            updateLocalStatisticCountGame()

        } else {
            if (countSteps > 0) {
                //UtilsLocalStorage.updateLocalStatistics(time, countSteps, checkLostTeam, currentTeams)
                updateLocalStatistics(time, countSteps, checkLostTeam.current, currentTeams)

                clearInterval(intervalId.current)
            }
        }

        setUpdateLocalStatistic(true)
    }, [startedGame]);


    const resetGame = () => {
        //UtilsLocalStorage.updateLocalStatistics(time, countSteps, checkLostTeam, currentTeams)
       updateLocalStatistics(time, countSteps, checkLostTeam.current, currentTeams)

        setUpdateLocalStatistic(true)
        setStartedGame(false)
        setCurrentTeams({type: "RESET_TEAM", payload: {teams: teams}})
        setTime(0)
        setCountSteps(0)
        checkLostTeam.current = false
    }

    return (
        <div>
            {hiddenInformation && <StatisticsCurrentGame teams={currentTeams} countSteps={countSteps} time={time}/>}
            <br/><br/>
            <ArenaPlatform settingGame={settingGame} teams={currentTeams} settingStyleArena={settingStyleArena}/>
            {hiddenInformation && <Indicator teams={currentTeams}/>}
            {hiddenInformation &&
                <div style={{display: "flex", justifyContent: "center", gap: 10}}>
                    <button style={styleButton} disabled={checkLostTeam.current}
                            onClick={() => setStartedGame(true)}>Старт
                    </button>
                    <button style={styleButton} onClick={() => setStartedGame(false)}>Пауза</button>
                    <button style={styleButton} onClick={resetGame}>Заново</button>
                </div>
            }
        </div>
    )

}


export default MainContentGame
