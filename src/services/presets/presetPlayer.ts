import { Preset } from "./preset";

enum PresetPlayerStatus {
    Stopped,
    Running,
    Paused
}

enum PresetTimerType {
    None,
    Prepare,
    Exercise,
    CycleRest,
    LoopRest,
    Cooling
}

class PresetPlayer {
    private INTERVAL = 50

    private preset: Preset
    private status: PresetPlayerStatus = PresetPlayerStatus.Stopped

    onTimerTypeUpdated: (type: PresetTimerType) => void
    onTimerTimeUpdated: (seconds: number) => void
    onTimerProgressUpdated: (progress: number) => void

    constructor(preset: Preset) {
        this.preset = preset
    }

    start(): void {
        if (this.status === PresetPlayerStatus.Running) {
            return
        }
        if (this.status === PresetPlayerStatus.Paused) {
            this.status = PresetPlayerStatus.Running
            return
        }
        this.updatePlayer()
        this.status = PresetPlayerStatus.Running
    }

    pause(): void {
        if (this.status === PresetPlayerStatus.Paused) {
            return
        }
        this.status = PresetPlayerStatus.Paused
    }

    stop(): void {
        if (this.status === PresetPlayerStatus.Stopped) {
            return
        }
        this.status = PresetPlayerStatus.Stopped
    }

    private async updatePlayer(): Promise<void> {
        await this.updateTimer(PresetTimerType.Prepare, this.preset.prepareTime)
        for (let i = 0; i < this.preset.loop; i++) {
            for (let j = 0; j < this.preset.cycle; j++) {
                if (this.status === PresetPlayerStatus.Stopped) {
                    return
                }
                await this.updateTimer(PresetTimerType.Exercise, this.preset.exerciseTime)
                await this.updateTimer(PresetTimerType.CycleRest, this.preset.cycleRestTime)
            }
            await this.updateTimer(PresetTimerType.LoopRest, this.preset.loopRestTime)
        }
        await this.updateTimer(PresetTimerType.Cooling, this.preset.coolingTime)
        this.status = PresetPlayerStatus.Stopped
    }

    private async updateTimer(type: PresetTimerType, seconds: number): Promise<void> {
        let milliseconds = seconds * 1000
        let leftMilliseconds = milliseconds
        this.onTimerTypeUpdated(type)
        return new Promise(resolve => setInterval(() => {
            if (this.status === PresetPlayerStatus.Stopped) {
                resolve()
            }
            if (this.status === PresetPlayerStatus.Paused) {
                return
            }
            if (leftMilliseconds <= 0) {
                resolve()
            }
            if (leftMilliseconds % 1000 === 0) {
                this.onTimerTimeUpdated(leftMilliseconds / 1000)
            }
            leftMilliseconds -= this.INTERVAL
            this.onTimerProgressUpdated(leftMilliseconds / milliseconds)
        }, this.INTERVAL))
    }
}

export { PresetPlayer, PresetPlayerStatus, PresetTimerType }