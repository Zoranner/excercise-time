export class Convert {
    static prefixInteger(num: number) {
        return ("0" + num).slice(-2);
    }

    static toBoolean(str: string): boolean {
        return !(/false/i).test(str)
    }

    static toNumber(str: string): number {
        let result = parseInt(str)
        return isNaN(result) ? -1 : result
    }

    static toHumanTime(seconds: number): string {
        var minutes = Math.min(Math.floor(seconds / 60), 99);
        var seconds = seconds % 60;
        return `${this.prefixInteger(minutes)}:${this.prefixInteger(seconds)}`
    }
}