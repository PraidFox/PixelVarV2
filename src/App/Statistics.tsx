import React from "react"
import {Team} from "../tools/Interface/TeamInterface";

export const Statistics = ({teams, countSteps, time} : {teams: Team[], countSteps: number, time: number}) => {

    return (
        <>
            <i style={{color: "white"}}>Статистика: </i>

            <span style={{color: "white"}}>Количество шагов: {countSteps} </span>

            <span style={{color: "white"}}>Время: {time} сек</span>
        </>
    )
}