<script lang="ts" setup>
import { Preset, PresetOptions } from '@/services/presets/preset'
import { PresetPlayerStatus } from '@/services/presets/presetPlayer';
import PresetItem from './preset-item.vue'
import { EditorResult } from '../global';
import { PresetsDictUpdateType } from '@/services/presets/presetsDict';

const scrollIntoViewRef = ref('')
const selectPresetId = ref('')
const presetsDictValues = ref(Config.presetsDict.values())

const switchPreset = (id: string) => {
	Vibrate.short('heavy')
	selectPresetId.value = id
	Config.currentPresetId = id
}

const itemSelectClicked = (id: string) => {
	if (Config.presetPlayer.preset.id === id) {
		return
	}
	if (Config.presetPlayer.status !== PresetPlayerStatus.Stopped) {
		Dialog.showModal('当前预设的锻炼正在进行中，切换预设将会结束锻炼，是否继续？',
			(result: boolean) => {
				if (result) {
					Config.presetPlayer.stop()
					switchPreset(id)
				}
			})
	}
	else {
		switchPreset(id)
	}
}

const showPresetEditor = (preset: Preset, selected: boolean = false) => {
	Dialog.showEditor(preset, (result: EditorResult, options: PresetOptions | undefined) => {
		switch (result) {
			case EditorResult.Save:
				if (result === EditorResult.Save && options) {
					const newPreset = new Preset(
						options.caption,
						options.prepareTime,
						options.exerciseTime,
						options.cycleRestTime,
						options.cycle,
						options.loop,
						options.loopRestTime,
						options.coolingTime,
						preset.createTime
					)
					Config.presetsDict.set(preset.id, newPreset)
					if (selected) {
						selectPresetId.value = newPreset.id
						Config.currentPresetId = newPreset.id
					}
				}
				break
			case EditorResult.Delete:
				if (Config.presetsDict.length() === 1) {
					Dialog.showToast('请至少保留一个计时器预设')
					return
				}
				Config.presetsDict.remove(preset.id)
				break
		}
	})
}

const itemEditClicked = (preset: Preset) => {
	Vibrate.short('light')
	const selected = Config.currentPresetId === preset.id
	if (selected && Config.presetPlayer.status !== PresetPlayerStatus.Stopped) {
		Dialog.showModal('当前预设的锻炼正在进行中，编辑预设将会结束锻炼，是否继续？',
			(result: boolean) => {
				if (result) {
					Config.presetPlayer.stop()
					showPresetEditor(preset, selected)
				}
			})
	}
	else {
		showPresetEditor(preset, selected)
	}
}

onMounted(() => {
	selectPresetId.value = Config.currentPresetId
	Config.presetsDict.updated.on((type: PresetsDictUpdateType) => {
		switch (type) {
			case PresetsDictUpdateType.Add:
				scrollIntoViewRef.value = 'presetPlaceholder'
				setTimeout(() => {
					scrollIntoViewRef.value = ''
				}, 100)
				break
			case PresetsDictUpdateType.Remove:
				if (!Config.presetsDict.contains(selectPresetId.value)) {
					selectPresetId.value = Config.presetsDict.keys()[0]
					Config.currentPresetId = selectPresetId.value
				}
				break
		}
		presetsDictValues.value = Config.presetsDict.values()
	})
})

onUnmounted(() => {
	Config.presetsDict.updated.off()
})
</script>

<template>
	<view class="presetsPageArea">
		<scroll-view class="presetsScrollView" :scrollY="true" :scrollWithAnimation="true" :scrollIntoView="scrollIntoViewRef">
			<view v-for="(preset, index) in presetsDictValues" :key="index">
				<PresetItem class="presetViewItem" :preset="preset" :checked="selectPresetId === preset.id"
					@click:select="itemSelectClicked(preset.id)" @click:edit="itemEditClicked(preset)" />
			</view>
			<view class="presetPlaceholder" id="presetPlaceholder"></view>
		</scroll-view>
	</view>
</template>

<style lang="scss">
.presetsPageArea {
	height: 100%;
	background: var(--color-dark-gray);

	.presetsScrollView {
		width: calc(100% - 40px);
		height: 100%;
		padding: 0 20px;
		filter: var(--shadow-drop-black);

		.presetViewItem {
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
