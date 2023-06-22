export default defineAppConfig({
	pages: [
		// 小程序入口 主页
		'pages/index/index',
		'pages/presets/editor/index',
	],
	window: {
		navigationBarBackgroundColor: '#000',
		navigationBarTextStyle: 'white',
		navigationBarTitleText: '锻炼时间',
		backgroundColor: '#686868',
		backgroundTextStyle: 'light',
		backgroundColorTop: '#686868',
		backgroundColorBottom: '#686868',
	},
})
