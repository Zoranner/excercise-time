<script lang="ts" setup>
import PresetItem from '../preset-item.vue'

const emits = defineEmits(['change'])

const switchPreset = (index: number) => {
	Taro.vibrateShort({ type: 'heavy' })
	globalStore.presetSelect.value = index
	emits('change', index)
}

const itemEditClicked = (index: number) => {
	console.log('itemClickEdit', index)
	Taro.navigateTo({
		url: '/pages/presets/editor/index'
	})
}

switchPreset(globalStore.presetSelect.value)
</script>

<template>
	<view class="presetsPage">
		<scroll-view class="presetsScrollView" :scroll-y="true">
			<view v-for="index in 9" :key="index">
				<PresetItem :caption="'锻炼时间' + index" :checked="globalStore.presetSelect === index"
					@click:edit="itemEditClicked(index)" />
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
