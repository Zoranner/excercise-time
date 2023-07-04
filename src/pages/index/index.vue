<script lang="ts" setup>
import { Preset, PresetOptions } from '@/services/presets/preset'
import TitleBar from '@/components/base/title-bar/index.vue'
import Settings from '@/components/settings/index.vue'
import Fighting from '@/components/fighting/index.vue'
import Presets from '@/components/presets/index.vue'
import TabBar from '@/components/base/tab-bar/index.vue'
import EditorLayer from '@/components/global/editor-layer/index.vue'
import PickerLayer from '@/components/global/picker-layer/index.vue'
import ModalLayer from '@/components/global/modal-layer/index.vue'
import ToastLayer from '@/components/global/toast-layer/index.vue'

definePageConfig({
	navigationStyle: 'custom',
	disableScroll: true // 禁止页面滚动
})

const toastLayerRef = ref()
const modalLayerRef = ref()
const pickerLayerRef = ref()
const editorLayerRef = ref()
const titleCaption = ref('锻炼时间')
const titleBarColor = ref('var(--color-transparent)')

const switchTitleBar = (index: number) => {
	switch (index) {
		case 0:
			titleCaption.value = '配置列表'
			titleBarColor.value = 'var(--color-black)'
			break
		case 1:
			let currentPreset = Config.presetPlayer.preset
			titleCaption.value = currentPreset.caption
			titleBarColor.value = 'var(--color-transparent)'
			break
		case 2:
			titleCaption.value = '预设列表'
			titleBarColor.value = 'var(--color-black)'
			break
	}
}

const titleBarAction = () => {
	Vibrate.short('light')
	switch (Config.ref.tabBarSelected) {
		case 2:
			Dialog.showEditor(null, (result: EditorResult, options: PresetOptions | undefined) => {
				if (result === EditorResult.Save && options) {
					const preset = new Preset(
						options.caption,
						options.prepareTime,
						options.exerciseTime,
						options.cycleRestTime,
						options.cycle,
						options.loop,
						options.loopRestTime,
						options.coolingTime,
					)
					Config.presetsDict.add(preset)
				}
			})
			break
	}
}

const tabBarChange = (index: number) => {
	switchTitleBar(index)
}

onMounted(() => {
	let router = Taro.getCurrentInstance().router
	if (router !== null) {
		Taro.eventCenter.on(router.onHide, () => {
			Config.saveStorage()
		})
		Taro.eventCenter.on(router.onShow, () => {
			Taro.setKeepScreenOn({ keepScreenOn: true })
		})
	}
	switchTitleBar(Config.ref.tabBarSelected)
	Dialog.setToast(toastLayerRef)
	Dialog.setModal(modalLayerRef)
	Dialog.setPicker(pickerLayerRef)
	Dialog.setEditor(editorLayerRef)
})

onUnmounted(() => {
	let router = Taro.getCurrentInstance().router
	if (router !== null) {
		Taro.eventCenter.off(router.onHide)
		Taro.eventCenter.off(router.onShow)
	}
})
</script>

<template>
	<TitleBar :caption="titleCaption" :color="titleBarColor" :action="titleBarAction">
		<image src="@/assets/images/title-bar/alarm_add.svg" v-if="Config.ref.tabBarSelected === 2"></image>
	</TitleBar>
	<view :class="Config.ref.tabBarSelected === 1 ? 'mainContainer' : 'viceContainer'"
		:style="{ '--appHeaderHeight': Config.appHeaderHeight + 'px' }">
		<Settings class="pageContentItem" v-if="Config.ref.tabBarSelected === 0" />
		<Fighting class="pageContentItem" v-show="Config.ref.tabBarSelected === 1" />
		<Presets class="pageContentItem" v-if="Config.ref.tabBarSelected === 2" />
	</view>
	<TabBar @change="tabBarChange" />
	<EditorLayer ref="editorLayerRef" />
	<PickerLayer ref="pickerLayerRef" />
	<ModalLayer ref="modalLayerRef" />
	<ToastLayer ref="toastLayerRef" />
</template>

<style lang="scss">
.mainContainer {
	height: 100vh;
	background: var(--color-dark-gray);

	.pageContentItem {
		transform: all 1s ease-in-out;
	}
}

.viceContainer {
	height: calc(100vh - var(--appHeaderHeight) - 140px);
	height: calc(100vh - var(--appHeaderHeight) - constant(safe-area-inset-bottom) - 140px);
	height: calc(100vh - var(--appHeaderHeight) - env(safe-area-inset-bottom) - 140px);
	background: var(--color-dark-gray);
	padding-top: var(--appHeaderHeight);
	padding-bottom: 200px;
	padding-bottom: calc(constant(safe-area-inset-bottom) + 200px);
	padding-bottom: calc(env(safe-area-inset-bottom) + 200px);

	.pageContentItem {
		transform: all 1s ease-in-out;
	}
}
</style>
