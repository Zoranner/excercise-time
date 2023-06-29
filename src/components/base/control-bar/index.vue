<script lang="ts" setup>
// const isPlay = ref(false)
// const hasSound = ref(false)
const emitTimerReset = defineEmits(['reset'])

const resetTimerState = () => {
	Taro.vibrateShort({ type: 'light' })
	globalConfig.ref.timerState = 0
	emitTimerReset('reset')
}

const switchTimerState = () => {
	Taro.vibrateShort({ type: 'light' })
	globalConfig.ref.timerState = globalConfig.ref.timerState !== 1 ? 1 : 2
}

const forwardNextCycle = () => {
	Taro.vibrateShort({ type: 'light' })
}
</script>

<template>
	<view class="controlBarPanel w-70% fixed flex items-center justify-center">
		<view class="controlIconArea flex items-center justify-center" key="reset" @click="resetTimerState()">
			<image class="controlIcon" src="@/assets/images/control-bar/undo_alt.svg" />
		</view>
		<view class="controlIconArea flex items-center justify-center" key="reset" @click="switchTimerState()">
			<image class="controlIcon" v-show="globalConfig.ref.timerState === 1" src="@/assets/images/control-bar/pause_button.svg" />
			<image class="controlIcon" v-show="globalConfig.ref.timerState !== 1" src="@/assets/images/control-bar/circled_play.svg" />
		</view>
		<view class="controlIconArea flex items-center justify-center" key="reset" @click="forwardNextCycle()">
			<image class="controlIcon" src="@/assets/images/control-bar/fast_forward.svg" />
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
			width: 60px;
			height: 60px;
		}
	}
	.controlIconArea:active {
		filter: var(--shadow-drop-heavy-white);
		.controlIcon {
			width: 68px;
			height: 68px;
		}
	}
}
.controlBarPanel:active {
	filter: var(--shadow-drop-black);
}
</style>
