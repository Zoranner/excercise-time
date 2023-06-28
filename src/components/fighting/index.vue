<script lang="ts" setup>
import { eventCenter, getCurrentInstance } from '@tarojs/taro'
import CircleProgress from '@/components/fighting/circle-progress.vue'
import ControlBar from '@/components/base/control-bar/index.vue'

// 计算导航栏高度
const appHeaderHeight = globalConst.statusBarHeight + globalConst.titleBarHeight
const circleRadius = (globalConst.screenHeight - appHeaderHeight) * 0.4 * 0.5
const leftTimeFontSize = circleRadius * 0.042
const stateCaptionFontSize = circleRadius * 0.012
const cycleTitleFontSize = circleRadius * 0.012
const cycleValueFontSize = circleRadius * 0.014

let intervalTime = 8000
const currentState = ref(0)
const currentTimer = ref(8)
const currentProgress = ref(0)
const backgroundColor = ref(['var(--color-lg-green)', 'var(--color-lg-red)', 'var(--color-lg-yellow)', 'var(--color-lg-blue)'])
const stateCaptions = ref(['锻炼', '休息', '组间休息', '冷却时间'])
const audioContents = ref(['3', '2', '1', '锻炼', '休息', '组间休息', '冷却时间'])

const delayTime = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const vibrateLongOnce = async () => {
	if (globalStore.vibrateState.value !== true) {
		return
	}
	Taro.vibrateLong({})
}

const vibrateShortTwice = async () => {
	if (globalStore.vibrateState.value !== true) {
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
	if (globalStore.audioState.value !== true) {
		return
	}
	if (audioContents.value.indexOf(text) === -1) {
		return
	}
	const innerAudioContext = Taro.createInnerAudioContext()
	innerAudioContext.autoplay = true
	innerAudioContext.src = `assets/audios/${text}.wav`
}

const changeCurrentState = () => {
	currentState.value = (currentState.value + 1) % 4
}

const autoChangeState = () => {
	setInterval(() => {
		if (globalConst.timerState !== true) {
			return
		}
		if (intervalTime % 1000 === 0) {
			currentTimer.value = intervalTime / 1000
			playTextAudio(currentTimer.value.toString())
			if (currentTimer.value < 1) {
				currentTimer.value = currentTimer.value + 8
				currentState.value = (currentState.value + 1) % 4
				if (currentState.value === 0) {
					vibrateLongOnce()
				} else {
					vibrateShortTwice()
				}
				playTextAudio(stateCaptions.value[currentState.value])
				intervalTime = 8000
			}
		}
		currentProgress.value = ((8000 - intervalTime) / 8000) * 100
		intervalTime -= 50
	}, 50)
}

onMounted(() => {
	const router = getCurrentInstance().router
	if (router === null) {
		return
	}
	eventCenter.on(router.onHide, () => {
		console.log('onHide')
		globalConst.timerState = false
		globalStore.save()
	})
	eventCenter.on(router.onShow, () => {
		console.log('onShow')
		globalStore.load()
	})
})

autoChangeState()
</script>

<template>
	<view class="fightingPage">
		<view class="fightingBase flex flex-col items-center" :style="{ background: backgroundColor[currentState] }">
			<CircleProgress class="timeProgress fixed" :progress="currentProgress" :radius="circleRadius" @click="changeCurrentState()">
				<text class="timeContent" :style="{ fontSize: leftTimeFontSize + 'em' }">{{ '00:0' + currentTimer }}</text>
			</CircleProgress>
			<text class="stateCaption fixed" :style="{ fontSize: stateCaptionFontSize + 'em' }">{{ stateCaptions[currentState] }}</text>
			<ControlBar class="controlBar fixed"></ControlBar>
			<view class="cycleValueArea w-70% fixed flex">
				<text class="cycleContent" :style="{ fontSize: cycleValueFontSize + 'em' }">1/3</text>
				<text class="cycleContent" :style="{ fontSize: cycleValueFontSize + 'em' }">1/10</text>
			</view>
			<view class="cycleTitleArea w-70% fixed flex">
				<text class="cycleContent" :style="{ fontSize: cycleTitleFontSize + 'em' }">周期</text>
				<text class="cycleContent" :style="{ fontSize: cycleTitleFontSize + 'em' }">循环</text>
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
			color: var(--color-white);
			filter: var(--shadow-drop-white);
		}
		.cycleTitleArea {
			bottom: 20%;
			text-align: center;
			color: var(--color-white);
			filter: var(--shadow-drop-white);
		}
		.cycleContent {
			width: 50%;
			font-family: 'Local Progress';
		}
	}
}
</style>
