import { TypedEvent } from "@/utils/typedEvent"
import { Preset } from "./preset"

enum PresetsDictUpdateType {
    Add,
    Set,
    Remove,
}

class PresetsDict {
    private dict: { [key: string]: Preset } = {}

    /** 当前数据版本 */
    version: number = 3

    updated = new TypedEvent<PresetsDictUpdateType>()

    constructor() { }

    add(preset: Preset): void {
        if (this.dict[preset.id] !== undefined) {
            return
        }
        this.dict[preset.id] = preset
        this.updated.emit(PresetsDictUpdateType.Add)
    }

    get(id: string): Preset {
        return this.dict[id]
    }

    set(id: string, preset: Preset): void {
        if (this.dict[id] === undefined) {
            return
        }
        delete this.dict[id]
        this.dict[preset.id] = preset
        this.updated.emit(PresetsDictUpdateType.Set)
    }

    keys(): string[] {
        return Object.keys(this.dict).sort((a, b) => this.dict[a].createTime - this.dict[b].createTime)
    }

    values(): Preset[] {
        return Object.values(this.dict).sort((a, b) => a.createTime - b.createTime)
    }

    contains(id: string): boolean {
        return this.dict[id] !== undefined
    }

    length(): number {
        return Object.keys(this.dict).length
    }

    remove(id: string): void {
        if (this.dict[id] === undefined) {
            return
        }
        delete this.dict[id]
        this.updated.emit(PresetsDictUpdateType.Remove)
    }

    clear(): void {
        while (this.length() > 0) {
            delete this.dict[this.keys()[0]]
        }
    }
}

export { PresetsDict, PresetsDictUpdateType }