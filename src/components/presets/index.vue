<script lang="ts" setup>
import PresetItem from './preset-item.vue'

const emits = defineEmits(['change'])

const presetSelected = (id: string) => {
	return globalConfig.ref.presetSelect === id
}

const switchPreset = (id: string) => {
	Taro.vibrateShort({ type: 'heavy' })
	globalConfig.ref.presetSelect = id
	emits('change', id)
}

const itemEditClicked = (id: string) => {
	console.log('itemClickEdit', id)
	Taro.navigateTo({
		url: '/pages/presets/editor/index'
	})
}

switchPreset(globalConfig.ref.presetSelect)
</script>

<template>
	<view class="presetsPage">
		<scroll-view class="presetsScrollView" :scroll-y="true">
			<view v-for="(id, index) in globalConfig.presetsDict.keys()" :key="index">
				<PresetItem :preset="globalConfig.presetsDict.get(id)" :checked="presetSelected(id)"
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
