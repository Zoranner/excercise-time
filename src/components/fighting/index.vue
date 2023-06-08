<script lang="ts" setup>
import { baseConst } from '@/config/baseConst'
import CircleProgress from '@/components/fighting/circle-progress.vue'
import ControlBar from '@/components/base/control-bar/index.vue'

// 计算导航栏高度
const appHeaderHeight = baseConst.statusBarHeight + baseConst.titleBarHeight
// 计算标题栏位置
const titleBarTop = baseConst.statusBarHeight + baseConst.titleBarHeight / 2

const circleRadius = (baseConst.screenHeight - appHeaderHeight) * 0.4 * 0.5
const leftTimeFontSize = circleRadius * 0.042
const stateCaptionFontSize = circleRadius * 0.012
const cycleTitleFontSize = circleRadius * 0.012
const cycleValueFontSize = circleRadius * 0.014
</script>

<template>
	<div class="fightingPage">
		<div class="fightingBase flex flex-col items-center">
			<text class="fightingCaption fixed" :style="{ fontSize: baseConst.titleBarFontSize + 'em', top: titleBarTop + 'px' }">直腿抬高</text>
			<CircleProgress class="timeProgress fixed" progress="75" :radius="circleRadius">
				<text class="leftTime" :style="{ fontSize: leftTimeFontSize + 'em' }">00:30</text>
				<text class="timeContent" :style="{ fontSize: leftTimeFontSize + 'em' }">00:30</text>
			</CircleProgress>
			<text class="stateCaption fixed" :style="{ fontSize: stateCaptionFontSize + 'em' }">锻炼</text>
			<ControlBar class="controlBar fixed">
			</ControlBar>
			<div class="cycleValueArea w-70% fixed flex">
				<text class="cycleContent" :style="{ fontSize: cycleValueFontSize + 'em' }">1/3</text>
				<text class="cycleContent" :style="{ fontSize: cycleValueFontSize + 'em' }">1/10</text>
			</div>
			<div class="cycleTitleArea w-70% fixed flex">
				<text class="cycleContent" :style="{ fontSize: cycleTitleFontSize + 'em' }">周期</text>
				<text class="cycleContent" :style="{ fontSize: cycleTitleFontSize + 'em' }">循环</text>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.fightingPage {
	width: 100vw;
	height: 100vh;
	background: var(--color-dark-gray);
	background-size: cover;
	.fightingBase {
		width: 100%;
		height: 100%;
		color: var(--color-white);
		background: var(--color-lg-green);
		.fightingCaption {
			transform: translateY(-50%);
			color: var(--color-white);
		}
		.timeProgress {
			top: 15%;
			.timeContent {
				font-family: 'Local Timer';
				filter: var(--shadow-white);
			}
		}
		.stateCaption {
			top: 53%;
			font-weight: bold;
			color: var(--color-white);
			filter: var(--shadow-white);
		}
		.controlBar {
			bottom: 32%;
			height: 120px;
		}
		.cycleValueArea {
			bottom: 24%;
			text-align: center;
			color: var(--color-white);
			filter: var(--shadow-white);
		}
		.cycleTitleArea {
			bottom: 20%;
			text-align: center;
			color: var(--color-white);
			filter: var(--shadow-white);
		}
		.cycleContent {
			width: 50%;
			font-family: 'Local Progress';
		}
	}
}
</style>
