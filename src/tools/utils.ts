export const checkInterval = (min: number, max: number, value: number) => {

    if (value < min) {
        return min
    } else if (value > max) {
        return max
    }
    return value
}