import { TypedEvent } from "@/utils/typedEvent";
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
    private localStatus: PresetPlayerStatus = PresetPlayerStatus.Stopped

    get status(): PresetPlayerStatus {
        return this.localStatus
    }
    private set status(status: PresetPlayerStatus) {
        this.localStatus = status
    }

    timerTypeUpdatedEvent = new TypedEvent<PresetTimerType>()
    timerTimeUpdatedEvent = new TypedEvent<number>()
    timerProgressUpdatedEvent = new TypedEvent<number>()

    constructor() { }

    load(preset: Preset): void {
        if (this.status !== PresetPlayerStatus.Stopped) {
            return
        }
        this.preset = preset
    }

    play(): PresetPlayerStatus {
        if (this.status !== PresetPlayerStatus.Running) {
            if (this.status === PresetPlayerStatus.Stopped) {
                this.updatePlayer()
            }
            this.status = PresetPlayerStatus.Running
            console.log('play')
        }
        return this.status
    }

    pause(): PresetPlayerStatus {
        if (this.status !== PresetPlayerStatus.Paused) {
            this.status = PresetPlayerStatus.Paused
            console.log('pause')
        }
        return this.status
    }

    stop(): PresetPlayerStatus {
        if (this.status !== PresetPlayerStatus.Stopped) {
            this.status = PresetPlayerStatus.Stopped
            console.log('stop')
        }
        return this.status
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
        this.timerTypeUpdatedEvent.emit(type)
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
                this.timerTimeUpdatedEvent.emit(leftMilliseconds / 1000)
            }
            leftMilliseconds -= this.INTERVAL
            this.timerProgressUpdatedEvent.emit(leftMilliseconds / milliseconds)
        }, this.INTERVAL))
    }
}

export { PresetPlayer, PresetPlayerStatus, PresetTimerType }