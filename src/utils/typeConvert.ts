class TypeConvert {
    toBoolean(str: string): boolean {
        return !(/false/i).test(str)
    }

    toNumber(str: string): number {
        let result = parseInt(str)
        return isNaN(result) ? -1 : result
    }

    toHumanTime(seconds: number): string {
        var minutes = Math.min(Math.floor(seconds / 60), 99);
        var seconds = seconds % 60;
        return `${this.prefixInteger(minutes, 2)}:${this.prefixInteger(seconds, 2)}`
    }

    private prefixInteger(num: number, length: number) {
        return ("0" + num).slice(-length);
    }
}

export const typeConvert = new TypeConvert()