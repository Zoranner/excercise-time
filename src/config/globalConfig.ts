import { PresetPlayer } from "@/services/presets/presetPlayer"

class GlobalConfig {
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

	/** 预设播放器 */
	presetPlayer: PresetPlayer


	ref = reactive({
		/** 计时器状态 */
		timerState: 0,
		/** 标签栏选中的Index */
		tabBarSelected: 2
	})

	constructor() {
		this.getProgramVersion()
		this.setAboutInfo()
		this.getSystemInfo()
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
}

export const globalConfig = new GlobalConfig()