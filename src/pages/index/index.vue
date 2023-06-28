<script lang="ts" setup>
import { globalConst } from '@/config/globalConst'
import TitleBar from '@/components/base/title-bar/index.vue'
import Settings from '@/components/settings/index.vue'
import Fighting from '@/components/fighting/index.vue'
import Presets from '@/components/presets/index.vue'
import TabBar from '@/components/base/tab-bar/index.vue'

definePageConfig({
	navigationStyle: 'custom',
	disableScroll: true // 禁止页面滚动
})

// 计算导航栏高度
const appHeaderHeight = globalConst.statusBarHeight + globalConst.titleBarHeight

const titleCaption = ref('锻炼时间')
const titleBarColor = ref('var(--color-transparent)')
const tabBarIndex = ref(globalConst.tabBarSelected)

const switchTitleBar = (index: number) => {
	switch (index) {
		case 0:
			titleCaption.value = '配置列表'
			titleBarColor.value = 'var(--color-black)'
			break
		case 1:
			titleCaption.value = '锻炼时间'
			titleBarColor.value = 'var(--color-transparent)'
			break
		case 2:
			titleCaption.value = '预设列表'
			titleBarColor.value = 'var(--color-black)'
			break
	}
}

const tabBarChange = (index: number) => {
	tabBarIndex.value = index
	switchTitleBar(index)
}

Taro.setKeepScreenOn({ keepScreenOn: true })
switchTitleBar(globalConst.tabBarSelected)
</script>

<template>
	<TitleBar :caption="titleCaption" :color="titleBarColor" />
	<view :class="tabBarIndex === 1 ? 'mainContainer' : 'viceContainer'"
		:style="{ '--appHeaderHeight': appHeaderHeight + 'px' }">
		<Settings class="pageContentItem" v-if="tabBarIndex === 0" />
		<Fighting class="pageContentItem" v-show="tabBarIndex === 1" />
		<Presets class="pageContentItem" v-if="tabBarIndex === 2" />
	</view>
	<TabBar @change="tabBarChange" />
</template>

<style lang="scss">
// .appContainer {
// 	width: 100vw;
// 	height: 100vh;
// 	background: var(--color-dark-gray);
.mainContainer {
	height: 100vh;
	background: var(--color-dark-gray);

	.pageContentItem {
		transform: all 1s ease-in-out;
	}
}

.viceContainer {
	height: calc(100vh - var(--appHeaderHeight) - 140px);
	height: calc(100vh - var(--appHeaderHeight) - constant(safe-area-inset-bottom) - 140px);
	height: calc(100vh - var(--appHeaderHeight) - env(safe-area-inset-bottom) - 140px);
	background: var(--color-dark-gray);
	padding-top: var(--appHeaderHeight);
	padding-bottom: 200px;
	padding-bottom: calc(constant(safe-area-inset-bottom) + 200px);
	padding-bottom: calc(env(safe-area-inset-bottom) + 200px);

	.pageContentItem {
		transform: all 1s ease-in-out;
	}
}

// }
</style>
