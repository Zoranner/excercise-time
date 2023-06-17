<script lang="ts" setup>
import { globalConst } from '@/config/globalConst'

// const isPlay = ref(false)
// const hasSound = ref(false)
const emitTimerReset = defineEmits(['reset'])

const resetTimerState = () => {
	Taro.vibrateShort({ type: 'light' })
	emitTimerReset('reset')
}

const switchTimerState = () => {
	Taro.vibrateShort({ type: 'light' })
	globalConst.timerState = !globalConst.timerState
}
const switchAudioState = () => {
	Taro.vibrateShort({ type: 'light' })
	globalConst.audioState = !globalConst.audioState
}
</script>

<template>
	<view class="controlBarPanel w-70% fixed flex items-center justify-center">
		<view class="controlIconArea flex items-center justify-center" key="reset" @click="resetTimerState()">
			<image class="controlIcon" src="../../../assets/images/control-bar/icons8-reset-96-w.png" />
		</view>
		<view class="controlIconArea flex items-center justify-center" key="reset" @click="switchTimerState()">
			<image class="controlIcon" v-show="globalConst.timerState" src="../../../assets/images/control-bar/icons8-pause-96-w.png" />
			<image class="controlIcon" v-show="!globalConst.timerState" src="../../../assets/images/control-bar/icons8-play-96-w.png" />
		</view>
		<view class="controlIconArea flex items-center justify-center" key="reset" @click="switchAudioState()">
			<image class="controlIcon" v-show="!globalConst.audioState" src="../../../assets/images/control-bar/icons8-audio-n-96-w.png" />
			<image class="controlIcon" v-show="globalConst.audioState" src="../../../assets/images/control-bar/icons8-audio-m-96-w.png" />
		</view>
	</view>
</template>

<style lang="scss">
.controlBarPanel {
	height: 100px;
	border-radius: 50px;
	background-color: var(--color-black);
	filter: var(--shadow-drop-black);
	.controlIconArea {
		width: 30%;
		height: 100%;
		margin: 0 3%;
		filter: var(--shadow-drop-white);
		.controlIcon {
			width: 65px;
			height: 65px;
		}
	}
	.controlIconArea:active {
		filter: var(--shadow-drop-heavy-white);
		.controlIcon {
			width: 72px;
			height: 72px;
		}
	}
}
.controlBarPanel:active {
	filter: var(--shadow-drop-black);
}
</style>
