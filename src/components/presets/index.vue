<script lang="ts" setup>
import { globalStore } from '@/store/globalStore';

// 计算导航栏高度
const appHeaderHeight = baseConst.statusBarHeight + baseConst.titleBarHeight
// 计算标题栏位置
const titleBarTop = baseConst.statusBarHeight + baseConst.titleBarHeight / 2
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
	width: 100vw;
	height: 100vh;
	background: var(--color-dark-gray);
	background-size: cover;
	.presetsBase {
		width: 100%;
		height: 100%;
		color: var(--color-white);
		//background: var(--color-lg-green);
		.presetsTitleBar {
			background: var(--color-black);
			filter: var(--shadow-drop-black);
			.presetsCaption {
				//top: 10%;
				transform: translateY(-50%);
				color: var(--color-white);
			}
		}
	}
}
</style>
