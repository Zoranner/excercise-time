import { createApp } from 'vue'
import 'uno.css'

const App = createApp({
	onLaunch() { },
	onShow() {
		Taro.setKeepScreenOn({ keepScreenOn: true })
		const updateManager = Taro.getUpdateManager()
		updateManager.onCheckForUpdate((_result) => { })
		updateManager.onUpdateReady(() => {
			Dialog.showModal('新版本已经准备好，是否重启应用？', (result) => {
				if (result) {
					updateManager.applyUpdate()
				}
			})
		})
	},
	onHide() {
		Config.saveStorage()
		Taro.setKeepScreenOn({ keepScreenOn: false })
	}
})

export default App
