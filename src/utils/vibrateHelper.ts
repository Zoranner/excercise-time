export class Vibrate {
    static short = (type: 'heavy' | 'medium' | 'light') => {
        Taro.vibrateShort({
            type: type,
        })
    }

    static shortTwice(type: 'heavy' | 'medium' | 'light', interval: number) {
        Taro.vibrateShort({
            type: type,
            success: async () => {
                await delayTime(interval)
                Taro.vibrateShort({ type: type })
            }
        })
    }

    static long() {
        Taro.vibrateLong()
    }

    static longTwice(interval: number) {
        Taro.vibrateLong({
            success: async () => {
                await delayTime(interval)
                Taro.vibrateLong()
            }
        })
    }
}