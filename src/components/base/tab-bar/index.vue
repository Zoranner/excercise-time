<script lang="ts" setup>
import { globalConst } from '@/config/globalConst'

const emits = defineEmits(['change'])

const tabList = [
	{
		defaultIcon: require('@/assets/images/tab-bar/icons8-gear-96-lg.png'),
		selectedIcon: require('@/assets/images/tab-bar/icons8-gear-96-w.png'),
		caption: '设置'
	},
	{
		defaultIcon: require('@/assets/images/tab-bar/icons8-fist-96-lg.png'),
		selectedIcon: require('@/assets/images/tab-bar/icons8-fist-96-w.png'),
		caption: '开始'
	},
	{
		defaultIcon: require('@/assets/images/tab-bar/icons8-content-96-lg.png'),
		selectedIcon: require('@/assets/images/tab-bar/icons8-content-96-w.png'),
		caption: '预设'
	}
]

const switchTab = (index: number) => {
	Taro.vibrateShort({ type: 'light' })
	globalConst.tabBarSelected = index
	emits('change', index)
}
</script>

<template>
	<view class="tabBarPanel z-99999 fixed bottom-0 left-0 right-0">
		<view class="tabCircle w-100% h-100% fixed" />
		<view class="w-100% h-100% fixed">
			<view class="tabViewer flex flex-1">
				<view
					class="tabIcon flex flex-1 flex-col items-center justify-center"
					:style="{ filter: globalConst.tabBarSelected === index ? 'var(--shadow-drop-white)' : '' }"
					v-for="(item, index) in tabList"
					:key="item.caption"
					@click="switchTab(index)">
					<image
						:class="index === 1 ? 'h-42px w-42px' : 'h-28px w-28px'"
						v-show="globalConst.tabBarSelected === index"
						:src="item.selectedIcon"></image>
					<image
						:class="index === 1 ? 'h-42px w-42px' : 'h-28px w-28px'"
						v-show="globalConst.tabBarSelected !== index"
						:src="item.defaultIcon"></image>
					<view
						:style="{
							color: globalConst.tabBarSelected === index ? 'var(--color-white)' : 'var(--color-light-gray)',
							fontWeight: globalConst.tabBarSelected === index ? 'bold' : 'normal',
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
	.tabCircle {
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
	.tabViewer {
		align-items: flex-end;
		justify-content: space-around;
		.tabIcon:active {
			filter: var(--shadow-drop-white);
		}
	}
}
</style>
