<script lang="ts" setup>
import { baseConst } from '@/config/baseConst'

// 计算导航栏高度
const appHeaderHeight = baseConst.statusBarHeight + baseConst.titleBarHeight
// 计算标题栏位置
const titleBarTop = baseConst.statusBarHeight + baseConst.titleBarHeight / 2
</script>

<template>
	<div class="presetsPage">
		<div class="presetsBase flex flex-col items-center">
			<div class="presetsTitleBar w-100% flex flex-col items-center" :style="{ height: appHeaderHeight + 'px' }">
				<text class="presetsCaption fixed" :style="{ fontSize: baseConst.titleBarFontSize + 'em', top: titleBarTop + 'px' }">预设列表</text>
			</div>
		</div>
	</div>
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
			filter: var(--shadow-black);
			.presetsCaption {
				//top: 10%;
				transform: translateY(-50%);
				color: var(--color-white);
			}
		}
	}
}
</style>
