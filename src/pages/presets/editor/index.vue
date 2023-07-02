<script lang="ts" setup>
import { getCurrentInstance } from '@tarojs/taro'
import TitleBar from '@/components/base/title-bar/index.vue'
import PresetEditor from '@/components/presets/editor/index.vue'
import ButtonCustom from '@/components/base/button/index.vue'
import PickerLayer from '@/components/global/picker-layer/index.vue'

definePageConfig({
	navigationStyle: 'custom',
	disableScroll: true // 禁止页面滚动
})

const presetIdRef = ref('')
const presetEditorRef = ref()
const pickerLayerRef = ref()

const navigationBack = () => {
	Taro.navigateBack()
}

onMounted(() => {
	let router = getCurrentInstance().router
	if (router !== null) {
		if (router.params.id === undefined ||
			!Config.presetsDict.contains(router.params.id)) {
			Taro.navigateBack()
			return
		}
		presetIdRef.value = router.params.id
	}
	Dialog.setPicker(pickerLayerRef)
	presetEditorRef.value.loadPresetData(presetIdRef.value)
})
</script>

<template>
	<TitleBar caption="编辑预设" color="var(--color-black)" :action="navigationBack">
		<image src="@/assets/images/title-bar/back.svg"></image>
	</TitleBar>
	<view class="editorContainer" :style="{ '--appHeaderHeight': Config.appHeaderHeight + 'px' }">
		<PresetEditor ref="presetEditorRef" v-show="presetIdRef !== ''" />
	</view>
	<view class="editorOperateArea flex fixed bottom-0 left-0 right-0">
		<ButtonCustom class="editorOperateButton flex-1 w-100%" caption="取消" type="normal" @click="" />
		<ButtonCustom class="editorOperateButton flex-1 w-100%" caption="确认" type="success" @click="" />
	</view>
	<PickerLayer ref="pickerLayerRef" />
</template>

<style lang="scss">
.editorContainer {
	height: calc(100vh - var(--appHeaderHeight) - 150px);
	height: calc(100vh - var(--appHeaderHeight) - constant(safe-area-inset-bottom) - 150px);
	height: calc(100vh - var(--appHeaderHeight) - env(safe-area-inset-bottom) - 150px);
	background: var(--color-dark-gray);
	padding-top: var(--appHeaderHeight);
	padding-bottom: 150px;
	padding-bottom: calc(constant(safe-area-inset-bottom) + 150px);
	padding-bottom: calc(env(safe-area-inset-bottom) + 150px);
}

.editorOperateArea {
	height: 100px;
	padding-top: 50px;
	padding-bottom: 50px;
	padding-bottom: calc(constant(safe-area-inset-bottom) + 50px);
	padding-bottom: calc(env(safe-area-inset-bottom) + 50px);
	padding-left: 50px;
	padding-right: 50px;
	background-color: var(--color-black);
	filter: var(--shadow-drop-black);

	.editorOperateButton:not(:last-child) {
		margin-right: 40px;
	}
}
</style>
