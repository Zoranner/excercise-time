import { nanoid } from 'nanoid/non-secure'

class Preset {
	/** 唯一标识 */
	readonly id: string
	/** 标题 */
	caption: string
	/** 准备时间 */
	prepareTime: number
	/** 锻炼时间 */
	exerciseTime: number
	/** 休息时间 */
	cycleRestTime: number
	/** 周期 */
	cycle: number
	/** 循环 */
	loop: number
	/** 组间休息时间 */
	loopRestTime: number
	/** 冷却时间 */
	coolingTime: number

	constructor(
		caption: string = '锻炼时间',
		prepareTime: number = 5,
		exerciseTime: number = 10,
		cycleRestTime: number = 5,
		cycle: number = 10,
		loop: number = 3,
		loopRestTime: number = 30,
		coolingTime: number = 30
	) {
		this.id = nanoid(10)
		this.caption = caption
		this.prepareTime = prepareTime
		this.exerciseTime = exerciseTime
		this.cycleRestTime = cycleRestTime
		this.cycle = cycle
		this.loop = loop
		this.loopRestTime = loopRestTime
		this.coolingTime = coolingTime
	}
}

class PresetsDict {
	private dict: { [key: string]: Preset } = {}

	constructor() { }

	add(preset: Preset): void {
		if (this.dict[preset.id] !== undefined) {
			return
		}
		this.dict[preset.id] = preset
	}

	get(id: string): Preset {
		return this.dict[id]
	}

	keys(): string[] {
		return Object.keys(this.dict)
	}

	values(): Preset[] {
		return Object.values(this.dict)
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
	}

	clear(): void {
		this.dict = {}
	}
}

export { Preset, PresetsDict }