export interface Pixel {
    id: number
    index: number
    color: number
    type: string
    lvl: number
}

export interface Team {
    id: number,
    name: string,
    color: number,
    pixels: Pixel[],
    countPixelsStart: number
}