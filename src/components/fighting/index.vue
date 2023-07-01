<script lang="ts" setup>
import { eventCenter, getCurrentInstance } from '@tarojs/taro'
import { PresetPlayerStatus, PresetTimerType } from '@/services/presets/presetPlayer'
import CircleProgress from '@/components/fighting/circle-progress.vue'
import ControlBar from '@/components/base/control-bar/index.vue'

const circleRadius = (Glbc.screenHeight - Glbc.appHeaderHeight) * 0.4 * 0.5
const leftTimeFontSize = circleRadius * 0.042
const stateCaptionFontSize = circleRadius * 0.012
const cycleTitleFontSize = circleRadius * 0.012
const cycleValueFontSize = circleRadius * 0.014

let currentPreset = Glbc.presetPlayer.preset
const currentTimer = ref('00:00')
const currentProgress = ref(0)
const backgroundColor = ref('var(--color-lg-yellow)')
const timerTypeCaption = ref('准备')
const cycleProgress = ref('##/##')
const loopProgress = ref('##/##')

const backgroundColors = ['var(--color-lg-yellow)', 'var(--color-lg-green)', 'var(--color-lg-red)', 'var(--color-lg-yellow)', 'var(--color-lg-blue)']
const stateCaptions = ['准备', '锻炼', '休息', '组间休息', '冷却时间']
const audioContents = ['3', '2', '1', '准备', '锻炼', '休息', '组间休息', '冷却时间', '锻炼结束']

const initCircleProgress = async () => {
	for (let i = 10; i > 0; i--) {
		await delayTime(30)
		currentProgress.value = i / 10
	}
}

const vibrateLongOnce = async () => {
	if (Glbc.ref.vibrateState !== true) {
		return
	}
	Taro.vibrateLong()
}

const vibrateShortTwice = async () => {
	if (Glbc.ref.vibrateState !== true) {
		return
	}
	Taro.vibrateShort({
		type: 'heavy',
		success: async () => {
			await delayTime(200)
			Taro.vibrateShort({ type: 'heavy' })
		}
	})
}

const playTextAudio = (text: string) => {
	if (Glbc.ref.audioState !== true) {
		return
	}
	if (audioContents.indexOf(text) === -1) {
		return
	}
	let innerAudioContext = Taro.createInnerAudioContext()
	innerAudioContext.autoplay = true
	innerAudioContext.src = `assets/audios/${text}.wav`
}

const initPageElements = () => {
	currentPreset = Glbc.presetPlayer.preset
	currentTimer.value = toHumanTime(currentPreset.prepareTime)
	initCircleProgress()
	backgroundColor.value = 'var(--color-lg-yellow)'
	timerTypeCaption.value = '准备'
	if (currentPreset !== null) {
		cycleProgress.value = `${currentPreset.cycle}/${currentPreset.cycle}`
		loopProgress.value = `${currentPreset.loop}/${currentPreset.loop}`
	}
	else {
		cycleProgress.value = '##/##'
		loopProgress.value = '##/##'
	}
}

onMounted(() => {
	let router = getCurrentInstance().router
	if (router !== null) {
		eventCenter.on(router.onHide, () => {
			Glbc.presetPlayer.pause()
		})
	}

	initPageElements()

	Glbc.presetPlayer.statusUpdatedEvent.on((status) => {
		switch (status) {
			case PresetPlayerStatus.Stopped:
				initPageElements()
				break
			case PresetPlayerStatus.Paused:
			case PresetPlayerStatus.Playing:
				break
		}
	})
	Glbc.presetPlayer.timerTypeUpdatedEvent.on((type) => {
		backgroundColor.value = backgroundColors[type]
		timerTypeCaption.value = stateCaptions[type]
		playTextAudio(stateCaptions[type])
		if (type === PresetTimerType.Exercise) {
			vibrateLongOnce()
		}
		else {
			vibrateShortTwice()
		}
	})
	Glbc.presetPlayer.timerTimeUpdatedEvent.on((seconds) => {
		currentTimer.value = toHumanTime(seconds)
		if (seconds <= 3) {
			playTextAudio(seconds.toString())
		}
	})
	Glbc.presetPlayer.timerProgressUpdatedEvent.on((progress) => {
		currentProgress.value = (1 - progress) * 100
	})
	Glbc.presetPlayer.leftCycleUpdatedEvent.on((leftCycle) => {
		cycleProgress.value = `${leftCycle}/${currentPreset.cycle}`
	})
	Glbc.presetPlayer.leftLoopUpdatedEvent.on((leftLoop) => {
		loopProgress.value = `${leftLoop}/${currentPreset.loop}`
	})
	Glbc.presetPlayer.exerciseFinishedEvent.on(() => {
		playTextAudio('锻炼结束')
		vibrateShortTwice()
	})
})

onUnmounted(() => {
	let router = getCurrentInstance().router
	if (router !== null) {
		eventCenter.off(router.onHide)
	}
	Glbc.presetPlayer.stop()
	Glbc.presetPlayer.statusUpdatedEvent.off()
	Glbc.presetPlayer.timerTypeUpdatedEvent.off()
	Glbc.presetPlayer.timerTimeUpdatedEvent.off()
	Glbc.presetPlayer.timerProgressUpdatedEvent.off()
	Glbc.presetPlayer.leftCycleUpdatedEvent.off()
	Glbc.presetPlayer.leftLoopUpdatedEvent.off()
	Glbc.presetPlayer.exerciseFinishedEvent.off()
})
</script>

<template>
	<view class="fightingPage">
		<view class="fightingBase flex flex-col items-center" :style="{ background: backgroundColor }">
			<CircleProgress class="timeProgress fixed" :progress="currentProgress" :radius="circleRadius">
				<text class="timeContent" :style="{ fontSize: leftTimeFontSize + 'em' }">
					{{ currentTimer }}
				</text>
			</CircleProgress>
			<text class="stateCaption fixed" :style="{ fontSize: stateCaptionFontSize + 'em' }">
				{{ timerTypeCaption }}
			</text>
			<ControlBar class="controlBar fixed"></ControlBar>
			<view class="cycleValueArea w-70% fixed flex" :style="{ '--cycleValueFontSize': cycleValueFontSize + 'em' }">
				<text class="w-50%">{{ cycleProgress }}</text>
				<text class="w-50%">{{ loopProgress }}</text>
			</view>
			<view class="cycleTitleArea w-70% fixed flex" :style="{ '--cycleTitleFontSize': cycleTitleFontSize + 'em' }">
				<text class="w-50%">周期</text>
				<text class="w-50%">循环</text>
			</view>
		</view>
	</view>
</template>

<style lang="scss">
@font-face {
	font-family: 'Local Timer';
	src: url('../../assets/fonts/Khand-Regular.ttf');
}

@font-face {
	font-family: 'Local Progress';
	src: url('../../assets/fonts/JosefinSans-Regular.ttf');
}

.fightingPage {
	width: 100vw;
	height: 100vh;
	background: var(--color-dark-gray);

	.fightingBase {
		width: 100%;
		height: 100%;
		color: var(--color-white);

		.timeProgress {
			top: 15%;

			.timeContent {
				font-family: 'Local Timer';
				filter: var(--shadow-drop-white);
			}
		}

		.stateCaption {
			top: 53%;
			font-weight: bold;
			color: var(--color-white);
			filter: var(--shadow-drop-white);
		}

		.controlBar {
			bottom: 32%;
			height: 120px;
		}

		.cycleValueArea {
			bottom: 24%;
			text-align: center;
			font-family: 'Local Progress';
			font-size: var(--cycleValueFontSize);
			color: var(--color-white);
			filter: var(--shadow-drop-white);
		}

		.cycleTitleArea {
			bottom: 20%;
			text-align: center;
			font-family: 'Local Progress';
			font-size: var(--cycleTitleFontSize);
			color: var(--color-white);
			filter: var(--shadow-drop-white);
		}
	}
}
</style>
