<script lang="ts" setup>
import TabBar from '@/components/base/tab-bar/index.vue'
import Settings from '@/components/settings/index.vue'
import Fighting from '@/components/fighting/index.vue'
import Presets from '@/components/presets/index.vue'
import { globalData } from '@/store/globalStore'

definePageConfig({
	navigationStyle: 'custom',
	disableScroll: true // 禁止页面滚动
})

const tabBarIndex = ref(globalData.tabBarSelected)

const tabBarChange = (index: number) => {
	tabBarIndex.value = index
}

Taro.setKeepScreenOn({ keepScreenOn: true })
</script>

<template>
		<Settings v-show="tabBarIndex === 0" />
		<Fighting v-show="tabBarIndex === 1" />
		<Presets v-show="tabBarIndex === 2" />
	</view>
	<TabBar @change="tabBarChange" />
</template>
<style lang="scss">
.mainPage {
	height: 100vh;
	background: var(--color-dark-gray);
	background-size: cover;
	.defaultPage {
		@include center;
		width: 100%;
		height: 100%;
		background: var(--color-lg-green);
		.waitMe {
			font-size: 50px;
			color: var(--color-white);
		}
	}
	.fightPage {
		@include center;
		width: 100%;
		height: 100%;
		background: var(--color-lg-green);
	}
}
</style>
