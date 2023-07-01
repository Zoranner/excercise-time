<script lang="ts" setup>
import { PresetPlayerStatus } from '@/services/presets/presetPlayer'
import PresetItem from './preset-item.vue'
import ToastLayer from '@/components/base/toast-layer/index.vue'

//const emits = defineEmits(['change'])

const selectPresetId = ref('')
const toastLayer = ref()

const switchPreset = (id: string) => {
	if (Glbc.presetPlayer.preset.id === id) {
		return
	}
	Taro.vibrateShort({ type: 'heavy' })
	selectPresetId.value = id
	Glbc.presetPlayer.load(Glbc.presetsDict.get(id))
	//emits('change', preset)
}

const itemEditClicked = (_id: string) => {
	toastLayer.value.showInfomation('正在开发中...')
	// Taro.navigateTo({
	// 	url: `/pages/presets/editor/index?id=${id}`,
	// })
}

selectPresetId.value = Glbc.presetPlayer.preset.id
</script>

<template>
	<view class="presetsPage">
		<scroll-view class="presetsScrollView" :scroll-y="true">
			<view v-for="(id, index) in Glbc.presetsDict.keys()" :key="index">
				<PresetItem :preset="Glbc.presetsDict.get(id)" :checked="selectPresetId === id"
					@click:select="switchPreset(id)" @click:edit="itemEditClicked(id)" />
			</view>
			<view class="presetsPlaceholder"></view>
		</scroll-view>
		<ToastLayer ref="toastLayer" />
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
