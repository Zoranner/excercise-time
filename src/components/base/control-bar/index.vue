<script lang="ts" setup>
// import { globalData } from '@/store/globalStore'

const isPlay = ref(false)
const isAudio = ref(false)
const emits = defineEmits(['reset'])

const resetTimerState = () => {
	Taro.vibrateShort({ type: 'medium' })
	emits('reset')
}

const switchTimerState = () => {
	Taro.vibrateShort({ type: 'medium' })
	isPlay.value = !isPlay.value
}
const switchVoiceState = () => {
	Taro.vibrateShort({ type: 'medium' })
	isAudio.value = !isAudio.value
}
</script>

<template>
	<view class="controlBarPanel w-70% fixed flex items-center justify-center">
		<view class="controlIconArea flex items-center justify-center" key="reset" @click="resetTimerState()">
			<image class="controlIcon" src="../../../assets/images/control-bar/icons8-reset-96-w.png" />
		</view>
		<view class="controlIconArea flex items-center justify-center" key="reset" @click="switchTimerState()">
			<image class="controlIcon" v-show="isPlay" src="../../../assets/images/control-bar/icons8-pause-96-w.png" />
			<image class="controlIcon" v-show="!isPlay" src="../../../assets/images/control-bar/icons8-play-96-w.png" />
		</view>
		<view class="controlIconArea flex items-center justify-center" key="reset" @click="switchVoiceState()">
			<image class="controlIcon" v-show="isAudio" src="../../../assets/images/control-bar/icons8-audio-n-96-w.png" />
			<image class="controlIcon" v-show="!isAudio" src="../../../assets/images/control-bar/icons8-audio-96-w.png" />
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
}
</style>
