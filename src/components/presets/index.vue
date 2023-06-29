<script lang="ts" setup>
import { PresetPlayerStatus } from '@/services/presets/presetPlayer'
import PresetItem from './preset-item.vue'
import ToastLayer from '@/components/base/toast-layer/index.vue'

//const emits = defineEmits(['change'])

const selectPresetId = ref('')
const toastLayer = ref()

const switchPreset = (id: string) => {
	if (globalConfig.presetPlayer.preset.id === id) {
		return
	}
	if (globalConfig.presetPlayer.status !== PresetPlayerStatus.Stopped) {
		toastLayer.value.showInfomation('请停止计时器后再切换预设')
		return
	}
	Taro.vibrateShort({ type: 'heavy' })
	selectPresetId.value = id
	globalConfig.presetPlayer.load(globalConfig.presetsDict.get(id))
	//emits('change', preset)
}

const itemEditClicked = (id: string) => {
	console.log('itemClickEdit', id)
	Taro.navigateTo({
		url: '/pages/presets/editor/index'
	})
}

selectPresetId.value = globalConfig.presetPlayer.preset.id
</script>

<template>
	<view class="presetsPage">
		<scroll-view class="presetsScrollView" :scroll-y="true">
			<view v-for="(id, index) in globalConfig.presetsDict.keys()" :key="index">
				<PresetItem :preset="globalConfig.presetsDict.get(id)" :checked="selectPresetId === id"
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
