import React, {useMemo} from "react";
import {Team} from "../../../tools/Interfaces/TeamInterface";
import {SettingGame} from "../../../tools/Interfaces/SettingGameInterface";
import {SettingStyleArena} from "../../../tools/Interfaces/OtherInterface";


export const ArenaPlatform = ({settingGame, teams, settingStyleArena}: {
    settingGame: SettingGame,
    teams: Team[],
    settingStyleArena: SettingStyleArena
}) => {
    let countCell = settingGame.width * settingGame.height
    const allPixel = teams.map(team => team.pixels).flat()

    const getPixel = (index: number) => {
        const pixel = allPixel.filter(pixel => pixel.index === index)

        if (pixel.length > 0) {
            return <div
                key={"Pixel-" + index}
                style={{
                    border: settingStyleArena.border ? '1px solid black' : '',
                    width: settingStyleArena.sizeCell,
                    height: settingStyleArena.sizeCell,
                    backgroundColor: `hsl(${pixel[0].color}deg 100% ${60 - pixel.length * 10 < 20 ? 20 : 60 - pixel.length * 10
                    }%)`
                }}>
                {settingStyleArena.infoIndex ? index + 1 : ""}
                {settingStyleArena.infoIndex && settingStyleArena.infoCountPixel && '/'}
                {settingStyleArena.infoCountPixel ? pixel.length : ""}
                {settingStyleArena.infoLvl ? pixel[0].lvl : ""}
            </div>
        } else {
            return <div
                key={"Pixel-" + index}
                style={{
                    border: settingStyleArena.border ? '1px solid black' : '',
                    width: settingStyleArena.sizeCell,
                    height: settingStyleArena.sizeCell,
                    backgroundColor: settingStyleArena.colorBackgroundArena
                }}
            >
                {settingStyleArena.infoIndex ? index + 1 : ''}
            </div>
        }
    }

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: `repeat(${settingGame.width}, 0fr)`,
            justifyContent: "center",
        }}>
            {Array.from({length: countCell}, (_, index) => (getPixel(index)))}
        </div>
    )
}