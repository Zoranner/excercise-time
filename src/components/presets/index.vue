<script lang="ts" setup>
import { globalStore } from '@/store/globalStore';

const emits = defineEmits(['change'])

const switchPreset = (index: number) => {
	Taro.vibrateShort({ type: 'heavy' })
	globalStore.presetSelected = index
	emits('change', index)
}

switchPreset(globalStore.presetSelected)
</script>

<template>
	<view class="presetsPage">
		<scroll-view class="presetsScrollView" :scroll-y="true">
			<view v-for="index in 3" :key="index">
				<PresetItem :caption="'锻炼时间' + index" :checked="globalStore.presetSelected === index" @click="switchPreset(index)"/>
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
		// background: var(--color-white);
		.presetsPlaceholder {
			width: 100%;
			height: 70px;
		}
	}
}
</style>
