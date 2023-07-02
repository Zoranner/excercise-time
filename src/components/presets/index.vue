<script lang="ts" setup>
import { Preset } from '@/services/presets/preset';
import { PresetPlayerStatus } from '@/services/presets/presetPlayer';
import PresetItem from './preset-item.vue'

const selectPresetId = ref('')

const switchPreset = (id: string) => {
	if (Config.presetPlayer.preset.id === id) {
		return
	}
	if (Config.presetPlayer.status !== PresetPlayerStatus.Stopped) {
		Dialog.showModal('已有锻炼正在进行中，切换预设将会结束当前正在进行的锻炼，是否继续？',
			(result: boolean) => {
				if (!result) {
					return
				}
				Vibrate.short('heavy')
				selectPresetId.value = id
				Config.currentPresetId = id
			})
	}
	else {
		Vibrate.short('heavy')
		selectPresetId.value = id
		Config.currentPresetId = id
	}
}

const itemEditClicked = (id: string) => {
	Vibrate.short('light')
	// Taro.navigateTo({
	// 	url: `/pages/presets/editor/index?id=${id}`,
	// })
	Dialog.showEditor(id, (result: boolean, preset: Preset | undefined) => {
		if (result && preset) {
			console.log(JSON.stringify(preset))
		}
	})
}

selectPresetId.value = Config.presetPlayer.preset.id
</script>

<template>
	<view class="presetsPage">
		<scroll-view class="presetsScrollView" :scroll-y="true">
			<view v-for="(id, index) in Config.presetsDict.keys()" :key="index">
				<PresetItem class="presetItem" :preset="Config.presetsDict.get(id)" :checked="selectPresetId === id"
					@click:select="switchPreset(id)" @click:edit="itemEditClicked(id)" />
			</view>
			<view class="presetPlaceholder"></view>
		</scroll-view>
	</view>
	
</template>

<style lang="scss">
.presetsPage {
	height: 100%;
	background: var(--color-dark-gray);

	.presetsScrollView {
		width: calc(100% - 40px);
		height: 100%;
		padding: 0 20px;
		filter: var(--shadow-drop-black);

		.presetItem {
			height: 190px;
			margin: 30px 0;
			box-sizing: border-box;
		}

		.presetPlaceholder {
			width: 100%;
			height: 70px;
		}
	}
}
</style>
