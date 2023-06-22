<script lang="ts" setup>
import TitleBar from '@/components/base/title-bar/index.vue'
import TimeItem from '@/components/presets/editor/time-item.vue';

definePageConfig({
	navigationStyle: 'custom',
	disableScroll: true // 禁止页面滚动
})

const emits = defineEmits(['change'])

// 计算导航栏高度
const appHeaderHeight = globalConst.statusBarHeight + globalConst.titleBarHeight

const switchPreset = (index: number) => {
	Taro.vibrateShort({ type: 'heavy' })
	globalStore.presetSelected.value = index
	emits('change', index)
}

switchPreset(globalStore.presetSelected.value)
</script>

<template>
	<TitleBar caption="编辑预设" color="var(--color-black)" />
	<view class="presetsPage">
		<scroll-view class="presetsScrollView" :scroll-y="true">
			<view v-for="index in 3" :key="index">
				<TimeItem :caption="'锻炼时间' + index" :checked="globalStore.presetSelected === index" @click="switchPreset(index)"/>
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
		height: calc(100% - 10px);
		// background: var(--color-white);
		.presetsPlaceholder {
			width: 100%;
			height: 70px;
		}
	}
}
</style>
