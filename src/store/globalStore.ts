import { Preset, PresetsDict } from '@/services/presets/preset'

class GlobalStore {
	/** 是否第一次打开程序 */
	firstTime: boolean = true
	/** 震动状态 */
	vibrateState: Ref<boolean> = ref(true)
	/** 预设字典 */
	presetsDict: PresetsDict = new PresetsDict()
	/** 选中预设的Index */
	presetSelect: Ref<string> = ref('')

	constructor() {
		this.load()
	}

	load(): void {
		this.firstTime = this.toBoolean(Taro.getStorageSync('firstTime'))
		this.vibrateState.value = this.toBoolean(Taro.getStorageSync('vibrateState'))
		this.presetsDict = this.toPresetsDict(Taro.getStorageSync('presetsDict'))
		this.presetSelect.value = Taro.getStorageSync('presetSelect')

		if (this.firstTime) {
			if (this.presetsDict.length() === 0) {
				for (let i = 1; i <= 9; i++) {
					this.presetsDict.add(new Preset(`锻炼时间${i}`))
				}
				this.presetSelect.value = this.presetsDict.keys()[0]
				this.firstTime = false
			}
		}
		else {
			if (!this.presetsDict.contains(this.presetSelect.value)) {
				this.presetSelect.value = this.presetsDict.keys()[0]
			}
		}
	}

	toBoolean(str: string): boolean {
		return !(/false/i).test(str)
	}

	toNumber(str: string): number {
		let result = parseInt(str)
		return isNaN(result) ? -1 : result
	}

	toPresetsDict(str: string): PresetsDict {
		try {
			let result = JSON.parse(str)
			return result === null || result === undefined ? new PresetsDict() : Object.assign(new PresetsDict(), result)
		}
		catch (e) {
			return new PresetsDict()
		}
	}

	nullOrEmpty(str: string): boolean {
		return str === null || str === undefined || str === ''
	}

	save(): void {
		Taro.setStorageSync('firstTime', this.firstTime)
		Taro.setStorageSync('vibrateState', this.vibrateState.value)
		Taro.setStorageSync('presetsDict', JSON.stringify(this.presetsDict))
		Taro.setStorageSync('presetSelect', this.presetSelect.value)
	}
}

export const globalStore = new GlobalStore()