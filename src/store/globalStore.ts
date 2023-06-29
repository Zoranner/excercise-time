import { Preset, PresetsDict } from '@/services/presets/preset'

class GlobalStore {
	/** 是否第一次打开程序 */
	firstTime: boolean = true
	/** 预设字典 */
	presetsDict: PresetsDict = new PresetsDict()
	// /** 音频状态 */
	// audioState: Ref<boolean> = ref(true)
	// /** 震动状态 */
	// vibrateState: Ref<boolean> = ref(true)
	// /** 选中预设的Index */
	// presetSelect: Ref<string> = ref('')

	ref = reactive({
		/** 音频状态 */
		audioState: true,
		/** 震动状态 */
		vibrateState: true,
		/** 选中预设的Index */
		presetSelect: ''
	})

	constructor() {
		this.load()
	}

	load(): void {
		this.firstTime = typeConvert.toBoolean(Taro.getStorageSync('firstTime'))
		this.ref.audioState = typeConvert.toBoolean(Taro.getStorageSync('audioState'))
		this.ref.vibrateState = typeConvert.toBoolean(Taro.getStorageSync('vibrateState'))
		this.presetsDict = this.toPresetsDict(Taro.getStorageSync('presetsDict'))
		this.ref.presetSelect = Taro.getStorageSync('presetSelect')

		if (this.firstTime) {
			if (this.presetsDict.length() === 0) {
				for (let i = 1; i <= 9; i++) {
					this.presetsDict.add(new Preset(`锻炼时间${i}`))
				}
				this.ref.presetSelect = this.presetsDict.keys()[0]
				this.firstTime = false
			}
		}
		else {
			if (!this.presetsDict.contains(this.ref.presetSelect)) {
				this.ref.presetSelect = this.presetsDict.keys()[0]
			}
		}
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

	getCurrentPreset(): Preset {
		let preset = this.presetsDict.get(this.ref.presetSelect)
		if (preset === undefined) {
			preset = new Preset('锻炼时间')
		}
		return preset
	}

	save(): void {
		Taro.setStorageSync('firstTime', this.firstTime)
		Taro.setStorageSync('audioState', this.ref.audioState)
		Taro.setStorageSync('vibrateState', this.ref.vibrateState)
		Taro.setStorageSync('presetsDict', JSON.stringify(this.presetsDict))
		Taro.setStorageSync('presetSelect', this.ref.presetSelect)
	}
}

export const globalStore = new GlobalStore()