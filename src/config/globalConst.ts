// 获取系统信息
const { statusBarHeight, screenWidth, screenHeight } = Taro.getSystemInfoSync()
// 获取胶囊信息
const { height, top } = Taro.getMenuButtonBoundingClientRect()
// 计算标题栏高度
const titleBarHeight = height + (top - statusBarHeight!) * 2
// // 计算应用头部高度
// const appHeaderHeight = statusBarHeight! + titleBarHeight
// // 计算标题栏位置
// const titleBarTop = statusBarHeight! + titleBarHeight / 2
// 计算标题栏字体大小
const titleBarFontSize = screenHeight * 0.0015

const envVersion = Taro.getAccountInfoSync().miniProgram.envVersion
const readableEnvVersion = () => {
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
const appVersion = Taro.getAccountInfoSync().miniProgram.version
const programVersion = `${readableEnvVersion()} (${appVersion === '' ? '#' : appVersion})`

export const globalConst = reactive({
	/** 程序版本 */
	programVersion,
	/** 程序设计 */
	programAuthor: '杨新冉',
	/** 美术设计 */
	programDesign: '冯智毅, 杨新冉',
	/** 专业顾问 */
	programCounselor: '沈钰宁',
	/** 屏幕宽度 */
	screenWidth,
	/** 屏幕高度 */
	screenHeight,
	/** 状态栏高度 */
	statusBarHeight: statusBarHeight ?? 0,
	/** 标题栏高度 */
	titleBarHeight,
	/** 标题栏文字大小 */
	titleBarFontSize,
	/** 计时器状态 */
	timerState: false,
	/** 标签栏选中的Index */
	tabBarSelected: 1,
})
