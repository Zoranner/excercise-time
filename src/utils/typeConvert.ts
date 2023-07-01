const prefixInteger = (num: number, length: number) => {
    return ("0" + num).slice(-length);
}

export const toBoolean = (str: string): boolean => {
    return !(/false/i).test(str)
}

export const toNumber = (str: string): number => {
    let result = parseInt(str)
    return isNaN(result) ? -1 : result
}

export const toHumanTime = (seconds: number): string => {
    var minutes = Math.min(Math.floor(seconds / 60), 99);
    var seconds = seconds % 60;
    return `${prefixInteger(minutes, 2)}:${prefixInteger(seconds, 2)}`
}