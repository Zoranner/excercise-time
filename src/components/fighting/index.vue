<script lang="ts" setup>
import CircleProgress from '@/components/fighting/circle-progress.vue'
import ControlBar from '@/components/base/control-bar/index.vue'

const circleRadius = (globalConfig.screenHeight - globalConfig.appHeaderHeight) * 0.4 * 0.5
const leftTimeFontSize = circleRadius * 0.042
const stateCaptionFontSize = circleRadius * 0.012
const cycleTitleFontSize = circleRadius * 0.012
const cycleValueFontSize = circleRadius * 0.014

const currentState = ref(0)
const currentTimer = ref(8)
const currentProgress = ref(0)
const backgroundColor = ref(['var(--color-lg-green)', 'var(--color-lg-red)', 'var(--color-lg-yellow)', 'var(--color-lg-blue)'])
const stateCaptions = ref(['锻炼', '休息', '组间休息', '冷却时间'])
const audioContents = ref(['3', '2', '1', '锻炼', '休息', '组间休息', '冷却时间'])

const delayTime = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const vibrateLongOnce = async () => {
	if (globalConfig.ref.vibrateState !== true) {
		return
	}
	Taro.vibrateLong()
}

const vibrateShortTwice = async () => {
	if (globalConfig.ref.vibrateState !== true) {
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
	if (globalConfig.ref.audioState !== true) {
		return
	}
	if (audioContents.value.indexOf(text) === -1) {
		return
	}
	let innerAudioContext = Taro.createInnerAudioContext()
	innerAudioContext.autoplay = true
	innerAudioContext.src = `assets/audios/${text}.wav`
}

// autoChangeState()
// globalConfig.presetPlayer.load(globalConfig.getCurrentPreset())
</script>

<template>
	<view class="fightingPage">
		<view class="fightingBase flex flex-col items-center" :style="{ background: backgroundColor[currentState] }">
			<CircleProgress class="timeProgress fixed" :progress="currentProgress" :radius="circleRadius">
				<text class="timeContent" :style="{ fontSize: leftTimeFontSize + 'em' }">
					{{ '00:0' + currentTimer }}
				</text>
			</CircleProgress>
			<text class="stateCaption fixed" :style="{ fontSize: stateCaptionFontSize + 'em' }">
				{{ stateCaptions[currentState] }}
			</text>
			<ControlBar class="controlBar fixed"></ControlBar>
			<view class="cycleValueArea w-70% fixed flex" :style="{ '--cycleValueFontSize': cycleValueFontSize + 'em' }">
				<text class="w-50%">1/3</text>
				<text class="w-50%">1/10</text>
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
