<script lang="ts" setup>
import { eventCenter, getCurrentInstance } from '@tarojs/taro'
import { PresetPlayerStatus, PresetTimerType } from '@/services/presets/presetPlayer'
import CircleProgress from '@/components/fighting/circle-progress.vue'
import ControlBar from '@/components/base/control-bar/index.vue'

const circleRadius = (Config.screenHeight - Config.appHeaderHeight) * 0.4 * 0.5
const leftTimeFontSize = circleRadius * 0.042
const stateCaptionFontSize = circleRadius * 0.012
const cycleTitleFontSize = circleRadius * 0.012
const cycleValueFontSize = circleRadius * 0.014

let currentPreset = Config.presetPlayer.preset
const currentSeconds = ref(0)
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
	for (let i = 3; i > 0; i--) {
		await delayTime(30)
		currentProgress.value = i / 10
	}
}

const vibrateLongOnce = async () => {
	if (Config.ref.vibrateState !== true) {
		return
	}
	Vibrate.long()
}

const vibrateShortTwice = async () => {
	if (Config.ref.vibrateState !== true) {
		return
	}
	Vibrate.shortTwice('heavy', 250)
}

const playTextAudio = (text: string) => {
	if (Config.ref.audioState !== true) {
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
	currentPreset = Config.presetPlayer.preset
	currentTimer.value = Convert.toHumanTime(currentPreset.prepareTime)
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
			Config.presetPlayer.pause()
		})
	}

	initPageElements()

	Config.presetPlayer.statusUpdatedEvent.on((status) => {
		switch (status) {
			case PresetPlayerStatus.Stopped:
				initPageElements()
				break
			case PresetPlayerStatus.Paused:
			case PresetPlayerStatus.Playing:
				break
		}
	})
	Config.presetPlayer.timerTypeUpdatedEvent.on((type) => {
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
	Config.presetPlayer.timerTimeUpdatedEvent.on((seconds) => {
		if (seconds === currentSeconds.value) {
			return
		}
		currentSeconds.value = seconds
		currentTimer.value = Convert.toHumanTime(seconds)
		if (currentSeconds.value <= 3) {
			playTextAudio(seconds.toString())
		}
	})
	Config.presetPlayer.timerProgressUpdatedEvent.on((progress) => {
		currentProgress.value = (1 - progress) * 100
	})
	Config.presetPlayer.leftCycleUpdatedEvent.on((leftCycle) => {
		cycleProgress.value = `${leftCycle}/${currentPreset.cycle}`
	})
	Config.presetPlayer.leftLoopUpdatedEvent.on((leftLoop) => {
		loopProgress.value = `${leftLoop}/${currentPreset.loop}`
	})
	Config.presetPlayer.exerciseFinishedEvent.on(() => {
		playTextAudio('锻炼结束')
		vibrateShortTwice()
	})
})

onUnmounted(() => {
	let router = getCurrentInstance().router
	if (router !== null) {
		eventCenter.off(router.onHide)
	}
	Config.presetPlayer.stop()
	Config.presetPlayer.statusUpdatedEvent.off()
	Config.presetPlayer.timerTypeUpdatedEvent.off()
	Config.presetPlayer.timerTimeUpdatedEvent.off()
	Config.presetPlayer.timerProgressUpdatedEvent.off()
	Config.presetPlayer.leftCycleUpdatedEvent.off()
	Config.presetPlayer.leftLoopUpdatedEvent.off()
	Config.presetPlayer.exerciseFinishedEvent.off()
})
</script>

<template>
	<view class="fightingPage">
		<view class="fightingBase flex flex-col items-center" :style="{ background: backgroundColor }">
			<CircleProgress class="timeProgress fixed" :progress="currentProgress" :radius="circleRadius">
				<text class="timeContent" :style="{ fontSize: leftTimeFontSize + 'rem' }">
					{{ currentTimer }}
				</text>
			</CircleProgress>
			<text class="stateCaption fixed" :style="{ fontSize: stateCaptionFontSize + 'rem' }">
				{{ timerTypeCaption }}
			</text>
			<ControlBar class="controlBar fixed"></ControlBar>
			<view class="cycleValueArea w-70% fixed flex" :style="{ '--cycleValueFontSize': cycleValueFontSize + 'rem' }">
				<text class="w-50%">{{ cycleProgress }}</text>
				<text class="w-50%">{{ loopProgress }}</text>
			</view>
			<view class="cycleTitleArea w-70% fixed flex" :style="{ '--cycleTitleFontSize': cycleTitleFontSize + 'rem' }">
				<text class="w-50%">个数</text>
				<text class="w-50%">组数</text>
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
