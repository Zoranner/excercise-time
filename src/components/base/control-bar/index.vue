<script lang="ts" setup>
import { PresetPlayerStatus } from '@/services/presets/presetPlayer'

const playerStatus = ref(PresetPlayerStatus.Stopped)

const resetPlayerState = () => {
	Taro.vibrateShort({ type: 'light' })
	playerStatus.value = globalConfig.presetPlayer.stop()
}

const switchPlayerState = () => {
	Taro.vibrateShort({ type: 'light' })
	switch (globalConfig.presetPlayer.status) {
		case PresetPlayerStatus.Running:
			playerStatus.value = globalConfig.presetPlayer.pause()
			break
		case PresetPlayerStatus.Paused:
		case PresetPlayerStatus.Stopped:
			playerStatus.value = globalConfig.presetPlayer.play()
			break
	}
}

const forwardNextCycle = () => {
	Taro.vibrateShort({ type: 'light' })
}
</script>

<template>
	<view class="controlBarPanel w-70% fixed flex items-center justify-center">
		<view class="controlIconArea flex items-center justify-center" key="reset" @click="resetPlayerState()">
			<image class="controlIcon" src="@/assets/images/control-bar/undo_alt.svg" />
		</view>
		<view class="controlIconArea flex items-center justify-center" key="reset" @click="switchPlayerState()">
			<image class="controlIcon" v-show="playerStatus === PresetPlayerStatus.Running"
				src="@/assets/images/control-bar/pause_button.svg" />
			<image class="controlIcon" v-show="playerStatus !== PresetPlayerStatus.Running"
				src="@/assets/images/control-bar/circled_play.svg" />
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
}</style>
