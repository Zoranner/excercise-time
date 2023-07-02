<script lang="ts" setup>
import InputItem from './input-item.vue'
import OptionItem from './option-item.vue'
import ButtonCustom from '@/components/base/button/index.vue'

const captionRef = ref('锻炼时间')
const prepareTimeRef = ref(0)
const exerciseTimeRef = ref(0)
const cycleRestTimeRef = ref(0)
const cycleRef = ref(0)
const loopRef = ref(0)
const loopRestTimeRef = ref(0)
const coolingTimeRef = ref(0)

const loadPresetData = (id: string) => {
	const preset = Config.presetsDict.get(id)
	if (preset) {
		captionRef.value = preset.caption
		prepareTimeRef.value = preset.prepareTime
		exerciseTimeRef.value = preset.exerciseTime
		cycleRestTimeRef.value = preset.cycleRestTime
		cycleRef.value = preset.cycle
		loopRef.value = preset.loop
		loopRestTimeRef.value = preset.loopRestTime
		coolingTimeRef.value = preset.coolingTime
	}
	// Dialog.showPicker('number', [10], (result: boolean, value: number[] | undefined) => {
	// 	console.log(result, value)
	// })
	// Dialog.showPicker('time', [0, 10], (result: boolean, value: number[] | undefined) => {
	// 	console.log(result, value)
	// })
}

const showPopupPicker = (
	type: 'time' | 'number',
	value: number,
	callback: (result: boolean, value: number[] | undefined) => void) => {
	switch (type) {
		case 'number':
			Dialog.showPicker(type, [value], callback)
			break
		case 'time':
			const minutes = Math.min(Math.floor(value / 60), 99);
			const seconds = value % 60;
			Dialog.showPicker(type, [minutes, seconds], callback)
			break
	}
}

const setPrepareTime = (result: boolean, value: number[] | undefined) => {
	if (result && value) {
		prepareTimeRef.value = value[0] * 60 + value[1]
	}
}

const setExerciseTime = (result: boolean, value: number[] | undefined) => {
	if (result && value) {
		exerciseTimeRef.value = value[0] * 60 + value[1]
	}
}

const setCycleRestTime = (result: boolean, value: number[] | undefined) => {
	if (result && value) {
		cycleRestTimeRef.value = value[0] * 60 + value[1]
	}
}

const setCycle = (result: boolean, value: number[] | undefined) => {
	if (result && value) {
		cycleRef.value = value[0]
	}
}

const setLoop = (result: boolean, value: number[] | undefined) => {
	if (result && value) {
		loopRef.value = value[0]
	}
}

const setLoopRestTime = (result: boolean, value: number[] | undefined) => {
	if (result && value) {
		loopRestTimeRef.value = value[0] * 60 + value[1]
	}
}

const setCoolingTime = (result: boolean, value: number[] | undefined) => {
	if (result && value) {
		coolingTimeRef.value = value[0] * 60 + value[1]
		console.log(coolingTimeRef.value)
	}
}

const savePresetData = () => {
	// const preset = new Preset()
	// preset.caption = captionRef.value
	// preset.prepareTime = prepareTimeRef.value
	// preset.exerciseTime = exerciseTimeRef.value
	// preset.cycleRestTime = cycleRestTimeRef.value
	// preset.cycle = cycleRef.value
	// preset.loop = loopRef.value
	// preset.loopRestTime = loopRestTimeRef.value
	// preset.coolingTime = coolingTimeRef.value
	// Config.presetsDict.set(preset.id, preset)
	// Config.savePresets()
}

defineExpose({
	loadPresetData,
	savePresetData
})
</script>

<template>
	<view class="presetEditorArea">
		<scroll-view class="presetEditorScrollView" :scroll-y="true">
			<InputItem class="presetOption" caption="名称" :value="captionRef" />
			<OptionItem class="presetOption" caption="准备时间" :value="prepareTimeRef" type="time"
				@click="showPopupPicker('time', prepareTimeRef, setPrepareTime)" />
			<OptionItem class="presetOption" caption="锻炼时间" :value="exerciseTimeRef" type="time"
				@click="showPopupPicker('time', exerciseTimeRef, setExerciseTime)" />
			<OptionItem class="presetOption" caption="休息时间" :value="cycleRestTimeRef" type="time"
				@click="showPopupPicker('time', cycleRestTimeRef, setCycleRestTime)" />
			<OptionItem class="presetOption" caption="周期" :value="cycleRef"
				@click="showPopupPicker('number', cycleRef, setCycle)" />
			<OptionItem class="presetOption" caption="循环" :value="loopRef"
				@click="showPopupPicker('number', loopRef, setLoop)" />
			<OptionItem class="presetOption" caption="组间休息" :value="loopRestTimeRef" type="time"
				@click="showPopupPicker('time', loopRestTimeRef, setLoopRestTime)" />
			<OptionItem class="presetOption" caption="冷却时间" :value="coolingTimeRef" type="time"
				@click="showPopupPicker('time', coolingTimeRef, setCoolingTime)" />
			<ButtonCustom class="presetDelete" caption="删除" type="warning" @click="" />
			<view class="presetPlaceholder"></view>
		</scroll-view>
	</view>
</template>

<style lang="scss">
.presetEditorArea {
	height: 100%;
	background: var(--color-dark-gray);

	.presetEditorScrollView {
		width: calc(100% - 40px);
		height: 100%;
		padding: 0 20px;
		filter: var(--shadow-drop-black);

		.presetOption {
			height: 150px;
			margin: 30px 0;
			box-sizing: border-box;
		}

		.presetDelete {
			height: 120px;
			margin: 30px 0;
			box-sizing: border-box;
		}

		.presetPlaceholder {
			height: 70px;
		}
	}
}
</style>
