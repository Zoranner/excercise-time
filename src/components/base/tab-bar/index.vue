<script lang="ts" setup>
const emits = defineEmits(['change'])

const tabList = [
	{
		caption: '高级',
		defaultIcon: require('@/assets/images/tab-bar/user_settings-lg.svg'),
		selectedIcon: require('@/assets/images/tab-bar/user_settings.svg'),
	},
	{
		caption: '开始',
		defaultIcon: require('@/assets/images/tab-bar/fist-lg.svg'),
		selectedIcon: require('@/assets/images/tab-bar/fist.svg'),
	},
	{
		caption: '预设',
		defaultIcon: require('@/assets/images/tab-bar/playlist-lg.svg'),
		selectedIcon: require('@/assets/images/tab-bar/playlist.svg'),
	}
]

const switchTab = (index: number) => {
	Taro.vibrateShort({ type: 'light' })
	globalConfig.ref.tabBarSelected = index
	emits('change', index)
}
</script>

<template>
	<view class="tabBarPanel z-99999 fixed bottom-0 left-0 right-0">
		<view class="tabBarCircle w-100% h-100% fixed" />
		<view class="w-100% h-100% fixed">
			<view class="tabBarViewer flex flex-1">
				<view class="tabItemIcon flex flex-1 flex-col items-center justify-center"
					:style="{ filter: globalConfig.ref.tabBarSelected === index ? 'var(--shadow-drop-white)' : '' }"
					v-for="(item, index) in tabList" :key="item.caption" @click="switchTab(index)">
					<image :class="index === 1 ? 'h-40px w-40px' : 'h-25px w-25px'"
						v-show="globalConfig.ref.tabBarSelected === index" :src="item.selectedIcon"></image>
					<image :class="index === 1 ? 'h-40px w-40px' : 'h-25px w-25px'"
						v-show="globalConfig.ref.tabBarSelected !== index" :src="item.defaultIcon"></image>
					<view :style="{
						color: globalConfig.ref.tabBarSelected === index ? 'var(--color-white)' : 'var(--color-light-gray)',
						fontWeight: globalConfig.ref.tabBarSelected === index ? 'bold' : 'normal',
						fontSize: '16px'
					}">
						{{ item.caption }}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<style lang="scss">
.tabBarPanel {
	height: 150px;
	border-radius: 45px 45px 0 0;
	padding-bottom: 0;
	padding-bottom: constant(safe-area-inset-bottom);
	padding-bottom: env(safe-area-inset-bottom);
	background-color: var(--color-black);
	filter: var(--shadow-drop-black);

	.tabBarCircle {
		left: 50%;
		bottom: 5px;
		bottom: calc(constant(safe-area-inset-bottom) + 5px);
		bottom: calc(env(safe-area-inset-bottom) + 5px);
		height: 200px;
		width: 200px;
		transform: translateX(-50%);
		border-radius: 50%;
		background-color: var(--color-black);
	}

	.tabBarViewer {
		align-items: flex-end;
		justify-content: space-around;

		.tabItemIcon:active {
			filter: var(--shadow-drop-white);
		}
	}
}
</style>
