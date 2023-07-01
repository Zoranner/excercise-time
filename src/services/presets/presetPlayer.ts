import { TypedEvent } from "@/utils/typedEvent";
import { Preset } from "./preset";

enum PresetPlayerStatus {
    Stopped,
    Playing,
    Paused
}

enum PresetTimerType {
    Prepare = 0,
    Exercise,
    CycleRest,
    LoopRest,
    Cooling
}

class PresetPlayer {
    private INTERVAL = 50
    private intervalId: number
    private jumpCycleMark: boolean = false

    private localPreset: Preset
    get preset(): Preset {
        return this.localPreset
    }
    private set preset(preset: Preset) {
        this.localPreset = preset
    }

    private localStatus: PresetPlayerStatus = PresetPlayerStatus.Stopped
    get status(): PresetPlayerStatus {
        return this.localStatus
    }
    private set status(status: PresetPlayerStatus) {
        this.localStatus = status
        this.statusUpdatedEvent.emit(status)
    }

    statusUpdatedEvent = new TypedEvent<PresetPlayerStatus>()
    timerTypeUpdatedEvent = new TypedEvent<PresetTimerType>()
    timerTimeUpdatedEvent = new TypedEvent<number>()
    timerProgressUpdatedEvent = new TypedEvent<number>()
    leftCycleUpdatedEvent = new TypedEvent<number>()
    leftLoopUpdatedEvent = new TypedEvent<number>()
    exerciseFinishedEvent = new TypedEvent<boolean>()

    constructor() { }

    load(preset: Preset): void {
        this.preset = preset
        this.status = PresetPlayerStatus.Stopped
    }

    play(): PresetPlayerStatus {
        switch (this.status) {
            case PresetPlayerStatus.Playing:
                break
            case PresetPlayerStatus.Paused:
                this.status = PresetPlayerStatus.Playing
                break
            case PresetPlayerStatus.Stopped:
                this.status = PresetPlayerStatus.Playing
                this.updatePlayer()
                break
        }
        return this.status
    }

    pause(): PresetPlayerStatus {
        if (this.status !== PresetPlayerStatus.Paused) {
            this.status = PresetPlayerStatus.Paused
        }
        return this.status
    }

    jump(): void {
        if (this.status !== PresetPlayerStatus.Playing) {
            return
        }
        this.jumpCycleMark = true
    }

    stop(): PresetPlayerStatus {
        if (this.status !== PresetPlayerStatus.Stopped) {
            this.status = PresetPlayerStatus.Stopped
        }
        return this.status
    }

    private async updatePlayer(): Promise<void> {
        await this.updateTimer(PresetTimerType.Prepare, this.preset.prepareTime)
        for (let loop = this.preset.loop; loop > 0; loop--) {
            this.leftLoopUpdatedEvent.emit(loop)
            for (let cycle = this.preset.cycle; cycle > 0; cycle--) {
                this.leftCycleUpdatedEvent.emit(cycle)
                if (this.status === PresetPlayerStatus.Stopped) {
                    continue
                }
                await this.updateTimer(PresetTimerType.Exercise, this.preset.exerciseTime)
                if (cycle === 1) {
                    continue
                }
                await this.updateTimer(PresetTimerType.CycleRest, this.preset.cycleRestTime)
            }
            if (loop === 1) {
                continue
            }
            await this.updateTimer(PresetTimerType.LoopRest, this.preset.loopRestTime)
        }
        await this.updateTimer(PresetTimerType.Cooling, this.preset.coolingTime)
        this.status = PresetPlayerStatus.Stopped
        this.exerciseFinishedEvent.emit(true)
    }

    private async updateTimer(type: PresetTimerType, seconds: number): Promise<void> {
        if (this.status === PresetPlayerStatus.Stopped) {
            return
        }
        let milliseconds = seconds * 1000
        let leftMilliseconds = milliseconds
        this.timerTypeUpdatedEvent.emit(type)
        return new Promise((resolve) => {
            this.intervalId = setInterval(() => {
                if (this.status === PresetPlayerStatus.Stopped) {
                    clearInterval(this.intervalId)
                    resolve()
                    return
                }
                if (this.jumpCycleMark) {
                    this.jumpCycleMark = false
                    clearInterval(this.intervalId)
                    resolve()
                    return
                }
                if (this.status === PresetPlayerStatus.Paused) {
                    return
                }
                if (leftMilliseconds % 1000 === 0) {
                    this.timerTimeUpdatedEvent.emit(leftMilliseconds / 1000)
                }
                leftMilliseconds -= this.INTERVAL
                if (leftMilliseconds <= 0) {
                    clearInterval(this.intervalId)
                    resolve()
                    return
                }
                this.timerProgressUpdatedEvent.emit(leftMilliseconds / milliseconds)
            }, this.INTERVAL)
        })
    }
}

export { PresetPlayer, PresetPlayerStatus, PresetTimerType }