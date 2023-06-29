import { PresetPlayer } from '@/services/presets/presetPlayer'
import { Preset, PresetsDict } from '@/services/presets/preset'

class GlobalConfig {
	ref = reactive({
		/** 标签栏选中的Index */
		tabBarSelected: 1,
		/** 音频状态 */
		audioState: true,
		/** 震动状态 */
		vibrateState: true,
	})

	/** 是否第一次打开程序 */
	firstTime: boolean = true

	/** 程序版本 */
	programVersion: string
	/** 程序设计 */
	programAuthor: string
	/** 美术设计 */
	programDesign: string
	/** 专业顾问 */
	programCounselor: string

	/** 屏幕宽度 */
	screenWidth: number
	/** 屏幕高度 */
	screenHeight: number
	/** 状态栏高度 */
	statusBarHeight: number
	/** 标题栏高度 */
	titleBarHeight: number
	/** 应用头部高度 */
	appHeaderHeight: number
	/** 标题栏文字大小 */
	titleBarFontSize: number

	/** 预设字典 */
	private localPresetsDict: PresetsDict
	get presetsDict(): PresetsDict {
		return this.localPresetsDict
	}
	private set presetsDict(presetsDict: PresetsDict) {
		this.localPresetsDict = presetsDict
	}

	/** 预设播放器 */
	private localPresetPlayer: PresetPlayer
	get presetPlayer(): PresetPlayer {
		if (this.localPresetPlayer === undefined) {
			this.localPresetPlayer = new PresetPlayer()
		}
		return this.localPresetPlayer
	}
	private set presetPlayer(presetPlayer: PresetPlayer) {
		this.localPresetPlayer = presetPlayer
	}

	// /** 选中预设的Index */
	// private localPresetSelect: string
	// get presetSelect(): string {
	// 	return this.localPresetSelect
	// }
	// set presetSelect(id: string) {
	// 	this.localPresetSelect = id
	// 	let preset = this.presetsDict.get(id)
	// 	this.presetPlayer.load(preset)
	// }

	constructor() {
		this.initialize()
		this.getSystemInfo()
		this.getProgramVersion()
		this.setAboutInfo()
		this.loadStorage()
	}

	/** 初始化部分变量 */
	initialize(): void {
		this.presetPlayer = new PresetPlayer()
		// this.presetPlayer.load(new Preset(''))
		// this.presetPlayer.play()
	}

	/** 加载本地存储 */
	loadStorage(): void {
		this.ref.audioState = typeConvert.toBoolean(Taro.getStorageSync('audioState'))
		this.ref.vibrateState = typeConvert.toBoolean(Taro.getStorageSync('vibrateState'))
		this.firstTime = typeConvert.toBoolean(Taro.getStorageSync('firstTime'))
		this.presetsDict = this.toPresetsDict(Taro.getStorageSync('presetsDict'))
		let currentPresetId = Taro.getStorageSync('currentPresetId')

		if (this.firstTime) {
			if (this.presetsDict.length() === 0) {
				for (let i = 1; i <= 9; i++) {
					this.presetsDict.add(new Preset(`锻炼时间${i}`))
				}
				currentPresetId = this.presetsDict.keys()[0]
				this.firstTime = false
			}
		}
		else {
			if (!this.presetsDict.contains(currentPresetId)) {
				currentPresetId = this.presetsDict.keys()[0]
			}
		}
		this.presetPlayer.load(this.presetsDict.get(currentPresetId))
	}

	/** 获取程序版本 */
	private getProgramVersion(): void {
		let envVersion = Taro.getAccountInfoSync().miniProgram.envVersion
		let readableEnvVersion = () => {
			switch (envVersion) {
				case 'develop':
					return '开发版'
				case 'trial':
					return '体验版'
				case 'release':
					return '正式版'
				default:
					return '未知'
			}
		}
		let appVersion = Taro.getAccountInfoSync().miniProgram.version
		this.programVersion = `${readableEnvVersion()} (${appVersion === '' ? '#' : appVersion})`
	}

	/** 设置关于信息 */
	private setAboutInfo(): void {
		this.programAuthor = '杨新冉'
		/** 美术设计 */
		this.programDesign = '冯智毅, 杨新冉'
		/** 专业顾问 */
		this.programCounselor = '沈钰宁'
	}

	/** 获取系统信息 */
	private getSystemInfo(): void {
		// 获取系统信息
		let { statusBarHeight, screenWidth, screenHeight } = Taro.getSystemInfoSync()
		// 获取胶囊信息
		let { height, top } = Taro.getMenuButtonBoundingClientRect()
		this.screenWidth = screenWidth
		this.screenHeight = screenHeight
		this.statusBarHeight = statusBarHeight ?? 0
		this.titleBarHeight = height + (top - statusBarHeight!) * 2
		this.appHeaderHeight = this.statusBarHeight + this.titleBarHeight
		this.titleBarFontSize = screenHeight * 0.0015
	}

	/** 字符串转预设字典 */
	toPresetsDict(str: string): PresetsDict {
		try {
			let result = JSON.parse(str)
			return result === null || result === undefined ? new PresetsDict() : Object.assign(new PresetsDict(), result)
		}
		catch (e) {
			return new PresetsDict()
		}
	}

	// /** 获取当前预设 */
	// getCurrentPreset(): Preset {
	// 	if (this.presetPlayer.preset === null ||
	// 		this.presetPlayer.preset === undefined) {
	// 		this.setCurrentPreset(this.presetsDict.keys()[0])
	// 	}
	// 	return this.presetPlayer.preset
	// }

	// setCurrentPreset(id: string): void {
	// 	this.presetPlayer.load(this.presetsDict.get(id))
	// }

	/** 保存本地存储 */
	saveStorage(): void {
		Taro.setStorageSync('audioState', this.ref.audioState)
		Taro.setStorageSync('vibrateState', this.ref.vibrateState)
		Taro.setStorageSync('firstTime', this.firstTime)
		Taro.setStorageSync('presetsDict', JSON.stringify(this.presetsDict))
		Taro.setStorageSync('currentPresetId', this.presetPlayer.preset.id)
	}
}

export const globalConfig = new GlobalConfig()