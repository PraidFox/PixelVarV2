import {Team} from "../../../tools/Interfaces/TeamInterface";
import React from "react";

export const Indicator = ({teams} : {teams: Team[]}) => {

    let sum = teams.map(team => team.pixels.length).reduce((accumulator, currentValue) => accumulator + currentValue);
    let percentage = teams.map(team => Math.round(team.pixels.length / sum * 100))

    return (
        <div style={{height: "10px", display: "flex", justifyContent: "center", padding: "4% 0"}}>
            {Array.from({length: 100}, (_, index) => (
                <div key={index} style={{width: "5px", backgroundColor: index > percentage[0] ? "blue" : "red"}}/>
            ))}
        </div>
    )
}