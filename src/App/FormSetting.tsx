import React, {Dispatch, useState} from "react"
import {Team} from "../tools/Interface/TeamInterface";
import {SettingGame} from "../tools/Interface/SettingGameInterface";
import {SettingStyleArena} from "../tools/Interface/OtherInterface";
import {ActionSettingGame} from "../tools/reducers/reducerSettingGame";
import {ActionTeams} from "../tools/reducers/reducerTeam";
import {ActionSettingStyleArena} from "../tools/reducers/reduserSettingStyleArena";

interface PropsFormSetting {
    teams: Team[]
    settingGame: SettingGame
    settingStyleArena: SettingStyleArena

    setTeams: Dispatch<ActionTeams>
    setSettingGame: Dispatch<ActionSettingGame>
    setSettingStyleArena: Dispatch<ActionSettingStyleArena>
}

export const FormSetting = ({
                                teams,
                                settingGame,
                                settingStyleArena,

                                setTeams,
                                setSettingGame,
                                setSettingStyleArena
                            }: PropsFormSetting) => {


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

    const setInfoLvlPixel = (value: boolean) => {
        setSettingStyleArena({type: "CHANGE_INFO_LVL_PIXEL", payload: value})
    }

    const setChangeTurnOrder = (value: "oneByOne" | "random") => {
        setSettingGame({type: "CHANGE_TURN_ORDER", payload: value})
    }

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
        setTeams({type: "CHANGE_COUNT_PIXELS_TEAM", payload: {teamId, countPixel, settingGame: settingGame}})
    }

    const setColorArena = (value: string) => {
        setSettingStyleArena({type: "CHANGE_COLOR_ARENA", payload: value})
    }

    const changeContactValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContactValue(event.target.value)
    }

    const changeMovedValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMovedValue(event.target.value)
    }

    const changeTurnOrder = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "oneByOne" || event.target.value === "random") {
            setChangeTurnOrder(event.target.value)
        }
    }

    console.log("Первый", teams)

    return (
        <div style={{width: "25%"}}>
            <fieldset>
                <legend style={{color: "white"}}>Настройка стиля арены:</legend>


                <input type="checkbox" name="border" id="border" defaultChecked={settingStyleArena.border}
                       onChange={e => setBorderStyle(e.target.checked)}/>
                <label style={{color: "white"}} htmlFor="border">Границы</label>

                <br/>

                <input type="checkbox" name="infoIndex" id="infoIndex" defaultChecked={settingStyleArena.infoIndex}
                       onChange={e => setInfoIndex(e.target.checked)}/>
                <label style={{color: "white"}} htmlFor="infoIndex">Инфо о индексе</label>

                <br/>

                <input type="checkbox" name="countPixelInCell" id="countPixelInCell"
                       defaultChecked={settingStyleArena.infoCountPixel}
                       onChange={e => setInfoCountPixel(e.target.checked)}/>
                <label style={{color: "white"}} htmlFor="countPixelInCell">Инфо о кол-во пикселей в ячейке</label>

                <br/>

                {/*<input type="checkbox" name="lvlPixel" id="lvlPixel"*/}
                {/*       defaultChecked={settingStyleArena.infoLvl}*/}
                {/*       onChange={e => setInfoLvlPixel(e.target.checked)}/>*/}
                {/*<label style={{color: "white"}} htmlFor="lvlPixel">Уровень Пикселя</label>*/}

                {/*<br/>*/}
                <br/>
                <span style={{color: "white"}}>Размер ячейки:</span> <input type="number" id="withArena"
                                                                            name="withArena"
                                                                            min="5"
                                                                            max="40"
                                                                            defaultValue={settingStyleArena.sizeCell}
                                                                            onChange={e => setSizeCell(Number(e.target.value))}/>

                <br/>
                <br/>
                <label style={{color: "white"}} htmlFor="border">Цвет фона арены: </label>
                <input type="color" onChange={e => setColorArena(e.target.value)}
                       value={settingStyleArena.colorBackgroundArena}/>


            </fieldset>
            <fieldset>
                <legend style={{color: "white"}}>Настройка игры:</legend>
                <span style={{color: "white"}}>Ширина арены:</span> <input type="number" id="withArena" name="withArena"
                                                                           min="2" max="20"
                                                                           defaultValue={settingGame.width}
                                                                           onChange={e => setWidthArena(Number(e.target.value))}/>
                <br/>
                <span style={{color: "white"}}>Высота арены:</span> <input type="number" id="heightArena"
                                                                           name="heightArena" min="2" max="20"
                                                                           defaultValue={settingGame.height}
                                                                           onChange={e => setHeightArena(Number(e.target.value))}/>
                <br/>
                <span style={{color: "white"}}>Скорость игры:</span> <input type="number" id="speedGame"
                                                                            name="speedGame" min="0" max="10"
                                                                            defaultValue={settingGame.speedMove / 10}
                                                                            onChange={e => setSpeedGame(Number(e.target.value) * 10)}/>
                <br/>

                <br/>
                <span style={{color: "white"}}>Очерёдность хода:</span>
                <br/>
                <input
                    type="radio"
                    name="turnOrder"
                    value="oneByOne"
                    id="oneByOne"
                    checked={settingGame.turnOrder == "oneByOne"}
                    onChange={changeTurnOrder}
                />
                <label style={{color: "white"}} htmlFor="oneByOne">По очереди</label>
                <br/>
                <input
                    type="radio"
                    name="turnOrder"
                    value="random"
                    id="random"
                    checked={settingGame.turnOrder == "random"}
                    onChange={changeTurnOrder}
                />
                <label style={{color: "white"}} htmlFor="random">Рандом</label>


                <br/><br/>
                <span style={{color: "white"}}>Поведение при наложении пикселей с разных команд:</span>
                <br/>
                <input
                    type="radio"
                    name="contact"
                    value="Exterminate"
                    id="exterminate"
                    checked={settingGame.contact == "Exterminate"}
                    onChange={changeContactValue}
                />
                <label style={{color: "white"}} htmlFor="exterminate">EXTERMINATE</label>
                <br/>
                <input
                    type="radio"
                    name="contact"
                    disabled={true}
                    value="Take"
                    id="take" checked={settingGame.contact == "Take"}
                    onChange={changeContactValue}
                />
                <label style={{color: "white"}} htmlFor="take">Забрать в свою команду (в разработке)</label>

                <br/>
                <br/>
                <span style={{color: "white"}}>Поведение при перемещении пикселя:</span>
                <br/>
                <input type="radio" name="moved" value="Default" id="default" checked={settingGame.moved == "Default"}
                       onChange={changeMovedValue}/>
                <label style={{color: "white"}} htmlFor="default">Обычное перемещение</label>
                <br/>
                <input type="radio" name="moved" value="Clone" id="clone" checked={settingGame.moved == "Clone"}
                       onChange={changeMovedValue}/>
                <label style={{color: "white"}} htmlFor="clone">Клонировать (А это вообще может закончиться?)</label>

            </fieldset>
            <br/>

            <fieldset>
                <legend style={{color: "white"}}>Настройка команд:</legend>
                <span style={{color: "white"}}>Количество команд: </span><input type="number" id="countTeam"
                                                                                name="countTeam" min="1" max="2"
                                                                                defaultValue={teams.length}
                                                                                onChange={e => setCountTeam(Number(e.target.value))}/>
                {teams.map(team =>
                    <div key={`countPixelTeam_${team.id}`}>
                        <br/>
                        <span
                            style={{color: "white"}}>Количество пикселей в команде <br/> <b
                            style={{color: `hsl(${team.color}deg 100% 50%)`}}>{team.name}</b>:</span>
                        <input
                            type="number"
                            id={`countPixelTeam_${team.id}`}
                            name={`countPixelTeam_${team.id}`}
                            min="1"
                            max={settingGame.height * settingGame.width / teams.length}
                            value={team.countPixelsStart}
                            onChange={e => setPixelTeam(team.id, Number(e.target.value))}
                        />
                        <button
                            onClick={() => setPixelTeam(team.id, settingGame.height * settingGame.width / teams.length)}>Максимум {settingGame.height * settingGame.width / teams.length}</button>
                        <br/>
                    </div>
                )}

            </fieldset>
            <br/>

        </div>
    )
}

