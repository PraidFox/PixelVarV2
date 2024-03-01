import {Team} from "../tools/Interface/TeamInterface";
import React from "react";

export const Indicator = ({teams, countAllPixels} : {teams: Team[], countAllPixels: number}) => {

    // const countPercentRedTeam = teams.
    //     const countPercentBlueTeam =


    let sum = teams.map(team => team.pixels.length).reduce((accumulator, currentValue) => accumulator + currentValue);
    let procentage = teams.map(team => Math.round(team.pixels.length / sum * 100))
        //teams.forEach(team => team.pixels.length)
console.log(procentage)

    return (
        <div style={{height: "10px", display: "flex", justifyContent: "center"}}>
            {Array.from({length: 100}, (_, index) => (
                <div key={index} style={{width: "5px", backgroundColor: index > procentage[0] ? "blue" : "red"}}>

                </div>
            ))}
        </div>
    )
}