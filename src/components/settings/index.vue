<script lang="ts" setup>
import { baseConst } from '@/config/baseConst'

// 计算导航栏高度
const appHeaderHeight = baseConst.statusBarHeight + baseConst.titleBarHeight
// 计算标题栏位置
const titleBarTop = baseConst.statusBarHeight + baseConst.titleBarHeight / 2
</script>

<template>
	<view class="settingsPage">
		<scroll-view class="settingsScrollView" :scroll-y="true">
			<view v-for="index in 3" :key="index">
				<view />
			</view>
			<view class="settingsPlaceholder"></view>
		</scroll-view>
	</view>
</template>

<style lang="scss">
.settinsPage {
	width: 100vw;
	height: 100vh;
	background: var(--color-dark-gray);
	background-size: cover;
	.settinsBase {
		width: 100%;
		height: 100%;
		color: var(--color-white);
		//background: var(--color-lg-green);
		.settinsTitleBar {
			background: var(--color-black);
			filter: var(--shadow-drop-black);
			.settinsCaption {
				//top: 10%;
				transform: translateY(-50%);
				color: var(--color-white);
			}
		}
	}
}
</style>
