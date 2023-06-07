<script lang="ts" setup>
import { baseConst } from '@/config/baseConst'

// 计算导航栏高度
const appHeaderHeight = baseConst.statusBarHeight + baseConst.titleBarHeight
// 计算标题栏位置
const titleBarTop = baseConst.statusBarHeight + baseConst.titleBarHeight / 2
</script>

<template>
	<div class="settinsPage">
		<div class="settinsBase flex flex-col items-center">
			<div class="settinsTitleBar w-100% flex flex-col items-center" :style="{ height: appHeaderHeight + 'px' }">
				<text class="settinsCaption fixed" :style="{ fontSize: baseConst.titleBarFontSize + 'em', top: titleBarTop + 'px' }">配置列表</text>
			</div>
		</div>
	</div>
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
			filter: var(--shadow-black);
			.settinsCaption {
				//top: 10%;
				transform: translateY(-50%);
				color: var(--color-white);
			}
		}
	}
}
</style>
