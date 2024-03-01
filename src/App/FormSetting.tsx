import React, {useState} from "react"
import {Team} from "../tools/Interface/TeamInterface";
import {SettingGame} from "../tools/Interface/SettingGameInterface";
import {SettingStyleArena} from "../tools/Interface/OtherInterface";

interface PropsFormSetting {
    setBorderStyle: (value: boolean) => void
    setInfoIndex: (value: boolean) => void
    setInfoCountPixel: (value: boolean) => void
    setSizeCell: (value: number) => void
    setWidthArena: (value: number) => void
    setHeightArena: (value: number) => void
    setCountTeam: (value: number) => void
    setPixelTeam: (teamId: number, countPixel: number) => void
    setContactValue: (value: string) => void
    setMovedValue: (value: string) => void
    setSpeedGame: (value: number) => void
    setInfoLvlPixel: (value: boolean) => void
    setChangeTurnOrder: (value: "oneByOne" | "random") => void

    teams: Team[]
    settingGame: SettingGame
    settingStyleArena: SettingStyleArena
}

export const FormSetting = ({
                                setBorderStyle,
                                setInfoIndex,
                                setInfoCountPixel,
                                setSizeCell,
                                setWidthArena,
                                setHeightArena,
                                setCountTeam,
                                setPixelTeam,
                                setContactValue,
                                setMovedValue,
                                setSpeedGame,
                                setInfoLvlPixel,
                                setChangeTurnOrder,

                                teams,
                                settingGame,
                                settingStyleArena
                            }: PropsFormSetting) => {


    const changeContactValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setContactValue(event.target.value)
    }

    const changeMovedValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMovedValue(event.target.value)
    }

    const changeTurnOrder = (event: React.ChangeEvent<HTMLInputElement>) => {

        if(event.target.value === "oneByOne" || event.target.value === "random") {
            setChangeTurnOrder(event.target.value)
        }

    }




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

                <input type="checkbox" name="lvlPixel" id="lvlPixel"
                       defaultChecked={settingStyleArena.infoLvl}
                       onChange={e => setInfoLvlPixel(e.target.checked)}/>
                <label style={{color: "white"}} htmlFor="lvlPixel">Уровень Пикселя</label>

                <br/>
                <span style={{color: "white"}}>Размер ячейки:</span> <input type="number" id="withArena"
                                                                            name="withArena" min="10" max="80"
                                                                            defaultValue={settingStyleArena.sizeCell}
                                                                            onChange={e => setSizeCell(Number(e.target.value))}/>
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
                <span style={{color: "white"}}>Поведение при соприкосновение пикселей с разных команд:</span>
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

                <input
                    type="radio"
                    name="contact"
                    value="Take"
                    id="take" checked={settingGame.contact == "Take"}
                    onChange={changeContactValue}
                />
                <label style={{color: "white"}} htmlFor="take">Забрать в свою команду</label>

                <br/>
                <br/>
                <span style={{color: "white"}}>Поведение при перемещении пикселя:</span>
                <br/>
                <input type="radio" name="moved" value="Default" id="default" checked={settingGame.moved == "Default"}
                       onChange={changeMovedValue}/>
                <label style={{color: "white"}} htmlFor="default">Обычное перемещение</label>

                <input type="radio" name="moved" value="Clone" id="clone" checked={settingGame.moved == "Clone"}
                       onChange={changeMovedValue}/>
                <label style={{color: "white"}} htmlFor="clone">Клонировать (ОЧЕНЬ ДОЛГО)</label>

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
                    <span
                        style={{color: "white"}}>Количество пикселей в команде <b
                        style={{color: `hsl(${team.color}deg 100% 50%)`}}>{team.name}</b>:</span>
                        <input
                            type="number"
                            id={`countPixelTeam_${team.id}`}
                            name={`countPixelTeam_${team.id}`}
                            min="1"
                            max={settingGame.height * settingGame.width / 2}
                            value={team.pixels.length}
                            onChange={e => setPixelTeam(team.id, Number(e.target.value))}
                        />
                        <button
                            onClick={() => setPixelTeam(team.id, settingGame.height * settingGame.width / 2)}>Максимум {settingGame.height * settingGame.width / 2}</button>
                        <br/>

                    </div>
                )}

            </fieldset>
            <br/>

        </div>
    )
}

