import { PresetPlayer } from '@/services/presets/presetPlayer'
import { Preset, PresetsDict } from '@/services/presets/preset'

class GlobalConfig {
	private static instance: GlobalConfig 

	static Instance(): GlobalConfig {
		if (!GlobalConfig.instance) {
			GlobalConfig.instance = new GlobalConfig()
		}
		return GlobalConfig.instance
	}

	ref = reactive({
		/** 标签栏选中的Index */
		tabBarSelected: 1,
		/** 音频状态 */
		audioState: true,
		/** 震动状态 */
		vibrateState: true,
	})

	/** 是否第一次打开程序 */
	firstTimeRun: boolean = true

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
		if (this.localPresetsDict === undefined) {
			this.localPresetsDict = new PresetsDict()
		}
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

	/** 选中预设的Index */
	get currentPresetId(): string {
		return this.presetPlayer.preset.id
	}
	set currentPresetId(id: string) {
		let preset = this.presetsDict.get(id)
		if (preset === undefined) {
			return
		}
		this.presetPlayer.load(preset)
	}

	private constructor() {
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
		this.firstTimeRun =Convert.toBoolean(Taro.getStorageSync('firstTimeRun'))

		if (this.firstTimeRun) {
			this.ref.audioState = true
			this.ref.vibrateState = true
			this.resetPresetsData();
			this.firstTimeRun = false
		}
		else {
			this.ref.audioState = Convert.toBoolean(Taro.getStorageSync('audioState'))
			this.ref.vibrateState = Convert.toBoolean(Taro.getStorageSync('vibrateState'))
			this.presetsDict = this.toPresetsDict(Taro.getStorageSync('presetsDict'))
			if (this.presetsDict.version === undefined || this.presetsDict.version < 1) {
				this.resetPresetsData()
			}
			else {
				this.currentPresetId = Taro.getStorageSync('currentPresetId')
				if (!this.presetsDict.contains(this.currentPresetId)) {
					this.currentPresetId = this.presetsDict.keys()[0]
				}
			}
		}
	}

	/** 重置数据 */
	resetPresetsData(): void {
		this.presetsDict.clear()
		this.presetsDict.add(new Preset(`锻炼时间1`, 5, 8, 10, 5, 3, 30, 30))
		this.presetsDict.add(new Preset(`锻炼时间2`, 5, 8, 10, 10, 3, 30, 30))
		this.presetsDict.add(new Preset(`锻炼时间3`, 5, 8, 5, 5, 3, 30, 30))
		this.presetsDict.add(new Preset(`锻炼时间4`, 5, 8, 5, 10, 3, 30, 30))
		this.presetsDict.add(new Preset(`锻炼时间5`, 5, 10, 5, 5, 3, 30, 30))
		this.presetsDict.add(new Preset(`锻炼时间6`, 5, 10, 5, 10, 3, 30, 30))
		this.presetsDict.add(new Preset(`锻炼时间7`, 5, 15, 5, 10, 3, 30, 30))
		this.presetsDict.add(new Preset(`锻炼时间8`, 5, 20, 5, 10, 3, 30, 30))
		this.currentPresetId = this.presetsDict.keys()[0]
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

	/** 保存本地存储 */
	saveStorage(): void {
		Taro.setStorageSync('firstTimeRun', this.firstTimeRun)
		Taro.setStorageSync('audioState', this.ref.audioState)
		Taro.setStorageSync('vibrateState', this.ref.vibrateState)
		Taro.setStorageSync('presetsDict', JSON.stringify(this.presetsDict))
		Taro.setStorageSync('currentPresetId', this.presetPlayer.preset.id)
		Taro.removeStorageSync('firstTime')
	}
}

export const Config = GlobalConfig.Instance()