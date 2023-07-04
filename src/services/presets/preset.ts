import { nanoid } from 'nanoid/non-secure'

class PresetOptions {
	/** 标题 */
	caption: string
	/** 准备时间 */
	prepareTime: number
	/** 锻炼时间 */
	exerciseTime: number
	/** 休息时间 */
	cycleRestTime: number
	/** 个数 */
	cycle: number
	/** 组数 */
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

class Preset extends PresetOptions {
	/** 唯一标识 */
	readonly id: string
	/** 创建时间 */
	readonly createTime: number

	constructor(
		caption: string = '锻炼时间',
		prepareTime: number = 5,
		exerciseTime: number = 10,
		cycleRestTime: number = 5,
		cycle: number = 10,
		loop: number = 3,
		loopRestTime: number = 30,
		coolingTime: number = 30,
		createTime: number = Date.now()
	) {
		super(
			caption,
			prepareTime,
			exerciseTime,
			cycleRestTime,
			cycle,
			loop,
			loopRestTime,
			coolingTime
		)
		this.id = nanoid(10)
		this.createTime = createTime
	}
}

export { PresetOptions, Preset }