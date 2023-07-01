<script lang="ts" setup>
import PresetItem from './preset-item.vue'

const selectPresetId = ref('')

const switchPreset = (id: string) => {
	if (Config.presetPlayer.preset.id === id) {
		return
	}
	Vibrate.short('heavy')
	selectPresetId.value = id
	Config.presetPlayer.load(Config.presetsDict.get(id))
	//emits('change', preset)
}

const itemEditClicked = (_id: string) => {
	Dialog.showToast('正在开发中...')
	// Taro.navigateTo({
	// 	url: `/pages/presets/editor/index?id=${id}`,
	// })
}

selectPresetId.value = Config.presetPlayer.preset.id
</script>

<template>
	<view class="presetsPage">
		<scroll-view class="presetsScrollView" :scroll-y="true">
			<view v-for="(id, index) in Config.presetsDict.keys()" :key="index">
				<PresetItem :preset="Config.presetsDict.get(id)" :checked="selectPresetId === id"
					@click:select="switchPreset(id)" @click:edit="itemEditClicked(id)" />
			</view>
			<view class="presetsPlaceholder"></view>
		</scroll-view>
	</view>
</template>

<style lang="scss">
.presetsPage {
	height: 100%;
	background: var(--color-dark-gray);

	.presetsScrollView {
		width: 100%;
		height: 100%;

		.presetsPlaceholder {
			width: 100%;
			height: 70px;
		}
	}
}
</style>
