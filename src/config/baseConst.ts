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

export const baseConst = reactive({
	screenHeight,
	statusBarHeight: statusBarHeight ?? 0,
	titleBarHeight,
	titleBarFontSize,
})
