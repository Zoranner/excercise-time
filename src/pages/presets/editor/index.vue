<script lang="ts" setup>
import TitleBar from '@/components/base/title-bar/index.vue'
import PresetEditor from '@/components/presets/editor/index.vue'

definePageConfig({
	navigationStyle: 'custom',
	disableScroll: true // 禁止页面滚动
})

// 计算导航栏高度
const appHeaderHeight = globalConst.statusBarHeight + globalConst.titleBarHeight

</script>

<template>
	<TitleBar caption="编辑预设" color="var(--color-black)" />
	<view class="timerContainer" :style="{ '--appHeaderHeight': appHeaderHeight + 'px' }">
		<PresetEditor />
	</view>
</template>

<style lang="scss">
.timerContainer {
	height: calc(100vh - var(--appHeaderHeight));
	background: var(--color-dark-gray);
	padding-top: var(--appHeaderHeight);
}
</style>
