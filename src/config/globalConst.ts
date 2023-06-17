// 获取系统信息
const { statusBarHeight, screenHeight } = Taro.getSystemInfoSync()
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

export const globalConst = reactive({
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
	/** 音效状态 */
	audioState: true,
	/** 标签栏选中的Index */
	tabBarSelected: 1,
})
