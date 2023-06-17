<script lang="ts" setup>
import { globalConst } from '@/config/globalConst'

const props = defineProps({
	caption: {
		type: String,
		default: '锻炼时间'
	},
	color: {
		type: [String, Object],
		default: 'var(--color-transparent)'
	}
})

// 计算导航栏高度
const appHeaderHeight = globalConst.statusBarHeight + globalConst.titleBarHeight
// 计算标题栏位置
const titleBarTop = globalConst.statusBarHeight + globalConst.titleBarHeight / 2
</script>

<template>
	<view class="titleBarPanel z-99999 fixed top-0 left-0 right-0">
		<view class="titleBarView w-100% flex flex-col items-center" :style="{ height: appHeaderHeight + 'px', background: props.color }">
			<text class="titleBarCaption fixed" :style="{ fontSize: globalConst.titleBarFontSize + 'em', top: titleBarTop + 'px' }">
				{{ props.caption }}
			</text>
		</view>
	</view>
</template>

<style lang="scss">
.titleBarPanel {
	width: 100%;
	.titleBarView {
		filter: var(--shadow-drop-black);
		.titleBarCaption {
			//top: 10%;
			transform: translateY(-50%);
			color: var(--color-white);
		}
	}
}
</style>
