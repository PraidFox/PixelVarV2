import React from "react";
import {Team} from "../../tools/Interface/TeamInterface";
import {SettingGame} from "../../tools/Interface/SettingGameInterface";
import {SettingStyleArena} from "../../tools/Interface/OtherInterface";


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
            return <div style={{
                border: settingStyleArena.border ? '1px solid black' : '',
                width: settingStyleArena.sizeCell,
                height: settingStyleArena.sizeCell,
                // width: "40px",
                // height: "40px",
                backgroundColor: `hsl(${pixel[0].color}deg 100% ${60 - pixel.length * 10 < 20 ? 20 : 60 - pixel.length * 10}%)`
            }}>
                {settingStyleArena.infoIndex ? index : ""}
                {settingStyleArena.infoIndex && settingStyleArena.infoCountPixel && '/'}
                {settingStyleArena.infoCountPixel ? pixel.length : ""}
                {settingStyleArena.infoLvl ? pixel[0].lvl : ""}
            </div>
        } else {
            return <div style={{
                border: settingStyleArena.border ? '1px solid black' : '',
                width: settingStyleArena.sizeCell,
                height: settingStyleArena.sizeCell,
                // width: "40px",
                // height: "40px",
                backgroundColor: '#252525'
            }}>
                {settingStyleArena.infoIndex ? index : ''}
            </div>
        }
    }

    return (<div>
            <div style={{
                display: "grid",
                gridTemplateColumns: `repeat(${settingGame.width}, 1fr)`,
                gridTemplateRows: `repeat(${settingGame.height}, 1fr)`,
                width: '1',
            }}>
                {Array.from({length: countCell}, (_, index) => (
                    <div key={index}>
                        {getPixel(index)}
                    </div>
                ))}
            </div>


        </div>
    )
}