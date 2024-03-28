import {Team} from "./Interfaces/TeamInterface";
import React from "react";
import {LocalStatisticsInfo} from "./Interfaces/OtherInterface";

export const checkInterval = (min: number, max: number, value: number) => {

    if (value < min) {
        return min
    } else if (value > max) {
        return max
    }
    return value
}


export const copyObject = (obj: any) => {
    return JSON.parse(JSON.stringify(obj))
}