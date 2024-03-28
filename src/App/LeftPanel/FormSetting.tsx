import React, {Dispatch, useState} from "react"
import {Team} from "../../tools/Interfaces/TeamInterface";
import {SettingGame} from "../../tools/Interfaces/SettingGameInterface";
import {SettingStyleArena} from "../../tools/Interfaces/OtherInterface";
import {ActionSettingGame} from "../../tools/reducers/reducerSettingGame";
import {ActionTeams} from "../../tools/reducers/reducerTeam";
import {ActionSettingStyleArena} from "../../tools/reducers/reduserSettingStyleArena";

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
    // const setInfoLvlPixel = (value: boolean) => {
    //     setSettingStyleArena({type: "CHANGE_INFO_LVL_PIXEL", payload: value})
    // }

    const setPixelTeam = (teamId: number, countPixel: number) => {
        setTeams({type: "CHANGE_COUNT_PIXELS_TEAM", payload: {teamId, countPixel, settingGame: settingGame}})
    }

    const changeContactValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSettingGame({type: "CHANGE_CONTACT_VALUE", payload: event.target.value})
    }

    const changeMovedValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSettingGame({type: "CHANGE_MOVED_VALUE", payload: event.target.value})
    }

    const changeTurnOrder = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.value === "oneByOne" || event.target.value === "random") {
            setSettingGame({type: "CHANGE_TURN_ORDER", payload: event.target.value})
        }
    }

    return (
        <div style={{width: "25%"}}>
            <fieldset>
                <legend style={{color: "white"}}>Настройка стиля арены</legend>

                <input
                    type="checkbox"
                    name="border"
                    id="border"
                    defaultChecked={settingStyleArena.border}
                    onChange={e => setSettingStyleArena({type: "CHANGE_BORDER", payload: e.target.checked})}
                />
                <label style={{color: "white"}} htmlFor="border">Границы</label>

                <br/>

                <input
                    type="checkbox"
                    name="infoIndex"
                    id="infoIndex"
                    defaultChecked={settingStyleArena.infoIndex}
                    onChange={e => setSettingStyleArena({type: "CHANGE_INFO_INDEX", payload: e.target.checked})}
                />
                <label style={{color: "white"}} htmlFor="infoIndex">Инфо о индексе</label>

                <br/>

                <input
                    type="checkbox"
                    name="countPixelInCell"
                    id="countPixelInCell"
                    defaultChecked={settingStyleArena.infoCountPixel}
                    onChange={e => setSettingStyleArena({type: "CHANGE_INFO_COUNT_PIXEL", payload: e.target.checked})}
                />
                <label style={{color: "white"}} htmlFor="countPixelInCell">Инфо о кол-во пикселей в ячейке</label>

                <br/>

                {/*<input type="checkbox" name="lvlPixel" id="lvlPixel"*/}
                {/*       defaultChecked={settingStyleArena.infoLvl}*/}
                {/*       onChange={e => setInfoLvlPixel(e.target.checked)}/>*/}
                {/*<label style={{color: "white"}} htmlFor="lvlPixel">Уровень Пикселя</label>*/}

                {/*<br/>*/}
                <br/>
                <span style={{color: "white"}}>Размер ячейки: </span>
                <input
                    type="number"
                    style={{width: 40}}
                    id="sizeCell"
                    name="sizeCell"
                    value={settingStyleArena.sizeCell}
                    onChange={e => setSettingStyleArena({type: "CHANGE_SIZE_CELL", payload: Number(e.target.value)})}
                />

                <br/>
                <br/>

                <label style={{color: "white"}} htmlFor="border">Цвет фона арены: </label>
                <input
                    type="color"
                    onChange={e => setSettingStyleArena({type: "CHANGE_COLOR_ARENA", payload: e.target.value})}
                    defaultValue={settingStyleArena.colorBackgroundArena}
                />
            </fieldset>
            <fieldset>
                <legend style={{color: "white"}}>Настройка игры</legend>
                <span style={{color: "white"}}>Ширина арены: </span>
                <input
                    type="number"
                    style={{width: 40}}
                    id="withArena"
                    name="withArena"
                    value={settingGame.width}
                    onChange={e => setSettingGame({type: "CHANGE_WIDTH_ARENA", payload: Number(e.target.value)})}
                />

                <br/>

                <span style={{color: "white"}}>Высота арены: </span>
                <input
                    type="number"
                    style={{width: 40}}
                    id="heightArena"
                    name="heightArena"
                    value={settingGame.height}
                    onChange={e => setSettingGame({type: "CHANGE_HEIGHT_ARENA", payload: Number(e.target.value)})}
                />

                <br/>

                <span style={{color: "white"}}>Скорость игры: </span>
                <input
                    type="number"
                    style={{width: 40}}
                    id="speedGame"
                    name="speedGame"
                    value={settingGame.speedMove / 10}
                    onChange={e => setSettingGame({type: "CHANGE_SPEED", payload: Number(e.target.value) * 10})}/>
                <br/>

                <br/>
                <span style={{color: "white"}}>Очерёдность хода: </span>
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
                <input
                    type="radio"
                    name="moved"
                    value="Default"
                    id="default"
                    checked={settingGame.moved == "Default"}
                    onChange={changeMovedValue}
                />
                <label style={{color: "white"}} htmlFor="default">Обычное перемещение</label>
                <br/>
                <input
                    type="radio"
                    name="moved"
                    value="Clone"
                    id="clone"
                    checked={settingGame.moved == "Clone"}
                    onChange={changeMovedValue}
                />
                <label style={{color: "white"}} htmlFor="clone">Клонировать (А это вообще может закончиться?)</label>
            </fieldset>

            <br/>

            <fieldset>
                <legend style={{color: "white"}}>Настройка команд</legend>
                <span style={{color: "white"}}>Количество команд: </span>
                <input
                    type="number"
                    style={{width: 40}}
                    id="countTeam"
                    name="countTeam"
                    value={teams.length}
                    onChange={e => setTeams({
                        type: "CHANGE_COUNT_TEAM",
                        payload: {countTeam: Number(e.target.value), settingGame: settingGame}
                    })}
                />
                {teams.map(team =>
                    <div key={`countPixelTeam_${team.id}`}>
                        <br/>
                        <span
                            style={{color: "white"}}>Количество пикселей в команде <br/> <b
                            style={{color: `hsl(${team.color}deg 100% 50%)`}}>{team.name}</b>:</span>
                        <input
                            type="number"
                            style={{width: 40}}
                            id={`countPixelTeam_${team.id}`}
                            name={`countPixelTeam_${team.id}`}

                            value={team.pixels.length}
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

